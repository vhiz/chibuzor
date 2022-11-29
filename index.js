const express = require('express')
const app = express()
const bodyParser = require('body-parser');

require('dotenv/config')

app.use(express.static(__dirname + '/public'))
app.set("view engine", "ejs");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res)=>{
    res.render('home portfolio')
})

app.post('/', (req, res)=>{
    res.render('home portfolio')
})

app.get('/about', (req, res)=>{
    res.render('about us portfolio')
})

app.get('/services', (req, res)=>{
    res.render('services')
})

app.get('/contact', (req, res)=>{
    res.render('contact us portfolio')
})

app.get('/profile', (req,res)=>{
    res.render('my profile')
})

const nodemailer = require('nodemailer')
require('dotenv/config')


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    },
    tls: {
        rejectUnauthorized:false
    }
})


app.post('/email', (req, res)=>{

    const name  = req.body.name
    const email = req.body.email
    const number = req.body.number
    const subject = req.body.subject
    try {
        var mailoptions = {
            from: `${email} sent you a message`,
            to: 'ofoegbuchibuzor5@gmail.com',
            subject:`message from ${name}`,
            html:`<p><b>${subject}</p><p> my number: ${number}</b></p> `
        }

        transporter.sendMail(mailoptions, (error, message)=>{
            if(error){
                console.log(error)
            }else{
                console.log(message)
            }
        })
        res.redirect('/')
    } catch (error) {
        res.status(400).send('error')
    }
})

const Port = process.env.PORT || 3008
app.listen(Port, ()=>{
    console.log(`${Port}`)
})