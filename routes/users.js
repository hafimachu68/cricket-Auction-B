var express = require('express');
const { getAllcourtsData, getSingleCourtData,dayWiseTimeSlot, getMybookingsData,addToGroup,getGroups,deleteCourtFromGroup,getAllteamsData,getteamCourtData, addToTeam, getteams, deleteFromTeam} = require('../controllers/usersController');
const { userAuth } = require('../midlware/authorization');
var router = express.Router();

/* GET users listing. */
router.get('/getAllcourtsData',userAuth,getAllcourtsData)
router.get('/getAllteamsData',userAuth,getAllteamsData)
router.get('/getteamCourtData',userAuth,getteamCourtData)
router.get('/getSingleCourtData',userAuth,getSingleCourtData)
router.get('/dayWiseTimeSlot',userAuth,dayWiseTimeSlot)
router.get('/getMybookingsData',userAuth,getMybookingsData)
router.post('/groups', userAuth, addToGroup);
router.post('/team', userAuth, addToTeam);
router.get('/getgroups', userAuth, getGroups);
router.get('/getteams', userAuth, getteams);
router.delete('/deletegroup/:groupId/:courtId', userAuth, deleteCourtFromGroup);
router.delete('/deleteteam/:groupId/:teamId', userAuth, deleteFromTeam);











// router.get('getLatestUpdatedData',userAuth,getlatestUpdetedData)



module.exports = router;
 