import { useState,useEffect } from 'react'
import axios from 'axios';
import type{Blog } from '../Loading/Types';
import { useParams } from 'react-router-dom';

function DynamicBlog() {
    const id=useParams().id;
    const [blog,setBlog]=useState<Blog>();
    const getBlog=()=>{
        axios.get(`${import.meta.env.VITE_API}/blogs/${id}`).then((res)=>{
            setBlog(res.data.blog);
        }).catch((e)=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getBlog();
    },[])
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-lg-8 col-md-10 col-12 mx-auto">
                <h1>{blog?.title}</h1>
                <img src={blog?.image} alt="" />
                <p>{blog?.time}</p>
                <p>{blog?.content}</p>

            </div>
        </div>
    </div>
    
    </>
  )
}

export default DynamicBlog