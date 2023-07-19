const express= require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const mongoose=require('mongoose');

const app=express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/api",{
    useNewUrlParser:true
});

const articleschema={
    title:String,
    desc:String
};

const Article=mongoose.model("items",articleschema);
//get using the studio 3t
app.get("/articles",function(req,res){
    Article.find().then((results) => {
        res.send(results);
      }).catch((error) => {
        console.log(error);
      });
});
//post using the postman
app.post("/articles",function(req,res){
      const element1= new Article({
        title:req.body.title,
        desc: req.body.desc
      });
      element1.save();
   
});
//to delete the all record
app.delete("/articles",function(req,res){
     Article.deleteMany().then(() => {
        res.send("deleted");
      }).catch((error) => {
        res.send(error);
      });
});
//to get an specific request
app.get("/articles/:articleTitle",function(req,res){
    Article.findOne({title:req.params.articleTitle}).then((results) => {
        res.send(results);
      }).catch((error) => {
        console.log(error);
      });
});

//put opearations on specific record

app.put("/articles/:articleTitle", function(req, res) {
  Article.updateMany(
    { title: req.params.articleTitle },
     { title: req.body.title, desc: req.body.desc } 
  )
    .then((result) => {
      res.send("Updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});
//patch methoda
app.patch("/articles/:articleTitle",function(req,res){
  Article.updateOne(
    {title:req.params.articleTitle},
    {$set:{desc:req.body.desc}}
  ) .then((result) => {
    res.send("Updated successfully");
  })
  .catch((error) => {
    console.log(error);
  });
});

//to delete a specific record from the systems..
app.delete("/articles/:articleTitle",function(req,res){
      Article.deleteOne({title:req.params.articleTitle} ) .then((result) => {
        res.send("Updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});