const User = require('../models/user')

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) return res.status(200).json({ message: 'Login successful' });
        if (!user) return res.status(400).json({ message: 'User does not exist' });
        if (user.password !== password) return res.status(400).json({ message: 'Invalid password' });
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
