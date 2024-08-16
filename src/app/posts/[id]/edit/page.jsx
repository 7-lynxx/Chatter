'use client'
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function ComingSoon() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
            px={4}
        >
            <VStack spacing={6} textAlign="center">
                <Text fontSize="3xl" fontWeight="bold">
                    🚧 Coming Soon 🚧
                </Text>
                <Text fontSize="lg">
                    The edit feature is currently under construction. Stay tuned!
                </Text>
                <Button colorScheme="teal" onClick={handleGoHome}>
                    Return to Home
                </Button>
            </VStack>
        </Box>
    );
}