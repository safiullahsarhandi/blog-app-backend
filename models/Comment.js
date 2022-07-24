const {model,Schema,Types} = require('mongoose');


const commentSchema = new Schema({
    postId : {
        type : Types.ObjectId,
        required : true,
        ref : 'Post',
    },
    userName : {
        type : String,
        required : true,
    },
    comment : {
        type : String,
        required : true,
    },
    parent : {
        type : Types.ObjectId,
        default : null,
        ref : 'Comment',
    },
},{
    timestamps : true,
    toObject : {
        virtuals : true,
    },
    toJSON :  {
        virtuals : true,
    }
});

const autoPopulateChildren = function (next) {
    this.populate({
        path : 'replies',
        model : 'Comment',
        options : {
            sort : {_id : -1},
        },
    });
    next();
};


commentSchema
    .pre('findOne', autoPopulateChildren)
    .pre('find', autoPopulateChildren)
    .pre('findById', autoPopulateChildren)

commentSchema.virtual("replies",{
    ref : 'Comment',
    localField : '_id',
    foreignField : 'parent',
    match : {
        $expr : {
            $ne : ['parent',null],
        }
    }, 
});

module.exports = model('Comment',commentSchema);