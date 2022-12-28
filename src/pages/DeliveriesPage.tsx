import React, { FunctionComponent, useState } from "react";
import {
  ColumnBox,
  DeleteButton,
  ErrorTypography,
  RowBox,
} from "../components";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useMutation, useQuery } from "react-query";
import postFn from "../libs/axios/postFn";
import { Delivery, Product } from "../types";
import getFn from "../libs/axios/getFn";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  Body,
  Cell,
  Data,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from "@table-library/react-table-library";

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
    "Table"
  );

  const addDeliveryMutation = useMutation({
    mutationFn: (data: CreateDeliveryDto) => postFn("/deliveries", data),
    onSuccess: () => {
      setSelectedSection("Table");
    },
    onError: (err) => {
      throw err;
    },
  });
  const onSubmit: SubmitHandler<CreateDeliveryDto> = (data) => {
    addDeliveryMutation.mutate(data);
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
        {selectedSection === "Form" && "Create a new delivery record"}
        {selectedSection === "Table" && "View all delivery records"}
      </RowBox>
    </>
  );
  const sectionSwitcher = (
    <RowBox sx={{ width: "100%", justifyContent: "flex-end", px: "10%" }}>
      {selectedSection === "Form" && (
        <Button
          sx={{ borderRadius: "3rem" }}
          variant={"outlined"}
          onClick={() => {
            setSelectedSection("Table");
          }}
        >
          {" "}
          View Deliveries{" "}
        </Button>
      )}
      {selectedSection === "Table" && (
        <Button
          startIcon={<AddRoundedIcon />}
          sx={{ borderRadius: "3rem" }}
          variant={"outlined"}
          onClick={() => {
            setSelectedSection("Form");
          }}
        >
          {" "}
          Add Delivery{" "}
        </Button>
      )}
    </RowBox>
  );

  const [deliveries, setDeliveries] = useState<Delivery[]>();

  const deliveriesQuery = useQuery({
    queryKey: " Data",
    queryFn: () => getFn("/deliveries"),
    onSuccess: (data: Delivery[]) => {
      setDeliveries(data);
    },
  });

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const THEME = useTheme(materialTheme);
  const tableData: Data = { nodes: deliveries ?? [{ id: "dffe" }] };

  const DeliveryTable = (
    <>
      {deliveriesQuery.isLoading ? <CircularProgress /> : null}
      {deliveriesQuery.isError ? (
        <Typography variant={"h6"} color={"error"}>
          {" "}
          Could not load data
        </Typography>
      ) : null}
      {deliveriesQuery.isSuccess ? (
        <Table data={tableData} theme={THEME}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell> Product Name </HeaderCell>
                  <HeaderCell> Quantity </HeaderCell>
                  <HeaderCell> Date of Sale </HeaderCell>
                  <HeaderCell> Selling Price </HeaderCell>
                  <HeaderCell> Customer Contact </HeaderCell>
                  <HeaderCell> Delete </HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row key={item._id} item={item}>
                    <Cell> {item.productName} </Cell>
                    <Cell> {item.quantity} </Cell>
                    <Cell> {item.saleDate} </Cell>
                    <Cell> {item.sellingPrice} </Cell>
                    <Cell> {item.customerContact} </Cell>
                    <Cell>
                      {" "}
                      <DeleteButton _id={item._id} url={"/deliveries"} />{" "}
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      ) : null}
    </>
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
      {selectedSection === "Table" && (
        <Paper elevation={4} sx={{ borderRadius: "1em" }}>
          {" "}
          {DeliveryTable}{" "}
        </Paper>
      )}
      {selectedSection === "Form" && PostForm}
    </ColumnBox>
  );
};

export default DeliveriesPage;
