import React, { FunctionComponent, useState } from "react";
import { ColumnBox, ErrorTypography, RowBox } from "../components";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface OwnProps {}

type Props = OwnProps;
interface CreateDeliveryDto {
  productName: string;
  quantity: number;
  saleDate: string;
  sellingPrice: string;
  customerContact: string;
}
const DeliveriesPage: FunctionComponent<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateDeliveryDto>();

  const [selectedSection, setSelectedSection] = useState<"Table" | "Form">(
    "Form"
  );

  const onSubmit: SubmitHandler<CreateDeliveryDto> = (data) => {
    console.log(data);
  };

  const WelcomeTypography = (
    <>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        <Typography variant={"h5"} fontWeight={"bold"}>
          {" "}
          Deliveries
        </Typography>
      </RowBox>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        {selectedSection === "Form" && (
          <Typography variant={"h6"} fontWeight={"bold"}>
            {" "}
            Create a new delivery record{" "}
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
          View Deliveries{" "}
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
              Product quantity
            </Typography>
            <TextField
              type={"number"}
              placeholder={"Enter product quantity"}
              {...register("quantity", { required: "This field is required" })}
            />
            {errors.quantity && (
              <ErrorTypography msg={errors.quantity.message} />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Product Selling Date
            </Typography>
            <TextField
              placeholder={"Enter product selling date"}
              {...register("saleDate", {
                required: "This field is required",
              })}
            />
            {errors.saleDate && (
              <ErrorTypography msg={errors.saleDate.message} />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Product Selling Price
            </Typography>
            <TextField
              type={"number"}
              placeholder={"Enter selling price "}
              {...register("sellingPrice", {
                required: "This field is required",
              })}
            />
            {errors.sellingPrice && (
              <ErrorTypography msg={errors.sellingPrice.message} />
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
        </Grid>
        <RowBox sx={{ justifyContent: "flex-end" }}>
          <Button
            startIcon={<AddRoundedIcon />}
            type={"submit"}
            variant={"contained"}
            sx={{ borderRadius: "3rem" }}
          >
            {" Add Delivery"}
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

export default DeliveriesPage;
