import sendEmail from "../config/sendEmail.js";
//import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import genertedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageClodinary from "../utils/uploadImageClodinary.js";
import jwt from "jsonwebtoken";
import generatedOtp from "../utils/generatedOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import db from "../config/database.js"

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Provide name, email, and password',
        error: true,
        success: false,
      });
    }

    // Check if user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({
        message: 'Email already registered',
        error: true,
        success: false,
      });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const userId = result.insertId;

    // Send verification email
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${userId}`;
    await sendEmail({
      sendTo: email,
      subject: 'Verify your email',
      html: verifyEmailTemplate({ name, url: verifyEmailUrl }),
    });

    return res.status(201).json({
      message: 'User registered successfully',
      error: false,
      success: true,
      data: { id: userId, name, email },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error',
      error: true,
      success: false,
    });
  }
}
export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;

    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [code]);
    if (user.length === 0) {
      return res.status(400).json({
        message: 'Invalid verification code',
        error: true,
        success: false,
      });
    }

    await db.query('UPDATE users SET verify_email = ? WHERE id = ?', [true, code]);

    return res.json({
      message: 'Email verified successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error',
      error: true,
      success: false,
    });
  }
}
//login controller
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Provide email and password',
        error: true,
        success: false,
      });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    const user = users[0];

    if (user.status !== 'Active') {
      return res.status(403).json({
        message: 'User account is not active',
        error: true,
        success: false,
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Incorrect password',
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user.id);
    const refreshToken = await genertedRefreshToken(user.id);

    // Update last login date and refresh token
    await db.query(
      'UPDATE users SET last_login_date = ?, refresh_token = ? WHERE id = ?',
      [new Date(), refreshToken, user.id]
    );
    
  
    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
     const token = jwt.sign(
          { id: user.id }, // Payload (usually only user id)
          process.env.SECRET_KEY_ACCESS_TOKEN, // Secret key
          { expiresIn: '1h' } // Optional: token expiry time
        );

    return res.json({
      message: 'Login successful',
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error',
      error: true,
      success: false,
    });
  }
}
//logout controller
export async function logoutController(req, res) {
  try {
    const userId = req.user.id; // Assuming middleware sets req.userId
    console.log('logout User ID:', userId);
    

    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    // Remove refresh token from database
    await db.query('UPDATE users SET refresh_token = ? WHERE id = ?', ['', userId]);

    return res.json({
      message: 'Logout successful',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error',
      error: true,
      success: false,
    });
  }
}
//upload user avatar
export async function uploadAvatar(req, res) {
  try {
    const userId = req.user.id; // Assuming middleware sets req.userId
    const image = req.file; // Assuming multer middleware

    const uploadResult = await uploadImageClodinary(image);

    await db.query('UPDATE users SET avatar = ? WHERE id = ?', [uploadResult.url, userId]);

    return res.json({
      message: 'Avatar uploaded successfully',
      success: true,
      error: false,
      data: {
        id: userId,
        avatar: uploadResult.url,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error',
      error: true,
      success: false,
    });
  }
}
//update user details
export async function updateUserDetails(req, res) {
  try {
    const userId = req.user.id; // Assuming middleware sets req.userId
    const { name, email, mobile, password } = req.body;

    let hashedPassword = null;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashedPassword = await bcryptjs.hash(password, salt);
    }

    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (mobile) {
      updateFields.push('mobile = ?');
      updateValues.push(mobile);
    }
    if (hashedPassword) {
      updateFields.push('password = ?');
      updateValues.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        message: 'No fields to update',
        error: true,
        success: false,
      });
    }

    updateValues.push(userId);

    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    await db.query(updateQuery, updateValues);

    return res.json({
      message: 'User details updated successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Server error',
      error: true,
      success: false,
    });
  }
}

//forgot password not login
export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    const user = rows[0]; // if a user exists, this will be the user object; otherwise undefined


    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    const otp = generatedOtp();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000);
    await db.query(
      'UPDATE users SET forgot_password_otp = ?, forgot_password_expiry = ? WHERE id = ?',
      [otp, new Date(expireTime).toISOString(), user.id]
    );


    await sendEmail({
      sendTo: email,
      subject: "Forgot password from bk360store",
      html: forgotPasswordTemplate({
        name: user.name,
        otp: otp,
      }),
    });

    return response.json({
      message: "check your email",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//verify forgot password otp
export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    if (!email || !otp) {
      return response.status(400).json({
        message: "Provide required field email, otp.",
        error: true,
        success: false,
      });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    const user = rows[0]; // if a user exists, this will be the user object; otherwise undefined

    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return response.status(400).json({
        message: "Otp is expired",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return response.status(400).json({
        message: "Invalid otp",
        error: true,
        success: false,
      });
    }

    //if otp is not expired
    //otp === user.forgot_password_otp

    await db.query(
      'UPDATE users SET forgot_password_otp = ?, forgot_password_expiry = ? WHERE id = ?',
      ["", "", user.id]
    );


    return response.json({
      message: "OTP verification was successful.",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//reset the password
export async function resetpassword(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "provide required fields email, newPassword, confirmPassword",
      });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return response.status(400).json({
        message: "Email is not available",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "newPassword and confirmPassword must be same.",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    await db.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashPassword, user.id]
    );


    return response.json({
      message: "Password updated successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//refresh token controler
export async function refreshToken(request, response) {
 
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split(" ")[1]; /// [ Bearer token]

    if (!refreshToken) {
      return response.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    const verifyToken =  jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return response.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
      message: "New Access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get login user details
export async function userDetails(request, response) {
  console.log('Inisde get user');
  
  try {
    const userId = request.user.id;

    console.log(userId)

    const [rows] = await db.query(
      'SELECT id, name, email, mobile, avatar, verify_email, status, last_login_date, created_at FROM users WHERE id = ?',
      [userId]
    );
    const user = rows[0];

    return response.json({
      message: "user details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something is wrong",
      error: true,
      success: false,
    });
  }
}
