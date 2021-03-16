import React from "react";
import { useParams } from "react-router-dom";

import Product from "../Product/product";
import fakeData from "../fakeData/index";

const ProductDetail = () => {
  const { productKey } = useParams();

  const product = fakeData.find((pd) => pd.key === productKey);
  console.log(product);

  return (
    <div>
      <h1>Product ID: {productKey}</h1>
      <Product showAddToCartBtn={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
