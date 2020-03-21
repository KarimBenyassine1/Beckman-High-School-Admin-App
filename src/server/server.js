const express = require('express');
const app = express();

const PORT = 6000;

const bodyParser= require('body-parser');
app.use(bodyParser.json())

const loginRoute = require('./login')

app.use('/login', loginRoute)


app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', async (req, res) =>{

    res.send("at Home")

})


app.post('/', async (req, res) =>{
    console.log(req.body)
})


app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});