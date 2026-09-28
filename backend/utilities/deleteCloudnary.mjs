
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  try{
   const parts = url.split("/");
const uploadIndex = parts.indexOf("upload");

if (uploadIndex === -1) return null; 

const pathAfterUpload = parts.slice(uploadIndex + 1);
if (pathAfterUpload[0] && /^v\d+$/.test(pathAfterUpload[0])) {
  pathAfterUpload.shift();
}

const fullPathWithExt = pathAfterUpload.join("/"); // Keeps entire folder hierarchy intact

// Uses Regex to remove ONLY the last extension (.jpg, .png, etc.)
const publicId = fullPathWithExt.replace(/\.[^/.]+$/, "");

return publicId || null;
  }
  catch(err){return null};
};
const deleteCloud=async(imagepath)=>
{
    if(!imagepath) return false
try{
    const oldPublicId = getPublicIdFromUrl(imagepath);
      if (oldPublicId) {
        const del=await cloudinary.uploader.destroy(oldPublicId);
      }
      if(del.result=='ok'){
        return true;
      }
      else{
        return false;
      }
}
catch(err)
{
    return false;
}
}


export default deleteCloud;