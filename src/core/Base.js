import React from 'react';
import { ChakraProvider, Box, Text, Flex, Button } from '@chakra-ui/react';
import Navbar from './Navbar';
import '../styles.css';

const Base = ({
  title = 'My Title',
  description = 'My Description',
  children,
}) => {
  return (
    <ChakraProvider>
      <Box>
        <Navbar />

        <Box>
          <Flex direction="column" align="center">
            <Text fontSize="xx-large" fontWeight="bold" py={2}>
              {title}
            </Text>
            <Text fontSize="lg">{description}</Text>
          </Flex>
          <Box >{children}</Box>
        </Box>
        <footer>
          <Flex
            direction="column"
            align="center"
            mt="auto"
            py={3}
            width="100%"
            backgroundColor="green.300"
          >
            <Text width="max-content">Any difficulty? Do reach out to us.</Text>
            <Button colorScheme="red">Contact Us</Button>
          </Flex>
        </footer>
      </Box>
    </ChakraProvider>
  );
};

export default Base;
