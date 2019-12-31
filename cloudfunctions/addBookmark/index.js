// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const cmd = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.todo == "push"){
    try {
      return await db.collection("user").doc(event.user).update({
        data: {
          bookmark: cmd.push(event.remark)
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
    if(event.todo == "pull"){
      try {
        return await db.collection("user").doc(event.user).update({
          data: {
            bookmark: cmd.pull(event.remark)
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }