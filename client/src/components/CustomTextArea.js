import { Textarea } from "@chakra-ui/react";
import React from "react";
import reactTextareaAutosize from "react-textarea-autosize";

const CustomTextArea = (props) => {
  return (
    <Textarea
      as={reactTextareaAutosize}
      minH="unset"
      resize={"none"}
      focusBorderColor={"white"}
      borderWidth={0}
      borderRadius={"3xl"}
      bg={"gray.200"}
      minRows={1}
      maxRows={3}
      {...props}
    />
  );
};

export default CustomTextArea;
