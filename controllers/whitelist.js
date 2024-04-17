const path = require('path');
const Whitelist = require(path.resolve(DB_MODEL, 'whitelist'));
const dbconnect = require(path.resolve(__dirname, '..', 'dbconnect'));


module.exports = {
    create: async (req, res) => {
        try {
            await dbconnect()
            const { licencePlatenumber } = req.body;
            let doc = await Whitelist.create({ licencePlatenumber: licencePlatenumber, createdBy: req.user.userId });
            res.status(201).json({ message: "created", _id: doc._id })
        }
        catch (err) {
            console.log(`Error while creating a whitelist`, err);
            res.status(500).json({ message: 'internal server error' })
        }
    },
    delete: async (req, res) => {

        try {
            await dbconnect();
            const _id = req.params.id;
            await Whitelist.deleteOne({ _id: _id });
            res.status(200).json({ message: 'deleted successfully' })
        }
        catch (err) {
            console.log(`Error while deleting a whitelist`, err);
            res.status(500).json({ message: 'internal server error' });
        }
    },
    search: async (req, res) => {

        try {
            await dbconnect();
            let docs = await Whitelist.find({}).populate("createdBy", "name");
            res.status(200).json({ plates: docs });
        }
        catch (err) {

            console.log(`error while searching for the whitelist`);
            req.status(201).json({ message: 'internal server error' })
        }
    },

    check: async (req, res) => {

        try {
            await dbconnect();
           
            const filter = { licencePlatenumber: req.body.licensePlateNumber }
            let docs = await Whitelist.find(filter)

            if (docs.length == 0) {

                return res.status(200).json({ message: 'not allowed' })
            }

            res.status(200).json({ message: 'allowed' });
        }
        catch (err) {

            console.log(`error while checking `);
            res.status(201).json({ message: 'internal server error' ,err })
        }
    },
}

