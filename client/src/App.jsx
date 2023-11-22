import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Routes/Routes";
import { useContext } from "react";
import { AllContext } from "./Context/Context.jsx";

function App() {
  const { role, isSignedIn } = useContext(AllContext);

  return (
    <Router>
      <Routes>
        {routes(role, isSignedIn)?.map((route, index) => {
          console.log(route);
          return <Route key={index} {...route} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;
