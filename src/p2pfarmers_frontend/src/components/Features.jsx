'use client'

import { Box, SimpleGrid, Text, Stack, Flex, Img, Heading } from '@chakra-ui/react'
import ScrollAnimationWrapper from '../styles/ScrollAnimationWrapper'
import getScrollAnimation from '../styles/getScrollAnimation'

const Feature = ({ title, text, image }) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}
                overflow="hidden" // Ensures the image fits the rounded shape
            >
                <Img src={image} alt={title} boxSize="full" objectFit="cover" /> {/* Adjust to cover the full container */}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    )
}

export default function SimpleThreeColumns() {
    return (
        <ScrollAnimationWrapper>
            <Box p={4}>
                <Heading color={'green.400'} as="h2" size="lg" mb={6} textAlign="center">

                    What We Offer
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Feature
                        title={'Global Access'}
                        text={
                            'Connect with farmers from all over the world and purchase fresh produce directly from the source, ensuring quality and sustainability.'
                        }
                        image="/food2.png"
                    />
                    <Feature
                        title={'Fair Pricing'}
                        text={
                            'Support farmers by paying fair prices for their products. Our platform ensures transparency and fairness in every transaction. Agents and products are thoroughly tested.'
                        }
                        image="/onion.jpg"
                    />
                    <Feature
                        title={'DHL Delivery'}
                        text={
                            'Enjoy reliable and fast delivery of your food purchases through our partnership with DHL, bringing farm-fresh products directly to your door.'
                        }
                        image="/pepper.jpg"
                    />
                </SimpleGrid>
            </Box>
        </ScrollAnimationWrapper>

    )
}
