/**
 * Online orders are only available from 9:00 to 22:00.
 */
export function isWorkingHours() {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours() + 4;
    return currentHour >= 9 && currentHour < 22;
}
