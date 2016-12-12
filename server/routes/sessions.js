const router = require('express').Router();
const chalk = require('chalk');
const Sessions = require('../db/db').models.Session;

router.route('/')
  .get((req, res, next) => {
    console.log(chalk.cyan('Parsing and fetching Session Data.'));
    Sessions.findAll()
      .then((allSessions) => {
        const parsedSessions = allSessions.map(session => JSON.parse(session.data));
        const filteredSessions = parsedSessions.filter(session => {
          if (session.socketData) {
            return session.socketData.address == req.session.socketData.address;
          } else {
            return false;
          }
        });
        const welcomeTextArray = [];
        if (filteredSessions.length > 1) {
          filteredSessions.forEach(session => {
            if (req.session.socketData.id !== session.socketData.id) {
              // Lets merge all of our views together.
              for (let URL in session.views) {
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
                time: new Date(session.socketData.time)
              });
            }
          });
          let newestTime = null;
          welcomeTextArray.forEach(welcomeObject => {
            if (!newestTime || welcomeObject.time > newestTime) {
              req.session.welcomeText = welcomeObject.welcomeText;
              newestTime = welcomeObject.time;
            }
          });
          let sessionsToDelete = allSessions.filter(session => {
            const myData = JSON.parse(session.data);
            if (myData.socketData) {
              if (myData.socketData.address == req.session.socketData.address && myData.socketData.id !== req.session.socketData.id) {
                return true;
              } else {
                return false;
              }
            } else return false;
          });
          console.log(chalk.cyan(`There are ${sessionsToDelete.length} duplicate sessions in need of deletion.`));
          sessionsToDelete = sessionsToDelete.map(session => session.destroy({force: true}));
          Promise.all(sessionsToDelete)
            .then(() => {
              console.log(chalk.green('All duplicate sessions deleted.'));
            })
            .catch(() => {
              console.log(chalk.red('Error deleting duplicate sessions.'));
            });
        }
        res.status(200).json({session: req.session});
      })
      .catch(err => {
        res.json({message: 'Error, could not interact with Sessions table.', error: err});
      });
  })
  .post((req, res, next) => {
    console.log(chalk.magenta('Save of user intialization beginning.'));
    req.session.socketData = req.body;
    res.status(200).json({Message: 'Success'});
  })
  .put((req, res, next) => {
    console.log(chalk.magenta('Storing Test Session Data...'));
    let welcomeText = req.body.welcomeText;

    req.session.welcomeText = welcomeText;

    res.status(200).json({Message: 'Success'});
  });

module.exports = router;
