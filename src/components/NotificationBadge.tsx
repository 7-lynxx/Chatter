'use client';

import { BellIcon, EmailIcon } from "@chakra-ui/icons";
import { Badge, Box, Icon } from "@chakra-ui/react";

interface NotifcationBadgeProps {
    messageCount: number;
    notificationCount: number;
}

const NotificationBadge = ({ messageCount, notificationCount }: NotifcationBadgeProps) => {
    return (
        <Box display="flex" gap={4}>
            <Box position='relative' display='inline-block'>
            <Icon as={EmailIcon} w={6} h={6}/>

            {messageCount > 0 && (
                <Badge 
                position='absolute'
                top='-1'
                right='-1'
                fontSize='0.6em'
                colorScheme="red"
                borderRadius='full'>
                    {messageCount}
                </Badge>
            )}
        </Box>
        <Box position='relative' display='inline-block'>
        <Icon as={BellIcon} w={6} h={6} />

{notificationCount > 0 && (
    <Badge 
    position='absolute'
    top='-1'
    right='-1'
    fontSize='0.6em'
    colorScheme="red"
    borderRadius='full'>
        {notificationCount}
    </Badge>
)}
        </Box>
        </Box>

    );
};

export default NotificationBadge;