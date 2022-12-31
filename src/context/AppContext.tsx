import { createContext, useContext } from "react";

export type AppContextType = {
  selectedIndex?: string;
  setSelectedIndex?: React.Dispatch<React.SetStateAction<string>>;
  snackbarOpen?: boolean;
  setSnackbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  snackBarMessage?: string;
  setSnackBarMessage?: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextType>({});
export const useAppContext = () => useContext(AppContext);
