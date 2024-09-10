'use client'

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';
import { img } from 'framer-motion/client';
import Nav from './Navbar';
import { useState } from "react";
import { idlFactory, canisterId } from "../../../declarations/p2pfarmers_backend";
import { useAuthClient } from "../../src/index";
import { useNavigate } from "react-router-dom";

const Illustration = (props) => {
  return (
    <img src="/food.jpg" alt="" />
  );
};

export default function CallToActionWithIllustration() {
  const navigate = useNavigate();
  const identityProvider =
    process.env.DFX_NETWORK === "local"
      ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
      : "https://identity.ic0.app";

  const { isAuthenticated, login, logout, actor } = useAuthClient({
    loginOptions: {
      identityProvider,
    },
    actorOptions: {
      canisterId,
      idlFactory,
    },
  });


  return (
    <Container maxW={'5xl'}>
      <Nav />
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Welcome to{' '}
          <Text as={'span'} color={'green.400'}>
            p2p Farms
          </Text>
        </Heading>
        <Text maxW={'3xl'}>
          Never miss a meeting. Never be late for one too. Keep track of your meetings and
          receive smart reminders in appropriate times. Read your smart “Daily Agenda”
          every morning.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'green.400'}
            _hover={{ bg: 'green.500' }}
            onClick={login}>
            Login
          </Button>
          <Button rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack>
        <Flex w={'full'}>
          <Illustration height={{ sm: '24rem', lg: '28rem' }} mt={{ base: 12, sm: 16 }} />
        </Flex>
      </Stack>
      <p>{isAuthenticated ? navigate("/usertype") : "You are not logged in"}</p>
    </Container>
  );
}
