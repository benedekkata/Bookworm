import { Box } from "@chakra-ui/react";
import React from "react";

const Loading = () => {
  return (
    <Box mt="2rem" className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );
};

export default Loading;
