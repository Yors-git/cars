require('dotenv').config()
const express     = require('express'),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose');

const carsRoutes = require("./routes/cars-routes")

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	)
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
	next()
});

app.use("/api/cars", carsRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASEURL)
.then(()=>{
    console.log("Connected to DB!")
}).catch(err=>{
    console.log("ERROR:", err.message )
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, ()=>{
    console.log("System running!")
})

// mongoose
// 	.connect(
//     'mongodb+srv://Yors:Jorg0382@cluster0.bwxsv.mongodb.net/cars-api?retryWrites=true&w=majority',
// 		{
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 			useCreateIndex: true
// 		}
// 	)
// 	.then(() => {
//     const port = process.env.port || 5000
// 		app.listen(port, () => console.log("listening on port 5000"))
// 	})
// 	.catch((err) => {
// 		console.log(err)
// 	})
