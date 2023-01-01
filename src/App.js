import "./App.css";
import Auth from "./components/Auth";
import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreventRoute from "./components/Auth Route/PreventRoute";
import PrivateRoute from "./components/Auth Route/PrivateRoute";

function App() {
  // return isRegister ? <Body /> : <Auth />;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PreventRoute />}>
          <Route path="/login" element={<Auth />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<></>} />
          <Route path="/:id" element={<Body />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
