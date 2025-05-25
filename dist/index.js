"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_flash_1 = __importDefault(require("express-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const database = __importStar(require("./config/database"));
const index_route_1 = __importDefault(require("./routes/client/index.route"));
const index_route_2 = __importDefault(require("./routes/admin/index.route"));
const system_1 = require("./config/system");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, method_override_1.default)('_method'));
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)("1230askldSDHF1298YFDS"));
app.use((0, express_session_1.default)({
    secret: "keyboard cat",
    cookie: { maxAge: 60000 },
}));
app.use((0, express_flash_1.default)());
database.connect();
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use('/tinymce', express_1.default.static(path_1.default.join(__dirname, 'node_modules', 'tinymce')));
app.use(express_1.default.static(`${__dirname}/public`));
app.locals.prefixAdmin = system_1.systemConfig.prefixAdmin;
app.locals.moment = moment_1.default;
(0, index_route_1.default)(app);
(0, index_route_2.default)(app);
app.use((req, res) => {
    res.status(404).render("client/pages/errors/404");
});
const server = http_1.default.createServer(app);
server.setTimeout(300000);
app.listen(port, () => {
    console.log("App listening on port", port);
});
