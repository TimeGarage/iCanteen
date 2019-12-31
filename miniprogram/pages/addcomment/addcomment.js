// pages/addcomment/addcomment.js
var util = require('./../../utils/date.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishid: null,
    inputcontent:"ni",
    comments: []
  },

  goback(event){
    wx.navigateTo({
      url: '/pages/menuDetail/menuDetail?menuid=' + this.data.dishid,
    })
  },

  newcomment:function(e){
    this.setData({
      inputcontent: e.detail.value.textarea
    })
    console.log(e)
    console.log(this.data.inputcontent)
    wx.navigateTo({
      url: '/pages/menuDetail/menuDetail?menuid=' + this.data.dishid,
    })
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'addcommentnum',
      data: {
        id: this.data.dishid,
      }
      // 传递给云函数的event参数
    }).then(res => {
      console.log(res)
    }).catch(err => {
      // handle error
    })
    this.data.comments = [{ comments: this.data.inputcontent, date: util.formatTime(new Date())}];
    console.log(this.data.comments)
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'addcontent',
      data: {
        input: this.data.inputcontent,
        date: util.formatTime(new Date()),
        id: this.data.dishid,
      }
      // 传递给云函数的event参数
    }).then(res => {
      console.log(res)
      
    }).catch(err => {
      // handle error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dishid: options.dishid,
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