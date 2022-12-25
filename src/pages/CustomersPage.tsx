import React, { FunctionComponent, useState } from "react";
import { ColumnBox, ErrorTypography, RowBox } from "../components";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface OwnProps {}

type Props = OwnProps;
interface CreateCustomerDto {
  name: string;
  contact: string;
}
const ProductsPage: FunctionComponent<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCustomerDto>();

  const [selectedSection, setSelectedSection] = useState<"Table" | "Form">(
    "Form"
  );

  const onSubmit: SubmitHandler<CreateCustomerDto> = (data) => {
    console.log(data);
  };

  const WelcomeTypography = (
    <>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        <Typography variant={"h5"} fontWeight={"bold"}>
          {" "}
          Customers
        </Typography>
      </RowBox>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        {selectedSection === "Form" && (
          <Typography variant={"h6"} fontWeight={"bold"}>
            {" "}
            Create a new customer record{" "}
          </Typography>
        )}
      </RowBox>
    </>
  );
  const sectionSwitcher = (
    <RowBox sx={{ width: "100%", justifyContent: "flex-end", px: "10%" }}>
      {selectedSection === "Form" && (
        <Button sx={{ borderRadius: "3rem" }} variant={"outlined"}>
          {" "}
          View Customers{" "}
        </Button>
      )}
    </RowBox>
  );

  const PostForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={5} sx={{ p: "10%", width: "100%" }}>
        <Grid container spacing={5}>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Customer Name
            </Typography>
            <TextField
              placeholder={"Enter customer name"}
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && <ErrorTypography msg={errors.name.message} />}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              customer contact
            </Typography>
            <TextField
              placeholder={"Enter customer contact"}
              {...register("contact", { required: "This field is required" })}
            />
            {errors.contact && <ErrorTypography msg={errors.contact.message} />}
          </Grid>
        </Grid>
        <RowBox sx={{ justifyContent: "flex-end", pt: "3%" }}>
          <Button
            startIcon={<AddRoundedIcon />}
            type={"submit"}
            variant={"contained"}
            sx={{ borderRadius: "3rem" }}
          >
            {" Add Customer"}
          </Button>
        </RowBox>
      </Paper>
    </form>
  );
  return (
    <ColumnBox sx={{ width: "100%", height: "100%", p: "5%" }}>
      {WelcomeTypography}
      {sectionSwitcher}
      {PostForm}
    </ColumnBox>
  );
};

export default ProductsPage;
