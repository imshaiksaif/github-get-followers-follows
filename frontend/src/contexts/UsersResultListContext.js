import React, { useState, createContext } from "react";

export const UsersResultListContext = createContext();

const CollectionContextProvider = ({ children }) => {
  const [ usersResultList, setUsersResultList ] = useState([]);
  return (
    <UsersResultListContext.Provider value={{ usersResultList, setUsersResultList }}>
      {children}
    </UsersResultListContext.Provider>
  );
};

export default CollectionContextProvider;