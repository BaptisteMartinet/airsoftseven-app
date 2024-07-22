"use client";

import type { NavLinkProps } from "@mantine/core";

import React from "react";
import { NavLink } from "@mantine/core";
import { Link as NavigationLink } from "@/navigation";

export interface LinkProps extends Omit<NavLinkProps, "href" | "component"> {
  href: string;
}

const Link = React.forwardRef(function Link_(props: LinkProps, ref: any) {
  return <NavLink ref={ref} component={NavigationLink} {...props} />;
});

export default Link;
