const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('menu').where({
      _id: event.id
    })
      .set({
        data: {
          isfav: event.islike
        },
      })
  } catch (e) {
    console.error(e)
  }
}