import { Express } from "express";
import { systemConfig } from "../../config/system";
import dashboardRoutes from "./dashboard.route";
import topicRoutes from "./topic.route";

const adminRoute = (app: Express) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`/${PATH_ADMIN}/dashboard`, dashboardRoutes);

  app.use(`/${PATH_ADMIN}/topics`, topicRoutes);
};

export default adminRoute;
