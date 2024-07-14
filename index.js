import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import route from './router/Upload.router.js';
const app = express();
const URL = "mongodb://127.0.0.1:27017/multer-2";
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));

app.use('/api', route);