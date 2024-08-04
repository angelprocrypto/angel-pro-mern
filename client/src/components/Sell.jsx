import {
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import ExchangePage from "./Exchange";

const Sell = () => {
  return (
    <div id="sell">
      <Container
        className="bg-[#222222]"
        as={SimpleGrid}
        maxW={"10xl"}
        spacing={{ base: 10, lg: 10 }}
        p={0}
      >
        <Stack direction={{ base: "column", md: "row" }}>
          <Flex className="bg-[#222222]" flex={1}>
            <Stack p={{ base: 4, sm: 6, md: 8 }} flex="1" width="100%">
              <Stack spacing={2} align="center">
                <Heading
                  className="text-neutral-100"
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  Sell&nbsp;
                  <Text
                    as={"span"}
                    bgGradient="linear(to-r, #fe5823, #fe5823)"
                    bgClip="text"
                  >
                    USDT
                  </Text>
                </Heading>
              </Stack>
              <ExchangePage />
              <p className="text-xs text-yellow-600 bg-yellow-100 p-2 rounded-md border border-yellow-300 mt-4">
                ⚠ For the safety of your funds, please note that the recharge
                address for each order is different. Please double-check
                carefully to avoid the risk of irretrievable funds.
              </p>
            </Stack>
          </Flex>
        </Stack>
      </Container>
    </div>
  );
};

export default Sell;
