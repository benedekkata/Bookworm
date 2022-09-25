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
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../assets/images/books.png";
import { BiLogInCircle, BiKey } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, signUp } from "../services/AuthenticationService";
import { RegisterData } from "../helpers/interfaces";
import Loading from "../layouts/Loading";

const Register = (props: { setAuthenticated: Function }) => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPw, setIsErrorPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const regData: RegisterData = {
    emailAddress: "",
    password: "",
    displayName: "",
    username: "",
  };
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

  const loginButton = (
    <Button
      className="buttonBrandPrimary"
      boxShadow="md"
      borderRadius="2xl"
      px="1.5rem"
      onClick={async () => {
        await signUp(regData);

        if (await isAuthenticated()) {
          props.setAuthenticated(true);
          setFailedLogin(false);
          if (location.state?.from) {
            navigate(location.state.from);
            console.log(location.state.from);
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
      Sign Up
    </Button>
  );
  return (
    <Flex minH="41.3rem">
      <Center w="60%">
        <Container p="2rem" maxW="2xl">
          <Box fontSize="3xl">Register a new account</Box>
          {loginError}
          <Box
            w="100%"
            minH="1rem"
            sx={{ borderBottom: "0.2rem solid gray" }}
          ></Box>
          <Box>{isLoading ? <Loading /> : registerForm}</Box>

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
          <RouterLink to="/login">
            <Button
              boxShadow="md"
              borderRadius="2xl"
              px="1.5rem"
              leftIcon={<BiLogInCircle />}
              backgroundColor="white"
              textColor="brand.100"
            >
              Sign In
            </Button>
          </RouterLink>
        </Container>
      </Center>
    </Flex>
  );
};
export default Register;
