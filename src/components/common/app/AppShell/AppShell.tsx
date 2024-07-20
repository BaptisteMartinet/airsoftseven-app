import {
  AppShell,
  AppShellHeader,
  AppShellFooter,
  AppShellMain,
} from "@mantine/core";
import { Header, Footer } from "@components/common";

export default function AppSheel(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <AppShell header={{ height: 60 }}>
      <AppShellHeader>
        <Header />
      </AppShellHeader>
      <AppShellMain>{children}</AppShellMain>
      <AppShellFooter>
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
}
