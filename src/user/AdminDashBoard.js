import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';

const AdminDashBoard = () => {
  return (
    <Base
      title="Welcome to our Admin Dashboard."
      description="Here you can manage all the products and orders easily."
    >
      <Box
        display={{ md: 'flex' }}
        border="1px"
        mt="4"
        width={{ base: '100%', md: '80%' }}
        ml={{ md: 'auto' }}
        mr={{ md: 'auto' }}
        bg="teal.700"
      >
        <Box flexShrink={0}>
          <Box m="5">
            <Text bg="black" color="white" p="1">
              Admin Dashboard
            </Text>
            <Link to="/admin/create/category">
              <Text bg="white" color="teal.600" p="1">
                Create Categories
              </Text>
            </Link>
            <Link to="/admin/categories">
              <Text bg="white" color="teal.600" p="1">
                Manage Categories
              </Text>
            </Link>
            <Link to="/admin/create/product">
              <Text bg="white" color="teal.600" p="1">
                Create Products
              </Text>
            </Link>

            <Link to="/admin/products">
              <Text bg="white" color="teal.600" p="1">
                Manage Products
              </Text>
            </Link>
            <Link to="/admin/orders">
              <Text bg="white" color="teal.600" p="1">
                Manage orders
              </Text>
            </Link>
          </Box>
        </Box>
        <Box m="5" width={{ md: '100%' }} bg="white">
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="black"
            borderBottom="1px"
            p="2"
          >
            Admin Information
          </Text>
          <Flex m="3">
            <Text bg="green.800" borderRadius="5" color="white" pl="1" pr="1">
              Name:
            </Text>
            <Text pl="2"> {isAuthenticated().user.name}</Text>
          </Flex>
          <Flex m="3">
            <Text bg="green.800" borderRadius="5" color="white" pl="1" pr="1">
              Email:
            </Text>
            <Text pl="2"> {isAuthenticated().user.email}</Text>
          </Flex>
          <Flex>
            <Text
              bg="red.700"
              borderRadius="5"
              color="white"
              pl="1"
              pr="1"
              width="-webkit-fit-content"
              ml="3"
              mb={{ base: '2', md: '0' }}
            >
              Admin Area
            </Text>
          </Flex>
        </Box>
      </Box>
    </Base>
  );
};

export default AdminDashBoard;
