const Express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser")

const RobotManager = require("./modules/Robot")
module.exports = class App {
  constructor() {
    this.app = Express();
    this.deployConfigs();
    this.deployPaths();
    this.deployPortListener();

    this.robot = new RobotManager();
  }

  deployConfigs() {
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    this.app.use(bodyParser.json());
    this.app.set("view engine", "ejs");
    this.app.set("views", __dirname + "/views");
  }
  deployPaths() {
    // this.app.use((...a) => {

    // });
    this.app.get("/*/", (req, res) => {
      try {
        let path = req.path.slice(1, req.path.length);
        path.length > 0 && (path += "/");
        res.render(path + "index");
      } catch (error) {
        console.log("error", error);
        res.status(404);
        res.end();
      }
    });
    this.app.post("/api", (req, res) => {
        const {type, delay} = req.body

        if(type == "start") this.robot.start(delay)
        if(type == "stop") this.robot.stop()

        
    });
  }

  deployPortListener(port = 3000) {
    this.app.listen(port, () => {
      console.log("Servideor iniciado");
    });
  }
};
