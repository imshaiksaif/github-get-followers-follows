import React, { useContext, useEffect } from "react";
import { UserProfile } from "./UserProfile";
import "../styles/ResultList.scss";
import { Link, useParams } from "react-router-dom";
import { UsersResultListContext } from "../contexts/UsersResultListContext";

const ResultList = () => {
  let { primary, secondary } = useParams();
  const { usersResultList, getUsersList, textMsg } = useContext(UsersResultListContext);

  useEffect(() => {
    if(primary && secondary) {
      getUsersList(primary, secondary)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, secondary]);

  
  return (
    <div className="result-section">
      <h3 className="title">
        {`Result ( List of users found - ${usersResultList.length} ) ${
          usersResultList.length > 0
            ? "click on card to visit github profile"
            : ""
        }`}
      </h3>
      <div className="profiles-block">
        {usersResultList.length ? (
          usersResultList.map((echUser) => (
            <UserProfile key={echUser.id} userInfo={echUser} />
          ))
        ) : (
          <div className="no-profiles-found">
            <h3>{textMsg}</h3>
          </div>
        )}
      </div>
      <Link to="/">
        <button className="submit-btn" type="button">
          Re-check other users
        </button>
      </Link>
    </div>
  );
};

export default ResultList;
