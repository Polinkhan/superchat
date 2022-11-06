import { VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useClientContext } from "../contexts/ClientContext";
import ChatBox from "./ChatBox";

function MsgBox() {
  const { users, msgTab } = useClientContext();
  const param = useParams();
  const { id } = param;

  return (
    <VStack
      bg={"#ffffff"}
      h={"100%"}
      w={"100%"}
      p={4}
      display={{ md: "flex", base: msgTab ? "flex" : "none" }}
      borderRadius={10}
      boxShadow={"md"}
      position={"relative"}
    >
      <ChatBox id={id} name={users[id]} />
    </VStack>
  );
}

export default MsgBox;
