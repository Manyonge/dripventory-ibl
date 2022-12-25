import React, { FunctionComponent } from "react";
import { Box, SxProps, Theme } from "@mui/material";

interface OwnProps {
  sx?: SxProps<Theme>;
  children: any;
  borderTest?: boolean;
}

type Props = OwnProps;

export const RowBox: FunctionComponent<Props> = (props) => {
  const { sx, children, borderTest } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        border: borderTest ? "2px solid black" : "none",
        ...sx,
      }}
    >
      {" "}
      {children}{" "}
    </Box>
  );
};
