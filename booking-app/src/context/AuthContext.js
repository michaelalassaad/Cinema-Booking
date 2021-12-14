import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [custID, setcustID] = useState("");

  return (
    <AuthContext.Provider value={{ custID: custID, setcustID: setcustID }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
