/** @jsxRuntime classic */
/** @jsx jsx */
import { ThemeProvider, Styled, jsx } from "theme-ui";
import { Route, Switch } from "wouter";

import theme from "./theme";

import CeramicProvider from "./hooks/ceramic";

import Home from "./pages";
import PostEdit from "./pages/PostEdit";
import PostView from "./pages/PostView";
import PostCreate from "./pages/PostCreate";
import Feed from "./pages/Feed";
import { withLayout, withProtected } from "./components/Layout";

function App() {
  return (
    <CeramicProvider>
      <ThemeProvider theme={theme}>
        {/* TODO: Add React helmet with json-ld schema rendering */}

        <Switch>
          <Route component={Home} path="/" />
          <Route path="/post/create" component={withProtected(PostCreate)} />
          <Route component={withLayout(PostView)} path="/post/:docId" />
          <Route component={withProtected(PostEdit)} path="/post/:docId/edit" />
          <Route path="/feed" component={withProtected(Feed)} />
          <Route component={withLayout(Feed)} path="/feed/:did" />
        </Switch>
      </ThemeProvider>
    </CeramicProvider>
  );
}

export default App;
