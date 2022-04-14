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
import React, { useState } from "react";
import logo from "../images/books.png";
import { BiLogInCircle, BiKey } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  signIn,
  signUp,
} from "../services/AuthenticationService";

const Auth = (props: { type: string; setAuthenticated: Function }) => {
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
  const registerForm = (
    <Center>
      <Stack spacing={3} w="75%" my="2rem">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineEmail color="gray.300" />}
          />
          <Input
            variant="outline"
            type="email"
            borderRadius="2xl"
            borderColor="brand.100"
            borderWidth="2px"
            placeholder="Email"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FiUser color="gray.300" />}
          />
          <Input
            variant="outline"
            borderRadius="2xl"
            borderColor="brand.100"
            borderWidth="2px"
            placeholder="Username"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineStar color="gray.300" />}
          />
          <Input
            variant="outline"
            borderRadius="2xl"
            borderColor="brand.100"
            borderWidth="2px"
            placeholder="Display Name"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiKey color="gray.300" />}
          />
          <Input
            type="password"
            variant="outline"
            borderColor="brand.100"
            borderRadius="2xl"
            borderWidth="2px"
            placeholder="Password"
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiKey color="gray.300" />}
          />
          <Input
            type="password"
            variant="outline"
            borderColor="brand.100"
            borderRadius="2xl"
            borderWidth="2px"
            placeholder="Password again"
          />
        </InputGroup>
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
        if (props.type === "login") {
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
        } else {
          signUp("text");
        }
        if (isAuthenticated()) {
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
      {props.type === "login" ? "Sign In" : "Sign Up"}
    </Button>
  );

  const form = props.type === "login" ? loginForm : registerForm;
  return (
    <Flex minH="41.3rem">
      <Center w="60%">
        <Container p="2rem" maxW="2xl">
          <Box fontSize="3xl">
            {props.type === "login"
              ? "Login to your account"
              : "Register a new account"}
          </Box>
          {loginError}
          <Box
            w="100%"
            minH="1rem"
            sx={{ borderBottom: "0.2rem solid gray" }}
          ></Box>
          <Box>{isLoading ? loadingScreen : form}</Box>

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
            {props.type === "login" ? "New here?" : "Already have an account?"}
          </Box>
          <RouterLink to={props.type === "login" ? "/register" : "/login"}>
            <Button
              boxShadow="md"
              borderRadius="2xl"
              px="1.5rem"
              leftIcon={<BiLogInCircle />}
              backgroundColor="white"
              textColor="brand.100"
            >
              {props.type === "login" ? "Sign Up" : "Sign In"}
            </Button>
          </RouterLink>
        </Container>
      </Center>
    </Flex>
  );
};
export default Auth;
