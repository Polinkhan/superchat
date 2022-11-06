import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
} from "@chakra-ui/react";
import { useClientContext } from "../contexts/ClientContext";
import ChatBox from "./ChatBox";

function MsgBox() {
  const { users, msgTab } = useClientContext();

  const keys = [];
  Object.keys(users).forEach((key) => {
    keys.push(key);
  });

  return (
    <VStack
      bg={"#ffffff"}
      h={"100%"}
      w={"100%"}
      display={{ md: "flex", base: msgTab ? "flex" : "none" }}
      borderRadius={10}
      boxShadow={"md"}
      position={"relative"}
    >
      <Tabs h={"100%"} w={"100%"}>
        <TabList display={"none"}>
          {keys.map((key) => (
            <Tab key={key} className={"a" + key}></Tab>
          ))}
        </TabList>
        <TabPanels h={"100%"}>
          {keys.map((key) => (
            <TabPanel key={key} h={"100%"} w={"100%"}>
              <ChatBox id={key} name={users[key]} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default MsgBox;
