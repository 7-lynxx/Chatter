'use client';
import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import Lottie from 'lottie-react';
import animationData from '../loaders/12345 2.json'

const RouteLoader: FC =() => {
    return (
        <Box className='loader'>
        <Lottie animationData={animationData
    
        } loop={false} style={{height: 200, width: 200}}/>
        </Box>
    )
};

export default RouteLoader;