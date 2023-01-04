import { Heading, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Base from './Base';
import { getCartItems } from './helper/cartHelper';
import Payment from './Payment';
import ProductCard from './ProductCard';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(getCartItems());
  }, [reload]);

  const showCartItems = (products) => (
    <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} py={3}>
      {products.map((product, index) => {
        return (
          <GridItem key={index} w="80%" align="center" ml="auto" mr="auto">
            <ProductCard
              product={product}
              showAddToCart={false}
              showRemoveFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
  return (
    <Base
      title="Cart Page"
      description="Add products to part and it will be visible here."
    >
      <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} py={3}>
        <GridItem>
          {products.length > 0 ? (
            showCartItems(products)
          ) : (
            <Heading>NO product in your cart.</Heading>
          )}
        </GridItem>
        <GridItem>
          <Payment products={products} setReload={setReload} retload={reload} />
        </GridItem>
      </Grid>
    </Base>
  );
};

export default Cart;
