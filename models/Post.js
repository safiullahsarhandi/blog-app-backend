const {model,Schema, plugin} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    }    
},{
    timestamps : true,
    toObject : {
        virtuals : true,
    },
    toJSON :  {
        virtuals : true,
    }
});

postSchema.plugin(mongoosePaginate);

postSchema.virtual("comments",{
    ref : 'Comment',
    localField : '_id',
    foreignField : 'postId',
    match : {
        parent : null
    }, 
});
module.exports = model('Post',postSchema)