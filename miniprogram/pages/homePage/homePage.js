// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//电影列表
    pno:0
  },
  jumpDetail: function (event) {
    // 1:获取当前电影id33424345
    var id = event.target.dataset.id;
    // 2.跳转comment组件
    // wx.redirectTo({
    //   url: '/pages/comment/comment?id='+id,
    // });
    wx.navigateTo({
      url: '/pages/detailPage/detailPage?id=' + id,
    })
  },
  loadMore:function(){
    var pno = this.data.pno+1;
    this.setData({
      pno:pno
    })
    var offset = (pno-1)*4;
    wx.cloud.callFunction({
      name:"movieList",
      data:{
        start:offset,
        count:4
      }
    }).then(res=>{
      var rows = JSON.parse(res.result);
      var lists = this.data.list.concat(rows.subjects)
      this.setData({
        list:lists
      })
      console.log(this.data.list)
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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