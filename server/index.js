const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoutes = require("./routes/Contact");

const database = require("./config/database");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const {cloudinaryConnect} = require("./config/cloudinary");

const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

//db connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser()); 

app.use(cors({
    origin:"http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
}));

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)

//cloudinary connect
cloudinaryConnect();

//userRoutes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoutes);



//def route

app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"server is up & running..."
    })
})

app.listen(PORT, () => {
   console.log(`App is running at port:${PORT}`);
})