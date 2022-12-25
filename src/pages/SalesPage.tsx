import React, { FunctionComponent, useState } from "react";
import { ColumnBox, ErrorTypography, RowBox } from "../components";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface OwnProps {}

type Props = OwnProps;
interface CreateSaleDto {
  productName: string;
  customerContact: string;
  deliveryMethod: string;
  status: string;
}
const SalesPage: FunctionComponent<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSaleDto>();

  const [selectedSection, setSelectedSection] = useState<"Table" | "Form">(
    "Form"
  );

  const onSubmit: SubmitHandler<CreateSaleDto> = (data) => {
    console.log(data);
  };

  const WelcomeTypography = (
    <>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        <Typography variant={"h5"} fontWeight={"bold"}>
          {" "}
          Sales
        </Typography>
      </RowBox>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        {selectedSection === "Form" && (
          <Typography variant={"h6"} fontWeight={"bold"}>
            {" "}
            Create a new sale record{" "}
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
          View Sales{" "}
        </Button>
      )}
    </RowBox>
  );

  const PostForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={5} sx={{ p: "3%" }}>
        <Grid container spacing={5}>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Product Name
            </Typography>
            <TextField
              placeholder={"Enter product name"}
              {...register("productName", {
                required: "This field is required",
              })}
            />
            {errors.productName && (
              <ErrorTypography msg={errors.productName.message} />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Customer contact
            </Typography>
            <TextField
              placeholder={"Enter customer contact"}
              {...register("customerContact", {
                required: "This field is required",
              })}
            />
            {errors.customerContact && (
              <ErrorTypography msg={errors.customerContact.message} />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Product Buying Price
            </Typography>
            <TextField
              placeholder={"Enter delivery method"}
              {...register("deliveryMethod", {
                required: "This field is required",
              })}
            />
            {errors.deliveryMethod && (
              <ErrorTypography msg={errors.deliveryMethod.message} />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Sale status
            </Typography>
            <TextField
              placeholder={"Enter sale status "}
              {...register("status", {
                required: "This field is required",
              })}
            />
            {errors.status && <ErrorTypography msg={errors.status.message} />}
          </Grid>
        </Grid>
        <RowBox sx={{ justifyContent: "flex-end" }}>
          <Button
            startIcon={<AddRoundedIcon />}
            type={"submit"}
            variant={"contained"}
            sx={{ borderRadius: "3rem" }}
          >
            {" Add Sale"}
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

export default SalesPage;
