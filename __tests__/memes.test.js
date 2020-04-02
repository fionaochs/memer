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

  // it('gets most popular gram', async() => {
  //   const grams = await getGrams();
  //   return getAgent()
  //     .get('/api/v1/gramas')
  //     .then(res => {
  //       expect(res.body).toEqual(grams);
  //     });
  // });
  
  // it('gets a gram by id', async() => {
  //   const user = await getUser({ username: 'test@test.com' });
  //   const gram = await getGram({ author: user._id });
  //   const comments = await getComments({ gram: gram._id });

  //   return getAgent()
  //     .get(`/api/v1/grams/${gram._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         ...gram,
  //         author: user._id,
  //         comments: expect.arrayContaining(comments)
  //       });
  //     });
  // });

  // it('gets all grams', async() => {
  //   const grams = await getGrams();
  //   return getAgent()
  //     .get('/api/v1/grams')
  //     .then(res => {
  //       expect(res.body).toEqual(grams);
  //     });
  // });

  // it('updates a gram by id', async() => {
  //   const user = await getUser({ username: 'test@test.com' });
  //   const gram = await getGram({ author: user._id });
  //   return getAgent()
  //     .patch(`/api/v1/grams/${gram._id}`)
  //     .send({ caption: 'new better caption' })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         ...gram,
  //         caption: 'new better caption'
  //       });
  //     });
  // });

  // it('deletes a gram', async() => {
  //   const user = await getUser({ username: 'test@test.com' });
  //   const gram = await getGram({ author: user._id });

  //   return getAgent()
  //     .delete(`/api/v1/grams/${gram._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(gram);
  //     });
  // });
});
