import {
  Flex,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setName(event.target.value);
    setError(false);
    setSuccess(false);

  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    console.log(user._id, token, { name });
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setSuccess(true);
        setError(false);
        setName("");
      }
    });
  };

  const successMessage = () => {
    return (
      <Flex justify="center">
        <Alert
          status="success"
          display={success === true ? '' : 'none'}
          width="fit-content"
          minW={{ base: '90%', md: '460px' }}
        >
          <Flex>
            <AlertIcon />
            <AlertDescription>The category was successfully created.</AlertDescription>
          </Flex>
        </Alert>
      </Flex>
    )
  };
  const errorMessage = () => {
    return (
      <Flex justify="center">
        <Alert
          status="error"
          display={error === false ? 'none' : 'flex'}
          width="fit-content"
          minW={{ base: '90%', md: '460px' }}
        >
          <AlertIcon />
          <AlertTitle>ERROR: </AlertTitle>
          <AlertDescription> Failed to create Category.</AlertDescription>.
        </Alert>
      </Flex>
    );
  };
  const createCategoryForm = () => (
    <form>
      <Flex justify="center" mt="90">
        <Box maxW={{ md: '70vh' }} minW={{ base: '90%', md: '480' }}>
          <FormControl pb={1}>
            Enter the Category:
            <InputGroup>
              <InputLeftElement pointerEvents="none" />
              <Input
                borderColor="black"
                type="name"
                onChange={handleChange}
                value={name}
                placeholder="For ex. Winter Collection"
              />
            </InputGroup>
          </FormControl>
          <Flex justify="space-between">
            <Button
              borderRadius="4"
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="fit-content"
              onClick={onSubmit}
              mt={3}
            >
              Create
            </Button>
            <Link to="/admin/dashboard">
              <Button
                borderRadius="4"
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
        </Box>
      </Flex>
    </form>
  );


  return (
    <Base
      title="Create Category"
      description="You can create your own category here."
    >
    {successMessage()}
    {errorMessage()}
      {JSON.stringify({ name: name, error: error })}
      {createCategoryForm()}
    </Base>
  );
};

export default AddCategory;
