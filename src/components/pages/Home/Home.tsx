import { PageLayout } from "@components/common";
import Hero from "./Hero";
import Faq from "./Faq";
import Stats from './Stats';

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Faq />
      <Stats />
    </PageLayout>
  );
}
