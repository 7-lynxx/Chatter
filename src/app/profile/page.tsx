'use client';
import React from "react";
import { useAuth  } from "@/contexts/AuthContext";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import ProtectedRoute from "@/components/ProtectedRoute";

const ProfilePage =()=>{
    const { user, signOutUser} = useAuth();

    return (
        <ProtectedRoute>

        <Box>
            <Heading>
                Profile Page
            </Heading>
           {user ?( <Box>
                <Text>
                    {/* email: {user.email}
                 */}
                 Wecome to your profile section
                </Text>
                <Button onClick={signOutUser}> Sign Out </Button>
            </Box>) : ( <Box>
                <Text>
                   Log In
                </Text>
            </Box>)}
        </Box>
        </ProtectedRoute>
    )
};

export default ProfilePage;