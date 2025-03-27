const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try{
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck)
            return res.json({ msg: "Username already in use.", status: false });
        const emailCheck = await User.findOne({ email });
        if(emailCheck)
            return res.json({ msg: "Email is already in use.", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, username, password: hashedPassword });
        delete user.password;
        return res.json({ status: true, user  })
    } catch (err){
        next(err)
    }
}
module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
          return res.json({ msg: "Incorrect email or Password", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.json({ msg: "Incorrect email or Password", status: false });
        delete user.password
        const userResults = { username: user.username, email: user.email, admin: user.admin, _id: user._id }
        return res.json({ status: true, user: userResults });
    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([ "email", "username", "admin", "_id" ]);
        return res.json(users);
        
    } catch(ex) {
        next(ex);
    }
}
module.exports.changeAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(user === undefined)
            return res.json({ msg: "The id is incorrect.", status: false });
        else {
            user.updateOne({ admin: req.body.admin }).then(() => {
                return res.json({ status: true, user });
            });
        }
    } catch(ex) {
        return res.json({ msg: "The id is incorrect.", status: false });
    }
}