const mongoose= require("mongoose");

const studentSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phoneno:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  confirmpassword:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
 
})

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;