import "./App.css";
import Auth from "./components/Auth";
import Body from "./components/Body";
import { useClientContext } from "./contexts/ClientContext";

function App() {
  const { isRegister } = useClientContext();

  return isRegister ? <Body /> : <Auth />;
}

export default App;
