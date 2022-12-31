import React, { FunctionComponent, useEffect } from "react";
import { Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { destinations } from "./Root";
import { useNavigate } from "react-router-dom";
import { RowBox } from "../components";
import { useAppContext } from "../context/AppContext";

interface OwnProps {}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { setSelectedIndex } = useAppContext();
  useEffect(() => {
    setSelectedIndex!("dashboard");
  }, []);
  return (
    <Grid container sx={{ width: "100%", p: "2%" }} spacing={3}>
      {destinations.map((destination) => (
        <Grid item md={6}>
          {" "}
          <Paper
            elevation={4}
            onClick={() => {
              navigate(destination.route);
            }}
            sx={{
              borderRadius: "1rem",
              height: "20vh",
              backgroundColor: `${theme.palette.primary.light}`,
              cursor: "pointer",
            }}
          >
            {" "}
            <RowBox sx={{ width: "100%", height: "100%" }}>
              <Typography
                variant={"h6"}
                fontWeight={"bold"}
                sx={{
                  color: "white",
                }}
              >
                {" "}
                {destination.label}{" "}
              </Typography>
            </RowBox>
          </Paper>{" "}
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardPage;
