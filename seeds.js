var mongoose = require("mongoose"),
    cityInfo = require("./models/cityinfo"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Hollywood",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hollywood_Sign_%28Zuschnitt%29.jpg/1200px-Hollywood_Sign_%28Zuschnitt%29.jpg",
        description: "hile then-Disney chief Michael Eisner at first intended Hollywood Pictures to be a full-fledged studio, like Touchstone, in recent years its operations have been scaled back and its management has been merged with the flagship Walt Disney Pictures studio.The division iits most profitable film to date s own breakout hit The Sixth Sense, which grossed over $600 million worldwide upon its 1999 release."
    },
    {
        name: "Hollywood BLVD block 13",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Hollywood_neighborhood.JPG",
        description: "hile then-Disney chief Michael Eisner at first intended Hollywood Pictures to be a full-fledged studio, like Touchstone, in recent years its operations have been scaled back and its management has been merged with the flagship Walt Disney Pictures studio.The division iits most profitable film to date s own breakout hit The Sixth Sense, which grossed over $600 million worldwide upon its 1999 release."
    },
        {
        name: "This is another hollywood",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/HollywoodPictures.jpg/375px-HollywoodPictures.jpg",
        description: "hile then-Disney chief Michael Eisner at first intended Hollywood Pictures to be a full-fledged studio, like Touchstone, in recent years its operations have been scaled back and its management has been merged with the flagship Walt Disney Pictures studio.The division iits most profitable film to date s own breakout hit The Sixth Sense, which grossed over $600 million worldwide upon its 1999 release."
    },
]


function seedDB(){
    cityInfo.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed successfully!");
        
        data.forEach(function(seed){
            cityInfo.create(seed, function(err, seed){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a city info");
                    Comment.create({
                        text: "This is a comment",
                        author: "Borhan"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            seed.comments.push(comment);
                            seed.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
