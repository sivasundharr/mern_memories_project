import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routers/posts.js';
import userRoutes from './routers/user.js';


const app = express();
dotenv.config({path:'./config/.env'});
app.use(bodyParser.json({ limit : "30mb",extended : true}));
app.use(bodyParser.urlencoded({ limit : "30mb",extended : true}));

app.use(cors());

app.use('/posts',postRoutes);
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
  res.send("Hello siva memories project");
});

mongoose.connect(process.env.CONNECTION_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }).then(()=>console.log("DB connected"))
        .catch(err=>console.log(err));



const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`The server is Running on port: ${PORT}`));