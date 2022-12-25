import React, { FunctionComponent, useState } from "react";
import { ColumnBox, ErrorTypography, RowBox } from "../components";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useMutation, useQuery } from "react-query";
import postFn from "../libs/axios/postFn";
import getFn from "../libs/axios/getFn";
import { Product } from "../types";
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
interface CreateProductDto {
  name: string;
  quantity: number;
  buyingPrice: number;
  restockDate: number;
  sellingPrice: number;
}
const ProductsPage: FunctionComponent<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateProductDto>();

  const [selectedSection, setSelectedSection] = useState<"Table" | "Form">(
    "Table"
  );

  const addProductMutation = useMutation({
    mutationFn: (data: CreateProductDto) => postFn("/products", data),
    onSuccess: () => {},
    onError: (err) => {
      throw err;
    },
  });

  const onSubmit: SubmitHandler<CreateProductDto> = (data) => {
    addProductMutation.mutate(data);
  };

  const WelcomeTypography = (
    <>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        <Typography variant={"h5"} fontWeight={"bold"}>
          {" "}
          Products
        </Typography>
      </RowBox>
      <RowBox sx={{ justifyContent: "flex-start", width: "100%" }}>
        <Typography variant={"h6"} fontWeight={"bold"}>
          {" "}
          {selectedSection === "Form" && "Create a new product record"}
          {selectedSection === "Table" && "View all product records"}
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
          View Products{" "}
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
          Add Product{" "}
        </Button>
      )}
    </RowBox>
  );

  const [products, setProducts] = useState<Product[]>();

  const productsQuery = useQuery({
    queryKey: " Data",
    queryFn: () => getFn("/products"),
    onSuccess: (data: Product[]) => {
      console.log(data);
      setProducts(data);
    },
  });

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const THEME = useTheme(materialTheme);
  const tableData: Data = { nodes: products ?? [{ id: "dffe" }] };

  const ProductTable = (
    <>
      {productsQuery.isLoading ? <CircularProgress /> : null}
      {productsQuery.isError ? (
        <Typography variant={"h6"} color={"error"}>
          {" "}
          Could not load data
        </Typography>
      ) : null}
      {productsQuery.isSuccess ? (
        <Table data={tableData} theme={THEME}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell> Product Name </HeaderCell>
                  <HeaderCell> QTY </HeaderCell>
                  <HeaderCell> Buying Price </HeaderCell>
                  <HeaderCell> Selling Date </HeaderCell>
                  <HeaderCell> Restock Date</HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row key={item._id} item={item}>
                    <Cell> {item.name} </Cell>
                    <Cell> {item.quantity} </Cell>
                    <Cell> {item.buyingPrice} </Cell>
                    <Cell> {item.sellingPrice} </Cell>
                    <Cell> {item.restockDate} </Cell>
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
              {...register("name", { required: "This field is required" })}
            />
            {errors.name && <ErrorTypography msg={errors.name.message} />}
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
              Product Buying Price
            </Typography>
            <TextField
              type={"number"}
              placeholder={"Enter product buying price"}
              {...register("buyingPrice", {
                required: "This field is required",
              })}
            />
            {errors.buyingPrice && (
              <ErrorTypography msg={errors.buyingPrice.message} />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Product Restock Date
            </Typography>
            <TextField
              placeholder={"Enter restock date "}
              {...register("restockDate", {
                required: "This field is required",
              })}
            />
            {errors.restockDate && (
              <ErrorTypography msg={errors.restockDate.message} />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              {" "}
              Product Selling Price
            </Typography>
            <TextField
              type={"number"}
              placeholder={"Enter product selling price"}
              {...register("sellingPrice", {
                required: "This field is required",
              })}
            />
            {errors.sellingPrice && (
              <ErrorTypography msg={errors.sellingPrice.message} />
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
            {" Add Product"}
          </Button>
        </RowBox>
      </Paper>
    </form>
  );
  return (
    <Box sx={{ width: "100%", height: "100%", p: "5%" }}>
      {WelcomeTypography}
      {sectionSwitcher}
      {selectedSection === "Table" && (
        <Paper elevation={4} sx={{ borderRadius: "1em" }}>
          {" "}
          {ProductTable}{" "}
        </Paper>
      )}
      {selectedSection === "Form" && PostForm}
    </Box>
  );
};

export default ProductsPage;
