import { Express } from "express";
import { systemConfig } from "../../config/system";
import dashboardRoutes from "./dashboard.route";
import topicRoutes from "./topic.route";
import songRoutes from "./song.route";
import uploadRoutes from "./upload.route";
import singerRoutes from "./singer.route";
import authRoutes from "./auth.route";
import accountRoutes from "./account.route";
import roleRoutes from "./role.route";

import { requireAuth } from "../../middlewares/admin/auth.middleware";

const adminRoute = (app: Express) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`/${PATH_ADMIN}/dashboard`, requireAuth, dashboardRoutes);

  app.use(`/${PATH_ADMIN}/topics`, requireAuth, topicRoutes);

  app.use(`/${PATH_ADMIN}/songs`, requireAuth, songRoutes);

  app.use(`/${PATH_ADMIN}/upload`, requireAuth, uploadRoutes);

  app.use(`/${PATH_ADMIN}/singers`, requireAuth, singerRoutes);

  app.use(`/${PATH_ADMIN}/accounts`, requireAuth, accountRoutes);

  app.use(`/${PATH_ADMIN}/roles`, requireAuth, roleRoutes);

  app.use(`/${PATH_ADMIN}`, authRoutes);
};

export default adminRoute;
