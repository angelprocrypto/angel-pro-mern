"use client";

import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const pricingTierOne = [
  { id: 1, desc: "Greater than $700 USD" },
  { id: 2, desc: "Less than $1087 USD" },
];

const pricingTierTwo = [
  { id: 1, desc: "Greater than $700 USD" },
  { id: 2, desc: "Less than $700 USD" },
];
const pricingTierThree = [
  { id: 1, desc: "Greater than $2151 USD" },
  { id: 2, desc: "Less than $10,000 USD" },
];
const PackageTier = ({ options, typePlan, checked = false }) => {
  const colorTextLight = checked ? "white" : "orange.400";
  const bgColorLight = checked ? "orange.400" : "gray.100";

  const colorTextDark = checked ? "white" : "orange.400";
  const bgColorDark = checked ? "orange.400" : "gray.100";

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "flex-start",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id}>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List>
      <Heading size={"xl"}>{typePlan}</Heading>
      <Stack>
        {/* <Link href="#sell"> */}
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
        >
          Sell Now
        </Button>
        {/* </Link> */}
      </Stack>
    </Stack>
  );
};
const Pricing = () => {
  return (
    <div id="prices">
      <Box py={6} px={5} width="full">
        <Stack spacing={4} width={"100%"} direction={"column"}>
          <Stack
            p={5}
            alignItems={"center"}
            justifyContent={{
              base: "flex-start",
              md: "space-around",
            }}
            direction={{
              base: "column",
              md: "row",
            }}
          >
            <Stack
              width={{
                base: "100%",
                md: "40%",
              }}
              textAlign={"center"}
            >
              <Heading size={"lg"}>
                Better prices as per <Text color="#fe5823">Your Volumes</Text>
              </Heading>
            </Stack>
            <Stack
              width={{
                base: "100%",
                md: "60%",
              }}
            >
              <Text textAlign={"center"}>
                Get best in market rates that supports your trading as your
                volumes grow!
              </Text>
            </Stack>
          </Stack>
          <Divider />
          <PackageTier typePlan="92.00 INR" options={pricingTierOne} />
          <Divider />
          <PackageTier typePlan="93.00 INR" options={pricingTierTwo} />
          <Divider />
          <PackageTier typePlan="94.00 INR" options={pricingTierThree} />
        </Stack>
      </Box>
    </div>
  );
};

export default Pricing;
