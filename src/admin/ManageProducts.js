import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Flex, Box, Text, Button, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllProducts } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
const ManageProducts = () => {
  const [values, setValues] = useState({
    products: [],
    error: false,
    success: false,
  });

  const { products, error, success } = values;

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ products: data, error: false, success: true });
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTheProduct = (productId) => {
    deleteProduct(user._id, productId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preload();
      }
    });
  };

  const listOfProducts = () => {
    return (
      <>
        {products.map((product, index) => (
          <Grid key={index} templateColumns="repeat(3, 1fr)" mb={2}>
            <GridItem
              display="flex"
              flexWrap={'wrap'}
              colSpan={1}
              pl={4}
              alignContent="center"
            >
              {product.name}
            </GridItem>
            <GridItem colSpan={1} display="flex" justifyContent="center">
              <Link to={`/admin/product/update/${product._id}`}>
                <Button
                  borderRadius="4"
                  type="update"
                  variant="solid"
                  colorScheme="teal"
                  width="fit-content"
                  pt={0}
                  pb={0}
                >
                  Update
                </Button>
              </Link>
            </GridItem>
            <GridItem colSpan={1} display="flex" justifyContent="center">
              <Button
                borderRadius="4"
                type="delete"
                variant="solid"
                colorScheme="red"
                width="fit-content"
                onClick={() => {
                  deleteTheProduct(product._id);
                }}
              >
                Delete
              </Button>
            </GridItem>
          </Grid>
        ))}
      </>
    );
  };
  return (
    <Base
      title="Manage Products!"
      description="Get all your products managed here."
    >
      <Link to="/admin/dashboard">
        <Button
          borderRadius="4"
          type="submit"
          variant="solid"
          colorScheme="red"
          width="fit-content"
          m={4}
        >
          Admin Home
        </Button>
      </Link>
      <Box>
        <Text fontWeight="bold" fontSize="xl" p="4">
          All Products:
        </Text>
        <Flex justifyContent="center" fontWeight="bold" fontSize="x-large">
          Total 3 Products
        </Flex>
        {listOfProducts()}
      </Box>
    </Base>
  );
};

export default ManageProducts;
