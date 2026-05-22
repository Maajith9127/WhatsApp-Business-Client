import jwt from 'jsonwebtoken';
import credentialModel from '../models/credentialModel.js';

const auth = async (request, response, next) => {

  try {
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({ message: "Provide token" });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return response.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }


    const val = await credentialModel.getCredentialsById(decode.id);
    request.user = {
      id: decode.id,
      credentialid: val?.id || null  //  safe access with fallback
    };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return response.status(500).json({
      message: error.message || "You have not logged in!",
      error: true,
      success: false,
    });
  }
};

export default auth;
