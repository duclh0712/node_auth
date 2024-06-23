const express = require("express");
const app = express();
const port = 3009;

// routes
const route = require('./routes')

// mongooes db
const db = require('./config/db')
db.connect()
// middleware
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

// view engine
const handlebars = require("express-handlebars");

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

route(app);



app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
