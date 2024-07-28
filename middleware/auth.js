// const jwt = require("jsonwebtoken");

// exports.authUser = async (req,res,next)={
//     try {
//         let temporary = req.header('Authorization')
//         let token = temporary ? temporary.slice(7, temporary.length) : " "

//         if(!token){
//             res.status(400).json{
//                 message : 'invalid Authorization'
//             }
//         }

//         jwt.verify(token,)

//     } catch (error) {
//         if(error){
//             res.status(400).json{
//                 message : error.message
//             }
//         }
//     }
// }
