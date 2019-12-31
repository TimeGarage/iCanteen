const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('user').where({
      account: event.useraccount
    })
      .update({
        data: {
          fav: _.unshift(['event.id'])
        },
      })
  } catch (e) {
    console.error(e)
  }
}