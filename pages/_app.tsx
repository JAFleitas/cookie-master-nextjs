import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";

import { CssBaseline, ThemeProvider, Theme } from "@mui/material";
import { darkTheme, customTheme, lightTheme } from "../themes";

import Cookies from "js-cookie";

interface Props extends AppProps {
  theme: string;
}
function MyApp({ Component, pageProps, theme = "dark" }: Props) {
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const cookieTheme = Cookies.get("theme") || "dark";
  useEffect(() => {
    const selectedTheme: Theme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;
    setCurrentTheme(selectedTheme);
  }, [cookieTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

/* MyApp.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req
    ? (appContext.ctx.req as any).cookies
    : { theme: "light" };

  const validThemes = ["light", "dark", "custom"];
  console.log(theme);

  return {
    theme: validThemes.includes(theme) ? theme : "light",
  };
}; */

export default MyApp;
