import {
  Box,
  Image,
  Container,
  Flex,
  WrapItem,
  Avatar,
  Button,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import whiteLogo from "../../assets/images/white_book.png";
import whiteLogoRight from "../../assets/images/white_book_right.png";
import UserDataCard from "./UserDataCard";
import UserDataEditForm from "./UserDataEditForm";
import { UnauthorizedError, UserData } from "../../helpers/interfaces";
import { isAuthenticated } from "../../services/AuthenticationService";
import { getUserSettings } from "../../services/UserService";

const UserSettings = () => {
  const [userData, setUserData] = useState<UserData>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserSettings()
      .then(setUserData)
      .catch(async (error: UnauthorizedError) => {
        if (!(await isAuthenticated())) navigate("/login");
      });
  });

  const content = isEditing ? (
    <UserDataEditForm
      userData={userData}
      cancel={() => {
        setIsEditing(false);
      }}
    ></UserDataEditForm>
  ) : (
    <UserDataCard
      userData={userData}
      edit={() => setIsEditing(true)}
    ></UserDataCard>
  );

  return (
    <React.Fragment>
      <Flex minH="10rem" backgroundColor="brand.100">
        <Image
          className="removeMobile"
          borderRadius="10px"
          w="15rem"
          h="15rem"
          position="absolute"
          mt="-5px"
          opacity="75%"
          src={whiteLogo}
          alt="Bookworm"
        />
        <Image
          className="removeMobile"
          borderRadius="10px"
          w="13rem"
          h="13rem"
          right="0"
          position="absolute"
          mt="-75px"
          opacity="75%"
          src={whiteLogoRight}
          alt="Bookworm"
        />
      </Flex>
      {content}
    </React.Fragment>
  );
};

export default UserSettings;
