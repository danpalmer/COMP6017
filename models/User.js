module.exports.define = function(db, models) {
  User = db.define('user', {
    name:         { type: 'text', size: 50 },
    email:        { type: 'text', size: 128 },
    dateSignedUp: { type: 'date', time: true }
  });

  return User;
};

