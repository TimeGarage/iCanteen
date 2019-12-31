// miniprogram/pages/my/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      messageList: [],
      messageShow: [],
      message:{
        _id: '',
        time: '',
        content: '',
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('message page onload')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    // 获取登录信息
    wx.getStorage({
      key: 'is_login',
      success: function (res) {
        that.setData({
          is_login: res.data
        });
        console.log('message- is_login: ' + that.data.is_login)
        if(!that.data.is_login){
          wx.showModal({
            title: '错误信息',
            content: '请登录',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/my',
                })
              }
            },
            
          });     
        }
        if (that.data.is_login) {
          console.log('get current user ok')
          wx.getStorage({
            key: 'name',
            success: function (res) {
              that.setData({
                username: res.data
              });
            },
          })
          wx.getStorage({
            key: 'account',
            success: function (res) {
              that.setData({
                account: res.data
              });
              wx.cloud.init()
              wx.cloud.database().collection('user').where({
                account: that.data.account
              }).get({
                success: res => {
                  that.setData({
                    //获取当前message
                    messageList: res.data[0].message
                  });               
                  that.data.messageShow = that.data.messageList
                  that.setData(that.data);

                },
                fail: err => {
                  wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                  })
                  console.error('[数据库] [查询记录] 失败：', err)
                }
              })
            },
          })
          
        }


      },
    })

  },
  detail: function (e) {
    var that = this
    // 获取登录信息
    wx.getStorage({
      key: 'is_login',
      success: function (res) {
        that.setData({
          is_login: res.data
        });
        console.log('message- is_login: ' + that.data.is_login)
        if (that.data.is_login) {
          id = wx.getStorageSync('id')
          console.log('调试clearMessage')
          console.log(id)

          wx.cloud.callFunction({
            // 云函数名称
            name: 'clearMessage',
            // 传给云函数的参数
            data: {
              user: id,
            },
          })
            .then(res => {
              console.log('cloud function done')
            }).catch(console.error)


        }

      },
    })
    var id = e.currentTarget.dataset.id
    console.log('dataset')
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/discuss/detail/detail?id=' + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})