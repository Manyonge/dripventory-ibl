import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  createTheme,
  CssBaseline,
  IconButton,
  Snackbar,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, useNavigate } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import axios from "axios";
import { AppContext } from "./context/AppContext";
import { CloseRounded } from "@mui/icons-material";

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
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
  const [selectedIndex, setSelectedIndex] = useState<string>("");
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => {
        setSnackbarOpen(false);
      }}
    >
      <CloseRounded fontSize="small" />
    </IconButton>
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContext.Provider
          value={{
            selectedIndex,
            setSelectedIndex,
            setSnackbarOpen,
            setSnackBarMessage,
            snackBarMessage,
            snackbarOpen,
          }}
        >
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackBarMessage}
            action={action}
          />
          <RouterProvider router={router} />
        </AppContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
