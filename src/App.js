import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Router>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.url}
                path={route.url}
                element={route.component}
              />
            ))}
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
