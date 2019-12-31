Page({
  data: {
    menuid: null,
    menuDetails:[],
    favdish:[],
    like: null,
    dishname: null,
    fav:0,
    favourateImg: ''
  },
  addFavourate: function(e) {
    if (this.data.favourateImg.indexOf('like-undo') != -1) {
      try {
        var value = wx.getStorageSync('account')
        if (value) {
          console.log(value)
          wx.cloud.callFunction({
            // 云函数名称
            name: 'addfav',
            // 传给云函数的参数
            data: {
              id: e.currentTarget.dataset.id,
              useraccount: value
            },
          })
            .then(res => {
              console.log(res)
            })
            .catch(console.error)
        } else {
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
      } catch (e) {
        // Do something when catch error
      }
      this.data.favourateImg = './../../assets/like-actived.png'
      this.data.like = true
      this.data.fav = this.data.fav + 1
      wx.cloud.callFunction({
        // 云函数名称
        name: 'changefav',
        // 传给云函数的参数
        data: {
          id: e.currentTarget.dataset.id,
        },
      })
        .then(res => {
          console.log(res) 
        })
        .catch(console.error)
    } else {
      this.data.favourateImg = './../../assets/like-undo.png'
      this.data.fav = this.data.fav - 1
      console.log(this.data.fav)
      console.log(e.currentTarget.dataset.id)
      wx.cloud.callFunction({
        // 云函数名称
        name: 'decfav',
        // 传给云函数的参数
        data: {
          id: e.currentTarget.dataset.id,
          favnum: this.data.fav,
        },
      })
        .then(res => {
          console.log(res) 
        })
        .catch(console.error)
      this.data.like = false
    }
    this.setData(this.data);
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'changelike',
      data: {
        id: e.currentTarget.dataset.id,
        islike: this.data.like,
      }
      // 传递给云函数的event参数
    }).then(res => {
      console.log(res)
    }).catch(err => {
      // handle error
    })
  },
  addcomment(event) {
    wx.navigateTo({
      url: '/pages/addcomment/addcomment?dishid=' + event.currentTarget.dataset.id,
    })
  },

  onLoad: function (query) {
    console.log(query);
    this.setData({
      menuid: query.menuid,
    })
    wx.cloud.init()
    wx.cloud.database().collection('menu').where({
      _id: query.menuid
    }).get({
      success: res => {
        this.data.menuDetails = res.data;
        console.log(this.data.menuDetails);
        this.setData(this.data);
        this.data.like = res.data[0].isfav;
        console.log(this.data.like);
        this.setData({fav:res.data[0].fav,
          like: res.data[0].isfav
        })
        wx.getStorage({
          key: 'menu_favourite',
          complete: (res) => {
            let menuFavourite = []
            if (res.data) {
              res.data.forEach((value, index) => {
                console.log("hh" + this.data.like)
                if (this.data.like) {
                  this.data.favourateImg = './../../assets/like-actived.png'
                } else {
                  this.data.favourateImg = './../../assets/like-undo.png'
                }
              })
              menuFavourite = res.data
            } else {
              console.log(menuFavourite)
            }
            wx.setStorage({
              key: "menu_favourite",
              data: menuFavourite
            })
            this.setData(this.data);
          }
        }) 
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