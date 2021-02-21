/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Container, jsx, Styled } from "theme-ui";

import { useCeramic } from "../../hooks/ceramic";
import Header from "../Header";

export function ProtectedLayout({ children }) {
  const { auth } = useCeramic();
  return (
    <Layout>
      {auth.loading ? (
        <pre>Loading auth...</pre>
      ) : !auth.value ? (
        <pre>This page requires auth. Sign in to continue.</pre>
      ) : (
        children
      )}
    </Layout>
  );
}

export function withProtected(Component) {
  return (props) => (
    <ProtectedLayout {...props}>
      <Component {...props} />
    </ProtectedLayout>
  );
}

export function withLayout(Component) {
  return (props) => (
    <Layout {...props}>
      <Component {...props} />
    </Layout>
  );
}

export default function Layout({ children }) {
  return (
    <Styled.root>
      <div>
        <Header />
      </div>
      <div sx={{ borderBottom: "1px solid rgba(0,0,0,.1)", mb: 3 }} />
      <Container sx={{ flex: 1 }}>{children}</Container>
      <footer sx={{ mt: 5, py: 5, bg: "primary" }}></footer>
    </Styled.root>
  );
}
