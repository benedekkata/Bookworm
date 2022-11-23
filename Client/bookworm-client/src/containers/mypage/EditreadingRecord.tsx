import { Box, Button, Container, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UnauthorizedError } from "../../helpers/interfaces";
import { isAuthenticated } from "../../services/AuthenticationService";
import { deleteReadingRecordByBookId } from "../../services/MyPageDataService";
import { EditReadingForm } from "./EditForm";

const EditreadingRecord = () => {
  const submitRef = useRef<any>(null);

  const onClick = (event: any) => {
    if (submitRef && submitRef.current) {
      submitRef.current.submitForm();
    }
  };
  const navigate = useNavigate();

  const { bookId } = useParams();
  const deleteReadingRecord = async () => {
    const isSuccess = await deleteReadingRecordByBookId(
      bookId ? bookId : ""
    ).catch(async (error: UnauthorizedError) => {
      if (!(await isAuthenticated())) navigate("/login");
    });
    if (isSuccess) {
      navigate("/mypage");
    }
  };

  return (
    <Container mt={5}>
      <EditReadingForm ref={submitRef}></EditReadingForm>
      <Flex mt={5} justifyContent="end">
        <Button
          color="white"
          onClick={onClick}
          key="submit"
          background="brand.100"
          mr={3}
        >
          Save
        </Button>
        <Button
          backgroundColor="brand.300"
          onClick={deleteReadingRecord}
          color="white"
        >
          Delete
        </Button>
      </Flex>
    </Container>
  );
};
export default EditreadingRecord;
