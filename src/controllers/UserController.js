const User = require("../models/User")
const jwt = require("jsonwebtoken");
const OTPModel = require("../models/OTPModel");
const SendEmailUtility = require("../utilities/SendEmailUtility");

exports.CreateUserProfile = async(req, res)=>{
    try {
        const reqBody = req.body;
        const data = await User.create(reqBody);
        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.UserLogin = async(req, res)=>{
    try {
        let reqBody = req.body;
        let data = await User.find(reqBody).count();
        if(data===1){
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: reqBody["email"]
            };
            let token = jwt.sign(Payload, "EmonArefin466");
            res.status(200).json({
                status: "Success",
                data: token
            });
        } else{
            res.status(404).json({
                status: "Fail",
                data: error.toString()
            })
        }
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.ReadUserProfile = async(req, res)=>{
    try {
        let email = req.headers["email"];
        let data = await User.find({email: email});
        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.UpdateUserProfile = async(req, res)=>{
    try {
        let email = req.headers["email"];
        let reqBody = req.body;
        let data = await User.updateOne({email: email}, reqBody);

        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};

exports.RecoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let EmailText="Your User ID Verification Code is ="+ OTPCode
    let EmailSubject="User Registration verification code"

    let result = await User.find({email:email}).count();
    if(result===1){
        await SendEmailUtility(email, EmailText, EmailSubject);
        await OTPModel.create({email: email, otp: OTPCode });
        res.status(200).json({status:"success",data:"6 Digit Verification Code has been send"})
    }
    else{
        res.status(401).json({status:"fail",data:"No User Found"})
    }
};

exports.RecoverVerifyOTP = async(req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status=0;
    let statusUpdate=1;

    let result = await OTPModel.find({email: email, otp: OTPCode, status: status}).count();
    if(result===1){
        await OTPModel.updateOne({email: email, otp: OTPCode, status: status}, {status: statusUpdate});
        res.status(200).json({status:"success",data:"Verification Completed"})
    }
    else{
        res.status(404).json({status:"fail",data:"Invalid Verification"})
    }
};

exports.RecoverResetPass=async (req,res)=>{

    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass =  req.body['password'];
    let statusUpdate=1;

    let result= await OTPModel.find({email:email,otp:OTPCode,status:statusUpdate}).count();
    if(result===1){
        await User.updateOne({email: email}, {password:NewPass})
        res.status(200).json({status:"success",data:"Password Reset Success"})
    }
    else{
        res.status(404).json({status:"fail",data:"Invalid Verification"})
    }
};

exports.DeleteUserProfile = async(req, res)=>{
    try {
        let email = req.headers["email"];
        let reqBody = req.body;
        let data = await User.deleteOne({email: email}, reqBody);

        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            data: error.toString()
        })
    }
};