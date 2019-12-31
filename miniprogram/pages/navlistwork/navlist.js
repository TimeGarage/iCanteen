Page({
  data:{
    title:'',
    type:'',
    navlist:[]
  },
  
  onLoad(query){
    console.log(query);
    // this.data.id = query.id;
    this.setData({
      type: query.type,
      title: query.type
    })
    if (query.type == '二楼'||query.type == '一楼'){
      if (query.type == '二楼'){
        query.type = '2'
      }else{
        query.type = '1'
      }
      wx.cloud.init()
      wx.cloud.database().collection('menu').where({
        floor: query.type
      }).get({
        success: res => {
          console.log(res);
          this.data.navlist = res.data;
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
    }else{
      wx.cloud.init()
      wx.cloud.database().collection('menu').where({
        type: query.type
      }).get({
        success: res => {
          console.log(res);
          this.data.navlist = res.data;
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
  }
})