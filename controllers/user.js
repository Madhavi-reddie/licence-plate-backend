const path = require('path');
const User = require(path.resolve(DB_MODEL, 'user'));
const dbconnect = require(path.resolve(__dirname, '..', 'dbconnect'));
const jwt = require('jsonwebtoken');


module.exports = {
  signup: async (req, res) => {
    try {
      await dbconnect();
      const { password, email, name } = req.body;
     let doc = await User.create({ password, email, name });
      res.status(201).json({ message: 'User created successfully' ,_id:doc._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      await dbconnect();
      const { password, email } = req.body;
      let userDoc = await User.findOne({ email: email });
      if (!userDoc.password == password) {
        return res.status(401).json({ message: 'invalid credentials' });
      }
      let token = jwt.sign({ userId: userDoc.id }, __configurations.SECRETKEY)
      res.status(200).json({ token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  search: async (req, res) => {
    try {
      await dbconnect();
     
      let docs = await User.find({} ,"-password");

      res.status(200).json({users:docs})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
