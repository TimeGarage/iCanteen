// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const cmd = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("discuss").doc(event.id).update({
      data: {
        pageview: cmd.inc(event.num)
      }
    })
  } catch (e) {
    console.error(e)
  }
}