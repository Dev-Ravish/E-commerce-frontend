import { Box, Button, Heading, Text } from '@chakra-ui/react';
import DropIn from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';

import { isAuthenticated } from '../auth/helper/index';
import { createOrder } from './helper/ordderHelper';
import { getToken, processPayment } from './helper/paymentHelper';

const Payment = (
  products,
  setReload = (value) => value,
  reload = undefined
) => {
  const [info, setInfo] = useState({
    error: false,
    clientToken: null,
    instance: {},
    loading: '',
    success: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const extractToken = () => {
    getToken(userId, token).then((data) => {
      if (data.error) {
        setInfo({ ...info, error: data.error });
      } else {
        const clientToken = data.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    extractToken();
  }, []);

  const paymentMethod = () => {
    let nonce;
    let getNonce = setTimeout(function () {
      info.instance.requestPaymentMethod((err, payload) => {
        console.log("ERR", err, "PAYMENT", payload.nonce);
        nonce = payload.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            setInfo({ ...info, success: res.success, loading: false });
            console.log('PAYMENT SUCCESFUL');
          })
          .catch((err) => {
            setInfo({ ...info, error: err, loading: false, success: false });
            console.log('PAYMENT FAILED');
          });
      });
    }, 200);
  };

  const getAmount = () => {
    let amount = 0;
    products.products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  const showDropIn = () => {
    return (
      <Box>
        {info.clientToken !== null && products.products.length > 0 ? (
          <Box width="80%" ml="auto" mr="auto">
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <Button width="full" colorScheme="teal" onClick={paymentMethod}>
              Buy
            </Button>
          </Box>
        ) : (
          <Heading>Please login or something to the cart.</Heading>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {getAmount() !== 0 && (
        <Box textAlign="center" fontWeight="bold" fontSize="xl">
          Total cart amount = {getAmount()} Rs{' '}
        </Box>
      )}
      {showDropIn()}
    </Box>
  );
};

export default Payment;
