import express from 'express';
const router = express.Router();
import chalk from 'chalk';
/*
  This is an especially odd table to mess with, I would prefer to create
  instance/class methods w hooks etc. on this table. But as far as I can
  tell, there is no way to add definitions to a model after it is created.
  I know I can access $modelOptions directly - but that doesn't seem smart.
*/
import db from '../db/db';

router.route('/')
  .get((req, res, next) => {
    console.log(chalk.cyan('Parsing and fetching Session Data.'));
    db.models.Session.findAll()
      .then((allSessions) => {
        // TO-DO - Port all this into a .utils file
        /*
          On 12/12/16 I attempted to do this - and go stuck with an error
          that involved this not sending back a response even though every
          single log showed everything as operating fine. It seems to have
          something to do with porting sequelize objects around.
        */
        // Lets JSON.parse out the old session data.
        const parsedSessions = allSessions.map(session => JSON.parse(session.data));
        // Now lets filter this down to only sessions with my IP.
        // TO-DO - add extra filters besides IP.
        // TO-DO - try grabbing the IP in express instead of through sockets.
        const filteredSessions = parsedSessions.filter(session => {
          return session.socketData ? session.socketData.address === req.session.socketData.address : false;
        });
        // Dummy var to help manage which sessions text to keep.
        const welcomeTextArray = [];
        // If there is more then a single session that fits the filter...
        if (filteredSessions.length > 1) {
          filteredSessions.forEach(session => {
            if (req.session.socketData.id !== session.socketData.id) {
              // Then lets merge all of our URL views together.
              for (let URL in session.views) {
                // Design pattern to add keys where needed and accumulate otherwise.
                if (req.session.views[URL]) {
                  req.session.views[URL] = req.session.views[URL] + session.views[URL];
                } else {
                  req.session.views[URL] = session.views[URL];
                }
              }
            }
            // Now lets determine which welcomeText is newest.
            if (session.welcomeText) {
              welcomeTextArray.push({
                welcomeText: session.welcomeText,
                // Convert timestamps to date objects so that we can do comparisons.
                time: new Date(session.socketData.time)
              });
            }
          });
          let newestTime = null;
          // A loop that compares date objects, and whichever is the newest is the text that we choose for the conglomerate.
          welcomeTextArray.forEach(welcomeObject => {
            if (!newestTime || welcomeObject.time > newestTime) {
              req.session.welcomeText = welcomeObject.welcomeText;
              newestTime = welcomeObject.time;
            }
          });
          /*
            Ok - so we initially did a findAll btw;
            TO-DO - change it from a findAll to something that limits them - perhaps by geographic location of IP?
            So now we need to filter down our Sequelize objects to ones
            pertaining to this specific user.
            This is all so that we can do a mass destroy.
          */
          let sessionsToDelete = allSessions.filter(session => {
            const myData = JSON.parse(session.data);
            if (myData.socketData) {
              if (myData.socketData.address == req.session.socketData.address && myData.socketData.id !== req.session.socketData.id) {
                return true;
              } else {
                return false;
              }
            /*
              Yes, I agree, its an odd situation. Essentially, connect-sequelize
              is generating new sessions before all this madness and
              the sockets hack kick in. So if you load up pgAdmin - you
              will see that we generate blank canvas sessions - this clears
              those out as they are produced.
            */
            } else return true;
          });
          console.log(chalk.cyan(`There are ${sessionsToDelete.length} duplicate sessions in need of deletion.`));
          // Lets prep this data for a Promise.all
          sessionsToDelete = sessionsToDelete.map(session => session.destroy({force: true}));
          // Delete all these sessions.
          Promise.all(sessionsToDelete)
            .then(() => {
              console.log(chalk.green('All duplicate sessions deleted.'));
            })
            .catch(() => {
              console.log(chalk.red('Error deleting duplicate sessions.'));
            });
        }
        // Send down the new session. For those new to sessions, it will auto save.
        res.status(200).json({session: req.session});
      })
      .catch(err => {
        res.json({message: 'Error, could not interact with Sessions table.', error: err});
      });
  })
  .post((req, res, next) => {
    /*
      This is an odd design pattern. Essentially - sockets have more access
      to information about the client. So instead of having access to
      the data we need for this maneuver here - we need to port that
      data down as an event from a socket to the front, the socket
      listener on the front then shoots it back up to this route and
      here is where we set all that awesome data into the session,
      the `get` for this route is hit following this.
    */
    console.log(chalk.magenta('Save of user intialization beginning.'));
    req.session.socketData = req.body;
    res.status(200).json({Message: 'Success'});
  })
  .put((req, res, next) => {
    // Pretty straightforward route for the front end to update welcomeText.
    console.log(chalk.magenta('Storing Test Session Data...'));
    let welcomeText = req.body.welcomeText;

    req.session.welcomeText = welcomeText;

    res.status(200).json({Message: 'Success'});
  });

export default router;
