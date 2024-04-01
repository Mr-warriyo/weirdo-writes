// User Ids for Validation

const User = require("../../models/user")

const userID = async () => {
    try {
        const usr = await User.find({}, "_id")

        const usrIds = await usr.map(user => user._id)

        return usrIds

    } catch (error) {
        console.log(error)
        res.json({
            status: "FAILED!",
            message: error.message
        })
    }
}

module.exports = { userID }