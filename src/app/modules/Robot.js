const robotjs = require("robotjs")

module.exports = class Robot {
  constructor() {
    this.interval 
  }
  start(delay) {
    this.interval = setInterval(async () => {
      robotjs.mouseClick();
    }, delay);
  }

  stop(){
    clearInterval(this.interval)
  }
};
