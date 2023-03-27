/* eslint-disable */
import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
const DataContext = createContext({
  currentUser: null,
  setCurrentUser: null,
  Data: null,
  setData: null,
  groupMessage: null,
  setGroupMessage: null,
});
export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children }) => {
  const [Data, setData] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [groupMessage, setGroupMessage] = useState([]);

  const value = {
    currentUser,
    setCurrentUser,
    Data,
    setData,
    groupMessage,
    setGroupMessage,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
