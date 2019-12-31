// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    action: 0
  },
  shouAction: function(event) {
    // console.log(event);
    this.data.action = event.target.id;
    this.setData(this.data);
    // console.log(this.data.action)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url:"http://api.360meishi.net/?c=category&a=standcategory",
      method:"GET",
      data:{},
      success: res => {
        this.data.categoryList = res.data.data;
        this.data.action = res.data.data[0].cName;
        this.setData(this.data);
        console.log(this.data.categoryList);
      }
    })
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

  }
})