const calculateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    
    const hasPassed = today.getMonth() > birth.getMonth() || 
                     (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

    return hasPassed ? age : age - 1;
};
export default calculateAge;