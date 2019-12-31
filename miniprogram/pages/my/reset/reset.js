// miniprogram/pages/my/reset/reset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    newpassword: '',
    confirmpassword: '',
    loginErrorCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 登录
   */
  reset: function () {
    var that = this;
    // 处理空输入
    if (that.data.password.length < 1 || that.data.account.length < 1 || that.data.newpassword < 1 || that.data.confirmpassword < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入账号和各密码',
        showCancel: false
      });
      return false;
    }
    //从云数据库获取用户信息
    wx.cloud.init()
    console.log(that.data.account)
    wx.cloud.database().collection('user').where({
      account: that.data.account
    }).get({
      success: res => {
        console.log('query success')
        if (!res.data[0]) {
          wx.showModal({
            title: '错误信息',
            content: '用户名或原密码错误',
            showCancel: false
          });
        } else if (that.data.newpassword != that.data.confirmpassword) {
          wx.showModal({
            title: '错误信息',
            content: '确认密码错误',
            showCancel: false
          });
        } else if (that.data.password === res.data[0].password && that.data.newpassword === that.data.confirmpassword) {
          console.log('重置密码一致')
          console.log(that.data.newpassword)
          wx.cloud.init()
          wx.cloud.database().collection('user').where({
            account: that.data.account

          }).get({
            success: res => {
              console.log(res.data[0]._id)
              wx.cloud.init()
              wx.cloud.callFunction({
                // 云函数名称
                name: 'changePassword',
                // 传给云函数的参数
                data: {
                  user: res.data[0]._id,
                  newpassword: that.data.newpassword,
                },
                complete: console.log
              })

            }
          })
          wx.showToast({
            title: '重置密码成功',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.switchTab({
                  url: '/pages/my/my',
                })
              }, 100) //延迟时间
            },

          })


          
        }
      },
    })


  },
/**
 * 获取输入学号
 */
bindaccountInput: function (e) {

  this.setData({
    account: e.detail.value
  });
},
/**
 * 获取输入密码（待优化）
 */
bindPasswordInput: function (e) {

  this.setData({
    password: e.detail.value
  });
},
bindNewPasswordInput: function (e) {

  this.setData({
    newpassword: e.detail.value
  });
},
bindConfirmPasswordInput: function (e) {

  this.setData({
    confirmpassword: e.detail.value
  });
},
/**
 * 一键删除输入
 */
clearInput: function (e) {
  switch (e.currentTarget.id) {
    case 'clear-account':
      this.setData({
        account: ''
      });
      break;
    case 'clear-password':
      this.setData({
        password: ''
      });
      break;
    case 'clear-newpassword':
      this.setData({
        newpassword: ''
      });
      break;
    case 'clear-confirmpassword':
      this.setData({
        confirmpassword: ''
      });
      break;
    case 'clear-code':
      this.setData({
        code: ''
      });
      break;
  }
}

})