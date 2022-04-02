const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async(req, res) => {
    try {
        const body = req.body;
        const response = await AuthServiceInstance.signup(body);
        return res.json(response);
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(409).json({
                message: "Failed to create new user",
                reason: "Already Exists in DB"
            })
        } else {
            res.status(500).json({ message: "Error creating user", err });
        }
    }
}

const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AuthServiceInstance.verifyPassword(username, password);
        if (user) {
            res.json({userId: user._id, isLoggedIn: true });
         } else {
             return res.status(404).json({message: "Incorrect crendetial", isLoggedIn: false });
         }
    } catch (err) {
        res.statu(500).json({message: "error in login", err});
    }
}

module.exports = { postSignup, postLogin };