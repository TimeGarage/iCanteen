// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const cmd = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("user").doc(event.user).update({
      data: {
        password: event.newpassword
      }
    })
  } catch (e) {
    console.error(e)
  }
}