import React, { FunctionComponent } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { destinations } from "./Root";
import { useNavigate } from "react-router-dom";

interface OwnProps {}

type Props = OwnProps;

const DashboardPage: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <Grid container sx={{ width: "30%" }} spacing={3}>
      {destinations.map((destination) => (
        <Grid item md={6}>
          {" "}
          <Button
            variant={"contained"}
            onClick={() => {
              navigate(destination.route);
            }}
            sx={{ borderRadius: "3rem" }}
          >
            {" "}
            {destination.label}{" "}
          </Button>{" "}
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardPage;
