import "./App.css";
import Auth from "./components/Auth";
import Body from "./components/Body";
import { useClientContext } from "./contexts/ClientContext";

// let c = 0;

function App() {

  // console.log(c++)

  // console.log("App");
  const { isRegister } = useClientContext();

  return isRegister ? <Body /> : <Auth />;
}

export default App;
