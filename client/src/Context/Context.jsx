import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const AllContext = createContext();

const AllProvider = ({ children }) => {
  AllProvider.propTypes = {
    children: PropTypes.node,
  };
  const [role, setRole] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <AllContext.Provider
      value={{
        role,
        isSignedIn,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export { AllContext, AllProvider };
