//import theme from "@theme-ui/preset-tosh";
// import theme from "@theme-ui/preset-swiss";
import { tosh as theme, base as baseTheme } from "@theme-ui/presets";

const formDefaults = {
  display: "block",
  width: "100%",
  mt: 2,
  mb: 3,
  border: "1px solid rgba(0,0,0,.1)",
};

const buttonDefaults = {
  //borderRadius: 0,
  cursor: "pointer",
  transition: ".1s opacity",
  "&:hover": {
    opacity: 0.8,
  },
};
const maxWidth = 1024;

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: "monospace",
  },
  component: {
    header: {
      display: "flex",
      justifyContent: "space-between",
      py: 3,
      // borderBottom: "1px solid rgba(0,0,0,.1)",
      mx: "auto",
      maxWidth,
      //mb: 3,
    },
    logo: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "primary",
      fontSize: 5,
      mt: -2,
      ml: 2,
      "&:hover": {
        opacity: 0.7,
      },
    },
    "header-nav": {
      display: "flex",
      flex: 1,
      ml: 6,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    main: {
      mx: "auto",
      maxWidth,
      pt: 4,
    },
  },
  layout: {
    container: {
      maxWidth: 1024,
    },
  },
  buttons: {
    primary: {
      ...buttonDefaults,
    },
    secondary: {
      ...buttonDefaults,
      bg: "white",
      color: "primary",
      border: "1px solid",
    },
  },
  form: {
    label: {
      ...formDefaults,
    },
    input: {
      ...formDefaults,
    },
    select: {
      ...formDefaults,
    },
    textarea: {
      ...formDefaults,
      minHeight: 300,
    },
  },
  styles: {
    ...theme.styles,
    root: {
      m: 0,
      fontFamily: "body",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    textarea: {
      width: "100%",
      background: "green",
    },
    h1: {},
    img: {
      maxWidth: "100%",
      height: "auto",
    },
  },
};
