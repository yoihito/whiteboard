var Perf = {
  frames: 0,
  startTime: null,

  startProfiler: function() {
    this.startTime = new Date();
    setInterval((function(that) {
      return function () {
        var stat = that.getMeasurement.call(that);
        console.log(stat);
      }
    })(this), 1000);
  },

  getMeasurement: function() {
    var stopTime = new Date();
    var fps = this.frames;
    this.frames = 0;
    this.startTime = stopTime;
    return fps;
  },

  stopProfiler: function() {

  }
};

module.exports = Perf;
