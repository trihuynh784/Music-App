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
const auth_route_1 = __importDefault(require("./auth.route"));
const account_route_1 = __importDefault(require("./account.route"));
const role_route_1 = __importDefault(require("./role.route"));
const auth_middleware_1 = require("../../middlewares/admin/auth.middleware");
const adminRoute = (app) => {
    const PATH_ADMIN = system_1.systemConfig.prefixAdmin;
    app.use(`/${PATH_ADMIN}/dashboard`, auth_middleware_1.requireAuth, dashboard_route_1.default);
    app.use(`/${PATH_ADMIN}/topics`, auth_middleware_1.requireAuth, topic_route_1.default);
    app.use(`/${PATH_ADMIN}/songs`, auth_middleware_1.requireAuth, song_route_1.default);
    app.use(`/${PATH_ADMIN}/upload`, auth_middleware_1.requireAuth, upload_route_1.default);
    app.use(`/${PATH_ADMIN}/singers`, auth_middleware_1.requireAuth, singer_route_1.default);
    app.use(`/${PATH_ADMIN}/accounts`, auth_middleware_1.requireAuth, account_route_1.default);
    app.use(`/${PATH_ADMIN}/roles`, auth_middleware_1.requireAuth, role_route_1.default);
    app.use(`/${PATH_ADMIN}`, auth_route_1.default);
};
exports.default = adminRoute;
