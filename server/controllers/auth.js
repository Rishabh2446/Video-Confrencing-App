import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
export const register = async(req, res)=>{
    try{
       const {username, email, password}= req.body;

       const salt = await bcrypt.genSalt();
       const hashPassword = await bcrypt.hash(password, salt);

       const newUser = new User({
        username,
        email,
        password: hashPassword
       });

       const user = await newUser.save();

       const token = generateToken(user._id);

       const userData = {
        _id: user._id,
        username: user.username,
        email: user.email
       };

       res.status(200).json({token, user:userData});

    }catch(err){
        res.status(500).json({error: err.message});
    }
};

export const login = async(req, res)=>{

    try{

        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({msg: "User does not exist"});

        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(400).json({msg: "Invalid Credential!"})
        }

        const token = generateToken(user._id);
        delete user.password;
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        res.status(200).json({token, user:userData});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};