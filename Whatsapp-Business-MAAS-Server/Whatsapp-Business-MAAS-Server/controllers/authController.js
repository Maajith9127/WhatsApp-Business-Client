import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    return res.status(200).json({
      message: "Valid token",
      userId: decoded.id,
      success: true,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};
