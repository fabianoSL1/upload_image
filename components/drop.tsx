import { Button, Flex, VStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createTask, getAsByteArray } from '../lib/utils';
import { v4 } from 'uuid';
import background from '../public/background_upload.svg';
import { useRouter } from 'next/router';

type Props = {
    setProgress: Function;
};

const Drop = ({ setProgress }: Props) => {
    const route = useRouter();

    const onDrop = useCallback(
        (files: Array<File>) => {
            const uuid = v4();

            getAsByteArray(files[0]).then((bytes) => {
                const taskUpload = createTask(uuid, files[0].type, bytes);

                taskUpload.on('state_changed', (snapshot) => {
                    let complete =
                        snapshot.bytesTransferred / snapshot.totalBytes;
                    setProgress(complete);
                });

                taskUpload.then(() => {
                    route.push(`/image/${uuid}`);
                });
            });
        },
        [setProgress, route]
    );

    const { getRootProps, getInputProps, open } = useDropzone({ onDrop });

    return (
        <VStack spacing={8} align="flex-start" alignItems="center">
            <Flex
                {...getRootProps()}
                direction="column"
                h="220px"
                w="340px"
                border="1px dashed #97BEF4"
                borderRadius="12px"
                boxSizing="border-box"
                alignItems="center"
                justify="center"
                gap={5}
                bg="#F6F8FB"
            >
                <input {...getInputProps()} />

                <Image src={background} alt="background image" />

                <Text color="#828282">Drag &#38; Drop your image here</Text>
            </Flex>

            <Text color="#828282">Or</Text>

            <Button
                onClick={open}
                bg="#2F80ED"
                color="white"
                fontWeight="500"
                fontSize="12px"
                borderRadius="8px"
                _hover={{ bg: '#2F80ED' }}
            >
                Chose your file
            </Button>
        </VStack>
    );
};

export default Drop;
