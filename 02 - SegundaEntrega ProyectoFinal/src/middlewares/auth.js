export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log("autorizado: " , token === "autorizado")
  
    if (token === "autorizado") {
      next()
      
    } else {

      throw new Error('Not authorized')
    }
  } catch (error) {
    next(error)
  }
}
