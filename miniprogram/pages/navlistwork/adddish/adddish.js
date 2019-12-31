// miniprogram/pages/navlistwork/adddish/adddish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    array: ['1', '2'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    dishname: '',
    dishprice: null,
    dishfloor: 1,
    type: "",
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    this.data.dishfloor = this.data.array[this.data.index]
  },
  //获取信息
  inputname(e){
    this.data.dishname = e.detail.value
    console.log(this.data.dishname)
    console.log(e.detail)
  },
  inputprice(e){
    this.data.dishprice = e.detail.value
  },
  // 上传图片
  doUpload: function (e) {
    // 选择图片
    var addname = this.data.dishname
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })
        console.log(res)
        const filePath = res.tempFilePaths[0]

        // 上传图片
        console.log(addname)
        const cloudPath = 'food/' + addname + '.jpg'
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  addDish(){
    if(!this.data.dishname || !this.data.dishprice){
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
        duration: 1000,
        mask: true,
        success: function () {
          setTimeout(function () {
            //要延时执行的代码
            
          }, 1000) //延迟时间
        },
      })
    }else{
      console.log(this.data.type)
      wx.cloud.database().collection('menu').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          name: this.data.dishname,
          pic: this.data.dishname + '.jpg',
          price: this.data.dishprice,
          type: this.data.type,
          isfav: 'false',
          floor: this.data.dishfloor,
          fav: 0,
          commentlength: 0,
          comment: []
        }
      })
        .then(res => {
          var type = this.data.type
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.navigateTo({
                  url: '/pages/navlistwork/navlist?type=' + type,
                })
              }, 300) //延迟时间
            },

          })
          console.log(res)
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(query){
    console.log(query);
    // this.data.id = query.id;
    this.setData({
      type: query.type,
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