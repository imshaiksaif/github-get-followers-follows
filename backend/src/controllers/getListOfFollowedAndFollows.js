const { getFollowersFollowsOfUser } = require('./github');


// Get list of github users followed and follows
const getListOfFollowedAndFollows = async (req, res) => {
  const { primaryUserName, secondaryUserName } = req.body;
  try {
    
    if(!primaryUserName || !secondaryUserName) throw 'Missing Dependencies!';
        
    const [followingList, followersList] = await Promise.all([getFollowersFollowsOfUser(primaryUserName, 'following'), getFollowersFollowsOfUser(secondaryUserName, 'followers')]);
    const storeIdsOfUsers = {};
    const mergedUsersArr = [...followersList, ...followingList];
    
    const resultList = mergedUsersArr.reduce((accu, currentValue) => {
      const uniName = currentValue.login;
      if(storeIdsOfUsers[uniName]) {
        accu.push(currentValue);
      } else {
        storeIdsOfUsers[uniName] = 1;
      }
      return accu;
    }, []);
    
    return res.status(200).json({success: true, resultList});
  } catch (err) {
    console.log({err});
    return res.status(400).json({success: false, msg: err || "Something went wrong"})  
  }  
};



module.exports = { getListOfFollowedAndFollows };