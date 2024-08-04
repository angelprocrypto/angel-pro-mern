import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Link,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-no-text.png";
import { getItem, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const clearAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
};
const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useSelector((state) => state.appConfigReducer.userData);

  useEffect(() => {
    const token = getItem(KEY_ACCESS_TOKEN);
    if (token) {
      try {
        if (user?.phone == "918766492553") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  }, [user]);
  const token = getItem(KEY_ACCESS_TOKEN);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    clearAllCookies();
    navigate("/login");
  };
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image src={logo} width={50} height={50} alt="AngelPro logo" />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!token ? (
            <Button
              className=""
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#fe5823"}
              _hover={{
                bg: "#fe5823",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </Button>
          ) : (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#fe5823"}
              _hover={{
                bg: "#fe5823",
              }}
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </Button>
          )}
          {isAdmin ? (
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#fe5823"}
              _hover={{
                bg: "#fe5823",
              }}
              onClick={() => {
                navigate(
                  "/isjvkvspokrgirjctqjorigjfmaklmcefkmwoevjgipljmcgniovqjfov90rgjosjerg2qjcrojg"
                );
              }}
            >
              Admin Panel
            </Button>
          ) : (
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
                Customer Support
              </Button>
            </Link>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} alignItems="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useSelector((state) => state.appConfigReducer.userData);
  const token = getItem(KEY_ACCESS_TOKEN);

  useEffect(() => {
    if (token) {
      try {
        if (user?.phone == "918766492553") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  }, [user]);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    clearAllCookies();
    navigate("/login");
  };
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <div>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </div>
      <div className=" mt-4">
        {!token ? (
          <Button
            className=""
            display={{ base: "inline-flex", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#fe5823"}
            _hover={{
              bg: "#fe5823",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </Button>
        ) : (
          <Button
            display={{ base: "inline-flex", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#fe5823"}
            _hover={{
              bg: "#fe5823",
            }}
            onClick={() => {
              logOut();
            }}
          >
            Log Out
          </Button>
        )}
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
            Customer Support
          </Button>
        </Link>
        {isAdmin ? (
          <Button
            className="ml-4"
            display={{ md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#fe5823"}
            _hover={{
              bg: "#fe5823",
            }}
            onClick={() => {
              navigate(
                "/isjvkvspokrgirjctqjorigjfmaklmcefkmwoevjgipljmcgniovqjfov90rgjosjerg2qjcrojg"
              );
            }}
          >
            Admin Panel
          </Button>
        ) : (
          <Link
            href="https://wa.me/918696300285?text=Hello%2C%20I%20need%20help%20with%20my%20order"
            isExternal
          >
            <Button
              className="ml-4"
              display={{ md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#fe5823"}
              _hover={{
                bg: "#fe5823",
              }}
            >
              Customer Support
            </Button>
          </Link>
        )}
      </div>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Sell",
    href: "#sell",
  },
  {
    label: "Prices",
    href: "#prices",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },

  {
    label: "Contact",
    href: "#contact",
  },
];

export default Header;
