import {
    Button,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    VStack
} from '@chakra-ui/react';
import Image from 'next/image';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import copy from 'copy-to-clipboard';
import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { app } from '../../lib/firebase';
import { getPlaiceholder } from 'plaiceholder';
import { GetServerSideProps, InferGetServerSidePropsType  } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {

    const storage = getStorage(app);
    // @ts-ignore
    const storageRef = ref(storage, context.params.uuid);
    
    const url = await getDownloadURL(storageRef);

    const { base64, img } = await getPlaiceholder(url);

    return {
        props: {
            img,
            base64
        },

    };
};

const ImageUpload: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    img,
    base64
}) => {
    const [link, setLink] = useState<string>('');

    useEffect(() => {
        if (window) setLink(window.location.toString());
    }, []);

    function copyToClipboard() {
        if (link) copy(link);
    }

    return (
        <Flex bg="#FAFAFB" align="center" justify="center" h="100vh">
            <VStack
                bg="white"
                boxShadow="0px 4px 12px rgba(0,0,0,0.1)"
                padding={6}
                borderRadius="12px"
                spacing={4}
            >
                <Icon
                    as={BsFillCheckCircleFill}
                    boxSize={12}
                    color="green.500"
                />
                <Heading as="h1" size="lg" fontWeight="500" color="#4F4F4F">
                    Uploaded Successfully
                </Heading>

                <Flex
                    position="relative"
                    align="center"
                    justify="center"
                    borderRadius={12}
                    overflow="hidden"
                    maxW="400px"
                >
                    <Image
                        {...img}
                        alt="image"
                        blurDataURL={base64}
                        placeholder="blur"
                        style={{ transition: 'all ease .5' }}
                    />
                </Flex>

                <InputGroup>
                    <Input
                        value={link}
                        isReadOnly
                        width="80%"
                        color="gray.600"
                    />
                    <InputRightElement width="6em">
                        <Button
                            colorScheme="blue"
                            isFullWidth
                            onClick={copyToClipboard}
                        >
                            Copy Link
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </VStack>
        </Flex>
    );
};

export default ImageUpload;
