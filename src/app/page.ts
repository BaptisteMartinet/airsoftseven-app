import { redirect } from "next/navigation";
import { DefaultLocale } from "../i18nConfig";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  redirect(`/${DefaultLocale}`);
}
