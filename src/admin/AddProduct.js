import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getAllCategories, createProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper/index';
import {
  Flex,
  ChakraProvider,
  Input,
  Button,
  InputGroup,
  Select,
  Box,
  FormControl,
  FormHelperText,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getaRedirect: false,
    formData: typeof window !== 'undefined' && new FormData()
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getAllCategories().then((data) => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data});
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          image: '',
          stock: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === 'image' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <Flex justify="center">
        <Alert
          status="success"
          display={createdProduct ? '' : 'none'}
          width="fit-content"
          minW={{ base: '90%', md: '460px' }}
        >
          <Flex>
            <AlertIcon />
            <AlertDescription>{createdProduct} was successfully created.</AlertDescription>
          </Flex>
        </Alert>
      </Flex>
  );

  const AddProductForm = () => {
    return (
      <ChakraProvider>
        <Flex
          flexDirection="column"
          width="70wh"
          height="65vh"
          justifyContent="center"
          alignItems="center"
        >
          <Box minW={{ base: '90%', md: '460px' }}>
            <form>
              <FormControl pb={1}>
                <InputGroup>
                  <Input
                    onChange={handleChange('image')}
                    type="file"
                    name="image"
                    accept="image"
                    pt="1"
                  />
                </InputGroup>
              </FormControl>
              <FormControl pb={1}>
                <InputGroup>
                  <Input
                    onChange={handleChange('name')}
                    value={name}
                    type="name"
                    placeholder="Name"
                  />
                </InputGroup>
              </FormControl>
              <FormControl pb={1}>
                <InputGroup>
                  <Input
                    onChange={handleChange('description')}
                    value={description}
                    type="text"
                    placeholder="Enter the product description."
                  />
                </InputGroup>
              </FormControl>
              <FormControl pb={1}>
                <InputGroup>
                  <Input
                    onChange={handleChange('stock')}
                    value={stock}
                    type="number"
                    placeholder="Quantity in stock"
                  />
                </InputGroup>
              </FormControl>
              <FormControl pb={1}>
                <Select
                  placeholder="Select Category"
                  onChange={handleChange('category')}
                  value={category}
                >
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl pb={1}>
                <InputGroup>
                  <Input
                    onChange={handleChange('price')}
                    value={price}
                    type="number"
                    placeholder="Cost of Product"
                  />
                </InputGroup>
              </FormControl>
              <Flex justify="space-between">
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="fit-content"
                  mt={3}
                  onClick={onSubmit}
                >
                  Add Product
                </Button>
                <Link to="/admin/dashboard">
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="red"
                    width="fit-content"
                    mt={3}
                  >
                    Admin Home
                  </Button>
                </Link>
              </Flex>
            </form>
          </Box>
        </Flex>
      </ChakraProvider>
    );
  };

  return (
    <Base
      title="New Products? ADD here !"
      description="Hey admin, this a place where you can new products."
    >
      {successMessage()}
      {AddProductForm()}
    </Base>
  );
};

export default AddProduct;
