import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import Posts from "./components/posts";
// import { Button } from "@chakra-ui/button";

function App() {
  return (
    <>
      <Center flexDir="column">
        <Posts />
        {/* <Flex id="header" bg="gray" justifyContent="space-between" p={3}>
          <Heading>CloudBook</Heading>
          <Box h="100px" w="200px">
            <Image
              w="100%"
              h="100%"
              src="https://apply.cloudflareworkers.com/Cloudflare-emblem-1024x726.jpeg"
            />
          </Box>
        </Flex> */}
      </Center>
    </>
  );
}

export default App;
// http://127.0.0.1:8787/posts
