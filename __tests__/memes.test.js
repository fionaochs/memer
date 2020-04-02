const { getMeme, getMemes, getUser, getAgent } = require('../db/data-helpers');

describe('grams routes', () => {
  it('creates a meme', async() => {
    const user = await getUser({ username: 'test@test.com' });
    
    return getAgent()
      .post('/api/v1/memes')
      .send({
        top: 'test top',
        image: 'image',
        bottom: 'bottom',
        author: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top:  expect.any(String),
          image:  expect.any(String),
          bottom: expect.any(String),
          author: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('gets a meme by id', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const meme = await getMeme({ author: user._id });

    return getAgent()
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...meme,
          author: user._id
        });
      });
  });

  it('gets all memes', async() => {
    const memes = await getMemes();
    return getAgent()
      .get('/api/v1/memes')
      .then(res => {
        expect(res.body).toEqual(memes);
      });
  });

  it('updates a meme by id', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const meme = await getMeme({ author: user._id });
    return getAgent()
      .patch(`/api/v1/memes/${meme._id}`)
      .send({ top: 'new better meme' })
      .then(res => {
        expect(res.body).toEqual({
          ...meme,
          top: 'new better meme'
        });
      });
  });

  it('deletes a meme', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const meme = await getMeme({ author: user._id });

    return getAgent()
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual(meme);
      });
  });
});
