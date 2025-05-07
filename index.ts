import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import session from "express-session";
import methodOverride  from "method-override";
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

// Set Public Folder
app.use(express.static(`${__dirname}/public`));

// Set locals for prefixAdmin
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Client Routes
clientRoute(app);
adminRoute(app);
// app.use((req: Request, res: Response) => {
//   res.status(404).render("client/pages/errors/404");
// });

app.listen(port, () => {
  console.log("App listening on port", port);
});
