const express = require("express"); //express package required
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const {json}=require("express")
const Register= require("./models/registers");
const { Await } = require("react-router-dom");
const async = require("hbs/lib/async");
//host project so that code no is generated
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.use(express.static())
app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", template_path); //changing the path of views
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
  res.render("index.hbs"); 
  //added index.hbs as default
});
app.get("/register", (req, res) => {
  res.render("register.hbs");
});
app.get("/login", (req, res) => {
//   res.render("login.hbs");
res.render("login.hbs");
})
//create a new user in database
app.post("/register", (req, res) => {
  //async function
  try {
    //name attribute
    // console.log(req.body.firstname)
    //  res.send(req.body.firstname)
  const password=req.body.password
  const cpassword=req.body.confirmpassword
  if (password===cpassword)
  {
    //if both the passwords are same we will proceed to get the data 
        const registerClient=new Register({
            firstname:req.body.firstname,
    
            lastname:req.body.lastname,
        
            email:req.body.email,
           
            phonenumber:req.body.phonenumber,
          
            password:req.body.password,
           
            confirmpassword:req.body.confirmpassword
     
        })
  // saving the retrieved data 
 const registered=  registerClient.save();//returns a promise
res.status(201).render("index")
  }
else{
    res.send("Password does not match")
}

  } catch (error) {
    res.status(400).send(error);
  }
});
//login check
app.post("/login", async(req, res) => {
    //   res.render("login.hbs");
    try{
     const email=req.body.email;
     const password=req.body.password;
    //  console.log(`${email}+${password}`)
   const user_email= await Register.findOne({email:email})
//    res.send(user_email)
if (user_email.password===password)
{
    res.status(201).render("index")
}
else{
    // res.status("password does not match")
}
      
    }
    catch (error)
    {
    res.status(400).send("invalid login details")
    }
    })


// //server listen
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
