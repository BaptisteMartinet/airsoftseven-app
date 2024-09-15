/* eslint-disable @next/next/no-img-element */

export interface GmapsStaticImageURLArgs {
  width: number;
  height: number;
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers?: Array<{ position: google.maps.LatLngLiteral }>;
}

function makeGmapsStaticImageURL(args: GmapsStaticImageURLArgs) {
  const { width, height, center, zoom, markers } = args;
  const base = "https://maps.googleapis.com/maps/api/staticmap";
  const url = new URL(base);
  url.searchParams.append("key", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);
  url.searchParams.append("size", `${width}x${height}`);
  url.searchParams.append("center", `${center.lat},${center.lng}`);
  url.searchParams.append("zoom", zoom.toString());
  if (markers)
    url.searchParams.append(
      "markers",
      markers
        .map((marker) => `${marker.position.lat},${marker.position.lng}`)
        .join("|")
    );
  return url.href;
}

export interface StaticMapProps extends GmapsStaticImageURLArgs {}

export default function StaticMap(props: StaticMapProps) {
  return (
    <img
      width="100%"
      height="100%"
      src={makeGmapsStaticImageURL(props)}
      style={{ objectFit: 'cover' }}
      alt="Map"
    />
  );
}
