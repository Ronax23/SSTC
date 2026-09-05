import axios from 'axios';
import {useEffect,useState} from 'react'
import { Outlet } from 'react-router-dom';
interface Blog{
    title:string;
    content:string;
    img:string;
}
function BlogList() {
    const [isPressed, setIsPressed] = useState(false);
  const [blogs,setBlogs]=useState<Blog[]>([]);
    const [page,setPage]=useState<number>(1);
    const [blogname,setBlogname]=useState<string>('');
    const [loading, setLoading] = useState(false);
  const getBlogs=()=>{
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API}blogs?page=${page}`,{withCredentials:true}).then((res)=>{
        setBlogs(res.data.blogs || []);
    }).catch((err)=>{
        console.log(err);
    }).finally(() => {
        setLoading(false);
      });
  }
  const searchBlogs=(title:string)=>{
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API}blogs/search?query=${title}`,{withCredentials:true}).then((res)=>{
        setBlogs(res.data.blogs || []);
        setLoading(false);
    }).catch((err)=>{
        console.log(err);
        setLoading(false);
    })
  }
  useEffect(()=>{
    getBlogs();
  },[page])
useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && !loading) {
        setPage((prev) => prev + 1); // Trigger next page
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);
 

  return (
    <>
    <div className="container">
        <div className="row justify-content-end">
            <div className="col-12"><h1>Blog List</h1></div>
            <div className="col-lg-4 col-md-6 position-relative">
                    <input type="text" className="form-control" placeholder="Search..." onChange={(e)=>setBlogname(e.target.value)} />
                    <i className="bi bi-search position-absolute top-0 end-0 border-0 p-2 me-2"  onClick={()=>{searchBlogs(blogname)}}
                    
                    style={{ 
    cursor: 'pointer',
    borderRadius: '50%', // Ensures the background blur is circular
    transition: 'background-color 0.15s ease, backdrop-filter 0.15s ease, transform 0.1s ease',    
    backgroundColor: isPressed ? 'rgba(255, 255, 255, 0.2)' : 'transparent', 
    backdropFilter: isPressed ? 'blur(8px)' : 'none',
    transform: isPressed ? 'scale(0.92)' : 'scale(1)',     // Slight push-down feel
  }}
onMouseDown={() => setIsPressed(true)}
  onMouseUp={() => setIsPressed(false)}
  onMouseLeave={() => setIsPressed(false)}
  onTouchStart={() => setIsPressed(true)}
  onTouchEnd={() => setIsPressed(false)}
                    
                    />
                </div>
            <div className="row ">
                
                <div className="col-lg-4 col-md-5 col-12">
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
                <div className="col-lg-8 col-lg-7 col-12">
                <Outlet />
                </div>
            </div>
    </div>
    </div>
    </>
  )
}

export default BlogList