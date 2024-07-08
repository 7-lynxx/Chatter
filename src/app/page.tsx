

import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const mdContent = `#Hello, Markdown!
  
  This is a **sample** Markdown Content using \`MarkdownRenderer\`.

  \`\`\`javascript
  console.log("Hello World");
  \`\`\`
  `;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">

          Welcome to Chatter...
      </Text>
      {/* <nav>
        <List>
          <ListItem>
            <Link href="/login">
             Log in 
            </Link>
          </ListItem>

          <ListItem>
            <Link href='/register'>
             Register
            </Link>
          </ListItem>
          <ListItem>

            <Link href="/profile">
            profile
            </Link>
          </ListItem>
        </List>
      </nav> */}
    
      </Box>
    </main>
  );
}
