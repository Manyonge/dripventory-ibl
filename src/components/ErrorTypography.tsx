import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";

interface OwnProps {
  msg: string | undefined;
}

type Props = OwnProps;

export const ErrorTypography: FunctionComponent<Props> = (props) => {
  const { msg } = props;
  return (
    <Typography variant={"body2"} color={"error"}>
      {" "}
      {msg}{" "}
    </Typography>
  );
};
