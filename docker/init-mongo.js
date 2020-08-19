
var user = 'system';
var pwd = 'superSecr3tPa$sw0rd';

db.createUser({
  user: user,
  pwd: pwd,
  roles: [ 'readWrite' ]
});

db.createCollection('shorts');
db.shorts.createIndex({ hash: 1 }, { unique: true });
db.shorts.createIndex({ longUrl: 1 }, { unique: true });

db.createCollection('stats');
