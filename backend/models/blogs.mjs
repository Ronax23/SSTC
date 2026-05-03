import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "https://via.placeholder.com/150" 
    },
    time:{
        type: Number,
    },
}, { 
    timestamps: true
});
blogSchema.pre('save', function(next) {
    if(this.content){
        this.time = Math.ceil(this.content.split(" ").length / 200);
    }
    next();
});
const blogs = mongoose.model("Blog", blogSchema);

export default blogs;