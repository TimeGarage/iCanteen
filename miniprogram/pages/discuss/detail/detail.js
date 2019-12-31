var util = require("../../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    owner: "",
    review: "",
    pageview: 0,
    id: 0,
    admin: [],
    stu:[],
    content_time: "",
    stu_time: "",
    admin_time: "",
    identity: "stu",
    nickname: "Dustin",
    value: "",
    bookmark: "收藏"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userid = wx.getStorageSync('id')
    var identity = wx.getStorageSync('identity')
    const db = wx.cloud.database()
    db.collection('user').doc(userid).get().then(res => {
      wx.setStorage({
        key: 'bookmark',
        data: res.data.bookmark,
      })
    })
    that.setData({
        id: options.id,
        uid: userid,
      })
  },
  book: function(e){
    var that = this
    const db = wx.cloud.database()
    const cmd = db.command
    if(that.data.bookmark == "收藏"){
      db.collection('discuss').doc(that.data.id).update({
        data: {
          bookmark: cmd.inc(1),
          pageview: cmd.inc(-1)
        }
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'addBookmark',
        // 传给云函数的参数
        data: {
          user: that.data.uid,
          remark: that.data.id,
          todo: "push",
        },
      })
      wx.showToast({
        title: '已收藏',
      })
      that.setData({
        bookmark: "取消收藏"
      })
    }
    else{
      wx.cloud.callFunction({
        // 云函数名称
        name: 'addBookmark',
        // 传给云函数的参数
        data: {
          user: that.data.uid,
          remark: that.data.id,
          todo: "pull",
        }
      })
      db.collection('discuss').doc(that.data.id).update({
        data: {
          bookmark: cmd.inc(-1),
          pageview: cmd.inc(-1)
        }
      })
      wx.showToast({
        title: '取消收藏',
      })
      that.setData({
        bookmark: "收藏"
      })
    }
  },

  formSubmit: function(e) {
    var comment = e.detail.value.comment
    var that = this
    var arr = []
    var time = util.formatTime(new Date());
    const db = wx.cloud.database()
    var nickname = wx.getStorageSync('nickname')
    const cmd = db.command
    arr = [[that.data.id, that.data.review, nickname, time, comment]]
   var identity = wx.getStorageSync('identity')
    console.log(arr)
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addComment',
      // 传给云函数的参数
      data: {
        user: that.data.id,
        remark: arr,
        identity: identity
      },
    })
      .then(res => {
        console.log(res.result)
      }).catch(console.error)
  
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addMessage',
      // 传给云函数的参数
      data: {
        user: that.data.uid,
        remark: arr,
      }
    })
    wx.showToast({
      title: '提交成功',
    })
    if (identity == 'stu'){
      var temp = that.data.stu
      temp.push(arr[0])
      console.log(temp)
      that.setData({
        stu: temp
      })
    }
    if(identity == 'admin'){
      var temp = that.data.admin
      temp.push(arr[0])
      console.log(temp)
      that.setData({
        admin: temp
      })
    }
  },

  onShow: function () {
    var that = this
    var status = ''
    const db = wx.cloud.database()
    var bookmark = wx.getStorageSync('bookmark')
    console.log(bookmark)

    if(bookmark.includes(that.data.id)){
      status = '取消收藏'
    }
    else{
      status = '收藏'
    }
    console.log(status)
    wx.cloud.init()
    db.collection('discuss').where({
      _id: that.data.id
    }).get({
      success: res => {
        that.setData({
          owner: res.data[0].account,
          review: res.data[0].content,
          pageview: res.data[0].pageview + 1,
          content_time: res.data[0].content_time,
          stu: res.data[0].stu_comment,
          admin: res.data[0].admin_comment,
          bookmark: status,
          photoPath: res.data[0].photoID
        })
      }
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addPageview',
      // 传给云函数的参数
      data: {
        id: that.data.id,
        num: 1,
      },
    })
  }
})