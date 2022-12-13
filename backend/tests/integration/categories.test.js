const request = require('supertest');
const {Category} = require('../../models/category');
const {User} = require('../../models/user');

let server;

describe('/api/categories', () => {
    beforeEach(() => { server = require('../../app');})
    afterEach (async () => { server.close();
        await Category.deleteMany({});
    })

    describe('GET /', () => {
        it('should return all categories', async () => {
            await Category.collection.insertMany([
                { name: 'category1'},
                { name: 'category2'},
            ]);

          const res = await  request(server).get('/api/categories');
          expect(res.status).toBe(200);
          expect(res.body.length).toBe(2);
          expect(res.body.some( b => b.name === 'category1')).toBeTruthy();
          expect(res.body.some( b => b.name === 'category2')).toBeTruthy();
        })
    });

    describe('GET /:id', () => {
        it('should return a category if valid is passed', async() => {
           const category = new Category({ name: 'genre1'});
           await category.save()

         const res =  await request(server).get('/api/genres/' + category._id);
         expect(res.status).toBe(200);
         expect(res.body).toHaveProperty('name', category.name);

        });

        it('should return 404 if invalid is passed', async() => {
           
          const res =  await request(server).get('/api/genres/1');
          expect(res.status).toBe(404);
        
         });
    });

    describe('POST /', () => {

        let token;
        let name;

        const exec = () => {
            return request(server)
              .post('/api/genres')
              .set('x-auth-token', token)
              .send({name : name});
        }

        beforeEach(() => {
          token = new User().generateAuthToken();
          name = 'genre1';
        })

        it('should return a 401 when client is not logged in', async () => {
          token = '';
           
          const res = await exec()

          expect(res.status).toBe(401);
        });

        it('should return a 400 if category is less than 5 characters', async () => {
          name = '123a'
          
          const res= await exec();
  
          expect(res.status).toBe(400);
          });

        it('should return a 400 if category is more  than 50 characters', async () => {
          name = new Array(52).join('a');
          
         const res=  await exec();
  
          expect(res.status).toBe(400);
          });

          it('should return a category if valid', async () => {
           
           await exec();

           const category = Category.find({name : 'genre1'})
    
            expect(category).not.toBeNull();
            });


        it('should save the category if it is valid', async () => {

            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
          });
    });



});

