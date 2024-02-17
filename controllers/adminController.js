const Player = require("../Models/playerModels");
const team = require("../Models/teamModels");

const addPlayerData = async (req, res) => {
    try {
        const { PlayerName, code, team, role, basepoint } = req.query;

        // Check if image is uploaded
        let CourtPic;
        if (req.file) {
            CourtPic = req.file.filename;
        }

        await Player.create({
            PlayerName,
            code,
            team,
            role,
            basepoint,
            CourtPic
        });

        res.status(200).json({ message: "Player data added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addteamData = async (req, res) => {
    try {
        const { teamName, basepoint, budget } = req.query;

        // Check if image is uploaded
        let teamPic;
        if (req.file) {
            teamPic = req.file.filename;
        }

        await team.create({
            teamName,
            basepoint,
            budget,
            teamPic
        });

        res.status(200).json({ message: "Team data added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updatePlayerData = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const { PlayerName, code, team, role, basepoint } = req.body;

        // Check if image is uploaded
        let CourtPic;
        if (req.file) {
            CourtPic = req.file.filename;
        }

        const updatedPlayer = await Player.findByIdAndUpdate(playerId, {
            PlayerName,
            code,
            team,
            role,
            basepoint,
            CourtPic
        }, { new: true });

        res.status(200).json({ message: "Player data updated successfully", updatedPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateteamData = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const { teamName, basepoint, budget } = req.body;

        // Check if image is uploaded
        let teamPic;
        if (req.file) {
            teamPic = req.file.filename;
        }

        const updatedTeam = await team.findByIdAndUpdate(teamId, {
            teamName,
            basepoint,
            budget,
            teamPic
        }, { new: true });

        res.status(200).json({ message: "Team data updated successfully", updatedTeam });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deletePlayerData = async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const deletedPlayer = await Player.findByIdAndDelete(playerId);

        if (!deletedPlayer) {
            return res.status(404).json({ message: "Player not found" });
        }

        res.status(200).json({ message: "Player deleted successfully", deletedPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteteamData = async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const deletedTeam = await team.findByIdAndDelete(teamId);

        if (!deletedTeam) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json({ message: "Team deleted successfully", deletedTeam });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addPlayerData, updatePlayerData, deletePlayerData, addteamData, deleteteamData, updateteamData };
