const Validator = require('validatorjs');
const { apiValidationErrors } = require('../@core/apiHelpers');
module.exports = (req,res,next)=>{
        const validation = new Validator(req.body,{
            postId : 'required',
            userName : 'required',
            comment : 'required',
        });    
        if(validation.fails()){
            res.status(422).send(apiValidationErrors(validation.errors.all()));
        }
        next();
};