Page({
  data: {
    discussMenu: ['hello world']

  },
  onShow() {
    var that = this
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('discuss').orderBy('content_time', 'desc').get({
      success: function(res){
        that.setData({discussMenu: res.data})
      }
    })
  },
  detail: function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/discuss/detail/detail?id=' + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  newComment: function(){
    wx.navigateTo({
      url: '/pages/discuss/comment/comment',
    })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    var that = this;
    this.onShow(); //重新加载onLoad()
  },

})