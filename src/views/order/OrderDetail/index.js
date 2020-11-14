import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import OrderDetails from "./OrderDetails";
import Products from "./Products";
import Invoice from "./Invoice";
import orderAPI from "api/order";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  tabPanel: {
    border: "1px solid #ddd",
    borderTop: "none",
  },
  tabs: {
    backgroundColor: "#fff",
  },
  tab: {
    textTransform: "capitalize",
  },
}));

function OrderDetail() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [order, setOrder] = useState({
    id: "",
    user: {},
    paymentMethod: "",
    deliveryPhoneNumber: "",
    deliveryAddress: "",
    createdAt: "",
    orderDetails: [],
  });

  const { search } = useLocation();
  const { id } = qs.parse(search.replace(/^\?/, ""));

  useEffect(() => {
    const fetchOrder = async (id) => {
      try {
        const response = await orderAPI.get(id);
        const fetchedOrder = response.data.order;
        setOrder({
          id: fetchedOrder.id,
          user: fetchedOrder.user,
          paymentMethod: fetchedOrder.paymentMethod,
          deliveryPhoneNumber: fetchedOrder.deliveryPhoneNumber,
          deliveryAddress: fetchedOrder.deliveryAddress,
          createdAt: fetchedOrder.createdAt,
          orderDetails: fetchedOrder.orderDetails,
        });
      } catch (error) {
        console.log("Failed to fetch order: ", error);
      }
    };
    fetchOrder(id);
  }, [id]);

  return (
    <Page className={classes.root} title="Orders">
      <Container maxWidth={false}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            className={classes.tabs}
          >
            <Tab
              label="Order Details"
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab label="Products" {...a11yProps(1)} className={classes.tab} />
            <Tab label="Invoice" {...a11yProps(2)} className={classes.tab} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} className={classes.tabPanel}>
          <OrderDetails order={{ ...order }} />
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabPanel}>
          <Products orderDetails={order.orderDetails} />
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.tabPanel}>
          <Invoice order={{ ...order }} />
        </TabPanel>
      </Container>
    </Page>
  );
}

export default compose(withLayout("dashboard"))(OrderDetail);
