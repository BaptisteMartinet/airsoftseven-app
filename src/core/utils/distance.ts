export const MetersToMilesRatio = 1.609;

export function convertKilometersToMiles(meters: number) {
  return meters / MetersToMilesRatio;
}
