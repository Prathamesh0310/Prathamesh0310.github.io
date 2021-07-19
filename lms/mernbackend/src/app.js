const express = require("express");
const app= express();
const port = process.env.PORT || 3000;
const path=require("path");
const hbs= require("hbs");

const Register = require("./models/registers");


// importng the Schema For tasks
const  Task  = require('./models/task');

// using static files
app.use(express.static("./views"));




require("./db/conn");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


 app.use(express.json());
 app.use(express.urlencoded({extended:false}));

 app.use(express.static(static_path));
 
 app.set("view engine","ejs");
 app.set("views",template_path);
 hbs.registerPartials(partials_path);
 

app.get("/",(req,res)=>{
  res.render("login");
});

app.get("/register",(req,res)=>{
  res.render("register");
});
app.get("/courses",(req,res)=>{
  res.render("courses");
});
app.get("/index",(req,res)=>{
  res.render("index");
});


 



app.post("/register", async (req,res)=>{
  try{
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if(password === cpassword){
      const registerStudent = new Register({

          name:req.body.name,
          username:req.body.username,
          email:req.body.email,
          phoneno:req.body.phoneno,
          password:req.body.password,
          confirmpassword:req.body.confirmpassword,
          gender:req.body.gender

      })

      const registered = await registerStudent.save();
      res.status(201).render("index");
    }else{
      res.send("Passwords are not matching")
    }


  }catch(error){
    res.status(400).send(error);
  }
});


app.post("/login", async(req,res) =>{
  try{
    
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email});

    if(useremail.password === password){
      res.status(201).render("index");
      
    }else{
      res.send("Invalid Login Details");
    }

  } catch(error){

    res.status(400).send("Invalid Login Details");

  }
})

app.get('/dashboard',function(req,res){
  Register.find({},function(err,register){
    if(err)
    console.log('Error in Displaying Details');
    else
    res.render("dashboard",{register},)
  })
})

app.get('/tasks', function(req, res){
  Task.find({}, function(err, task){
      if(err){
          console.log('Error in fetching tasks from db');
          return;
      }

      return res.render('tasks', {
          tittle: "Task Manager",
          task: task
      });
  }
)});

app.post('/create-task', function(req, res){
  //  console.log("Creating Task");
    
    Task.create({
        description: req.body.description,
        completed: req.body.completed,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        //console.log(newtask);
        return res.redirect('back');

    });
});

app.get('/delete-task', function(req, res){
  // get the id from query
  var id = req.query;

  // checking the number of tasks selected to delete
  var count = Object.keys(id).length;
  for(let i=0; i < count ; i++){
      
      // finding and deleting tasks from the DB one by one using id
      Task.findByIdAndDelete(Object.keys(id)[i], function(err){
      if(err){
          console.log('error in deleting task');
          }
      })
  }
  return res.redirect('back'); 
});

app.post("/logout",(req,res)=>{
  res.render("login");
});

app.listen(port,()=>{
  console.log(`server is running at port no ${port}`);
})
