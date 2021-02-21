/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "theme-ui";
import { Link } from "wouter";

export default ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
};
