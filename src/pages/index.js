/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Container, jsx } from "theme-ui";

import Header from "../components/Header";
import MarkdownViewer from "../components/MarkdownViewer";
import { useDocument } from "../hooks/document";

const LANDING_PAGE =
  "kjzl6cwe1jw149f1pyimxqxyskj78fq9ung8smanh4wsju1lk60g92kfflu88oj";

const Home = () => {
  const state = useDocument(LANDING_PAGE);
  return (
    <>
      <Header />
      <Container>
        <MarkdownViewer doc={state?.value} />
      </Container>
    </>
  );
};

export default Home;
