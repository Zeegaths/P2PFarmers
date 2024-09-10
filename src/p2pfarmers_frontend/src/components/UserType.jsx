import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuthClient } from '../../src/index'; // Ensure this path is correct based on your project structure

const UserType = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate(); // Initialize navigate
  const { logout } = useAuthClient(); // Destructure the logout function from useAuthClient

  // Function to handle navigation to /registeragent
  const handleAgentRegistration = () => {
    navigate('/registeragent');
    onClose();
  };

  // Function to handle navigation to /registeruser
  const handleUserRegistration = () => {
    navigate('/registeruser');
    onClose();
  };

  // Function to handle logout and navigation to landing page
  const handleLandingNavigation = () => {
    logout(); // Call the logout function to log the user out
    navigate('/'); // Then navigate to the landing page
  };

  // Function to handle navigation to products page
  const handleProductsNavigation = () => {
    navigate('/productlist');
  };

  return (
    <>
      {/* Button to open the popup */}
      <Flex
        height="100vh" // Full viewport height
        justifyContent="center" // Center horizontally
        alignItems="center" // Center vertically
      >
        <Button onClick={onOpen} colorScheme="teal" mt={4}>
          Choose User Type
        </Button>
      </Flex>

      {/* Popup Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Your Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text fontSize="lg" fontWeight="bold">
                Are you an Agent or a Buyer?
              </Text>
              <Button
                colorScheme="blue"
                w="full"
                onClick={handleAgentRegistration} // Navigate to /registeragent
              >
                Agent
              </Button>
              <Button
                colorScheme="green"
                w="full"
                onClick={handleUserRegistration} // Navigate to /registeruser
              >
                Buyer
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Navigation Buttons Outside Modal */}
      <Box position="fixed" bottom={4} left={4}>
        <Button
          colorScheme="gray"
          onClick={handleLandingNavigation} // Navigate to landing and log out
        >
          Go to Landing
        </Button>
      </Box>
      <Box position="fixed" bottom={4} right={4}>
        <Button
          colorScheme="gray"
          onClick={handleProductsNavigation} // Navigate to products
        >
          Go to Products
        </Button>
      </Box>
    </>
  );
};

export default UserType;
