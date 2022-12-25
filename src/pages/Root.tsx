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

interface OwnProps {}

type Props = OwnProps;
export const destinations = [
  { label: "Dashboard", route: "/admin/dashboard" },
  { label: "Products", route: "/admin/products" },
  { label: "Sales", route: "/admin/sales" },
  { label: "Deliveries", route: "/admin/deliveries" },
  { label: "Customers", route: "/admin/customers" },
];
const Root: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    if (loginStatus !== "true") {
      navigate("/login");
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
      {destinations.map((destination) => (
        <MenuItem
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
