
var user = 'system';
var pwd = 'superSecr3tPa$sw0rd';

db.createUser({
  user: user,
  pwd: pwd,
  roles: [ 'readWrite' ]
});

db.createCollection('shorturls');
db.shorturls.createIndex({ shortHash: 1 }, { unique: true });

db.createCollection('stats');
