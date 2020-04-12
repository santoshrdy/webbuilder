import moment = require("moment");
import { Duration } from "moment";

export class Utils {

  public static getTimeLeft(sourceDate: Date): Duration {
    const currentTime = new Date();
    const ms = moment(sourceDate, "DD/MM/YYYY HH:mm:ss").diff(moment(currentTime, "DD/MM/YYYY HH:mm:ss"));
    return moment.duration(ms);
  }

  public static getTimeLeftInStringFormat(sourceDate: Date): string {
    const durationLeft = Utils.getTimeLeft(sourceDate);
    let completedString = "";
    if (durationLeft.years() > 0) {
      completedString += durationLeft.years() + " years ";
    }
    if (durationLeft.months() > 0) {
      completedString += durationLeft.months() + " months ";
    }

    if (durationLeft.days() > 0) {
      completedString += durationLeft.days() + " days ";
    }
    if (durationLeft.hours() > 0) {
      completedString += durationLeft.hours() + " hours ";
    }
    if (durationLeft.minutes() > 0) {
      completedString += durationLeft.minutes() + " mins ";
    }
    if (durationLeft.minutes() < 5) {
      return " < 5 mins";
    }
    return completedString;
  }
}
