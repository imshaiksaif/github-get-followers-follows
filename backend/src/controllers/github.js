const fetch = require('node-fetch');

const getFollowersFollowsOfUser = async (userName, toGet) => {
  if(!userName || !toGet) throw 'missing dependencies';

  const userInfo = await getUserInfo(userName);
  const numOfUsers = userInfo[toGet];

    const noOfTimesToLoop = Math.round(numOfUsers / 100);
    const arrOfNum = Array.from(
      { length: noOfTimesToLoop === 0 ? 1 : noOfTimesToLoop },
      (_, i) => i + 1
    );
    
    let listOfFollowers = await Promise.all(
      arrOfNum.map(async (num) => {
        const resOfItems = await requestGithubApi(`/users/${userName}/${toGet}?per_page=100&page=${num}`);
        return resOfItems;
      })
    );

    const flattenedArrOfItems = listOfFollowers.flat();
    return flattenedArrOfItems;
};

const getUserInfo = async (userName) => {
  if(!userName) throw 'UserName Is missing';
  const userInfo = await requestGithubApi(`/users/${userName}`);
  return userInfo;
}

const requestGithubApi = async (path) => {
  const resData = await fetch(`https://api.github.com${path}`, {
    headers: {
      'Authorization': `token ${process.env.GITHUB_API_KEY}`,
    }
  }).then(res => res.json());
  return resData
}

module.exports = {
  getFollowersFollowsOfUser,
  getUserInfo,
  requestGithubApi
}