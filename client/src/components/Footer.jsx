import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";
import logo from "../assets/logo-no-text.png";
const Logo = (props) => {
  return <Image src={logo} width={100} height={100} alt="AngelPro logo" />;
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6} alignItems="center">
            <Box>
              <Logo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Box align="center">
              <Text fontSize={"sm"}>
                © 2024 AngelPro Online Trading Limited
              </Text>
              <Text fontSize="sm"> All rights reserved</Text>
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Box as="a" href={"#sell"}>
              Sell
            </Box>
            <Box as="a" href={"#features"}>
              Features
            </Box>
            <Box as="a" href={"#prices"}>
              Prices
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box
              as="a"
              href={
                "https://docs.google.com/document/d/1B9NNZfpTVAnmRdvexPzmEAgJe9nWCmMwrp0blFBLpqs/edit?usp=sharing"
              }
              target="_blank"
            >
              Terms & Conditions
            </Box>
            <Box as="a" href={"#testimonials"}>
              Testimonials
            </Box>
            <Link
              href="https://docs.google.com/document/d/1RJJaGGTfJ0zcoZgZpwxvFUIGX7-47A2k7AHol44-3pE/edit?usp=sharing"
              isExternal
            >
              Privacy Policy
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link
              href="https://wa.me/918696300285?text=Hello%2C%20I%20need%20help%20with%20my%20order"
              isExternal
            >
              Whatsapp
            </Link>
            <Box as="a" href={"#contact"}>
              Contact
            </Box>
            {/* <Box as="a" href={"#"}>
              Twitter
            </Box>
            <Box as="a" href={"#"}>
              Dribbble
            </Box>
            <Box as="a" href={"#"}>
              Instagram
            </Box>
            <Box as="a" href={"#"}>
              LinkedIn
            </Box> */}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
