    import { useState,useEffect } from 'react'
    import axios from 'axios';
    import type{Blog } from '../Loading/Types';
    import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
    import LoaderError from '../../assets/Reusable/LoaderError';
import toast from 'react-hot-toast/headless';
    interface DynamicBlog {
    topBlogId: string | null;
    }
    function DynamicBlog({dashboard=false}: {dashboard?:boolean}) {
        const navigate = useNavigate();

        const { topBlogId } = useOutletContext<DynamicBlog>()||{}; // The first blog from the list
        const { id: urlId } = useParams();
        const id=urlId || topBlogId; // Use the first blog's ID if no ID is provided in the URL
        const [blog,setBlog]=useState<Blog|null>(null);
        const [loading,setLoading]=useState(true)

        const blogedit=()=>{
            if(blog&&dashboard) navigate(`/dashboard/editBlog/${blog.id}`);
        }

        const deleteBlog=()=>{
            if(blog&&dashboard){
                axios.delete(`${import.meta.env.VITE_API}blogs/${blog.id}`,{withCredentials:true}).then((res)=>{
                    if(res.data.status==200){
                        toast.success("Blog Deleted Successfully");
                    }else{
                        toast.error(res.data.message || "Error Deleting Blog");
                    }
                }).catch((err)=>{
                    toast.error(err.response?.data?.message || "Error Deleting Blog");
                })
            }
        }

        useEffect(()=>{
           const controller = new AbortController();
           if(!id) setLoading(true);
            setLoading(true)
            axios.get(`${import.meta.env.VITE_API}blogs/${id}`, { signal: controller.signal }).then((res)=>{
                if(res.data.status==200){
                    setBlog(res.data.blog);
                    console.log(res.data.blog)
                }
            }).catch((e)=>{
                if (!axios.isCancel(e)) {
                console.log(e);
        }
            }).finally(()=>setLoading(false));
            return () => controller.abort();
        },[id])
        if(loading ||!id)return <div><LoaderError loading={true}/></div>
        
        if (!blog) {
    return <div className="container"><p>Blog not found</p></div>;
    }
    return (
        <>
        <div className="container overflow-y-auto mt-4" style={{maxHeight:'80vh'}}>
            <div className="row">
                {dashboard && (<div className="col-12 justify-content-end d-flex mb-4">
                   <button className='btn btn-primary' onClick={blogedit}>Edit</button>
                   <button className='ms-4 btn btn-danger' onClick={deleteBlog}>Delete</button>
                </div>)}
                <div className="col-lg-8 col-md-10 col-12 mx-auto">
                    <h1>{blog.title}</h1>
                    <img src={blog.img} alt={blog.title} />
                    <p className='my-4'>Tags: {blog.tags.map((tag:string) => <span style={{display:'inline-block', margin: '5px', fontWeight: 'bold', backdropFilter: 'blur(10px)',padding: '10px', backgroundColor: 'rgba(22, 113, 231, 0.1)', borderRadius: '5px' }} key={tag}>{tag}</span>)}</p>
                    <span style={{ fontWeight: 'bold', backdropFilter: 'blur(10px)',padding: '10px', backgroundColor: 'rgba(120, 231, 22, 0.1)', borderRadius: '5px' }}>Duration: {blog.readTime} minutes</span>
                    <p>{blog.content}</p>

                </div>
            </div>
        </div>
        
        </>
    )
    }

    export default DynamicBlog