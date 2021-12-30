const express = require("express");
const app = express();

const port = 8000;

app.get("/signup", (req,res) => res.send("This is Signup Route") );


const isLoggedin = (req, res, next) => {
   console.log("isLoggedin Works Bro.");
   next();
};

const Login = (req,res) => {
   res.send("This is Login Route Bro");

};

app.get("/login", isLoggedin , Login);



app.get("/", (req,res) => {
   return res.send("You are visiting Home Page")
} );
app.get("/signout", (req,res) => {
   return res.send("You are Signed Out ")
} );

app.get("/hitesh", (req,res) => {
    return res.send("Hitesh Uses Instagram");
});


const isAdmin = (req, res, next) => {
   console.log("isAdmin is Running");
   next();
};


const admin = (req,res) => {
   res.send("This is admin Dashboard");

};

app.get("/admin", isLoggedin, isAdmin,  admin)    // isAdmin = Middleware




app.listen(port, () => {
    console.log("Server is up and running...");
}); 