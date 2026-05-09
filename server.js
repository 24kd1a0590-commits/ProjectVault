const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// CONNECT TO MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/KnowledgeVaultDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});


// CREATE SCHEMA
const noteSchema = new mongoose.Schema({

    title: String,

    content: String,

    tags: [String],

    type: String,

    updated: {
        type: Date,
        default: Date.now
    }

});


// COLLECTION
const Note = mongoose.model("ProjectVault", noteSchema);



// SAVE NOTE API
app.post("/notes", async (req, res) => {

    try {

        const note = new Note(req.body);

        await note.save();

        res.json({
            message: "Note Saved Successfully",
            note
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



// GET NOTES API
app.get("/notes", async (req, res) => {

    try {

        const notes = await Note.find();

        res.json(notes);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



// SERVER
app.listen(5000, () => {

    console.log("Server Running on Port 5000");

});