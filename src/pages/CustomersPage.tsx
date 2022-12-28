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
import { Customer } from "../types";
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
interface CreateCustomerDto {
  name: string;
  contact: string;
}
const CustomersPage: FunctionComponent<Props> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCustomerDto>();

  const [selectedSection, setSelectedSection] = useState<"Table" | "Form">(
    "Table"
  );

  const addCustomerMutation = useMutation({
    mutationFn: (data: CreateCustomerDto) => postFn("/customers", data),
    onSuccess: () => {
      setSelectedSection("Table");
    },
    onError: (err) => {
      throw err;
    },
  });
  const onSubmit: SubmitHandler<CreateCustomerDto> = (data) => {
    addCustomerMutation.mutate(data);
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
        {selectedSection === "Form" && "Create a new customer record"}
        {selectedSection === "Table" && "View all customer records"}
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
          View Customers{" "}
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
          Add Customer{" "}
        </Button>
      )}
    </RowBox>
  );

  const [customers, setCustomers] = useState<Customer[]>();

  const customersQuery = useQuery({
    queryKey: " Data",
    queryFn: () => getFn("/customers"),
    onSuccess: (data: Customer[]) => {
      setCustomers(data);
    },
  });

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const THEME = useTheme(materialTheme);
  const tableData: Data = { nodes: customers ?? [{ id: "dffe" }] };

  const CustomerTable = (
    <>
      {customersQuery.isLoading ? <CircularProgress /> : null}
      {customersQuery.isError ? (
        <Typography variant={"h6"} color={"error"}>
          {" "}
          Could not load data
        </Typography>
      ) : null}
      {customersQuery.isSuccess ? (
        <Table data={tableData} theme={THEME}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell> Customer Name </HeaderCell>
                  <HeaderCell> Contact </HeaderCell>
                  <HeaderCell> Delete </HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item) => (
                  <Row key={item._id} item={item}>
                    <Cell> {item.name} </Cell>
                    <Cell> {item.contact} </Cell>
                    <Cell>
                      {" "}
                      <DeleteButton _id={item._id} url={"/customers"} />{" "}
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
      {selectedSection === "Table" && (
        <Paper elevation={4} sx={{ borderRadius: "1em" }}>
          {" "}
          {CustomerTable}{" "}
        </Paper>
      )}
      {selectedSection === "Form" && PostForm}
    </ColumnBox>
  );
};

export default CustomersPage;
