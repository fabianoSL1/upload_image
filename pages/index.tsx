import { Box, Center, Flex, Heading, VStack } from '@chakra-ui/react';
import Drop from '../components/drop';
import type { NextPage } from 'next';
import ProgressBar from '../components/progressBar';
import { useState } from 'react';

const Home: NextPage = () => {
    const [progress, setProgress] = useState<number>();

    const upload = (complete: number) => {
        setProgress(complete);
    };

    if (progress) {
        return (
            <Center>
                <Box marginTop="100px" maxW="280px">
                    <ProgressBar progress={progress} />
                </Box>
            </Center>
        );
    }

    return (
        <Flex bg="#FAFAFB" align="center" justify="center" h="100vh">
            <VStack
                bg="white"
                borderRadius="12px"
                p={8}
                boxShadow="0px 4px 12px rgba(0,0,0,0.1)"
                maxW="400px"
                spacing={12}
            >
                <VStack spacing={6} textAlign="center">
                    <Heading as="h1" size="lg" fontWeight="500" color="#4F4F4F">
                        Upload your image
                    </Heading>
                    <Heading as="h2" size="sm" fontWeight="500" color="#828282">
                        File should be Jpeg, png,...
                    </Heading>
                </VStack>
                <Drop setProgress={upload} />
            </VStack>
        </Flex>
    );
};

export default Home;
