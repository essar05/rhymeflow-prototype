export const getDeltaTime = (timeStart, timeEnd) => {
    const timeStartMS = timeStart.getMinutes() * 60 * 1000 + timeStart.getSeconds() * 1000 + timeStart.getMilliseconds();
    const timeEndMS = timeEnd.getMinutes() * 60 * 1000 + timeEnd.getSeconds() * 1000 + timeEnd.getMilliseconds();
    return timeEndMS - timeStartMS;
};