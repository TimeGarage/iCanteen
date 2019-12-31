const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('menu').where({
      _id: event.id
    })
      .update({
        data: {
          comment: _.unshift([{comments:event.input,date: event.date}])
        },
      })
  } catch (e) {
    console.error(e)
  }
}