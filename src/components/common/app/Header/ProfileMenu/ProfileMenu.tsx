import { useTranslations } from "next-intl";
import { ActionIcon, Menu, Divider, Avatar, Box } from "@mantine/core";
import { useApolloClient } from "@apollo/client";
import { IconUserCircle } from "@tabler/icons-react";
import { handlePromiseWithToast } from "@/core/utils/promise";
import { Link } from "@/navigation";
import { useSessionStore } from "@/providers";
import { LogoutMutation } from "./api";

export default function ProfileMenu() {
  const t = useTranslations("common.Header.ProfileMenu");
  const t_shared = useTranslations("shared");
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const client = useApolloClient();

  const handleLogout = () => {
    const promise = client.mutate({ mutation: LogoutMutation });
    handlePromiseWithToast(promise, {
      onSuccess: () => setSession(null),
      errorMessage: t_shared("error"),
    });
  };

  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="transparent" size="md">
          {session ? (
            <Avatar name={session.user.username} radius="xl" />
          ) : (
            <IconUserCircle />
          )}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {session ? (
          <>
            <Menu.Item component={Link} href="/profile">
              {t("profile")}
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>{t("logout")}</Menu.Item>
          </>
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
