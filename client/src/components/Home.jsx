import * as React from "react";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Button,
  SimpleGrid,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div id="sell">
      <Container
        as={SimpleGrid}
        maxW={"10xl"}
        spacing={{ base: 10, lg: 32 }}
        p={0}
      >
        <Stack direction={{ base: "column", md: "row" }}>
          <Flex p={8} flex={1} align={"center"} justify={"center"} bg="#222222">
            <Stack spacing={6} w={"full"} maxW={"lg"}>
              <Stack direction={"row"}>
                <Text
                  textTransform={"uppercase"}
                  color={"orange.200"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg={useColorModeValue("orange.500", "orange.900")}
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  +32K Trades
                </Text>
                <Text
                  textTransform={"uppercase"}
                  fontWeight={600}
                  fontSize={"sm"}
                  bg="#0a0a0a"
                  p={2}
                  alignSelf={"flex-start"}
                  rounded={"md"}
                >
                  {/* <Image
                  src="https://www.supa-palette.com/images/brands/gumroad.svg"
                  width="10"
                  display="inline"
                /> */}
                   ⭐️ ⭐️ ⭐️ ⭐️ ⭐️
                </Text>
              </Stack>

              <Heading fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}>
                <Text
                  as={"span"}
                  position={"relative"}
                  _after={{
                    content: "''",
                    width: "full",
                    height: useBreakpointValue({ base: "20%", md: "30%" }),
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    bg: "#fe5823",
                    zIndex: -1,
                  }}
                  color="white"
                >
                  AngelPro.Online
                </Text>
                <br />{" "}
                <Text color={"#fe5823"} as={"span"}>
                  Trade USDT
                </Text>{" "}
              </Heading>
              <Text fontSize={{ base: "3xl", lg: "2xl" }} color="#bebebe">
                Angel pro is the #1 place to buy and sell USDT which is free,
                and safe with 24/7 support.
              </Text>
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Button
                  size="lg"
                  w={{ base: "full", md: "100%" }}
                  bg={"#fe5823"}
                  color={"white"}
                >
                  Price
                </Button>
                <Button
                  size="lg"
                  w={{ base: "full", md: "100%" }}
                  variant="outline"
                  color="white"
                  hover={{ color: "black" }}
                >
                  Contact Us
                </Button>
                <Button
                  as={"a"}
                  w={{ base: "full", md: "100%" }}
                  fontSize={"sm"}
                  size="lg"
                  fontWeight={600}
                  // variant={"link"}
                  href={"#"}
                  color={"white"}
                  bg={"blue"}
                  _hover={{
                    bg: "red",
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
