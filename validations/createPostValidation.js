const Validator = require('validatorjs');
const { apiValidationErrors } = require('../@core/apiHelpers');
module.exports = (req,res,next)=>{
        const validation = new Validator(req.body,{
            title : 'required',
            content : 'required',
        });    
        if(validation.fails()){
            res.status(422).send(apiValidationErrors(validation.errors.all()));
        }
        next();
};