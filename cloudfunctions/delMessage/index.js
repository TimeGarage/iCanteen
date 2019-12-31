
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    console.log(event.user)
    return await db.collection('user').doc(event.user)
      .set({
        data: {
          message: []
        },
      })
  } catch (e) {
    console.error(e)
  }
}