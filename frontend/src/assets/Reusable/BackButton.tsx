import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigateDashboard = useNavigate();
    const handleGoBack = () => {
        navigateDashboard(-1);
      };
  return (
    <div className=" d-flex justify-content-start">
  <span 
    onClick={handleGoBack} 
    className="bi bi-arrow-left role-button"
    style={{ cursor: 'pointer' }}
  ></span>
</div> 
  )
}

export default BackButton