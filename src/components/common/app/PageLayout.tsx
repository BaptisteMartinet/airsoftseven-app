import type { PropsWithChildren } from "react";

import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
