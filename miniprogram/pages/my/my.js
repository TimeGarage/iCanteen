// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '立即登录',
    account:'',
    is_login: false,
    have_reply: false,
    login_url: '/pages/my/login/login',
    myitems: [
      {
        text: '我的消息',
        url: '/pages/my/message/message',
        icon: '/assets/message.png',
        tips: ''
      },
      {
        text: '我的发帖',
        url: '/pages/my/mydiscuss/mydiscuss',
        icon: '/assets/order.png',
        tips: ''
      },
      {
        text: '我的收藏',
        url: '/pages/my/bookmark/bookmark',
        icon: '/assets/star.png',
        tips: ''
      }, {
        text: '喜爱菜品',
        url: '/pages/my/myfavor/myfavor',
        icon: '/assets/like.png',
        tips: ''
      },
      
    ]

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('mypage onshow')
    var that = this
    // 获取登录信息
    wx.getStorage({
      key: 'is_login',
      success: function (res) {
        that.setData({
          is_login: res.data
        });
      },
    })
    wx.getStorage({
      key: 'nickname',
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
      },
    })
    if (that.data.is_login) {
      console.log('get current user ok')
      
      //查看是否有新消息
      wx.cloud.init()
      wx.cloud.database().collection('user').where({
        account: that.data.account
      }).get({
        success: res => {
          console.log('query for have_reply success')
          console.log('have_reply: ' + res.data[0].have_reply)
          if (res.data[0].have_reply === true) {
            that.data.myitems[0]['url'] = '/assets/message_unread.png'
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
      
    }
    console.log('login status: ' + that.data.is_login)
    
  },
  logout: function(){
    var that = this
    wx.setStorage({
      key: 'nickname',
      data: '立即登录',
    })
    wx.setStorage({
      key: 'account',
      data: '',
    }),
      wx.setStorage({
        key: 'identity',
        data: '',
      }),
      wx.setStorage({
        key: 'id',
        data: "",
      }),
      wx.setStorage({
        key: 'is_login',
        data: false,
      })
   
    console.log('clear cookie done')
    this.onShow()

  }

})

