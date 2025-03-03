import React from "react";
import type { ComponentProps } from "react";
import { Link as LinkDOM } from "react-router-dom";

type LinkProps = ComponentProps<typeof LinkDOM>;

const Link = ({
  to,
  children,
  ...props
}: LinkProps) => {
  return (
    <LinkDOM to={to} {...props}>
      {children}
    </LinkDOM>
  );
};

export default Link;
