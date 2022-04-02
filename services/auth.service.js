const bcrypt = require("bcrypt");   
const UserModel = require("../models/user.model");

class AuthService {

    encryptPassword = async (password) => {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword; 
    };  

    signup = async (user) => {
        try {
            const hashedPassword = await this.encryptPassword(user.password);
            // const newUser = new UserModel({ username, email, password });
            const result = await UserModel.create({ ...user, password: hashedPassword});
            // const results = await newUser.save();
            return result;
        } catch (err) {
            throw err;
        }
    };

    verifyPassword = async (username, password) => {
        try {
            const user = await UserModel.findOne({ username });
            const isVerified = await bcrypt.compare(password, user.password);
            if (isVerified) {
                return user;
            }
            return null;
        } catch (err) {
            throw err;
        }
    };


}

module.exports = AuthService;