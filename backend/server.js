const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const userRoute = require("./routes/userRoute")




mongoose.connect(process.env.URI).then(()=>{
    console.log("connected successfully");

    app.listen(process.env.PORT || 8000, (err) => {
        if(err) {
            console.log(err);
        }else{
        console.log("running successfully at", process.env.PORT )
        }
    });

}).catch((error) =>{
    console.log("error", error);
}); 

app.use(userRoute);



