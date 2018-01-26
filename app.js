var express = require("express"),

app = express();
var bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.sendFile("index.html");
})

app.use("/api/todos",todoRoutes);

app.listen(3000, function(){
    console.log("app is running on port 3000");
})