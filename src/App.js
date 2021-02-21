/** @jsxRuntime classic */
/** @jsx jsx */
import { ThemeProvider, Styled, jsx } from "theme-ui";
import { Router, Route, Switch } from "wouter";

import theme from "./theme";

import CeramicProvider from "./hooks/ceramic";

import Home from "./pages";
import PostEdit from "./pages/PostEdit";
import PostView from "./pages/PostView";
import PostCreate from "./pages/PostCreate";
import Feed from "./pages/Feed";
import { withLayout, withProtected } from "./components/Layout";
import { useEffect, useState } from "react";

const currentLocation = () => {
  return window.location.hash.replace(/^#/, "") || "/";
};
const navigate = (to) => (window.location.hash = to);

const useHashLocation = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    // this function is called whenever the hash changes
    const handler = () => setLoc(currentLocation());

    // subscribe to hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return [loc, navigate];
};

function App() {
  return (
    <CeramicProvider>
      <ThemeProvider theme={theme}>
        {/* TODO: Add React helmet with json-ld schema rendering */}

        <Router hook={useHashLocation}>
          <Switch>
            <Route component={Home} path="/" />
            <Route path="/post/create" component={withProtected(PostCreate)} />
            <Route component={withLayout(PostView)} path="/post/:docId" />
            <Route
              component={withProtected(PostEdit)}
              path="/post/:docId/edit"
            />
            <Route path="/feed" component={withProtected(Feed)} />
            <Route component={withLayout(Feed)} path="/feed/:did" />
          </Switch>
        </Router>
      </ThemeProvider>
    </CeramicProvider>
  );
}

export default App;
