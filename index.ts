import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import methodOverride  from "method-override";
import moment from "moment";
import path from "path";
import http from "http";
import * as database from "./config/database";
import clientRoute from "./routes/client/index.route";
import adminRoute from "./routes/admin/index.route";

import { systemConfig } from "./config/system";

// .env config
dotenv.config();

const app: Express = express();
const port: number = 3000;

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());
// parse application/json
app.use(bodyParser.json());

// Connect Flash
app.use(cookieParser("1230askldSDHF1298YFDS"));
app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

// Connect to database
database.connect();

// Set template engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// Set Public Folder
app.use(express.static(`${__dirname}/public`));

// Set locals variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// Client Routes
clientRoute(app);
adminRoute(app);
app.use((req: Request, res: Response) => {
  res.status(404).render("client/pages/errors/404");
});

// Tăng timeout server lên, ví dụ 5 phút (300000 ms)
const server = http.createServer(app);
server.setTimeout(300000);

app.listen(port, () => {
  console.log("App listening on port", port);
});