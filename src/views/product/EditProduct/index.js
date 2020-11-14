import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import ProductCarousel from "./ProductCarousel";
import ProductDetails from "./ProductDetails";
import productAPI from "api/product";
import Reviews from "./Reviews";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Product = () => {
  const classes = useStyles();
  const [product, setProduct] = useState({
    name: "",
    categoryId: 0,
    quantity: 0,
    price: 0,
    description: "",
    owner: "",
    images: [],
  });
  const { search } = useLocation();
  const { id } = qs.parse(search.replace(/^\?/, ""));

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        const response = await productAPI.get(id);
        const fetchedProduct = response.data.product;
        setProduct({
          name: fetchedProduct.name,
          categoryId: fetchedProduct.categoryId,
          quantity: fetchedProduct.quantity,
          price: fetchedProduct.price,
          description: fetchedProduct.description,
          owner: fetchedProduct.user,
          images: fetchedProduct.images,
        });
      } catch (error) {
        console.log("Failed to fetch product: ", error);
      }
    };
    fetchProduct(id);
  }, []);

  return (
    <Page className={classes.root} title="Product">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <ProductCarousel images={product.images} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProductDetails product={{ ...product }} id={id} />
          </Grid>
          <Grid item xs={12}>
            <Reviews productId={id} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(Product);
