var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
});

//this function is not updated and does not work at the moment
app.post('/register', function (req, res) {
    console.log(req.body);
    console.log("recieved POST to /register");
    
    fs.readFile("./sample.json", function(err, data){
        var json = JSON.parse(data);
        console.log("Json:")
        console.log(json);

        var emails = json.filter(function(e){
            return e.email = req.body.email
        })
        console.log("emails:")
        console.log(emails);

        //only run this code if it does not exist in the DB
        json.push(req.body);
        fs.writeFile("./sample.json", JSON.stringify(json), function(err){
            if(err){
                return console.log(err)
            }
            console.log("successfully went through")
        });
    })
    
    res.sendStatus(200);
    res.end();

});

app.get("/register", function (req, res) {
    console.log("recieved GET to /register");
    res.sendStatus(200);
    res.end();
});

app.post('/verify-pending-account', function (req, res) {
    console.log(req.body);
    console.log("recieved POST to /verify-pending-account");

    fs.readFile("./VerifiedAccountDB.json", function(err, data){
        var json = JSON.parse(data);

        var index = false;
        var stringifiedBody = JSON.stringify(req.body);
        for (var i = 0; i < json.length; i++) {
            if (JSON.stringify(json[i]) === stringifiedBody) {
                console.log("equal at: " + i);
                index = true;
                break;
            }
        }

        console.log(index);
        if(!index){
            console.log(req.body);
            json.push(req.body);
            fs.writeFile("./VerifiedAccountDB.json", JSON.stringify(json), function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log("successfully added to VerifiedAccountDB.json")
            });
        } else {
            console.log("Failed to add new account to VerifiedAccountDB.json since it already exists in the file");
        }


    })

    res.sendStatus(200);

});

app.get("/pending-account-information", function(req, res){
    console.log("GET at /pending-account-information")
    fs.readFile("./AccountDB.json", function(err, data){
        console.log(JSON.parse(data));
        res.send(JSON.parse(data));
    })
})

app.get("/verified-account-information", function (req, res) {
    console.log("GET at /verified-account-information")
    fs.readFile("./VerifiedAccountDB.json", function (err, data) {
        console.log(JSON.parse(data));
        res.send(JSON.parse(data));
    })
})

//app.delete gave errors so I resorted to just using app.post
app.post("/delete-pending-account-information", function(req, res){
    console.log("POST at /delete-pending-account-information");

    fs.readFile("./AccountDB.json", function(err, data){
        var json = JSON.parse(data);

        //json.splice(json.indexOf(req.body), 1);
        //json.indexOf just does not work 
        //check https://stackoverflow.com/questions/35212947/js-array-indexof-not-working-with-objects for an explanation

        for(var i = 0; i < json.length; i++){
            if(JSON.stringify(json[i]) === JSON.stringify(req.body)){
                console.log("equal at: " + i);
                json.splice(i, 1);
                console.log(json);
                break;
            }
        }


        fs.writeFile("./AccountDB.json", JSON.stringify(json), function(err){
            if(err){ return console.log(err) }
            console.log("successfully deleted in /delete-pending-account-information");
        })
    })

    res.sendStatus(200);
    
})



app.listen(5000, function () {
    console.log("Started Server on PORT 5000");
})

/*
sample code to put into AccountDB.json if it breaks
DO NOT DELETE!

[
    {
                    "name": "Karim Benyassine",
                    "shortId": "12345",
                    "longId": "240012452",
                    "grade": "12"
    },
    {
                    "name": "Alex Rea",
                    "shortId": "67890",
                    "longId": "945982334",
                    "grade": "12"
    },
    {
                    "name": "Saim Ahmad",
                    "shortId": "94735",
                    "longId": "697711443",
                    "grade": "12"
    },
    {
                    "name": "Jay Ni",
                    "shortId": "67452",
                    "longId": "167379456",
                    "grade": "12"
    },
    {
                    "name": "Alex Pham",
                    "shortId": "72572",
                    "longId": "834223562",
                    "grade": "12"
    },
    {
                    "name": "Shehzad Mansuri",
                    "shortId": "08345",
                    "longId": "447237934",
                    "grade": "12"
    },
    {
                    "name": "Vincent Le",
                    "shortId": "07684",
                    "longId": "346583958",
                    "grade": "12"
    },
    {
                    "name": "Jimmy Jimmyson",
                    "shortId": "35876",
                    "longId": "123748468",
                    "grade": "12"
    },
    {
                    "name": "Timmy Timmyson",
                    "shortId": "98765",
                    "longId": "338357835",
                    "grade": "12"
    },
    {
                    "name": "Tommy Tommyson",
                    "shortId": "45678",
                    "longId": "757452383",
                    "grade": "12"
    },
    {
                    "name": "Bobby Bobbyson",
                    "shortId": "74532",
                    "longId": "876543345",
                    "grade": "12"
    },
    {
                    "name": "Jenny Jennyson",
                    "shortId": "24234",
                    "longId": "693855823",
                    "grade": "12"
    },
    {
                    "name": "Simp Simpson",
                    "shortId": "24884",
                    "longId": "125939449",
                    "grade": "12"
    },
    {
                    "name": "GRrr GRrson",
                    "shortId": "86434",
                    "longId": "264664264",
                    "grade": "12"
    },
    {
                    "name": "Tss Tsson",
                    "shortId": "85866",
                    "longId": "734353767",
                    "grade": "12"
    },
    {
                    "name": "Ahhh Ahhh",
                    "shortId": "63457",
                    "longId": "834674457",
                    "grade": "12"
    },
    {
                    "name": "Ehheehhh",
                    "shortId": "84534",
                    "longId": "987654736",
                    "grade": "12"
    },
    {
                    "name": "Oohohhohh",
                    "shortId": "75234",
                    "longId": "964683569",
                    "grade": "12"
    },
    {
                    "name": "Reeeeee",
                    "shortId": "23456",
                    "longId": "167379456",
                    "grade": "12"
    },
    {
                    "name": "Mannnnnn",
                    "shortId": "96457",
                    "longId": "123987685",
                    "grade": "12"
    },
    {
                    "name": "Boiii",
                    "shortId": "09876",
                    "longId": "447237934",
                    "grade": "12"
    },
    {
                    "name": "Duuuudde",
                    "shortId": "35785",
                    "longId": "387657946",
                    "grade": "12"
    }
]

*/