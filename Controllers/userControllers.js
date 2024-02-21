const users = require("../models/usersSchema");
const moment = require("moment")
//imp functions--->
//res.status(400).json({ error: "message" }); //400,200

//users.findOne({ email: 'javed@gmail.com' })

//for new data save -->
// const userData = new users({
//     firstname, email, mobile, gender, status, datecreated: dateCreate
// });
// await userData.save()


exports.userpost = async (req, res) => {
    const { firstname, email, mobile, gender, status } = req.body;

    if (!firstname || !email || !mobile || !gender || !status) {
        res.status(400).json({ error: "All Input Is required" });
    }

    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            res.status(400).json({ error: "This user already exist in our database" });
        } else {
            const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new users({
                firstname, email, mobile, gender, status, datecreated: dateCreate
            });

            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

//get user list
exports.getUsers = async (req, res) => {
    console.log('getReq', req?.query?.search)
    const search = req?.query?.search;
    const status = req?.query?.status;  //All,Active,In-Active
    const gender = req.query.gender;
    const sort = req.query.sort;  //new

    // const query={
    //     $or: [
    //         { firstname: { $regex: search, $options: 'i' } },
    //         { email: { $regex: search, $options: 'i' } },
    //         { mobile: { $regex: search, $options: 'i' } },
    //         { gender: { $regex: search, $options: 'i' } },
    //         { status: { $regex: search, $options: 'i' } }
    //     ]
    // }
    const query = {
        ... (!!search && { firstname: { $regex: search, $options: "i" } }),
        ...(!!status && status !== 'All' && { status: status }),
        ...(!!gender && { gender: gender }),
        ...(!!sort && { sort: sort })
    }
    console.log('query', query)
    try {
        const usersData = await users.find(query).sort({ datecreated: 1 });
        res.status(200).json(usersData);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

//get single user
exports.getSingleuser = async (req, res) => {
    const { id } = req.params;
    try {
        // const singleUserData = await users.findById(id);
        const singleUserData = await users.findOne({ _id: id });
        res.status(200).json(singleUserData);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

//delete user
exports.deleteuser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUserData = await users.findByIdAndDelete(id);
        res.status(200).json(deleteUserData);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}

//update user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, email, mobile, gender, status } = req.body;

    // if (!firstname || !email || !mobile || !gender || !status) {
    //     res.status(400).json({ error: "All Input Is required" });
    // }

    try {
        const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const updateUserData = await users.findByIdAndUpdate(id, {
            firstname, email, mobile, gender, status, dateCreate
        }, { new: true });

        await updateUserData.save();
        res.status(200).json(updateUserData);
    } catch (error) {
        res.status(400).json(error);
        console.log("catch block error")
    }
}