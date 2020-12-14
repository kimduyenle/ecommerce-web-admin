import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import formatDate from "utils/formatDate";
import calTotal from "utils/calTotal";

const useStyles = makeStyles(() => ({
  root: {},
  table: {
    minWidth: 650,
  },
  username: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  title: {
    marginBottom: 16,
  },
}));

const OrderDetails = ({ className, order, ...rest }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box>
        <Typography variant="h3" className={classes.title}>
          Khách hàng
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tên tài khoản</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.username}>
                  <Avatar className={classes.avatar} src={order.user.avatar} />
                  {order.user.username}
                </TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>{order.user.phoneNumber}</TableCell>
                <TableCell>{order.user.address}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box mt={3}>
        <Typography variant="h3" className={classes.title}>
          Thanh toán
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Phương thức thanh toán</TableCell>
                <TableCell>Tổng tiền hàng</TableCell>
                <TableCell>Số điện thoại giao hàng</TableCell>
                <TableCell>Địa chỉ giao hàng</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{calTotal(order.orderDetails)}</TableCell>
                <TableCell>{order.deliveryPhoneNumber}</TableCell>
                <TableCell>{order.deliveryAddress}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>

    //   <Card>
    //     <CardHeader
    //       subheader="The information can be edited"
    //       title="Product"
    //     />
    //     <Divider />
    //     <CardContent>
    //       <Grid
    //         container
    //         spacing={3}
    //       >
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >

    //             <Field
    //               label="Name"
    //               margin="normal"
    //               name="name"
    //               component={TextInput}
    // 								fullWidth
    // 								variant="outlined"
    //             />
    //         </Grid>
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <Field
    // 								name="categoryId"
    // 								options={categories.map(category => {
    // 									return {
    // 										key: category.id,
    // 										label: category.name
    // 									}
    // 								})}
    // 								component={SelectInput}
    // 								fullWidth
    // 								label="Category"
    //             />
    //         </Grid>
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <Field
    //               label="Quantity"
    //               margin="normal"
    //               name="quantity"
    //               component={TextInput}
    //               fullWidth
    // 								type="number"
    // 								variant="outlined"
    //             />
    //         </Grid>
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <Field
    //               label="Price"
    //               margin="normal"
    //               name="price"
    //               component={TextInput}
    //               fullWidth
    // 								type="number"
    // 								variant="outlined"
    //             />
    //         </Grid>
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <Field
    //               label="Description"
    //               margin="normal"
    //               name="description"
    //               component={TextInput}
    //               fullWidth
    //               multiline
    // 								rows={5}
    // 								variant="outlined"
    //             />
    //         </Grid>
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <Field
    //               label="Owner"
    //               margin="normal"
    //               name="owner"
    //               component={TextInput}
    //               fullWidth
    // 								variant="outlined"
    //             />
    //         </Grid>
    //       </Grid>
    //     </CardContent>
    //     <Divider />
    //     <Box
    //       display="flex"
    //       justifyContent="flex-end"
    //       p={2}
    //     >
    //       <Button
    //         color="primary"
    // 					variant="contained"
    // 					type="submit"
    //       >
    //         Save details
    //       </Button>
    //     </Box>
    //   </Card>
  );
};

OrderDetails.propTypes = {
  className: PropTypes.string,
};

export default OrderDetails;
