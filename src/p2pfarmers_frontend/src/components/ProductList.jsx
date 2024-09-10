import React, { useState } from 'react';
import Simple from './Products'; // Import the detailed product component
import { Box, Grid, Image, Text, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure, Flex } from '@chakra-ui/react';
import SidebarWithHeader from './Sidebar';

function ProductList() {
  const products = [
    {
      id: 1,
      name: 'Fresh cabbage',
      price: '$20.00/kg',
      image: '/cabbage.jpg',
    },
    {
      id: 2,
      name: 'Nigerian Pepper',
      price: '$45.00/kg',
      image: '/pepper.jpg',
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleExpand = (product) => {
    setSelectedProduct(product);
    onOpen(); // Open the modal when a product is clicked
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} minH="100vh">
      {/* Sidebar */}
      <Box width={{ base: 'full', md: '250px' }} bg="gray.100" flexShrink={0}>
        <SidebarWithHeader />
      </Box>

      {/* Product List */}
      <Box flex="1" p={4} overflowY="auto">
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {products.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              onClick={() => handleExpand(product)}
              cursor="pointer"
              p={4}
              bg="white"
              shadow="md"
            >
              {/* Small product card */}
              <Box textAlign="center">
                <Image src={product.image} alt={product.name} boxSize="150px" objectFit="cover" mx="auto" mb={4} />
                <Text fontWeight="bold" fontSize="lg">
                  {product.name}
                </Text>
                <Text color="gray.500">{product.price}</Text>
                <Button mt={4} colorScheme="green" size="sm">
                  View Details
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* Modal for full-page product display */}
      {selectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton onClick={onClose} /> {/* Close button to go back to product list */}
            <ModalBody>
              <Simple /> {/* Render the full expanded product component */}
              <Button mt={4} onClick={onClose} colorScheme="green">
                Back to Product List
              </Button> {/* Back button */}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
}

export default ProductList;
