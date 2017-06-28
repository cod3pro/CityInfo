var mongoose = require("mongoose");

//City info schema
var cityinfoSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});


module.exports = mongoose.model("cityInfo", cityinfoSchema);


