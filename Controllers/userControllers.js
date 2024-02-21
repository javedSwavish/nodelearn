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

    const search = req?.query?.search;
    const status = req?.query?.status;  //All,Active,In-Active
    const gender = req.query.gender;
    const sort = req.query.sort || '';  //new
    const page = req.query.page || 1;
    const per_page = 5;

    const query = {
        ... (!!search && { firstname: { $regex: search, $options: "i" } }),
        ...(!!status && status !== 'All' && { status: status }),
        ...(!!gender && { gender: gender }),
        // ...(!!sort && { sort: sort })
    }
    console.log('sort', sort)
    try {
        const skip = (page - 1) * per_page;
        const count = await users.countDocuments(query); //count total items 
        const pageCount = Math.ceil(count / per_page);
        const isNextPage = page != pageCount;
        const isPrevPage = page != 1;
        console.log('count', count, 'pageCount', pageCount, 'isNextPage', isNextPage, 'isPrevPage', isPrevPage, 'page', page)
        const usersData =
            await users
                .find(query)
                .sort({ updatedAt: sort === 'new' ? -1 : 1, firstname: 1 })
                .limit(page === 'all' ? null : per_page)
                .skip(page === 'all' ? null : skip)

        res.status(200).json({
            ...(page !== 'all' && {
                pagination: {
                    isNextPage, isPrevPage, currentPage: page, totalPage: pageCount, per_page, totalItem: count
                }
            }),
            usersData
        });
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
        // deleteUserData.message = 'Deleted successfully'

        let message = { ...deleteUserData?._doc, message: 'Deleted successfully' }
        console.log('message', message);
        res.status(200).json(message);
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