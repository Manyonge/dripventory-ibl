import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import axios from "axios";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#001B48",
      },
      secondary: {
        main: "#1A325A",
      },
    },
    typography: {
      fontFamily: ["Poppins", "Arial", "helvetica"].join(","),
      button: {
        textTransform: "none",
        fontWeight: "bold",
      },
    },
  });
  axios.defaults.baseURL = "http://localhost:3004/";
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
