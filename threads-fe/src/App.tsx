import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./layouts/Main";
import { API, setAuthToken } from "./libs/api";
import Detail from "./pages/Detail";
import Follows from "./pages/Follows";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { RootState } from "./stores/types/rootState";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function testNotification() {
    toast.info(
      <p>
        New threads are available! <a href="/">Check it out!</a>
      </p>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  }

  useEffect(() => {
    const sse = new EventSource("http://localhost:5000/api/v1/notifications");

    async function getRealtimeData(data: any) {
      console.log("Ini datanya cuy:", data);
      testNotification();
    }

    sse.onopen = (e) => console.log("berhasil connect ! : ", e);
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      console.log("Error SSE bro!");
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      setIsLoading(false);
      navigate("/auth/login");
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  function IsLogin() {
    if (!auth.username) {
      return <Navigate to={"/auth/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsNotLogin() {
    if (auth.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/" element={<IsLogin />}>
            <Route
              element={
                <Main>
                  <Home />
                </Main>
              }
              path="/"
            />
            <Route
              element={
                <Main>
                  <Detail />
                </Main>
              }
              path="/detail/:id"
            />
            <Route
              element={
                <Main>
                  <Follows />
                </Main>
              }
              path="/follows"
            />
          </Route>
          <Route path="/" element={<IsNotLogin />}>
            <Route
              element={
                <>
                  <Button onClick={testNotification}>Test Notification</Button>
                  <Login />
                </>
              }
              path="/auth/login"
            />
            <Route element={<Register />} path="/auth/register" />
          </Route>
        </Routes>
      )}
    </>
  );
}
