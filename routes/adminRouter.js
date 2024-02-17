var express = require('express');
const { addteamData, deleteteamData, updateteamData, addPlayerData, updatePlayerData, deletePlayerData} = require('../controllers/adminController');
const multer = require('multer');
const { adminAuth } = require('../midlware/authorization');
var router = express.Router();

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/courts')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const upload=multer({storage:fileStorage})

router.post('/addPlayerData',adminAuth,upload.single('image'),addPlayerData);
router.post('/addteam',adminAuth,upload.single('image'),addteamData);
// Update Court Data Route
router.put('/updatePlayerData/:playerId', adminAuth, upload.single('image'), updatePlayerData);
router.put('/updateteamData/:teamId', adminAuth, upload.single('image'), updateteamData);
router.delete('/deleteData/:playerId', adminAuth, deletePlayerData);
router.delete('/deleteteam/:teamId', adminAuth, deleteteamData);



 
   
module.exports=router;    