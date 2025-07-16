import { BrowserRouter, Route , Routes } from "react-router-dom";
import Body from "./Body.jsx";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";


function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
