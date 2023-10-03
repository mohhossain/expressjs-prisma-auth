import jwt from "jsonwebtoken";
export const verify = (req, res, next) => {
  if (!req.cookies.auth) {
    return res.status(401).json("Unauthorized");
  }
  const token = req.cookies.auth;

  jwt.verify(token, "supersecret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // 'decoded' will contain the payload of the JWT token
    // You can access the data in the payload like this:
    const userId = decoded.id;
    req.userId = userId;
  });

  next();
};
