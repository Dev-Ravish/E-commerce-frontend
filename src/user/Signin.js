import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Base from '../core/Base';
import { signin, authenticate, isAuthenticated } from '../auth/helper';
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
  FormHelperText,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: false,
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: false });
    signin({ email, password })
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log('Failed to signin the user'));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if(isAuthenticated()){
      <Navigate to="/"/>;
    }

  };

  const showLoading = () => {
    return (
      <Alert status="success" display={loading === true ? '' : 'none'}>
        <Flex>
          <AlertIcon />
          <AlertTitle>Loading...</AlertTitle>
        </Flex>
      </Alert>
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

  const signInForm = () => {
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
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    onChange={handleChange('email')}
                    value={email}
                    type="email"
                    placeholder="email address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.200"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    onChange={handleChange('password')}
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right" fontWeight="bold" mb="1">
                  <Link>forgot password?</Link>
                </FormHelperText>
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
                Login
              </Button>
            </form>
          </Box>
          <Flex>
            New to us?
            <Link to="/signup">
              <Text color="teal.600">&nbsp;Sign Up</Text>
            </Link>
          </Flex>
        </Flex>
      </ChakraProvider>
    );
  };

  return (
    <Base
      title="Signin"
      description="Sign In and proceed to buying our products!"
    >
      {showLoading()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}

    </Base>
  );
};

export default Signin;
