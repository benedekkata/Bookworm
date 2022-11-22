import {
  Alert,
  AlertIcon,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Switch,
  Icon,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import React, {
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { datePcikerConfig } from "../../config/GeneralConfig";
import { ReadingRecord, UnauthorizedError } from "../../helpers/interfaces";
import { BadRequestError } from "../../helpers/utils";
import Loading from "../../layouts/Loading";
import { isAuthenticated } from "../../services/AuthenticationService";
import {
  editReadingRecord,
  saveBook,
  saveBookWishList,
} from "../../services/MyPageDataService";

export const SaveFormReading = React.forwardRef<any, any>(
  (
    props: { closeModal: any; isEditMode: boolean; bookIdForEdit: string },
    ref
  ) => {
    const [failedSettingsChange, setFailedSettingsChange] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState("");

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ReadingRecord>({
      mode: "onSubmit",
    });

    const navigate = useNavigate();
    const { isbn } = useParams();
    const [pdStart, setPdStart] = useState<Date | undefined>();
    const [pdEnd, setPdEnd] = useState<Date | undefined>();

    const clearStartTime = () => {
      setPdStart(undefined);
    };
    const clearEndTime = () => {
      setPdEnd(undefined);
    };

    const onSubmit: SubmitHandler<ReadingRecord> = async (data) => {
      setIsLoading(true);
      data.startTime = pdStart;
      data.endTime = pdEnd;
      if (data) {
        let isSuccess: boolean | any = false;
        if (!props.isEditMode) {
          isSuccess = await saveBook(data, isbn)
            .catch(async (error: UnauthorizedError) => {
              if (!(await isAuthenticated())) navigate("/login");
            })
            .catch((e: BadRequestError) => {
              setReason(e.message);
              setFailedSettingsChange(true);
            });
        } else {
          data.bookId = props.bookIdForEdit;
          isSuccess = await editReadingRecord(data)
            .catch(async (error: UnauthorizedError) => {
              if (!(await isAuthenticated())) navigate("/login");
            })
            .catch((e: BadRequestError) => {
              setReason(e.message);
              setFailedSettingsChange(true);
            });
        }

        if (isSuccess) {
          reset();
          setFailedSettingsChange(false);
          props.closeModal();
        } else {
          setFailedSettingsChange(true);
          if (!reason) setReason("Some error occured!");
        }
      }
      setIsLoading(false);
    };

    useImperativeHandle(ref, () => ({
      submitForm() {
        handleSubmit(onSubmit)();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} my="2rem">
          <FormControl isInvalid={errors.startTime !== undefined}>
            <FormLabel>Start Time (otional)</FormLabel>
            <InputGroup display="flex" justifyContent="space-between">
              <SingleDatepicker
                name="date-input"
                date={pdStart}
                onDateChange={setPdStart}
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
            <FormErrorMessage>
              {errors.startTime && errors.startTime.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.endTime !== undefined}>
            <FormLabel>End Time (otional)</FormLabel>
            <InputGroup display="flex" justifyContent="space-between">
              <SingleDatepicker
                name="date-input"
                date={pdEnd}
                onDateChange={setPdEnd}
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
            <FormErrorMessage>
              {errors.endTime && errors.endTime.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.isCurrentReading !== undefined}>
            <FormLabel>Is current reading?</FormLabel>
            <InputGroup>
              <Switch
                {...register("isCurrentReading")}
                borderColor="brand.100"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.isCurrentReading && errors.isCurrentReading.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.isMyCopy !== undefined}>
            <FormLabel>Is my copy?</FormLabel>
            <InputGroup>
              <Switch {...register("isMyCopy")} borderColor="brand.100" />
            </InputGroup>
            <FormErrorMessage>
              {errors.isMyCopy && errors.isMyCopy.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </form>
    );

    return (
      <div>
        {settingsChangeError}
        {content}
      </div>
    );
  }
);

export const SaveFormWishlist = React.forwardRef<any, any>(
  (props: { closeModal: any }, ref) => {
    const [failedSettingsChange, setFailedSettingsChange] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState("");

    const navigate = useNavigate();
    const { isbn } = useParams();

    const onSubmit = async () => {
      setIsLoading(true);

      const isSuccess = await saveBookWishList(isbn)
        .catch(async (error: UnauthorizedError) => {
          if (!(await isAuthenticated())) navigate("/login");
        })
        .catch((e: BadRequestError) => {
          setReason(e.message);
          setFailedSettingsChange(true);
        });
      if (isSuccess) {
        setFailedSettingsChange(false);
        props.closeModal();
      } else {
        setFailedSettingsChange(true);
        if (!reason) setReason("Some error occured!");
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
      <Text>Click on save to add this book to your wishlist</Text>
    );

    return (
      <div>
        {settingsChangeError}
        {content}
      </div>
    );
  }
);

export const SaveFormShelf = (props: { submitRef: any }) => {
  return <div>SaveFormShelf</div>;
};
