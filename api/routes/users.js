const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

// UPDATE USER
// router.put('/:id', async (req, res) => {
//     if (req.body.userId === req.params.id) {
//         if (req.body.password) {
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hash(req.body.password, salt);
//         }
//         try {
//             const updatedUser = await User.findByIdAndUpdate(
//                 req.params.id,
//                 {
//                     $set: req.body,
//                 },
//                 { new: true },
//             );
//             res.status(200).json(updatedUser);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         res.status(401).json('You can update only your account!');
//     }
// });

// DELETE USER
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json('User has been deleted!');
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json('User not found!');
        }
    } else {
        res.status(401).json('You can delete only your account!');
    }
});

// GET USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CHECK PASSWORD USER WHEN CHANGE PROFILE
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         const validated = await bcrypt.compare(req.body.password);
//         if (validated) {
//             return true;
//         } else {
//             return false;
//         }
//     } catch (err) {
//         console.log(err);
//     }
// });
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    try {
        if (!user) return res.status(404).json('User is not existed!');
        const check = await bcrypt.compare(req.body.password, user.password);
        if (!check) return res.status(403).json('Your password is not valid!');
        const hashedPassword = await hashPassword(req.body.newPassword);
        const { password, newPassword, ...resData } = req.body;
        const updatedData = {
            ...resData,
            password: hashedPassword,
        };
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: updatedData,
            },
            { new: true },
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json(updatedUser);
    }
});

module.exports = router;
