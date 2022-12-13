const {categorySchema} = require('./category');
const Joi = require('joi');
const mongoose = require('mongoose');

const Book = mongoose.model('Book', new mongoose.Schema({
    title : { 
        type : String, 
        required : true, 
         minlength : 5 ,
         maxlength : 255,
         trim : true
        },

    category : {
        type : categorySchema,
        required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    }

}));


function validateBook(book){
    const schema = Joi.object({ 
        title: Joi.string().min(5).max(50).required(),
        categoryId : Joi.objectId().required(),
        numberInStock : Joi.number().min(0).required(),
        dailyRentalRate : Joi.number().min(0).required()
    });
    
    return schema.validate(book);
}


exports.Book = Book;
exports.validate = validateBook;