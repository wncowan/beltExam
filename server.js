var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/belt/dist/belt'));
mongoose.connect('mongodb://localhost/beltexam');

var PetSchema = new mongoose.Schema({
    name: {type: String, trim:true, unique: [true, "can't have duplicate names"], required: [true, "pet must have a name"], minlength: [3, "name must be longer than 3"]},
    type: {type: String, trim:true, required: [true, "pet must have a type"], minlength: [3, "type must be longer than 3"]},
    description: {type: String, trim: true, required: [true, "pet must have a description"], minlength: [3, "description must be longer than 3"]},
    skillOne: {type: String, trim: true},
    skillTwo: {type: String, trim: true},
    skillThree: {type: String, trim: true},
    likes: {type: Number}
},{ timestamps: true})

mongoose.model('Pet', PetSchema);
var Pet = mongoose.model("Pet");

app.get('/api/getPet', function(req,res){
    Pet.find({}, function(err,pet){
        if(err){
            console.log('problem',err);
        }
        else {
            res.json({message: "Succesful", data: pet});  
        }
    })
});
app.get('/api/getPet/:id', function(req,res){
    id = req.params.id;
    Pet.findById(id,function(err,pet){
        if(err){
            console.log('problem', err);
        }
        else{
            res.json({message: "success", data: pet});
        }
    })
});

app.post('/api/newPet/', function(req,res){
    var pet = new Pet(req.body);
    console.log('here is the new product', req.body);
    pet.save(function(err){
        if(err){
            console.log('problem at post', err);
        }
        else{
            console.log("succesfful creation");
            res.json({message: "success post"})
        }
    })
})
app.put('/api/likePet/:id', function(req,res){
    id = req.params.id
    console.log('here is the likes', req.body)
    Pet.findByIdAndUpdate(id, req.body, function(err,pet){
        if(err){
            console.log('problem', err);
        }
        else {
            // console.log("req.body");
            // console.log(req.body);
            console.log("we've updated the product", pet)
            res.json({data: pet});
        }
    })
})
app.delete('/api/adoptPet/:id', function(req,res){
    id = req.params.id;
    Pet.findByIdAndRemove(id, function(err,pet){
        if(err){
            console.log('problem', err);
        }
        else{
            res.json({message: "success"})
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./belt/dist/belt/index.html"))
  });

app.listen(8000, function(){
    console.log("listening on port 8000");
});