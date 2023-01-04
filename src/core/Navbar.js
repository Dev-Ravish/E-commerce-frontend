import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Menu, MenuButton, Button } from '@chakra-ui/react';
import { signout, isAuthenticated } from '../auth/helper';

const Navbar = () => {
  return (
    <ChakraProvider>
      <Menu>
        <Link to="/">
          <MenuButton
            as={Button}
            px={4}
            my={2}
            mx={2}
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: 'gray.400' }}
          >
            Home
          </MenuButton>
        </Link>

        <Link to="/cart">
          <MenuButton
            as={Button}
            px={4}
            my={2}
            mx={2}
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: 'gray.400' }}
          >
            cart
          </MenuButton>
        </Link>

        <Link to="/user/dashboard">
          <MenuButton
            as={Button}
            px={4}
            my={2}
            mx={2}
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: 'gray.400' }}
          >
            dashboard
          </MenuButton>
        </Link>

        {isAuthenticated() && isAuthenticated().user.role === 1 && <Link to="/admin/dashboard">
          <MenuButton
            as={Button}
            px={4}
            my={2}
            mx={2}
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: 'gray.400' }}
          >
            A. dashboard
          </MenuButton>
        </Link>}
        {!isAuthenticated() && (
          <Fragment>
            <Link to="/signin">
              <MenuButton
                as={Button}
                px={4}
                my={2}
                mx={2}
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: 'gray.400' }}
              >
                Sign In
              </MenuButton>
            </Link>

            <Link to="/signup">
              <MenuButton
                as={Button}
                px={4}
                my={2}
                mx={2}
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: 'gray.400' }}
              >
                Sign up
              </MenuButton>
            </Link>
          </Fragment>
        )}
        {isAuthenticated() && (
          <MenuButton
            as={Button}
            px={4}
            my={2}
            mx={2}
            borderRadius="md"
            borderWidth="1px"
            bg="red.300"
            _hover={{ bg: 'red.700' }}
            onClick={() => {
              signout(() => {
                window.location.href = '/';
              });
            }}
          >
            Signout
          </MenuButton>
        )}
      </Menu>
    </ChakraProvider>
  );
};

export default Navbar;
