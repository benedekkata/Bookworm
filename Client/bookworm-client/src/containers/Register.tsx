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
  FormLabel,
  FormErrorMessage,
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
import { SubmitHandler, useForm } from "react-hook-form";

const Register = (props: { setAuthenticated: Function }) => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const [failedRegister, setFailedRegister] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>();
  const onSubmit: SubmitHandler<RegisterData> = (data) => console.log(data);

  const regForm = (
    <Center w="100%">
      <form className="w75" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} my="2rem">
          <FormControl isInvalid={errors.emailAddress !== undefined}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdOutlineEmail color="gray.300" />}
              />
              <Input
                {...register("emailAddress", {
                  required: "Email is required",
                })}
                variant="outline"
                type="email"
                borderRadius="2xl"
                borderColor="brand.100"
                borderWidth="2px"
                placeholder="Email"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.emailAddress && errors.emailAddress.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.username !== undefined}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiUser color="gray.300" />}
              />
              <Input
                {...register("username", {
                  required: "Username is required",
                })}
                variant="outline"
                borderRadius="2xl"
                borderColor="brand.100"
                borderWidth="2px"
                placeholder="Username"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.displayName !== undefined}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineStar color="gray.300" />}
              />
              <Input
                {...register("displayName", {
                  required: "Display name is required",
                })}
                variant="outline"
                borderRadius="2xl"
                borderColor="brand.100"
                borderWidth="2px"
                placeholder="Display Name"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.displayName && errors.displayName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password !== undefined}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiKey color="gray.300" />}
              />
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
                variant="outline"
                borderColor="brand.100"
                borderRadius="2xl"
                borderWidth="2px"
                placeholder="Password"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.passwordVerification !== undefined}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiKey color="gray.300" />}
              />
              <Input
                {...register("passwordVerification", {
                  required: "Password verification is required",
                })}
                type="password"
                variant="outline"
                borderColor="brand.100"
                borderRadius="2xl"
                borderWidth="2px"
                placeholder="Password again"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.passwordVerification &&
                errors.passwordVerification.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            className="buttonBrandPrimary"
            boxShadow="md"
            type="submit"
            borderRadius="2xl"
            px="1.5rem"
            leftIcon={<BiLogInCircle />}
            backgroundColor="brand.100"
            textColor="white"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Center>
  );

  const registerError = failedRegister ? (
    <Container>
      <Alert status="error" my="0.5rem" borderRadius="2xl" textAlign="center">
        <AlertIcon />
        Failed to register, please check your data and try again!
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

  return (
    <Flex minH="41.3rem">
      <Center w="60%">
        <Container p="2rem" maxW="2xl">
          <Box fontSize="3xl">Register a new account</Box>
          {registerError}
          <Box
            w="100%"
            minH="1rem"
            sx={{ borderBottom: "0.2rem solid gray" }}
          ></Box>
          <Box>{isSubmitting ? loadingScreen : regForm}</Box>
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
