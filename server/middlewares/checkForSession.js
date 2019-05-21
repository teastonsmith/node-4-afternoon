// export function that has req, res, and next parameter
module.exports = function(req, res, next) {
  const { session } = req

  if( !session.user ) {
    session.user = { username: '', cart: [], total: 0}
  }
  next()
}