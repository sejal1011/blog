//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const methodOverride=require('method-override');

const homeStartingContent = "This is our VITMAS Blog Website. Everybody is requested to post there technical blog on this website.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));
mongoose.connect("mongodb+srv://sejal:sejal1011@cluster0-nhcwz.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

//app.put('/posts/edit/:postId',function(req,res){
//  const post = new Post({
//    title: req.body.postTitle,
//    content: req.body.postBody
//  });
//
//
//  Post.findOneAndUpdate(  {_id:req.params.postId},
//    {title: req.body.postTitle, content: req.body.postBody},
//    {overwrite: true},
//    function(err){
//      if(!err){
//        res.send("Successfully updated the selected article.");
//      }
//    }
//  )
//  post.save(function(err){
//    if (err){
//        res.redirect("/");
//    }
//  });
//
//});

//MongoClient.connect("mongodb+srv://sejal:sejal1011@cluster0-nhcwz.mongodb.net/test?retryWrites=true&w=majority", function(err, db) 
//{
//  if (err) throw err;
//  var dbo = db.db("test");
//  var myquery = { address: "content" };
//  var newvalues = { $set: {name: "title", address: "" } };
//  dbo.collection("posts").updateOne(myquery, newvalues, function(err, res) 
// {
//    if (err) throw err;
//    console.log("1 document updated");
//    db.close();
//  });
//});
//app.post('/posts/edit/:postId',function(req,res){
//
//  const myData={
//    title:req.body.postTitle,
//    content:req.body.postBody
//
//  }
//  Post.findOneAndUpdate(req.params.id,myData,function(req,res){
//    if(err){
//      res.redirect('/'+ req.params.id);
//
//    }
//    else{
//      res.redirect('/');
//    }
//  });
//});
//
//app.get('/posts/edit/:postId',function(req,res){
//  Post.findById(req.params.id,function(err,post){
//    if(err){
//      console.log(err);
//      res.render('/');
//    }
//    else{
//      res.render('edit');
//
//    }
//  });
//});
app.get('/posts/delete/:postId',function(req,res){
  Post.findOneAndDelete(req.params.id,function(err,post){
    if(err){
      res.redirect('/');
    }
    else{
      res.redirect('/');
    }
  });
});


app.get("/compose", function(req, res){
  res.render("compose", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


// Set The Storage Engine



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
