const { apiSuccess, apiSuccessWithData } = require("../@core/apiHelpers");
const Post = require("../models/Post");


exports.index = async (req,res)=> {
    let {page,perPage} = req.query;
    page = page || 1;
    perPage = perPage || 10;  
    try {
        // get all paginated posts;
        let {docs : data,totalPages : total,pagingCounter : from } = await Post.paginate({            
        },{
            page,
            limit : perPage,
            sort: {
                _id : -1 //Sort by Date Added DESC
            }
        });
        let successData = apiSuccessWithData('post listing',{
            currentPage : page,
            perPage,
            data,
            total,
            from,
        });
        res.send(successData);
    } catch (error) {
        console.log(error);
        res.status(409).send({
            message : error.toString(),
        });
    }

    
};

exports.show = async (req,res)=> {

        try {
            let { id } = req.params;
            let post = await Post.findById(id).populate({
                path : 'comments',
                model : 'Comment',
                options : {
                    sort : {_id : -1},
                },
            });
            let data = apiSuccessWithData('post updated',post);
            res.status(200).send(data);
        } catch (error) {
            console.log(error);          
            res.status(409).send({
                message : error.toString(),
            });  
        }
};

exports.create = async (req,res)=> {
    try {
        let createdPost = await Post.create({...req.body});
        let data = apiSuccess('post created');
        res.status(201).send(data);
    } catch (error) {
        console.log(error);          
        res.status(409).send({
            message : error.toString(),
        });  
    }
};

exports.update = async (req,res)=> {
    try {
        let { id } = req.params;
        await Post.findByIdAndUpdate(id,{...req.body});
        let data = apiSuccess('post updated');
        res.status(200).send(data);
    } catch (error) {
        console.log(error);          
        res.status(409).send({
            message : error.toString(),
        });  
    }
};


