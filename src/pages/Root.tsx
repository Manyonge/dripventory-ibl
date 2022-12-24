import React, { FunctionComponent } from "react";
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

const Root: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const destinations = [
    { label: "Dashboard", route: "/admin/dashboard" },
    { label: "Products", route: "/admin/products" },
    { label: "Sales", route: "/admin/sales" },
    { label: "Deliveries", route: "/admin/deliveries" },
    { label: "Customers", route: "/admin/customers" },
  ];
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
    <Box>
      {DeskDrawer}
      <Outlet />
    </Box>
  );
};

export default Root;
