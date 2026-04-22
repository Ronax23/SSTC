import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import errorAnimate from '../Loading/Error404.json'; 
import loadingAnimate from '../Loading/Gears Lottie Animation.json';
import { Link } from 'react-router-dom'

function LoaderError({loading=false,hasError=false}) {
    if(!loading && !hasError){
        return null;
    }
    
        return (
        <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
            <DotLottieReact
      data={loading ? loadingAnimate: errorAnimate}
      loop
      autoplay
      className={loading ? "lottie-container-loading" : "lottie-container"}
    />
    {loading ? (
        <p>Loading...</p>
    ):
    (
<div className="btn">
     <Link to="/" className='btn btn-primary d-block mx-auto mt-3'>Go to Home</Link>
   </div>
    )}
        </div>
        )
    }

export default LoaderError