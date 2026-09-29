import { useState,useEffect } from 'react'
import axios from 'axios';
import type{Blog } from '../Loading/Types';
import { useParams } from 'react-router-dom';
import LoaderError from '../../assets/Reusable/LoaderError';

function DynamicBlog() {
    const id=useParams().id;
    const [blog,setBlog]=useState<Blog|null>(null);
    const [loading,setLoading]=useState(true)
    const getBlog=()=>{
        setLoading(true)
        axios.get(`${import.meta.env.VITE_API}blogs/${id}`).then((res)=>{
            if(res.data.status==200){
                setBlog(res.data.blog);
                console.log(res.data.blog)
            }
        }).catch((e)=>{
            console.log(e);
        }).finally(()=>setLoading(false))
    }

    useEffect(()=>{
        getBlog();
    },[id])
    if(loading){
        return <div><LoaderError loading={true}/></div>
    }
    if (!blog) {
  return <div className="container"><p>Blog not found</p></div>;
}
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-lg-8 col-md-10 col-12 mx-auto">
                <h1>{blog.title}</h1>
                <img src={blog.img} alt={blog.title} />
                <p>{blog.time}</p>
                <p>{blog.content}</p>

            </div>
        </div>
    </div>
    
    </>
  )
}

export default DynamicBlog