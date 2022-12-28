import React, { FunctionComponent } from "react";
import { IconButton } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import deleteFn from "../libs/axios/deleteFn";

interface OwnProps {
  _id: string;
  url: string;
}

type Props = OwnProps;

export const DeleteButton: FunctionComponent<Props> = (props) => {
  const { _id, url } = props;
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () => deleteFn(`${url}/${_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(" Data");
    },
  });
  return (
    <IconButton
      onClick={() => {
        deleteMutation.mutate();
      }}
    >
      {" "}
      <DeleteRounded />{" "}
    </IconButton>
  );
};
