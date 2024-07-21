import { AppShell } from "@components/common";
import Hero from "./Hero";
import Faq from "./Faq";
import Team from "./Team";

export default function Home() {
  return (
    <AppShell>
      <Hero />
      <Faq />
      <Team />
    </AppShell>
  );
}
