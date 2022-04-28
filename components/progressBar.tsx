import { Box, VStack, Text } from '@chakra-ui/react';

type Props = {
    progress: number;
};

const ProgressBar = ({ progress }: Props) => {
    return (
        <VStack
            w="100%"
            bg="white"
            borderRadius="12px"
            p={8}
            boxShadow="0px 4px 12px rgba(0,0,0,0.1)"
            alignItems="flex-start"
            spacing={4}
        >
            <Text fontSize="1.3rem">Uploading...</Text>
            <Box
                w="90%"
                bg="#F2F2F2"
                h="6px"
                borderRadius="full"
                overflow="hidden"
                alignSelf="center"
            >
                <Box
                    bg="blue.500"
                    h="100%"
                    w={`${progress * 100}%`}
                    transition="ease .1s"
                />
            </Box>
        </VStack>
    );
};

export default ProgressBar;
