import {
    Button,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    VStack
} from '@chakra-ui/react';
import Image from 'next/image';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { app } from '../../lib/firebase';

const ImageUpload = () => {
    const router = useRouter();
    const [link, setLink] = useState<string>();
    const [path, setPath] = useState<string>('');

    const { uuid } = router.query;

    useEffect(() => {
        if (window) setPath(window.location.href);
    }, []);

    useEffect(() => {
        if (!uuid) return;

        const storage = getStorage(app);
        // @ts-ignore
        const storageRef = ref(storage, uuid);

        getDownloadURL(storageRef).then((url) => {
            setLink(url);
        });
    }, [uuid]);

    function copyToClipboard() {
        copy(path);
    }

    const image = link ? (
        <Image src={link} layout="fill" alt="image" />
    ) : (
        <Spinner />
    );

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
                    width={400}
                    height={300}
                    align="center"
                    justify="center"
                    borderRadius={12}
                    overflow="hidden"
                >
                    {image}
                </Flex>

                <InputGroup>
                    <Input
                        value={path}
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
