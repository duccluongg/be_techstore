const isAdmin = (req, res, next) => {
  const user = req.payload
  
  if (user.role !== 'admin') {
    return next({
      status: 401,
      error: 1,
      message: "You_are_not_admin",
      data: null,
    })
  }

  next()
}

module.exports = { isAdmin }
