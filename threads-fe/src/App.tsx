import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { API, setAuthToken } from "./libs/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { RootState } from "./stores/types/rootState";
import Detail from "./pages/Detail";

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sse = new EventSource("http://localhost:5000/api/v1/notifications");

    function getRealtimeData(data: any) {
      console.log("Ini datanya cuy:", data);
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
      console.log("authCheck : ", response);
      dispatch(AUTH_CHECK(response.data.user));
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      console.log("auth check error", err);
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
          </Route>
          <Route path="/" element={<IsNotLogin />}>
            <Route element={<Login />} path="/auth/login" />
            <Route element={<Register />} path="/auth/register" />
          </Route>
        </Routes>
      )}
    </>
  );
}
