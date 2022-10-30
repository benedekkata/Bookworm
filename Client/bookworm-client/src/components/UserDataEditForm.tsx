import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineStar } from "react-icons/ai";
import { BiKey } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Login from "../containers/Login";
import { UserData } from "../helpers/interfaces";
import { BadRequestError, UnauthorizedError } from "../helpers/utils";
import Loading from "../layouts/Loading";
import { isAuthenticated } from "../services/AuthenticationService";
import { updateUserSettings } from "../services/UserService";

const UserDataEditForm = (props: {
  userData: UserData | undefined;
  cancel: Function;
}) => {
  const [failedSettingsChange, setFailedSettingsChange] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    mode: "onSubmit",
    defaultValues: { ...props.userData },
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    setIsLoading(true);
    const isSuccess = await updateUserSettings(data)
      .catch(async (error: UnauthorizedError) => {
        if (!(await isAuthenticated())) navigate("/login");
      })
      .catch((e: BadRequestError) => {
        setReason(e.message);
        setFailedSettingsChange(true);
      });
    if (isSuccess) {
      reset();
      setFailedSettingsChange(false);
    } else {
      setFailedSettingsChange(true);
      if (!reason) setReason("Some error occured!");
    }
    setIsLoading(false);
    props.cancel();
  };

  const settingsChangeError = failedSettingsChange ? (
    <Container mt="2rem">
      <Alert status="error" my="0.5rem" borderRadius="2xl" textAlign="center">
        <AlertIcon />
        {reason}
      </Alert>
    </Container>
  ) : null;

  const content = isLoading ? (
    <Loading></Loading>
  ) : (
    <React.Fragment>
      {settingsChangeError}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} my="2rem">
          <FormControl isInvalid={errors.displayedName !== undefined}>
            <FormLabel>Displayed Name</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiUser color="gray.300" />}
              />
              <Input
                {...register("displayedName", {
                  required: "Displayed Name is required",
                })}
                variant="outline"
                borderRadius="2xl"
                borderColor="brand.100"
                borderWidth="2px"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.displayedName && errors.displayedName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.userName !== undefined}>
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FiUser color="gray.300" />}
              />
              <Input
                {...register("userName", {
                  required: "Username is required",
                })}
                variant="outline"
                borderRadius="2xl"
                borderColor="brand.100"
                borderWidth="2px"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.userName && errors.userName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email !== undefined}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdOutlineEmail color="gray.300" />}
              />
              <Input
                {...register("email", {
                  required: "Email name is required",
                })}
                variant="outline"
                borderRadius="2xl"
                borderColor="brand.100"
                borderWidth="2px"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Sex</FormLabel>
            <Select {...register("sex")} placeholder="Select option">
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="">Don't want to share</option>
            </Select>
            <FormErrorMessage>
              {errors.sex && errors.sex.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.age !== undefined}>
            <FormLabel>Age</FormLabel>
            <Input
              {...register("age", {
                required: "Age can not be empty use 0 unset your age",
              })}
              variant="outline"
              borderRadius="2xl"
              type="number"
              borderColor="brand.100"
              borderWidth="2px"
            />
            <FormErrorMessage>
              {errors.age && errors.age.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Profile Picture URL</FormLabel>
            <Input
              {...register("profileImgUrl")}
              variant="outline"
              borderRadius="2xl"
              borderColor="brand.100"
              borderWidth="2px"
            />
            <FormErrorMessage>
              {errors.profileImgUrl && errors.profileImgUrl.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Flex mt="3rem" justifyContent="right">
          <Button
            mr={2}
            type="submit"
            color="white"
            backgroundColor="brand.100"
          >
            Save
          </Button>
          <Button
            onClick={() => props.cancel()}
            color="white"
            backgroundColor="brand.300"
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </React.Fragment>
  );

  return (
    <Container
      mt="-5rem"
      minW="50%"
      p="2rem"
      backgroundColor="white"
      boxShadow="xl"
    >
      {content}
    </Container>
  );
};

export default UserDataEditForm;
