// @ts-ignore
let startTime, endTime;

export function startTracking() {
  startTime = new Date();
}

export function endTracking() {
    endTime = new Date();
}

export function getTrackingTime() {
    // @ts-ignore
    const timeDiff = endTime.getTime() - startTime.getTime();
    return timeDiff / 1000;
}