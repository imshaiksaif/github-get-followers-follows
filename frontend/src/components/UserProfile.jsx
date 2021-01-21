import React from 'react';

import '../styles/UserProfile.scss';

export const UserProfile = ({userInfo}) => {
  const { html_url, login, avatar_url, name } = userInfo;
  return (
    <a className="user-profile-block" href={html_url} target="blank">
        <div className="user-profile">
          <img className="user-img" src={`${avatar_url}&size=40`} alt={name}/>
          <h4 className="user-name">{login}</h4>
        </div>
      </a>
  )
}
