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

mongoose
	.connect(
    process.env.DATABASEURL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	)
	.then(() => {
    const port = process.env.port || 5000
		app.listen(port, () => console.log("listening on port 5000"))
	})
	.catch((err) => {
		console.log(err)
	})
