//发帖
Page({
  data:{
    review: '',
    nickname: '',
    number: '',
    uid: '',
    files: []
  },

  formSubmit: function(e){
    var util = require("../../../utils/util.js")
    var that = this
    if(e.detail.value.review == ''){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        mask: 'true'
      })
    }
    else if(that.data.nickname!= ''){
      that.setData({ review: e.detail.value.review })
      wx.cloud.init()
      const db = wx.cloud.database()
      var time = util.formatTime(new Date())
      var uid = that.data.uid
      var id = ''
      const cmd = db.command
      db.collection('discuss').add({
        data: {
          account: that.data.number,
          nickname: that.data.nickname,
          content: that.data.review,
          content_time: time,
          stu_comment: [],
          admin_comment: [],
          bookmark: 1,
          pageview: 1,
          photoID: ''
        },
        success: res => {
          id = res._id
          if (that.data.files.length = 1) {
            var filePath = that.data.files[0]
            var cloudPath = 'discuss/' + id + '.jpg'
            wx.cloud.uploadFile({
              cloudPath: cloudPath,
              filePath: filePath, // 文件路径
              success: res => {
                console.log(id)
                db.collection('discuss').doc(id).update({
                  data:{
                    photoID: res.fileID,
                  }
                })
                console.log(res.fileID)
              },
              fail: err => {
              }
            })
          }
          console.log(id)
          console.log(uid)
          wx.cloud.callFunction({
            // 云函数名称
            name: 'addBookmark',
            // 传给云函数的参数
            data: {
              user: uid,
              remark: id,
              todo: "push",
            },
          })
            .then(res => {
              console.log(res.result) 
            }).catch(console.error)
          that.setData({
            files: []
          })
          wx.showToast({
            title: '发帖成功',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.navigateBack({
                  delta: 1
                })
              }, 100) //延迟时间
            },

          })
        },
        fail: err => {
          wx.showToast({
            title: '发帖失败',
          })
        }
      })
    }
    else{
      that.setData({
        files: []
      })
      wx.showToast({
        title: '您尚未登录',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            wx.navigateBack({
              delta: 1
            })
          }, 1000) //延迟时间
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var account = wx.getStorageSync('account')
    var nickname = wx.getStorageSync('nickname')
    var uid = wx.getStorageSync('id')

    that.setData({
      number: account,
      nickname: nickname,
      uid: uid,
      files: []
    })

  },

  onShow(){
    var that = this
    that.setData({
      files: []
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }

})