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

interface CreateUserDto {
  username: string;
  email: string;
  password: string;
}
const SignUpPage: FunctionComponent<Props> = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserDto>();

  const addUserMutation = useMutation({
    mutationFn: (data: CreateUserDto) => postFn("/users", data),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit: SubmitHandler<CreateUserDto> = (data) => {
    addUserMutation.mutate(data);
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
              Email
            </Typography>
            <TextField
              placeholder={"Enter email"}
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && <ErrorTypography msg={errors.email.message} />}
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
                {"Sign up"}
              </Button>
            </RowBox>
          </ColumnBox>
        </Paper>
      </form>
    </RowBox>
  );
};

export default SignUpPage;
