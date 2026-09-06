import axios from 'axios';
import {useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
interface Blog{
    title:string;
    blog_content:string;
    blogimg:FileList | string;
    tags?:string[];
}
function CreateBlogs() {
    const {id}=useParams();
    const edit=Boolean(id)
      const { register, handleSubmit, formState: { errors },reset,watch } = useForm<Blog>({
        mode: "onBlur"
    })
    const [title,content]=watch(['title','blog_content'])
    const [AItags, setAITags] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [allAITags, setAllAITags] = useState<string[]>([]); // Master set of fetched AI tags
    const [tagInput, setTagInput] = useState<string>(""); // Field typing state
    const [preview, setPreview] = useState<string>("");

    const tagSuggestion=async()=>{
        const ai = (window as any).ai || (window as any).LanguageModel;
        if(!ai){
            return ['redis']
        };
        if(ai.available==='readily'||ai.available==='available'){
       try{
         const session = await ai.create({
        samplingMode: 'slightly-creative',
        expectedOutputs: [{ type: "text", languages: ["en"] }],
        expectedInputLanguages: [{ type: "text", languages: ["en"] }],
        temperature: 0.35,
        topK: 3,                            
      systemPrompt: "You are a helpful assistant that extracts tags from blog posts. Return only a comma-separated list of 8-10 keywords."
    });
    const promptText = `
      Title: ${title}
      Content: ${content.substring(0, 1000)}
      Extract 8 to 10 relevant topic tags for this blog post.`;
    const response = await session.prompt(promptText);

    const tags = response.split(',').map((tag: string) => tag.trim()).filter(Boolean);

    session.destroy();
    return tags;
       }
       catch(err){
        console.error('Error fetching tags:', err);
        return ['error'];
       }
        };
        return ['redix'];
    }

    useEffect(() => {
        if (!title && !content) return;
      const  timer=setTimeout(() => {
            tagSuggestion().then((AItags) => {
                // Exclude tags that are already selected in active tags state
               const filteredNewAI = AItags.filter((t:any) => !tags.includes(t));
        setAITags(filteredNewAI);
        setAllAITags(AItags);
            }).catch((error) => {
                console.error('Error fetching tags:', error);
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, [title, content]);

const addTag = (rawTag: string) => {
    const cleanedTag = rawTag.trim().replace(/^#/, '').replace(/,/g, '');
    if (cleanedTag && !tags.includes(cleanedTag)) {
      setTags((prev) => [...prev, cleanedTag]);
      // If it was in the AI suggestions list, remove it from suggestions
      setAITags((prev) => prev.filter((t) => t !== cleanedTag));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      // Remove last tag when hitting backspace in empty field
      removeTag(tags[tags.length - 1]);
    }
  };
const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const parsed = pastedData.split(/[\s,]+/);
    parsed.forEach((t) => addTag(t));
    setTagInput("");
  };

  // Remove Tag Logic: If AI tag, return to suggestions pool; if manual, discard
  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));

    // Check if the tag originally came from AI suggestions
    if (allAITags.includes(tagToRemove) && !AItags.includes(tagToRemove)) {
      setAITags((prev) => [...prev, tagToRemove]);
    }
  };

  // Click on AI Suggested Tag
  const handleAISuggestionClick = (aiTag: string) => {
    addTag(aiTag);
  };
const postdata=(data:Blog)=>{
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("blog_content", data.blog_content);
    formData.append("tags", data.tags?.join(', ') || '');
    if (data.blogimg instanceof FileList && data.blogimg.length > 0) {
      formData.append("blogimg", data.blogimg[0]);
    } else if (typeof data.blogimg === 'string') {
      formData.append("blogimg", data.blogimg);
    }
axios[edit?'put':'post'](`{import.meta.env.VITE_API_URL}/blogs/${edit?`edit/${id}` : 'add'}`,formData,
    {withCredentials:true, headers: { "Content-Type": "multipart/form-data" }},).then((res)=>{
    if(res.data.status===200)
    {

    }
    else{

    }
}).catch(err=>console.log(err))
}
    const fetchdat=()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`).then((res)=>{
            reset(
           {
             title:res.data.title,
            blog_content:res.data.blog_content,
            blogimg:res.data.blogimg
           }) 
           setPreview(res.data.blogimg)
        }).catch(err=>console.log(err))
    }
useEffect(()=>{
    if(id&&edit)fetchdat();
},[id,edit])

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
                    <div className="row">
                        <div className="col-lg-9">
                            <section className="mb-3">
                        <label htmlFor="title" className="form-label h2">Title</label>
                        <input type="text" className="form-control" id="title" placeholder='Enter Title' {...register("title",{required:true})}/>
                        {errors.title && <p>Enter Title</p>}
                    </section>
                    <section className="mb-3">
              <label className="form-label">Upload Image</label>
              <input type="file" className="form-control"  {...register("blogimg",{required:!edit,onChange: uploadImg})} />
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
                        </div>



                         <div className="col-lg-3">
                          <h4>Enter Tags</h4>
                    <div
                  className="d-flex flex-wrap align-items-center gap-2 p-2 border rounded bg-white"
                  style={{ minHeight: "120px", cursor: "text" }}
                  onClick={() => document.getElementById("tag-input-field")?.focus()}
                >
                 
                  {tags.map((tag, index) => (
                    <span key={index} className="badge bg-primary d-inline-flex align-items-center gap-1 p-2 fs-6">
                      #{tag}
                      <i className="bi bi-x-lg ms-1" style={{ cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation();removeTag(tag);}}></i>
                    </span>
                  ))}

                  {/* Typing Input */}
                  <input
                    id="tag-input-field"
                    type="text"
                    className="border-0 flex-grow-1 shadow-none bg-transparent"
                    style={{ outline: "none", minWidth: "120px" }}
                    placeholder={tags.length === 0 ? "Type and hit Space or Comma..." : ""}
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste} />
                </div>
                <small className="text-muted mt-1 d-block">
                  Press <strong>Comma</strong>, <strong>Space</strong>, or <strong>Enter</strong> to create a tag.
                </small>
              </div>

              {/* AI Suggested Tags Section */}
              <div className="mb-3">
                <h3>Suggested Tags</h3>
                <div className="d-flex flex-wrap gap-2">
                  {AItags.length > 0 ? (
                    AItags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary p-2 fs-6"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAISuggestionClick(tag)}
                      >
                        + {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted small">No AI suggestions available.</p>
                  )}
                </div>
              </div>
            </div>                  
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </section>
        </section>

    
    </>
  )
}

export default CreateBlogs