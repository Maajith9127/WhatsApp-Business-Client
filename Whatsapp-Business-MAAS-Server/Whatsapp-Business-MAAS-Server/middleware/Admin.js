import UserModel from "../models/user.model.js"

export const admin = async(request,response,next)=>{
    try {
       const  userId = request.userId

      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
const user = rows[0];


       if(user.role !== 'ADMIN'){
            return response.status(400).json({
                message : "Permission denied",
                error : true,
                success : false
            })
       }

       next()

    } catch (error) {
        return response.status(500).json({
            message : "Permission denied",
            error : true,
            success : false
        })
    }
}