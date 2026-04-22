import userModel from "../models/User.mjs";

const dashboard = async (req, res) => {
    const dashboardDat = await userModel.aggregate([
  { $group: {
      _id: null,
      totalUsers: {
        $sum: 1
      },
      bloodGroupO: {
        $sum: {
          $cond: [
            {
              $regexMatch: {
                input: "$bloodGroup",
                regex: RegExp("^O[\\+-]?$", "i")
              }
            },
            1,
            0
          ]
        }
      },
      countMale: {
        $sum: {
          $cond: [
            {
              $eq: ["$gender", "male"]
            },
            1,
            0
          ]
        }
      },
      countFemale: {
        $sum: {
          $cond: [
            {
              $eq: ["$gender", "female"]
            },
            1,
            0
          ]
        }
      }
    }},
   
    {$project: {
                    _id: 0, // Remove the null ID
                    stats: [
                        { title: "Total Users", count: "$totalUsers" },
                        { title: "Blood Group O", count: "$bloodGroupO" },
                        { title: "Male Users", count: "$countMale" },
                        { title: "Female Users", count: "$countFemale" }
                    ]
                }}
  
]);

    if (!dashboardDat || dashboardDat.length === 0) {
        res.status(200).json({ message: "No data found" });
    } else {
      console.log(dashboardDat);
        res.status(200).json(dashboardDat[0].stats);
    }
};

export default dashboard;