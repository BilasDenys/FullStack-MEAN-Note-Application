const Notes = require('../model/Notes');

module.exports.get = async(req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again later.",
            errors: error.message
        })
    }
}
module.exports.create = async(req, res) => {
    try {
        const note = await new Notes({
            title: req.body.note,
            user: req.user.id
        });

      await note.save();

        res.status(201).json(note);
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again later.",
            errors: error.message
        })
    }
}
module.exports.update = async(req, res) => {
    try {
        const {id} =  req.params;
        const note = await Notes.findOneAndUpdate({_id: id},{$set: req.body}, {new: true})
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again later.",
            errors: error.message
        })
    }
}
module.exports.remove = async(req, res) => {
    try {
        const {id} = req.params;
        const note = await Notes.deleteOne({_id: id});

        res.status(200).json(note);
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Try again later.",
            errors: error.message
        })
    }
}
