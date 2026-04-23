import {useState} from 'react'

function Blogs() {

        const [preview, setPreview] = useState<string>("");
    const uploadImg=(e)=>{
        console.log(URL.createObjectURL(e.target.files[0]))
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

 return (
    <>
        <section className="container">
            <section className="row">
                <section className="col-12"><h1>Create Blogs</h1></section>
                <form action="">
                    <section className="mb-3">
                        <label htmlFor="title" className="form-label h2">Title</label>
                        <input type="text" className="form-control" id="title" placeholder='Enter Title'/>
                    </section>
                    <section className="mb-3">
              <label className="form-label">Upload Image</label>
              <input type="file" className="form-control" onChange={uploadImg} />
              {preview && 
              
              <section className=" mx-auto w-50 h-50 my-3">
<img src={preview} className='img-fluid w-100 h-100 rounded'></img>
 </section>}
           
             
               </section>
                    <section className="mb-3">
                        <textarea name="blog-content" className="form-control" id="" rows={3} placeholder='Enter Blog Content'></textarea>
                    </section>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </section>
        </section>

    
    </>
  )
}

export default Blogs