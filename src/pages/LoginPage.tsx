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
        <Paper
          elevation={4}
          sx={{
            width: "30vw",
            height: "50vh",
            p: "3rem",
            borderRadius: "1rem",
          }}
        >
          <ColumnBox sx={{ height: "100%", width: "100%" }}>
            {" "}
            <ColumnBox
              sx={{ alignItems: "flex-start", width: "50%", mb: "auto" }}
            >
              <Typography fontWeight={"bold"} variant={"body1"}>
                Nice to see you again
              </Typography>
            </ColumnBox>
            <ColumnBox sx={{ alignItems: "flex-start", width: "50%" }}>
              <Typography variant={"h6"} fontWeight={"bold"}>
                Username
              </Typography>
              <TextField
                placeholder={"Enter username"}
                {...register("username", {
                  required: "This field is required",
                })}
              />
              {errors.username && (
                <ErrorTypography msg={errors.username.message} />
              )}{" "}
            </ColumnBox>
            <ColumnBox sx={{ alignItems: "flex-start", width: "50%" }}>
              <Typography variant={"h6"} fontWeight={"bold"}>
                Password
              </Typography>
              <TextField
                placeholder={"Enter password"}
                {...register("password", {
                  required: "This field is required",
                })}
              />
              {errors.password && (
                <ErrorTypography msg={errors.password.message} />
              )}
            </ColumnBox>
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
