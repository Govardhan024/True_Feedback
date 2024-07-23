import 'next-auth';

// Extend the Session interface
module.exports = 'next-auth';

module.exports.Session = {
  user: {
    _id: undefined,
    isVerified: undefined,
    isAcceptingMessages: undefined,
    username: undefined,
  }
};

// Extend the User interface
module.exports.User = {
  _id: undefined,
  isVerified: undefined,
  isAcceptingMessages: undefined,
  username: undefined,
};

// Extend the JWT interface
module.exports.JWT = {
  _id: undefined,
  isVerified: undefined,
  isAcceptingMessages: undefined,
  username: undefined,
};
