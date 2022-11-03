import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiKey } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  PasswordChange,
  UnauthorizedError,
  UserData,
} from "../../helpers/interfaces";
import { BadRequestError } from "../../helpers/utils";
import Loading from "../../layouts/Loading";
import { isAuthenticated } from "../../services/AuthenticationService";
import { changePassword } from "../../services/UserService";

const UserDataCard = (props: {
  userData: UserData | undefined;
  edit: Function;
}) => {
  const navigate = useNavigate();
  const [showPwChange, SetShowPwChange] = useState(false);
  const [failedPwChange, setFailedPwChange] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordChange>();

  const onSubmit: SubmitHandler<PasswordChange> = async (data) => {
    setIsLoading(true);
    const isSuccess = await changePassword(data)
      .catch((e: BadRequestError) => {
        setReason(e.message);
        setFailedPwChange(true);
      })
      .catch(async (error: UnauthorizedError) => {
        if (!(await isAuthenticated())) navigate("/login");
      });
    if (isSuccess) {
      SetShowPwChange(false);
      reset();
      setFailedPwChange(false);
    } else {
      setFailedPwChange(true);
      if (!reason) setReason("Some error occured!");
    }
    setIsLoading(false);
  };

  const password = useRef({});
  password.current = watch("newPassword", "");

  const pwChangeError = failedPwChange ? (
    <Container mt="2rem">
      <Alert status="error" my="0.5rem" borderRadius="2xl" textAlign="center">
        <AlertIcon />
        {reason}
      </Alert>
    </Container>
  ) : null;

  const pwForm = showPwChange ? (
    <React.Fragment>
      {pwChangeError}
      <Flex
        mt="2rem"
        p="2rem"
        justifyContent="center"
        boxShadow="md"
        borderRadius="md"
        border="2px solid"
        borderColor="brand.100"
      >
        <form className="w100 centered-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} w="75%">
            <FormControl isInvalid={errors.oldPassword !== undefined}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiKey color="gray.300" />}
                />
                <Input
                  {...register("oldPassword", {
                    required: "Current Password is required",
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
                {errors.oldPassword && errors.oldPassword.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.newPassword !== undefined}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiKey color="gray.300" />}
                />
                <Input
                  {...register("newPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum length should be 6",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Passwords must be at least 6 characters, must have at least one non alphanumeric character, at least one digit ('0'-'9') and at least one uppercase ('A'-'Z').",
                    },
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
                {errors.newPassword && errors.newPassword.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword !== undefined}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiKey color="gray.300" />}
                />
                <Input
                  {...register("confirmPassword", {
                    required: "Password verification is required",
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
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
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              className="buttonBrandPrimary"
              boxShadow="md"
              type="submit"
              borderRadius="2xl"
              px="1.5rem"
              backgroundColor="brand.100"
              textColor="white"
            >
              Send
            </Button>
          </Stack>
        </form>
      </Flex>
    </React.Fragment>
  ) : (
    ""
  );

  return (
    <React.Fragment>
      <Container
        mt="-5rem"
        minW="50%"
        p="2rem"
        backgroundColor="white"
        boxShadow="xl"
      >
        <Flex>
          <WrapItem>
            <Avatar
              size="2xl"
              boxShadow="xl"
              name={props.userData?.displayedName}
              src={props.userData?.profileImgUrl}
            />{" "}
          </WrapItem>
          <Box w="70%" textAlign="left" ml="3rem">
            <Box>
              <Text color="brand.100" display="inline">
                Displayed Name:
              </Text>{" "}
              {props.userData?.displayedName}
            </Box>
            <Divider />
            <Box>
              {" "}
              <Text color="brand.100" display="inline">
                Username:
              </Text>{" "}
              {props.userData?.userName}
            </Box>
            <Divider />
            <Box>
              {" "}
              <Text color="brand.100" display="inline">
                Email:
              </Text>{" "}
              {props.userData?.email}
            </Box>
            <Divider />
            <Box>
              {" "}
              <Text color="brand.100" display="inline">
                Sex:
              </Text>{" "}
              {props.userData?.sex}
            </Box>
            <Divider />
            <Box>
              {" "}
              <Text color="brand.100" display="inline">
                Age:
              </Text>{" "}
              {props.userData?.age || ""}
            </Box>
          </Box>
        </Flex>
        <Flex mt="8rem" justifyContent="right">
          <Button
            onClick={() => SetShowPwChange(!showPwChange)}
            color="white"
            mr={2}
            backgroundColor={showPwChange ? "brand.300" : "brand.100"}
          >
            {showPwChange ? "Cancel Password Change" : "Change Password"}
          </Button>
          <Button
            onClick={() => props.edit()}
            color="white"
            backgroundColor="brand.100"
          >
            Edit profile
          </Button>
        </Flex>

        {isLoading ? <Loading></Loading> : pwForm}
      </Container>
    </React.Fragment>
  );
};

export default UserDataCard;
