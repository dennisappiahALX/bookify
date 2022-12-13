const validateObjectid = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const {Book, validate} = require('../models/book');
const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();


router.get('/', async (req,res) => {
    const books = await Book.find().sort('title');
    res.send(books);
});


router.post('/', auth, async(req, res) => {
    const {error} = validate(req.body);
    if (error)  return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.genreId);
    if (!category) return res.status(400).send('Invalid category');

    const book = new Book( {
        title: req.body.title,
        category : {
            _id : category._id,
            name : category.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
         })
    await book.save();

    res.send(book);
});


router.get('/:id', validateObjectid, async(req, res) => {
    const book= await Book.findById(req.params.id)
    if (!book) return res.status(404).send('The book with the given ID was not found!');

    res.send(book);
 });

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.genreId);
    if (!category) return res.status(400).send('Invalid category');

    const book = await Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category : {
            _id : category._id,
            name : category.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
         }, { new : true })
        
    if (!book) return res.status(404).send('The book with the given ID was not found!');
    
    res.send(book); 

});

router.delete('/:id', async(req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id)
    
    if (!book) return res.status(404).send('The book with the given ID was not found!');
    
    res.send(book);

});

 module.exports = router;