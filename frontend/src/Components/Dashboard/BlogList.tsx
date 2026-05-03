import axios from 'axios';
import {useEffect,useState} from 'react'

function BlogList() {
  const [blogs,setBlogs]=useState<any>([]);


  const getBlogs=()=>{
    axios.get(`${import.meta.env.VITE_API}blogs`,{withCredentials:true}).then((res)=>{
        setBlogs(res.data);
    }).catch((err)=>{
        console.log(err);
    })
  }
  useEffect(()=>{
    getBlogs();
  },[])
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-12"><h1>Blog List</h1></div>
            {blogs.map((blog:any,index:number)=>(
            <div className="col-4 my-3" key={index}>
                <div className="card ">
                    <div className="card-img-top">
                        <img src={blog.img} alt="" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-center">{blog.title}</h5>
                        <p className="card-text">{blog.content.substring(0, 50)}...</p>
                    </div>
                </div>
                </div>))}
    </div>
    </div>
    </>
  )
}

export default BlogList