import con from "../config/dbConnect.mjs";
import userModel from "../models/User.mjs";
import calculateAge from "../utilities/ageCal.mjs";

const userList = async (req, res) => {

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const dat = await userModel.find({}, { firstName: 1,lastName: 1, bloodGroup: 1, gender: 1, _id: 1,image:1,birthDate:1 }).limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 });
   console.log("Fetched Users:", dat); // Debugging log
    const ageCalculatedData = dat.map(user => {
        console.log("User Birth Date:", user._doc.birthDate); // Debugging log
        const age = calculateAge(user._doc.birthDate);
        return { ...user._doc, age };
    });

    const total = Math.ceil(await userModel.countDocuments()/limit);
    if (!dat)
    {
        res.status(200).json({message:"No data found"});
    }
    else
    {
        res.status(200).json({ data: ageCalculatedData, total });
    }
};
export default userList;