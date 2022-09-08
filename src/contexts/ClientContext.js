import { useContext, createContext, useState } from "react";

const ClientContext = createContext();
export const useClientContext = () => useContext(ClientContext);

function ClientContextProvider(props) {
  // console.log("ClientContext");
  const [users, setUsers] = useState();
  const [massages, setMassages] = useState({});
  const [isRegister, setRegister] = useState(false);
  const [myId, setMyId] = useState();
  const [userTab, setUserTab] = useState(true);
  const [msgTab, setMsgTab] = useState(false);

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  const value = {
    users,
    setUsers,
    isRegister,
    setRegister,
    myId,
    setMyId,
    massages,
    setMassages,
    userTab,
    setUserTab,
    msgTab,
    setMsgTab,
  };

  return (
    <ClientContext.Provider value={value}>
      {props.children}
    </ClientContext.Provider>
  );
}

export default ClientContextProvider;
