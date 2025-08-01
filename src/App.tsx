import React from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { UserProvider } from "./store/UserContext";
import { Main } from "./pages/Main";
import { CreateUser } from "./pages/CreateUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <MantineProvider>
        <UserProvider>
          <div style={{ width: "80%", margin: "0 auto", padding: "20px" }}>
            <Router>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/create" element={<CreateUser />} />
              </Routes>
            </Router>
          </div>
        </UserProvider>
      </MantineProvider>
    </>
  );
}

export default App;
