const mongoose=require("mongoose")

const employeeSchema= new mongoose.Schema({
    firstname:{
        type :String,
        required:true,
    },
    lastname:{
        type :String,
        required:true,
    },
    email:
    {
        type :String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        unique:true
    },
   password:{
    type:String,
  required:true
   },
   confirmpassword:{
    type:String,
  required:true
   }
})
//creating collection
const Register =new mongoose .model("Register",employeeSchema);
module.exports=Register;