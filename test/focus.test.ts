import {test, describe, expect} from "vitest";
import { WordTracking } from "../src/plugins/wordTracking";
import { setTimeGoal, setWordGoal } from "../src/utils/goalSetting";
import { endTracking, getTrackingTime, startTracking } from "../src/utils/timeTracking";

describe("WordTracking", () => {
    test("should track words", (): number => {
            const wordTracking = new WordTracking();
            const wordTotal = wordTracking.countWords("hello this is a test");
            console.log("Word total: ", wordTotal);
            return wordTotal
    }
    )
    test("setWordGoal", () => {
        // @ts-ignore
        expect(setWordGoal(100)).toBe(undefined)
    })
    test("setTimeGoal", () => {
        // @ts-ignore
        expect(setTimeGoal(100)).toBe(undefined)
    })

})