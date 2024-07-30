import { useTranslations } from "next-intl";
import { ActionIcon, Menu, Divider } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { Link } from "@/navigation";
import { useSessionStore } from "@/providers";

export default function ProfileMenu() {
  const t = useTranslations("common.Header.ProfileMenu");
  const session = useSessionStore((state) => state.session);
  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="transparent" size="md">
          <IconUserCircle />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {session ? (
          <Menu.Item component={Link} href="/profile">
            {t("profile")}
          </Menu.Item>
        ) : (
          <>
            <Menu.Item component={Link} href="/login">
              {t("login")}
            </Menu.Item>
            <Menu.Item component={Link} href="/register">
              {t("register")}
            </Menu.Item>
          </>
        )}
        <Divider my="sm" />
        <Menu.Item component={Link} href="/help">
          {t("help")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
