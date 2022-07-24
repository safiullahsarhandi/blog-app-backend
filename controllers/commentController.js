const { apiError, apiSuccess } = require("../@core/apiHelpers");
const Comment = require("../models/Comment");

exports.create = async (req,res)=> {

    try{
        await Comment.create({...req.body});
        let data = apiSuccess('comment stored');
        res.status(201).send(data);
    }catch(error){
        console.log(error);
        let data = apiError(error.toString());
        res.status(409).send(data);
    }
};
