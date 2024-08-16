'use client';
import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import Lottie from 'lottie-react';
import animationData from '../loaders/12345.json'


const InitialLoader: FC = () => {
    return (
        <Box className='loader'>
        <Lottie animationData={animationData
    
        } loop={true} style={{height: 400, width: 400}}/>
        </Box>
    )
};


export default InitialLoader;