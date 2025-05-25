import { Express } from "express";
import { systemConfig } from "../../config/system";
import dashboardRoutes from "./dashboard.route";
import topicRoutes from "./topic.route";
import songRoutes from "./song.route";
import uploadRoutes from "./upload.route";

const adminRoute = (app: Express) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`/${PATH_ADMIN}/dashboard`, dashboardRoutes);

  app.use(`/${PATH_ADMIN}/topics`, topicRoutes);

  app.use(`/${PATH_ADMIN}/songs`, songRoutes);

  app.use(`/${PATH_ADMIN}/upload`, uploadRoutes);
};

export default adminRoute;
