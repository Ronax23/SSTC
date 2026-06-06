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
        default: "https://images.unsplash.com/photo-1732980280972-5211b5a844f1?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

blogSchema.virtual("readTime").get(function(){
    if(!this.content){return 0}
    const  readTime= Math.ceil(this.content.split(" ").length / 200);
    return readTime;
})
const blogs = mongoose.model("Blog", blogSchema);

export default blogs;