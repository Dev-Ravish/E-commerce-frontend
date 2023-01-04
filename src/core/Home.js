import React, { useEffect, useState } from 'react';
import Base from './Base';
import {
  ChakraProvider,
  Button,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react';
import ProductCard from './ProductCard';
import { getProducts } from './helper/coreapicalls';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ChakraProvider>
      <Base title="Home Page" description="Welcome to our Home Page!">
        <Heading ml={8}>All Products:</Heading>
        <Grid templateColumns={{ md: 'repeat(4, 1fr)' }} py={3}>
          {products.map((product, index) => {
            return (
              <GridItem key={index} w="90%" align="center" ml="auto" mr="auto">
                <ProductCard product={product} />
              </GridItem>
            );
          })}
        </Grid>
      </Base>
    </ChakraProvider>
  );
};

export default Home;
