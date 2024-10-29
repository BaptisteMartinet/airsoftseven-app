export const Millisecond = 1;
export const Second = 1000 * Millisecond;
export const Minute = 60 * Second;
export const Hour = 60 * Minute;
export const Day = 24 * Hour;


export function adjustTimestampToTimezone(timestamp: number, tzOffset: number) {
  const currentTzOffset = new Date().getTimezoneOffset();
  const offsetMs = (currentTzOffset - tzOffset) * Minute;
  return timestamp + offsetMs;
}
