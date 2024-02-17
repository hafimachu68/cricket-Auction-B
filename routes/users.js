var express = require('express');
const {addToGroup,getGroups,deletePlayerFromGroup,getAllteamsData,getteamCourtData, addToTeam, getteams, deleteFromTeam, getAllPlayersData, getSinglePlayerData} = require('../controllers/usersController');
const { userAuth } = require('../midlware/authorization');
var router = express.Router();

/* GET users listing. */
router.get('/getAllPlayersData',userAuth,getAllPlayersData)
router.get('/getAllteamsData',userAuth,getAllteamsData)
router.get('/getteamPlayerData',userAuth,getteamCourtData)
router.get('/getSinglePlayerData',userAuth,getSinglePlayerData)
router.post('/groups', userAuth, addToGroup);
router.post('/team', userAuth, addToTeam);
router.get('/getgroups', userAuth, getGroups);
router.get('/getteams', userAuth, getteams);
router.delete('/deletegroup/:groupId/:playerId', userAuth, deletePlayerFromGroup);
router.delete('/deleteteam/:groupId/:teamId', userAuth, deleteFromTeam);











// router.get('getLatestUpdatedData',userAuth,getlatestUpdetedData)



module.exports = router;
 