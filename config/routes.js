const authController = require("../controllers/authController");
const carController = require("../controllers/carController");
const homeController = require("../controllers/homeController");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
  app.use('/', homeController)
  app.use('/auth', authController);
  app.use('/car', hasUser(), carController)
};