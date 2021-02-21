/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { useCeramic } from "../../hooks/ceramic";
import Button from "../Button";
import Link from "../Link";

export default () => {
  const { auth, signIn } = useCeramic();

  return (
    <header sx={{ variant: "component.header" }}>
      <Link href="/" sx={{ variant: "component.logo" }}>
        ϡ <small sx={{ fontSize: "8px", mt: "28px" }}>v.alpha</small>
      </Link>
      <nav sx={{ variant: "component.header-nav" }}>
        <div>
          {auth.value ? (
            <>
              <Link href={`/feed/${auth?.value || ""}`}>
                <Button variant="secondary" mr={3}>
                  Feed
                </Button>
              </Link>
              <Link href="/post/create">
                <Button>Create new</Button>
              </Link>
            </>
          ) : (
            <Button onClick={signIn}>Sign in</Button>
          )}
        </div>
      </nav>
    </header>
  );
};
