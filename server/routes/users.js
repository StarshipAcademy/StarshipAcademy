const router = require('express').Router();
const Users = require('../db/models/users');
const Sessions = require('../db/db').models.Session;
const chalk = require('chalk');

router.get('/:ipAddress', (req, res, next) => {
  Sessions.findAll()
    .then((allSessions) => {
      const parsedSessions = allSessions.map(session => JSON.parse(session.data));
      const filteredSessions = parsedSessions.filter(session => {
        if (session.socketData) {
          return session.socketData.address == req.params.ipAddress;
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
            if (myData.socketData.address == req.params.ipAddress && myData.socketData.id !== req.session.socketData.id) {
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

      res.json(req.session);
    })
    .catch((err) => {
      res.json({message: 'Error, could not interact with Sessions table.'});
    });
});

module.exports = router;
