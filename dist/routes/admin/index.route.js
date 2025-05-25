"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const system_1 = require("../../config/system");
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const topic_route_1 = __importDefault(require("./topic.route"));
const song_route_1 = __importDefault(require("./song.route"));
const upload_route_1 = __importDefault(require("./upload.route"));
const singer_route_1 = __importDefault(require("./singer.route"));
const adminRoute = (app) => {
    const PATH_ADMIN = system_1.systemConfig.prefixAdmin;
    app.use(`/${PATH_ADMIN}/dashboard`, dashboard_route_1.default);
    app.use(`/${PATH_ADMIN}/topics`, topic_route_1.default);
    app.use(`/${PATH_ADMIN}/songs`, song_route_1.default);
    app.use(`/${PATH_ADMIN}/upload`, upload_route_1.default);
    app.use(`/${PATH_ADMIN}/singers`, singer_route_1.default);
};
exports.default = adminRoute;
