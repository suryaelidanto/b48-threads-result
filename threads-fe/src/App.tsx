import { Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <Main>
              <Home />
            </Main>
          }
          path="/"
        />
        <Route element={<Login />} path="/auth/login" />
        <Route element={<Register />} path="/auth/register" />
      </Routes>
    </>
  );
}
