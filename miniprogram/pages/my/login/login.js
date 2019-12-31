// miniprogram/pages/my/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
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
  startLogin: function () {
    var that = this;
    // 处理空输入
    if (that.data.password.length < 1 || that.data.account.length < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入账号和密码',
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
        if(!res.data[0]){
          wx.showModal({
            title: '错误信息',
            content: '用户名或密码错误',
            showCancel: false
          });
        }else{
          if (that.data.password === res.data[0].password) {
            console.log('密码一致')
            // 设置登录状态，存入姓名，号码，是否登录
            wx.setStorage({
              key: 'nickname',
              data: res.data[0].nickname,
            })
            wx.setStorage({
              key: 'account',
              data: res.data[0].account,
            }),
              wx.setStorage({
                key: 'identity',
                data: res.data[0].identity,
              }),
              wx.setStorage({
                key: 'id',
                data: res.data[0]._id,
              }),
            wx.setStorage({
              key: 'is_login',
              data: true,
            })
            console.log('add cookie done')
            wx.switchTab({
              url: '/pages/my/my',
            })
          }
          else {
            console.log('密码不一致')
            wx.showModal({
              title: '错误信息',
              content: '用户名或密码错误',
              showCancel: false
            });
          }
        }
        
          
    },
      fail: err => {
        wx.showToast({
          icon: 'none',
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
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
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }

})