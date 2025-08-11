import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./components/Feed.jsx";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";
import SignUp from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Chat from "./components/Chat.jsx";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
