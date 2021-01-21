import React, { useState, createContext } from "react";

export const UsersResultListContext = createContext();

const UsersResultContextProvider = ({ children }) => {
  const [ usersResultList, setUsersResultList ] = useState([]);
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState(false);

  
  const getUsersList = async (primaryUserName, secondaryUserName) => {
    if(!primaryUserName || !secondaryUserName) return;
    try {
      const { success, resultList } = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/github/get-list`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ primaryUserName, secondaryUserName }),
        }
      ).then((res) => res.json());

      if (success) {
        setUsersResultList(resultList);
      }
      setProcessing(false);
    } catch (err) {
      setProcessing(false);
      setError(true);
      console.log({ err });
    }
  };

  const textMsg = processing ? "Please Wait while we fetch the users" : (
    !error ? "0 Users found, Please Try with different Username" : "Something went wrong please try again"
  );

  return (
    <UsersResultListContext.Provider value={{ usersResultList, getUsersList, textMsg }}>
      {children}
    </UsersResultListContext.Provider>
  );
};

export default UsersResultContextProvider;