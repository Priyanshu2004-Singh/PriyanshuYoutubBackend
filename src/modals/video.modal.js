import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";




const videoSchema = mongoose.Schema({
    videoFile:{
        type:String, // use cloudnary for uploading video and storing only URL in the DB
        required:true
    },
    thumbnail:{
        type:String, // use cloudnary for uploading image and storing only URL in the DB
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number, //Cloudnary provide duration in seconds
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

videoSchema.plugin(mongooseAggregatePaginate);
//Now we can write aggregation queries with pagination on Video Model

export const Video = mongoose.model("Video",videoSchema);