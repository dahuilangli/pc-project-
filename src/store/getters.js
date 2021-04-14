const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,

  userId: state => state.user.userId,
  privateKey: state => state.user.privateKey
}
export default getters
