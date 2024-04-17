const jwt = require("jsonwebtoken");
module.exports = {
  authenticationMiddleware: async function (req, res, next) {
    try {
    
      let token = req?.headers?.authorization?.split(" ")[1];

      if (token === undefined) {
        res.status(401).json({ message: " authorization  token is required" });
        return "";
      }

      try {
        let decoded = jwt.verify(token, __configurations.SECRETKEY);
        req.user = decoded;
      } catch (err) {
        res.status(401).json({ message: "  token is invalid" ,err:err});
        return "";
      }
      next();
      return;
    } catch (err) {
      console.log(`Error occured while verifing the token ${err}`);
      res.status(500).json({ message: "Internal server error" });
    }
  },
 
};