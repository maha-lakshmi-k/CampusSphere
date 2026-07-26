const express=require("express");
const cors=require("cors");
const authRoutes=require("./routes/authRoutes");
const noticeRoutes=require("./routes/noticeRoutes");
const submissionRoutes=require("./routes/submissionRoutes");
const assignmentRoutes = require(
    "./routes/assignmentRoutes"
);
require("dotenv").config();

const pool=require("./config/db");

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/submissions",submissionRoutes);
app.use("/api/assignments",assignmentRoutes);
// require("dotenv").config();

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);

app.get("/",(req,res)=>{

    res.send("CampusSphere API Running");

});


const PORT=5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});



pool.connect()
.then(()=>{

    console.log("Database Connected Successfully.");

})
.catch((error)=>{

    console.log(error.message);

});