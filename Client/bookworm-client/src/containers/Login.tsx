import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  Stack,
  Image,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import logo from "../assets/images/books.png";
import { BiLogInCircle, BiKey } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, signIn } from "../services/AuthenticationService";

const Login = (props: { setAuthenticated: Function }) => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPw, setIsErrorPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = (
    <Center>
      <Stack spacing={3} w="75%" my="2rem">
        <FormControl isInvalid={isErrorEmail}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdOutlineEmail color="gray.300" />}
            />
            <Input
              variant="outline"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsErrorEmail(e.target.value === "");
              }}
              borderRadius="2xl"
              borderColor="brand.100"
              borderWidth="2px"
              placeholder="Email"
            />
          </InputGroup>
          {!isErrorEmail ? null : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorPw}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiKey color="gray.300" />}
            />
            <Input
              type="password"
              variant="outline"
              borderColor="brand.100"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsErrorPw(e.target.value === "");
              }}
              borderRadius="2xl"
              borderWidth="2px"
              placeholder="Password"
            />
          </InputGroup>
          {!isErrorPw ? null : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
    </Center>
  );

  const loginError = failedLogin ? (
    <Container>
      <Alert status="error" my="0.5rem" borderRadius="2xl" textAlign="center">
        <AlertIcon />
        Failed to login, please check your credentials and try again!
      </Alert>
    </Container>
  ) : null;

  const loadingScreen = (
    <Box mt="2rem" className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );

  const loginButton = (
    <Button
      className="buttonBrandPrimary"
      boxShadow="md"
      borderRadius="2xl"
      px="1.5rem"
      onClick={async () => {
        setIsLoading(true);
        if (email === "") {
          setIsErrorEmail(true);
        }
        if (password === "") {
          setIsErrorPw(true);
        }
        if (!isErrorEmail && !isErrorPw) {
          await signIn({ emailAddress: email, password: password }).catch(
            () => {}
          );
        }
        setIsLoading(false);

        if (await isAuthenticated()) {
          props.setAuthenticated(true);
          setFailedLogin(false);
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/");
          }
        } else if (email !== "" && password !== "") {
          setFailedLogin(true);
        }
      }}
      leftIcon={<BiLogInCircle />}
      backgroundColor="brand.100"
      textColor="white"
    >
      Sign In
    </Button>
  );

  return (
    <Flex minH="41.3rem">
      <Center w="60%">
        <Container p="2rem" maxW="2xl">
          <Box fontSize="3xl">Login to your account</Box>
          {loginError}
          <Box
            w="100%"
            minH="1rem"
            sx={{ borderBottom: "0.2rem solid gray" }}
          ></Box>
          <Box>{isLoading ? loadingScreen : loginForm}</Box>

          <Box>{isLoading ? null : loginButton}</Box>
        </Container>
      </Center>
      <Center w="40%" backgroundColor="brand.100">
        <Container>
          <Image
            display="inline-block"
            boxSize="10rem"
            mb="2rem"
            src={logo}
            alt="Bookworm"
          />
          <Box fontSize="3xl" textColor="white" mb="2rem">
            Already have an account?
          </Box>
          <RouterLink to="/register">
            <Button
              boxShadow="md"
              borderRadius="2xl"
              px="1.5rem"
              leftIcon={<BiLogInCircle />}
              backgroundColor="white"
              textColor="brand.100"
            >
              Sign Up
            </Button>
          </RouterLink>
        </Container>
      </Center>
    </Flex>
  );
};
export default Login;
