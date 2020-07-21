// pages/favourite/favourite.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviename:'',//喜欢的电影名称
    favcontent:'',//喜欢原因
    images:[],//上传存储电影列表
    fileIds:[] //保存上传图片的id
  },
  jumpDetail(){
    wx.navigateTo({
      url: '/pages/favouriteList/favouriteList',
    })
  },
  delivery:function(){
    wx.showLoading({
      title: '数据提交中...',
    });
    var rows = [];
    for(var i=0;i<this.data.images.length;i++){
      rows.push(new Promise((resolve,reject)=>{
        var item = this.data.images[i];
        var suffix = /\.\w+$/.exec(item);
        var newfile = new Date().getTime();
        newfile += Math.floor(Math.random()*9999);
        newfile += suffix;
        wx.cloud.uploadFile({
          cloudPath:newfile,
          filePath:item,
          success: (res)=>{
            var fid = res.fileID;
            this.data.fileIds.push(fid);
            resolve();
          }
        })
      }))
    }
    Promise.all(rows).then(res=>{
      var msg = this.data.favcontent;
      var name = this.data.moviename;
      var fileid = this.data.fileIds;
      db.collection('detail')
      .add({
        data:{
          msg:msg,
          name:name,
          fileid:fileid
        }
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '添加成功',
        })
      }).catch(err=>{console.log(err)})
    })
  },
  upload:function(){
    wx.showLoading({
      title: '图片上传中...',
    })
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success: (res)=>{
        var list = res.tempFilePaths;
        this.setData({
          images:list
        });
      wx.hideLoading();
      },
    })
  },
  onChangeFav:function(event){
    this.setData({
      favcontent:event.detail
    })
  },
  onChangeMname:function(event){
    this.setData({
      moviename:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('detail')
    .get()
    .then(res=>{
      this.setData({
        list:res.data
      })
    }).catch(err=>{console.log(err)})
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