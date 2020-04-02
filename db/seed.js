const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Meme = require('../lib/models/Meme');

module.exports = async({ usersToCreate = 10, memesToCreate = 100 } = {}) => {
  const loggedInUser = await User.create({
    username: 'test@test.com',
    password: 'password',
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: `${chance.profession()} ${chance.animal()}`,
    password: chance.animal(),
    profilePhotoUrl: chance.url()
  })));

  await Meme.create([...Array(memesToCreate)].map(() => ({
    top: chance.sentence(),
    image: chance.url(),
    bottom: chance.animal(),
    author: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));

};
