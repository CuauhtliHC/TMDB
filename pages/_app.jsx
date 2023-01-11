import Navbar from "../components/navbar/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import { AuthProvider } from "../store/user";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? false;
    setDarkMode(theme);
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Navbar toggleTheme={toggleTheme} {...pageProps} />
        <Component {...pageProps} />
        <Footer {...pageProps} darkMode />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
