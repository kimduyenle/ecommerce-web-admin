import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
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
  Button,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import OrderDetails from "./OrderDetails";
import Products from "./Products";
import Invoice from "./Invoice";
import orderAPI from "api/order";
import useNotification from "utils/hooks/notification";

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
  const history = useHistory();
  const { showSuccess } = useNotification();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [order, setOrder] = useState({
    id: "",
    user: {},
    statusId: "",
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
          statusId: fetchedOrder.statusId,
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

  const updateOrderStatus = async (statusId, orderId) => {
    try {
      await orderAPI.editStatus({ statusId: statusId + 1 }, orderId);
      history.push("/orders");
      showSuccess("Cập nhật đơn hàng thành công");
    } catch (error) {
      console.log("Failed to update status: ", error);
    }
  };

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
              label="Thông tin đơn hàng"
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab label="Sản phẩm" {...a11yProps(1)} className={classes.tab} />
            <Tab label="Hóa đơn" {...a11yProps(2)} className={classes.tab} />
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
        <Box mt={2}>
          {(order.statusId === 2 || order.statusId === 3) && (
            <Button
              variant="contained"
              onClick={() => updateOrderStatus(order.statusId, order.id)}
            >
              {order.statusId === 2 && "Xác nhận đã lấy hàng"}
              {order.statusId === 3 && "Xác nhận đã giao"}
            </Button>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default compose(withLayout("dashboard"))(OrderDetail);
