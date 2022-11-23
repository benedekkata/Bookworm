import {
  Alert,
  AlertIcon,
  Box,
  Container,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { datePcikerConfig } from "../../config/GeneralConfig";
import { ReadingRecord, UnauthorizedError } from "../../helpers/interfaces";
import { BadRequestError } from "../../helpers/utils";
import Loading from "../../layouts/Loading";
import { isAuthenticated } from "../../services/AuthenticationService";
import {
  editReadingRecord,
  getReadingRecord,
} from "../../services/MyPageDataService";

export const EditReadingForm = React.forwardRef<any, any>((props: {}, ref) => {
  const [failedSettingsChange, setFailedSettingsChange] = useState(false);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");

  const { bookId } = useParams();
  const [rr, setRr] = useState<ReadingRecord | undefined>();

  const clearStartTime = () => {
    setRr({ ...rr, startTime: undefined });
  };
  const clearEndTime = () => {
    setRr({ ...rr, endTime: undefined });
  };

  useEffect(() => {
    getReadingRecord(bookId ? bookId : "").then((rr) => {
      if (rr) {
        const sDate = rr.startTime ? new Date(rr.startTime) : undefined;
        const eDate = rr.endTime ? new Date(rr.endTime) : undefined;
        const newVal: ReadingRecord = {
          ...rr,
          startTime: sDate,
          endTime: eDate,
        };
        setRr({ ...newVal });
      }
    });
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    if (rr) {
      const isSuccess = await editReadingRecord(rr)
        .catch(async (error: UnauthorizedError) => {
          if (!(await isAuthenticated())) navigate("/login");
        })
        .catch((e: BadRequestError) => {
          setReason(e.message);
          setFailedSettingsChange(true);
        });

      if (isSuccess) {
        setFailedSettingsChange(false);
        navigate("/mypage");
      } else {
        setFailedSettingsChange(true);
        if (!reason) setReason("Some error occured!");
      }
    }
    setIsLoading(false);
  };

  useImperativeHandle(ref, () => ({
    submitForm() {
      onSubmit();
    },
  }));

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
    <Box>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Start Time (otional)</FormLabel>
          <InputGroup display="flex" justifyContent="space-between">
            <SingleDatepicker
              name="date-input"
              date={rr?.startTime}
              onDateChange={(v) => setRr({ ...rr, startTime: v })}
              propsConfigs={datePcikerConfig}
            />
            <Icon
              mt={1}
              h={7}
              w={7}
              ml={1}
              color="brand.200"
              _hover={{ cursor: "pointer" }}
              as={MdOutlineCancel}
              onClick={clearStartTime}
            ></Icon>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>End Time (otional)</FormLabel>
          <InputGroup display="flex" justifyContent="space-between">
            <SingleDatepicker
              name="date-input"
              date={rr?.endTime}
              onDateChange={(v) => setRr({ ...rr, endTime: v })}
              propsConfigs={datePcikerConfig}
            />
            <Icon
              mt={1}
              h={7}
              w={7}
              ml={1}
              color="brand.200"
              _hover={{ cursor: "pointer" }}
              as={MdOutlineCancel}
              onClick={clearEndTime}
            ></Icon>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Is current reading?</FormLabel>
          <InputGroup>
            <Switch
              isChecked={rr?.isCurrentReading}
              onChange={(e) => {
                setRr({ ...rr, isCurrentReading: e.target.checked });
              }}
              borderColor="brand.100"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Is my copy?</FormLabel>
          <InputGroup>
            <Switch
              isChecked={rr?.isMyCopy}
              onChange={(e) => {
                setRr({ ...rr, isMyCopy: e.target.checked });
              }}
              borderColor="brand.100"
            />
          </InputGroup>
        </FormControl>
      </Stack>
    </Box>
  );

  return (
    <div>
      {settingsChangeError}
      {content}
    </div>
  );
});
