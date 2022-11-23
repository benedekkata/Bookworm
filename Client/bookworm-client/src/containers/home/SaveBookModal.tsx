import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { SaveFormReading, SaveFormWishlist, SaveFormShelf } from "./SaveForm";
const SaveBookModal = (props: { isOpen: boolean; onClose: any }) => {
  const [saveType, setSaveType] = useState("reading");
  const submitRef = useRef<any>(null);
  const saveForm = () => {
    switch (saveType) {
      case "reading":
        return (
          <SaveFormReading
            closeModal={props.onClose}
            isEditMode={false}
            ref={submitRef}
          ></SaveFormReading>
        );
      case "wishlist":
        return (
          <SaveFormWishlist
            closeModal={props.onClose}
            ref={submitRef}
          ></SaveFormWishlist>
        );
      case "shelf":
        return <SaveFormShelf submitRef={submitRef}></SaveFormShelf>;
    }
  };

  const onClick = (event: any) => {
    if (submitRef && submitRef.current) {
      submitRef.current.submitForm();
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save the book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="2rem">
            <FormLabel>Save book to...</FormLabel>
            <Select
              value={saveType}
              onChange={(e) => setSaveType(e.target.value)}
            >
              <option value="reading">Readings</option>
              <option value="wishlist">Wishlist</option>
              <option value="shelf">Self</option>
            </Select>
          </FormControl>
          {saveForm()}
        </ModalBody>
        <ModalFooter mt="2rem">
          <Button
            color="white"
            onClick={onClick}
            key="submit"
            background="brand.100"
            mr={3}
          >
            Save
          </Button>
          <Button color="brand.100" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SaveBookModal;
