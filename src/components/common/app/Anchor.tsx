"use client";

import type { PropsWithChildren } from 'react';
import type { AnchorProps as MantineAnchorProps } from "@mantine/core";

import React from "react";
import { Anchor as MantineAnchor } from "@mantine/core";
import { Link } from "@/navigation";

export interface AnchorProps
  extends Omit<MantineAnchorProps, "href" | "component"> {
  href: string;
}

const Anchor = React.forwardRef(function Anchor_(props: PropsWithChildren<AnchorProps>, ref: any) {
  return <MantineAnchor ref={ref} component={Link} {...props}/>;
});

export default Anchor;
