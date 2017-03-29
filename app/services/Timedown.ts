export interface TimedownCallback {
  onInterval(isFinished: boolean, curtimes: number);
}
export class Timedown {
  private curtimes = 0;
  private maxtimes = 0;
  private intervalMillis = 0;
  private callback: TimedownCallback;
  private intervalId: number = 0;

  constructor(maxtimes: number, intervalMillis: number, callback: TimedownCallback) {
    this.maxtimes = maxtimes;
    this.intervalMillis = intervalMillis;
    this.callback = callback;
    this.curtimes = maxtimes;
  }

  start(): void {
    var thizz = this;
    var id = window.setInterval(function () {
      var isFinished = false;
      //  console.log("----------------" + id + "/" + thizz.intervalId + "/" + thizz.curtimes);
      if (thizz.curtimes <= 0) {
        window.clearInterval(thizz.intervalId);
        isFinished = true;
      } else {
        isFinished = false;
      }

      if (thizz.callback != null) {
        thizz.callback.onInterval(isFinished, thizz.curtimes);
      }

      thizz.curtimes = thizz.curtimes - 1;
    }, this.intervalMillis);
    thizz.intervalId = id;
  }

  stop(): void {
    window.clearInterval(this.intervalId);
  }

}
