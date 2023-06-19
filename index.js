const express = require("express");
const app =  express();

require("dotenv").config();
const PORT = process.env.PORT || 6000;

//setting up middlewares
app.use(express.json());
const fileupload = require("express-fileupload");

app.use(fileupload({
    useTempFiles:true,
	tempFileDir:"/tmp",
}))

const cors = require("cors");
app.use(
	cors({
		origin:"https://main--jolly-snickerdoodle-2eafd0.netlify.app",
		credentials:true,
	})
);

//mounting routes 
//auth routes
const userRoutes = require("./routes/user");
app.use("/api/v1/auth",userRoutes);
//main routes
const mainroutes = require("./routes/mainroutes");
app.use("/api/v1/user",mainroutes);
//post routes 
const postRoutes = require("./routes/postRoutes");
app.use("/api/v1/post",postRoutes);
//searchroutes
const searchRoutes = require("./routes/searchRoute");
app.use("/api/v1/search",searchRoutes);
//db connection
const dbConnect = require("./config/database");
dbConnect();
//cloud connection
const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect();
//creating app
app.listen(PORT,()=>{
    console.log(`app listening at port ${PORT}`);
})
