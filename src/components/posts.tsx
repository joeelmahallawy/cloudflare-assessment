import {
  Box,
  Center,
  Heading,
  Spinner,
  Text,
  Textarea,
  Flex,
  Button,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAsyncFn, useUpdate } from "react-use";
import { UserPosts } from "../interfaces/userPosts";
import { MdDarkMode } from "react-icons/md";
import months from "../configs/months";

const Posts = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [userHasPosted, setUserHasPosted] = useState(false);
  const [postContent, setpostContent] = useState("");
  const [postTitle, setpostTitle] = useState("");
  const [userName, setuserName] = useState("");
  const [state, doFetch] = useAsyncFn(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8787/posts");
      if (!response.ok) throw new Error("Could not fetch posts");
      const resData = await response.json();
      console.log(resData);
      return resData;
    } catch (error) {
      alert(error);
    }
  }, []);
  useEffect(() => {
    doFetch();
  }, []);

  return (
    <>
      <Center flexDir="column" id="header" p={10}>
        <Flex>
          <Heading mr={3}>Welcome to CryptoCloud!</Heading>
          <Button
            bg="none"
            _focus={{}}
            // _hover={{}}
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
      {state.value ? (
        state.value.map((post: UserPosts, i: number) => (
          <Center
            border="1px solid gray"
            w="30%"
            key={i}
            p={3}
            m={3}
            flexDir="column"
          >
            <Box w="100%" p={3}>
              <Flex>
                <Text mr={3}>@{post.username}</Text>
                <Text color="gray.500">• {post.postedAt}</Text>
              </Flex>
              <Text
                borderBottom="1px solid gray"
                fontWeight="bold"
                fontSize="110%"
                p={1}
                mb={5}
              >
                {post.title}
              </Text>
              <Text>{post.content} </Text>
            </Box>
            <Flex ml="auto">
              <Button
                mr={3}
                _focus={{}}
                _hover={{ bg: "#1b85ce" }}
                color="white"
                bg="#1d9bf0"
              >
                Like
              </Button>
            </Flex>
          </Center>
        ))
      ) : (
        <Center h="100vh">
          <Spinner width="200px" height="200px" thickness="5px" speed=".5s" />
        </Center>
      )}
      <Flex w="30%" flexDir="column" p={5} borderRadius="10">
        {userHasPosted || (
          <>
            <FormControl isRequired id="email">
              <FormLabel>User name</FormLabel>
              <Input
                bg={colorMode === "dark" ? "gray.500" : "gray.200"}
                _hover={{}}
                _placeholder={{
                  color: colorMode === "dark" ? "gray.200" : "gray",
                }}
                variant="outline"
                _focus={{}}
                placeholder="Please enter your username"
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                type="text"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel mt={8}>Title</FormLabel>
              <Input
                bg={colorMode === "dark" ? "gray.500" : "gray.200"}
                _hover={{}}
                _placeholder={{
                  color: colorMode === "dark" ? "gray.200" : "gray",
                }}
                _focus={{}}
                variant="filled"
                mb={1}
                type="text"
                onChange={(e) => {
                  setpostTitle(e.target.value);
                }}
                placeholder="Title of post"
              />
              <Textarea
                bg={colorMode === "dark" ? "gray.500" : "gray.200"}
                _hover={{}}
                _placeholder={{
                  color: colorMode === "dark" ? "gray.200" : "gray",
                }}
                _focus={{}}
                variant="filled"
                placeholder="What's on your mind?"
                mb={2}
                onChange={(e) => {
                  setpostContent(e.target.value);
                }}
              />
            </FormControl>
            <Button
              size="lg"
              ml="auto"
              colorScheme="darkblue"
              onClick={async () => {
                if (userName.length < 20 && postContent && postTitle) {
                  fetch("http://127.0.0.1:8787/posts", {
                    method: "POST",
                    body: JSON.stringify({
                      title: postTitle,
                      content: postContent,
                      username: userName,
                      postedAt: `${
                        months[new Date().getMonth()]
                      } ${new Date().getDate()}, ${new Date().getFullYear()}`,
                    }),
                    mode: "no-cors",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  });
                  doFetch();
                  // setSubmittedPost(true);
                  // updateMe();
                  setUserHasPosted(true);
                } else {
                  alert("Please fill out data or make username shorter");
                }
                //
              }}
              _focus={{}}
              _hover={{ bg: "#1b85ce" }}
              bg="#1d9bf0"
              color="white"
            >
              <Link href={window.location.href}>Post!</Link>
              {/* Post! */}
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};
export default Posts;
