import axios from 'axios';
import {useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
interface Blog{
    title:string;
    blog_content:string;
    blogimg:string;
}
function CreateBlogs() {
    const {id}=useParams();
    const edit=Boolean(id)
      const { register, handleSubmit, formState: { errors },reset } = useForm({
        mode: "onBlur"
    })

const postdata=(data:Blog)=>{
    const url = edit? `${import.meta.env.VITE_API_URL}/blogs/edit/${id}`: `${import.meta.env.VITE_API_URL}/blogs/add`;
    const method = edit ? 'put' : 'post';
axios[method](url,data,{withCredentials:true}).then((res)=>{
    if(res.data.status=200)
    {

    }
    else{

    }
}).catch(err=>console.log(err))
}
    const fetchdat=()=>{
        axios.get(`${import.meta.env.REACT_APP_API_URL}/blogs/:${id}`).then((res)=>{
            reset(
           {
             title:res.data.title,
            blogimg:res.data.blogimg,
            blog_content:res.data.blog_content           
           }) 
           setPreview(res.data.blogimg)
        }).catch(err=>console.log(err))
    }
useEffect(()=>{
    if(id&&edit)fetchdat();
},[id,edit])

        const [preview, setPreview] = useState<string>("");
    const uploadImg=(e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files[0]) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    }

 return (
    <>
        <section className="container">
            <section className="row">
                <section className="col-12"><h1>{edit?"Edit":"Create"} Blogs</h1></section>
                <form onSubmit={handleSubmit(postdata)}>
                    <section className="mb-3">
                        <label htmlFor="title" className="form-label h2">Title</label>
                        <input type="text" className="form-control" id="title" placeholder='Enter Title' {...register("title",{required:true})}/>
                        {errors.title && <p>Enter Title</p>}
                    </section>
                    <section className="mb-3">
              <label className="form-label">Upload Image</label>
              <input type="file" className="form-control"  {...register("blogimg",{required:true,onChange:(e)=>setPreview(e)})} />
              {errors.blogimg && <p>Select Image</p>}

              {preview && 
              
              <section className=" mx-auto w-50 h-50 my-3">
<img src={preview} className='img-fluid w-100 h-100 rounded'></img>
 </section>}
           
             
               </section>
                    <section className="mb-3">
                        <textarea  className="form-control" id="" rows={3} placeholder='Enter Blog Content'
                        {...register("blog_content",{required:true})}
                        ></textarea>
                        {errors.blog_content && <p>Enter Blog Content</p>}
                    </section>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </section>
        </section>

    
    </>
  )
}

export default CreateBlogs