import React, { FunctionComponent } from "react";
import { ColumnBox, ErrorTypography, RowBox } from "../components";
import { Button, Paper, TextField, Typography, useTheme } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useMutation } from "react-query";
import postFn from "../libs/axios/postFn";
import { useNavigate } from "react-router-dom";

interface OwnProps {}

type Props = OwnProps;

interface AuthenticateUserDto {
  username: string;
  password: string;
}
const LoginPage: FunctionComponent<Props> = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthenticateUserDto>();

  const verifyUserMutation = useMutation({
    mutationFn: (data: AuthenticateUserDto) =>
      postFn("/users/authenticate", data),
    onSuccess: (data) => {
      sessionStorage.setItem("loginStatus", "true");
      navigate("/admin/dashboard");
    },
  });

  const onSubmit: SubmitHandler<AuthenticateUserDto> = (data) => {
    console.log(data);
    verifyUserMutation.mutate(data);
  };
  return (
    <RowBox
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: `${theme.palette.primary.main}`,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={4} sx={{ minWidth: "50vw", p: "3rem" }}>
          <ColumnBox>
            {" "}
            <Typography variant={"h6"} fontWeight={"bold"}>
              Username
            </Typography>
            <TextField
              placeholder={"Enter username"}
              {...register("username", { required: "This field is required" })}
            />
            {errors.username && (
              <ErrorTypography msg={errors.username.message} />
            )}{" "}
            <Typography variant={"h6"} fontWeight={"bold"}>
              Password
            </Typography>
            <TextField
              placeholder={"Enter password"}
              {...register("password", { required: "This field is required" })}
            />
            {errors.password && (
              <ErrorTypography msg={errors.password.message} />
            )}
            <RowBox sx={{ pt: "3%", width: "30%" }}>
              <Button
                type={"submit"}
                variant={"contained"}
                sx={{ borderRadius: "3rem", width: "100%" }}
              >
                {"Login"}
              </Button>
            </RowBox>
          </ColumnBox>
        </Paper>
      </form>
    </RowBox>
  );
};

export default LoginPage;
