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
  FormLabel,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAsyncFn, useUpdate } from "react-use";
import { UserPosts } from "../interfaces/userPosts";
import { MdDarkMode } from "react-icons/md";
import months from "../configs/months";
import { BiUpArrow } from "react-icons/bi";
import addPost from "../helpers/addPost";

const Posts = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [postContent, setpostContent] = useState("");
  const [postTitle, setpostTitle] = useState("");
  const [userName, setuserName] = useState("");

  const [state, doFetch] = useAsyncFn(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8787/posts");
      if (!response.ok) throw new Error("Could not fetch posts");
      const resData = await response.json();
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
          </Center>
        ))
      ) : (
        <Center h="100vh">
          <Spinner width="200px" height="200px" thickness="5px" speed=".5s" />
        </Center>
      )}
      <Flex w="30%" flexDir="column" p={5} borderRadius="10">
        <>
          <FormControl isRequired id="email">
            <FormLabel>User name</FormLabel>
            <Input
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
              mb={1}
              type="text"
              onChange={(e) => {
                setpostTitle(e.target.value);
              }}
              placeholder="Title of post"
            />
            <Textarea
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
            onClick={() => {
              addPost(userName, postContent, postTitle);
              doFetch();
            }}
            _focus={{}}
            _hover={{ bg: "#1b85ce" }}
            bg="#1d9bf0"
            color="white"
          >
            <Link href={window.location.href}>Post!</Link>
          </Button>
        </>
      </Flex>
    </>
  );
};
export default Posts;
