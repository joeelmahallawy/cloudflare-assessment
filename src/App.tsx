import {
  Button,
  Center,
  Flex,
  Text,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import Posts from "./components/posts";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center flexDir="column">
      <Center flexDir="column" id="header" p={10}>
        <Flex>
          <Heading mr={3}>Welcome to CryptoCloud!</Heading>
          <Button
            bg="none"
            _focus={{}}
            borderRadius="30%"
            _active={{}}
            onClick={toggleColorMode}
          >
            <MdDarkMode />
          </Button>
        </Flex>
        <Text>
          Where people can talk about how much they love cloud computing and
          blockchain technology{" "}
        </Text>
      </Center>
      <Posts />
    </Center>
  );
}

export default App;
