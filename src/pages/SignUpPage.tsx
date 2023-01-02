import React, { FunctionComponent } from "react";
import { ColumnBox, ErrorTypography, RowBox } from "../components";
import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
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
        <Paper
          elevation={4}
          sx={{
            width: "27vw",
            py: "5%",
            px: "10%",
            height: "60vh",
            borderRadius: "1rem",
          }}
        >
          <ColumnBox
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <RowBox sx={{ width: "100%" }}>
              <Typography variant={"h6"} fontWeight={"bold"}>
                Welcome
              </Typography>
            </RowBox>
            <ColumnBox sx={{ width: "100%", alignItems: "flex-start" }}>
              <Typography variant={"h6"}>Username</Typography>
              <FormControl fullWidth>
                <TextField
                  size={"small"}
                  variant={"filled"}
                  placeholder={"Enter username"}
                  {...register("username", {
                    required: "This field is required",
                  })}
                />
                {errors.username && (
                  <ErrorTypography msg={errors.username.message} />
                )}{" "}
              </FormControl>
            </ColumnBox>
            <ColumnBox sx={{ width: "100%", alignItems: "flex-start" }}>
              <Typography variant={"h6"}>Email</Typography>
              <FormControl fullWidth>
                <TextField
                  size={"small"}
                  variant={"filled"}
                  placeholder={"Enter email"}
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && <ErrorTypography msg={errors.email.message} />}
              </FormControl>
            </ColumnBox>
            <ColumnBox sx={{ width: "100%", alignItems: "flex-start" }}>
              <Typography variant={"h6"}>Password</Typography>
              <FormControl fullWidth>
                <TextField
                  size={"small"}
                  variant={"filled"}
                  placeholder={"Enter password"}
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                {errors.password && (
                  <ErrorTypography msg={errors.password.message} />
                )}
              </FormControl>
            </ColumnBox>
            <RowBox sx={{ pt: "3%", width: "100%" }}>
              <Button
                type={"submit"}
                variant={"contained"}
                sx={{ borderRadius: "0.5rem", width: "100%" }}
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
