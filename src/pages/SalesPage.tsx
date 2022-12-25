import React, { FunctionComponent, useState } from "react";
import { ColumnBox, ErrorTypography, RowBox } from "../components";
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
import { Sale } from "../types";
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
    "Table"
  );

  const addSaleMutation = useMutation({
    mutationFn: (data: CreateSaleDto) => postFn("/sales", data),
    onSuccess: () => {},
    onError: (err) => {
      throw err;
    },
  });

  const onSubmit: SubmitHandler<CreateSaleDto> = (data) => {
    addSaleMutation.mutate(data);
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
        <Typography variant={"h6"} fontWeight={"bold"}>
          {" "}
          {selectedSection === "Form" && "Create a new sale record"}
          {selectedSection === "Table" && "View all sale records"}
        </Typography>
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
          View Sales{" "}
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
          Add Sale{" "}
        </Button>
      )}
    </RowBox>
  );

  const [sales, setSales] = useState<Sale[]>();

  const salesQuery = useQuery({
    queryKey: " Data",
    queryFn: () => getFn("/sales"),
    onSuccess: (data: Sale[]) => {
      console.log(data);
      setSales(data);
    },
  });

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const THEME = useTheme(materialTheme);
  const tableData: Data = { nodes: sales ?? [{ id: "dffe" }] };

  const SaleTable = (
    <Table data={tableData} theme={THEME}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell> Product Name </HeaderCell>
              <HeaderCell> QTY </HeaderCell>
              <HeaderCell> Sale Date </HeaderCell>
              <HeaderCell> Selling Price </HeaderCell>
              <HeaderCell> Quantity</HeaderCell>
            </HeaderRow>
          </Header>
          <Body>
            {salesQuery.isLoading ? (
              <RowBox sx={{ width: "100%" }}>
                {" "}
                <CircularProgress />{" "}
              </RowBox>
            ) : null}
            {salesQuery.isError ? (
              <Typography variant={"h6"} color={"error"}>
                {" "}
                Could not load data
              </Typography>
            ) : null}
            {salesQuery.isSuccess
              ? tableList.map((item) => (
                  <Row key={item._id} item={item}>
                    <Cell> {item.productName} </Cell>
                    <Cell> {item.quantity} </Cell>
                    <Cell> {item.saleDate} </Cell>
                    <Cell> {item.sellingPrice} </Cell>
                    <Cell> {item.quantity} </Cell>
                  </Row>
                ))
              : null}
          </Body>
        </>
      )}
    </Table>
  );

  const PostForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={5} sx={{ p: "3%" }}>
        <Grid container spacing={5}>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Sale Name
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
              Delivery Method
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
      {selectedSection === "Table" && (
        <Paper elevation={4} sx={{ borderRadius: "1em" }}>
          {" "}
          {SaleTable}{" "}
        </Paper>
      )}
      {selectedSection === "Form" && PostForm}
    </ColumnBox>
  );
};

export default SalesPage;
