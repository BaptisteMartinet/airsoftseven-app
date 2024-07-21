'use client'

import type { NavLinkProps } from "@mantine/core";

import { NavLink } from "@mantine/core";
import { Link as NavigationLink } from "@/navigation";

export interface LinkProps extends Omit<NavLinkProps, "href" | "component"> {
  href: string;
}

export default function Link(props: LinkProps) {
  return <NavLink component={NavigationLink} {...props} />;
}
