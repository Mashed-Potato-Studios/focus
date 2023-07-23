import { setWordGoal, setTimeGoal } from '../utils/goalSetting'
import { startTracking, endTracking, getTrackingTime } from "../utils/timeTracking";
import { WordTracking } from "../plugins/wordTracking";

const wordTracker = WordTracking.getInstance();
export const focusing = {
    setWordGoal,
    setTimeGoal,
    startTracking,
    endTracking,
    getTrackingTime,
    wordTracker,
    WordTracking
}