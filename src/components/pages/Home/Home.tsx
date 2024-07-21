import { PageLayout } from "@components/common";
import Hero from "./Hero";
import Faq from "./Faq";
import Team from "./Team";

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Faq />
      <Team />
    </PageLayout>
  );
}
