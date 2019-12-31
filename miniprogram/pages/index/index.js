Page({
  data: {
    menu: ['早餐', '午餐', '晚餐', '一楼', '二楼'],
    inputvalue: '',
    hotlist: [],
    dishid: '',
    categoryList: ['早餐','午餐','晚餐','一楼','二楼'],
    length: 0,
    isstu: false,
    whichnav: 'navlist',
    usertype:''
  },
  getvalue(e) {
    this.setData({
      inputvalue: e.detail.value
    })
    console.log(this.data.inputvalue);
  },
  searchdish(){
    if (this.data.inputvalue != '') {
      const db = wx.cloud.database();
      db.collection("menu").where({	 	//collectionName 表示欲模糊查询数据所在collection的名
        name: {								//columnName表示欲模糊查询数据所在列的名
          $regex: '.*' + this.data.inputvalue + '.*',		//queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
          $options: '1'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
        }
      }).get({
        success: res => {
          console.log(res.data);
          this.data.hotlist = res.data;
          this.setData(this.data);
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
  category(event){
    wx.navigateTo({
      url: '/pages/navlist/navlist?type=' + event.currentTarget.dataset.type,
    })
  },
  onLoad() {
    try {
      var value = wx.getStorageSync('account')
      if (value) {
        console.log(value)
        wx.cloud.init()
        wx.cloud.database().collection('user').where({
          account: value
        }).get({
          success: res => {
            console.log(res);
            this.data.usertype = res.data[0].identity;
            this.setData(this.data);
            console.log(this.data.usertype)
            if(this.data.usertype == "stu"){
              this.data.whichnav == 'navlist'
            }else{
              this.data.whichnav == 'navlistwork'
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
      } 
    } catch (e) {
      // Do something when catch error
    }
    wx.cloud.init()
    wx.cloud.database().collection('menu').get({
      success: res => {
         console.log(res);
         this.data.hotlist = res.data;
         this.data.dishid = res.data[0]._id;
         this.setData(this.data);  
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
  onShow: function () {
    try {
      var value = wx.getStorageSync('account')
      if (value) {
        console.log(value)
        wx.cloud.init()
        wx.cloud.database().collection('user').where({
          account: value
        }).get({
          success: res => {
            console.log(res);
            this.data.usertype = res.data[0].identity;
            this.setData(this.data);
            console.log(this.data.usertype)
            if (this.data.usertype === "stu") {
              this.data.whichnav = 'navlist'
              this.setData(this.data);
              console.log(this.data.whichnav);
            } else {
              this.data.whichnav = 'navlistwork'
              this.setData(this.data);
              console.log(this.data.whichnav);
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
      }
    } catch (e) {
      // Do something when catch error
    }
    wx.cloud.init()
    wx.cloud.database().collection('menu').get({
      success: res => {
        console.log(res);
        this.data.hotlist = res.data;
        this.data.dishid = res.data[0]._id;
        this.setData(this.data);
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