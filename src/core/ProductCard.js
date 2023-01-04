import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { addItemToCart, removeProductFromCart } from './helper/cartHelper';
import Imagecalls from './helper/Imagecalls';

const ProductCard = ({
  product,
  showAddToCart = true,
  showRemoveFromCart = false,
  setReload = (value) => value,
  reload,
}) => {
  const [redirect, setRedirect] = useState(false);

  const [count, setCount] = useState();
  const addToCart = () => {
    addItemToCart(product, () => {
      setCount(product.count);
      setRedirect(true);
    });
  };
  const getRedirected = () => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  return (
    <Card maxW="sm" height="100%">
      {getRedirected()}
      <CardBody>
        <Imagecalls product={product} />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.name}</Heading>
          <Text>{product.description}</Text>
          <Text color="blue.600" fontSize="2xl">
            {product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {showAddToCart && (
          <Button colorScheme="teal" w="100%" onClick={addToCart}>
            Add to cart
          </Button>
        )}
        {showRemoveFromCart && (
          <Button
            colorScheme="red"
            w="100%"
            onClick={() => {
              removeProductFromCart(product._id);
              setReload(!reload)
            }}
          >
            Remove From Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
