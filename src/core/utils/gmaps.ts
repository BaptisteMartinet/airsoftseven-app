const GoogleMapsBaseURL = "https://www.google.com";

export function genGmapsLocationLink({ lat, lng }: { lat: number; lng: number }) {
  const url = new URL(`/maps/place/${lat},${lng}`, GoogleMapsBaseURL);
  return url.href;
}
