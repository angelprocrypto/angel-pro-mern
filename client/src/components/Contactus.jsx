"use client";

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Link,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { EmailIcon, MoonIcon, PhoneIcon } from "@chakra-ui/icons";

export default function Contactus() {
  return (
    <div id="contact">
      <Container
        bg="orange.50"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
          <Box
            bg="#222222"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading color="#fe5823" size="2xl">
                      Contact Us
                    </Heading>
                    {/* <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      Fill up the form below to contact
                    </Text> */}
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Text color="#bebebe" fontWeight="bold">
                          {" "}
                          <PhoneIcon color="#bebebe" size="20px" /> &nbsp;
                          +91-8696300285
                        </Text>
                        <Text color="#bebebe" fontWeight="bold">
                          {" "}
                          <EmailIcon color="#bebebe" size="20px" />
                          &nbsp; hello@angelpro.online
                        </Text>
                        <Text color="#bebebe" fontWeight="bold">
                          {" "}
                          <MoonIcon color="#bebebe" size="20px" /> &nbsp;
                          Bangalore, India
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
                <WrapItem w={{ base: "100%", lg: "auto" }}>
                  <Box
                    bg="white"
                    borderRadius="lg"
                    w={{ base: "100%", lg: "auto" }}
                  >
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup>
                            <Input type="text" size="md" placeholder="John" />
                          </InputGroup>
                        </FormControl>
                        <FormControl id="message">
                          <FormLabel>Message</FormLabel>
                          <Textarea placeholder="Your query" />
                        </FormControl>
                        <FormControl float="right">
                          <Link
                            href="https://wa.me/918696300285?text=Hello%2C%20I%20need%20help%20with%20my%20order"
                            isExternal
                          >
                            <Button
                              // as={"a"}
                              display={{ base: "none", md: "inline-flex" }}
                              fontSize={"sm"}
                              fontWeight={600}
                              color={"white"}
                              bg={"#fe5823"}
                              _hover={{
                                bg: "#fe5823",
                              }}
                            >
                              Send query
                            </Button>
                          </Link>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}
