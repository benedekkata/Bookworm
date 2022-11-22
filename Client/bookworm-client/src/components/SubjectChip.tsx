import { Text } from "@chakra-ui/react";

const SubjectChip = (props: { subject: string }) => {
  return (
    <Text
      minW="fit-content"
      borderRadius="3xl"
      align="left"
      m="1"
      px="2"
      py="0.3"
      bg="brand.200"
    >
      {props.subject}
    </Text>
  );
};

export default SubjectChip;
