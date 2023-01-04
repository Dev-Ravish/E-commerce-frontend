import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import {
  Flex,
  ChakraProvider,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  chakra,
  Box,
  Text,
  FormControl,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { signup } from '../auth/helper';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            name: '',
            email: '',
            password: '',
            error: false,
            success: true,
          });
        }
      })
      .catch();
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
            <AlertTitle>Your account was successfully created.</AlertTitle>
            <AlertDescription>
              {' '}
              Please <Link to="/signin">LogIn here</Link>
            </AlertDescription>
            .
          </Flex>
        </Alert>
      </Flex>
    );
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
          <AlertDescription> {error}</AlertDescription>.
        </Alert>
      </Flex>
    );
  };

  const signUpForm = () => {
    return (
      <ChakraProvider>
        <Flex
          flexDirection="column"
          width="70wh"
          height="auto"
          justifyContent="center"
          alignItems="center"
          mt={8}
        >
          <Box minW={{ base: '90%', md: '460px' }}>
            <form>
              <FormControl pb={1}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Name"
                    onChange={handleChange('name')}
                    value={name}
                  />
                </InputGroup>
              </FormControl>
              <FormControl pb={1}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={handleChange('email')}
                    value={email}
                  />
                </InputGroup>
              </FormControl>
              <FormControl pb={1}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.200"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={handleChange('password')}
                    value={password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                mt={3}
                onClick={onSubmit}
              >
                Sign Up
              </Button>
            </form>
          </Box>
          <Flex>
            Already a user?
            <Link to="/signin">
              <Text color="teal.600">&nbsp;Sign In</Text>
            </Link>
          </Flex>
        </Flex>
      </ChakraProvider>
    );
  };
  return (
    <Base
      title="Signup"
      description="Sign Up and proceed to buying our products!"
    >
      {successMessage()}
      {errorMessage()}
      {/* <p>{JSON.stringify(values)}</p> */}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
