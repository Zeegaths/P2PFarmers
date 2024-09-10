'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const Form1 = ({ agentDetails, handleChange }) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Agent Registration
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel>First name</FormLabel>
          <Input
            name="firstName"
            value={agentDetails.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Last name</FormLabel>
          <Input
            name="lastName"
            value={agentDetails.lastName}
            onChange={handleChange}
            placeholder="Last name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={agentDetails.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            value={agentDetails.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <FormHelperText>We&apos;ll never share your email.</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  )
}

const Form2 = ({ agentDetails, handleChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Business and Location Details
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl>
          <FormLabel>Business Registration Number</FormLabel>
          <Input
            name="businessRegNo"
            value={agentDetails.businessRegNo}
            onChange={handleChange}
            placeholder="Business Registration Number"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Device ID</FormLabel>
          <Input
            name="deviceId"
            value={agentDetails.deviceId}
            onChange={handleChange}
            placeholder="Device ID"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={agentDetails.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Postal Code</FormLabel>
          <Input
            name="postalCode"
            value={agentDetails.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Country Code</FormLabel>
          <Input
            name="countryCode"
            value={agentDetails.countryCode}
            onChange={handleChange}
            placeholder="Country Code"
          />
        </FormControl>

        <FormControl>
          <FormLabel>City Name</FormLabel>
          <Input
            name="cityName"
            value={agentDetails.cityName}
            onChange={handleChange}
            placeholder="City Name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Province / State Code</FormLabel>
          <Input
            name="provinceCode"
            value={agentDetails.provinceCode}
            onChange={handleChange}
            placeholder="Province / State Code"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Street Address</FormLabel>
          <Input
            name="streetAddress"
            value={agentDetails.streetAddress}
            onChange={handleChange}
            placeholder="Street Address"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Geolocation</FormLabel>
          <Input
            name="geolocation"
            value={agentDetails.geolocation}
            onChange={handleChange}
            placeholder="Geolocation"
          />
        </FormControl>
      </SimpleGrid>
    </>
  )
}

const Form3 = ({ agentDetails, handleChange }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Passport Photo and Final Details
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl>
          <FormLabel>Passport Photo</FormLabel>
          <Input
            type="file"
            name="passportPhoto"
            onChange={handleChange}
            accept="image/*"
          />
        </FormControl>
      </SimpleGrid>
    </>
  )
}

export default function AgentForm() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure() // Use Chakra UI's useDisclosure for modal
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)
  const [agentDetails, setAgentDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    businessRegNo: '',
    deviceId: '',
    address: '',
    postalCode: '',
    countryCode: '',
    cityName: '',
    provinceCode: '',
    streetAddress: '',
    geolocation: '',
    passportPhoto: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAgentDetails({ ...agentDetails, [name]: value })
  }

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
        {step === 1 ? (
          <Form1 agentDetails={agentDetails} handleChange={handleChange} />
        ) : step === 2 ? (
          <Form2 agentDetails={agentDetails} handleChange={handleChange} />
        ) : (
          <Form3 agentDetails={agentDetails} handleChange={handleChange} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                  onOpen() // Open the modal on submission
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registration Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Your registration was successful. Waiting for approval.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
