Page({
  data: {
    title: '喜爱菜品',
    navlist: [],
    favorlist: [],
  },
  onLoad() {
    var that = this
    // 获取登录信息
    wx.getStorage({
      key: 'is_login',
      success: function (res) {
        that.setData({
          is_login: res.data
        });
        console.log('favor- is_login: ' + that.data.is_login)
        if (!that.data.is_login) {
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
                    favorlist: res.data[0].fav
                  });
                  console.log(that.data.favorlist)
                  var i = 0
                  var myfavor = that.data.favorlist
                  console.log(myfavor)
                  for (i = 0; i < myfavor.length; i++) {
                    console.log('[查询] ' + myfavor[i])
                    wx.cloud.database().collection('menu').where({
                      _id: myfavor[i]
                    }).get({
                      success: res => {
                        that.data.navlist.push(res.data[0])
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
                  }

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
    
    
    
    
  }
})