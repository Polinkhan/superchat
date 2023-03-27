import { Button, Center, Text } from "@chakra-ui/react";
import React from "react";
import { useDataContext } from "../contexts/DataContext";

const NotFoundPage = () => {
  const { setCurrentUser } = useDataContext();
  return (
    <Center flex={1}>
      <Text>404! Page Not Found</Text>
    </Center>
  );
};

export default NotFoundPage;
