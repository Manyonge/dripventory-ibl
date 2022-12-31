import React, { FunctionComponent, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";

interface OwnProps {}

type Props = OwnProps;
export const destinations = [
  { label: "Products", route: "/admin/products", selectedIndex: "products" },
  { label: "Sales", route: "/admin/sales", selectedIndex: "sales" },
  {
    label: "Deliveries",
    route: "/admin/deliveries",
    selectedIndex: "deliveries",
  },
  { label: "Customers", route: "/admin/customers", selectedIndex: "customers" },
];
const Root: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate();
  const { selectedIndex } = useAppContext();
  const theme = useTheme();
  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    if (loginStatus !== "true") {
      navigate("/");
    }
  }, []);
  const DeskDrawer = (
    <Drawer
      variant={"permanent"}
      open={true}
      anchor={"left"}
      sx={{
        width: "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: "240px", boxSizing: "border-box" },
      }}
    >
      <Toolbar sx={{ backgroundColor: `${theme.palette.primary.main}` }}>
        {" "}
        <Typography
          variant={"h4"}
          color={"white"}
          fontWeight={"bold"}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/admin/dashboard");
          }}
        >
          Dripventory
        </Typography>{" "}
      </Toolbar>
      <MenuItem
        selected={selectedIndex === "dashboard"}
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        {" "}
        Dashboard
      </MenuItem>
      {destinations.map((destination) => (
        <MenuItem
          selected={selectedIndex === destination.selectedIndex}
          key={destination.label}
          onClick={() => {
            navigate(destination.route);
          }}
        >
          {" "}
          {destination.label}{" "}
        </MenuItem>
      ))}
    </Drawer>
  );

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      {DeskDrawer}
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          {" "}
          <Outlet />{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default Root;
