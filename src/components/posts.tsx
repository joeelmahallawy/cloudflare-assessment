import {
  Box,
  Center,
  Spinner,
  Text,
  Textarea,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useAsyncFn } from "react-use";
import { UserPosts } from "../interfaces/userPosts";
import addPost from "../serverFunc/addPost";
import { API_ENDPOINT } from "../configs/configs";

const Posts = () => {
  const content = useRef(null);
  const title = useRef(null);
  const user = useRef(null);
  const [postContent, setpostContent] = useState("");
  const [postTitle, setpostTitle] = useState("");
  const [userName, setuserName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [state, doFetch] = useAsyncFn(async () => {
    try {
      const response = await fetch(API_ENDPOINT);
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
      {state.value ? (
        state.value
          .slice(0)
          .reverse()
          .map((post: UserPosts, i: number) => (
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
              ref={user}
              placeholder="Please enter your username (max. 20 characters)"
              onChange={(e) => {
                setuserName(e.target.value);
              }}
              type="text"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel mt={8}>Title</FormLabel>
            <Input
              ref={title}
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
              ref={content}
              onChange={(e) => {
                console.log(e.target.value);
                setpostContent(e.target.value);
              }}
            />
          </FormControl>
          <Center justifyContent="space-between" color="gray" fontSize="sm">
            {showSuccess && (
              <Alert status="success">
                <AlertIcon />
                Post uploaded to the KV DB. Please refresh after ~20 seconds!
              </Alert>
            )}
            {showError && (
              <Alert status="error">
                <AlertIcon />
                Please fill out all fields!
              </Alert>
            )}
            <Button
              size="lg"
              colorScheme="darkblue"
              onClick={() => {
                if (userName.length <= 20 && postContent && postTitle) {
                  addPost(userName, postContent, postTitle);
                  doFetch();
                  setShowSuccess(true);
                  setTimeout(() => {
                    setShowSuccess(false);
                  }, 5000);
                  // @ts-expect-error
                  user.current.value = "";
                  // @ts-expect-error
                  title.current.value = "";
                  // @ts-expect-error
                  content.current.value = "";
                } else {
                  setTimeout(() => {
                    setShowError(false);
                  }, 5000);
                  setShowError(true);
                }
              }}
              ml="auto"
              _focus={{}}
              _hover={{ bg: "#1b85ce" }}
              bg="#1d9bf0"
              color="white"
            >
              Post!
            </Button>
          </Center>
        </>
      </Flex>
    </>
  );
};
export default Posts;
