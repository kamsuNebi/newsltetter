const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/5fdeeaa3e4";
  const option = {
    method: "POST",
    auth: "adnan1:5d8ea63309a0f757a0744db8dd30a57a-us13",
  };

  const request = https.request(url, option, function (responce) {
    responce.on("data", function (data) {
      console.log(JSON.parse(data));

      if (responce.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });

  request.write(jsonData);
  request.end();

  //   res.write(fName);
  //   res.write(lName);
  //   res.write(email);
  //   res.send();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT, function () {
  console.log("Server is running on port 3000");
});

// API KEY
// 5d8ea63309a0f757a0744db8dd30a57a-us13

// LIST ID
// 5fdeeaa3e4

// LIST ID
// 5fdeeaa3e4
