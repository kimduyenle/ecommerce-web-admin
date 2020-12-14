import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import Product from "./Product";
import TotalOrders from "./TotalOrders";
import TotalUsers from "./TotalUsers";
import TotalCompletedOrders from "./TotalCompletedOrders";
import userAPI from "api/user";
import productAPI from "api/product";
import orderAPI from "api/order";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAll();
      setUsers(response.data.users);
    } catch (error) {
      console.log("Failed to fetch users: ", error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.products);
    } catch (error) {
      console.log("Failed to fetch products: ", error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data.orders);
    } catch (error) {
      console.log("Failed to fetch orders: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <Product totalProduct={products.length} />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <TotalUsers totalUsers={users.length} />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <TotalOrders totalOrders={orders.length} />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <TotalCompletedOrders
              totalCompleledOrders={
                orders.filter((order) => order.statusId === 4).length
              }
            />
          </Grid>
          {/* <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid> */}
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(Dashboard);
