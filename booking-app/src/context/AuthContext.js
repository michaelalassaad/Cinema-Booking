import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [custId, setCustId] = useState("");

  return (
    <AuthContext.Provider value={{ custId: custId, setCustId: setCustId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
