import axios from 'axios';
import {useEffect,useState} from 'react'
import { Outlet } from 'react-router-dom';
interface Blog{
    title:string;
    content:string;
    img:string;
}
function BlogList() {
  const [blogs,setBlogs]=useState<Blog[]>([]);
    const [page,setPage]=useState<number>(1);

  const getBlogs=()=>{
    axios.get(`${import.meta.env.VITE_API}blogs?page=${page}`,{withCredentials:true}).then((res)=>{
        setBlogs(res.data);
    }).catch((err)=>{
        console.log(err);
    })
  }
  useEffect(()=>{
    getBlogs();
  },[page])
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-12"><h1>Blog List</h1></div>
            <div className="row">
                <div className="col-lg-4">
{blogs.map((blog:Blog,index:number)=>(
            <div className="col-12 my-3" key={index}>
                <div className="row vh-80">
                    <div className="col-4">
                        <img src={blog.img} alt="" className="img-fluid" />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title text-center">{blog.title}</h5>
                            <p className="card-text">{blog.content.substring(0, 50)}...</p>
                        </div>
                    </div>
                </div>
                </div>))}
                </div>
                <div className="col-lg-8">
                <Outlet />
                </div>
            </div>
    </div>
    </div>
    </>
  )
}

export default BlogList