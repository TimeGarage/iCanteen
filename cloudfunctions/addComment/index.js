// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const cmd = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.identity == "stu") {
    try {
      return await db.collection("discuss").doc(event.user).update({
        data: {
          stu_comment: cmd.push(event.remark),
          pageview: cmd.inc(-1)
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  if (event.identity == "admin") {
    try {
      return await db.collection("discuss").doc(event.user).update({
        data: {
          admin_comment: cmd.push(event.remark),
          pageview: cmd.inc(-1)
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}