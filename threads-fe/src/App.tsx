import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./layouts/Main";

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
        ></Route>
      </Routes>
    </>
  );
}
