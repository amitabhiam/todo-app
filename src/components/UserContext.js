import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
  
    if (validateUser(username, password)) {
      setUser(username);
    } else {
      alert('Invalid username or password');
    }
  };

  const logout = () => {
    setUser(null);
  };

  
  const validateUser = (username, password) => {
  
    const sampleUsername = 'amitabh';
    const samplePassword = 'todoapp';

    return username === sampleUsername && password === samplePassword;
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
