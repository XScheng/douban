// pages/detailPage/detailPage.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},//存储电影详情
    movieId:0,//存储电影id
    comment:'',//评论
    rate:0,//评分
    images:[],//保存上传图片
    fileIds:[] //上传图片存储位置

  },
  uploadImg:function(){
    //功能：选中图片并且实现预览图片
    // 1.在data声明属性images保存预览图片
    wx.chooseImage({
      // 2.选中最多9张图片    
      count:9,
      sizeType:["original","compressed"],
      // 3.图片类型 原图 压缩图
      sourceType:["album","camera"],
      // 4.图片来源 相册 相机
      // 5.选中成功
      success: (res)=> {
        var list = res.tempFilePaths;
        // console.log(list)
       this.setData({
         images:list
       })
      },
    })
  },
  onChangeComment:function(event){
    this.setData({
      comment:event.detail
    })
  },
  onChangeRate:function(event){
    this.setData({
      rate:event.detail
    })
  },
  deliverComment:function(){
    if(this.data.images==0){
      wx.showToast({
        title: '请上传图片',
      })
      return;
    }
    wx.showLoading({
      title: '评论上传中....',
    })
    var rows = [];
    for(var i=0;i<this.data.images.length;i++){
      rows.push(new Promise((resolve,reject)=>{
        var item = this.data.images[i];
        var suffix = /\.\w+$/.exec(item)[0];
        var newFile = new Date().getTime();
        newFile += Math.floor(Math.random()*9999);
        newFile += suffix;
        wx.cloud.uploadFile({
          cloudPath:newFile,
          filePath:item,
          success: (res=>{
           var fid = res.fileID;
           this.data.fileIds.push(fid);
           resolve();
          })
        })
      }));
    }
    Promise.all(rows).then(
      res=>{
        var content = this.data.comment;
        var score = this.data.rate;
        var id = this.data.movieId;
        var list = this.data.fileIds;
        db.collection("detail").add({
          data:{
            content:content,
            score:score,
            id:id,
            list:list
          }
        }).then(res=>{
          wx.hideLoading();
          wx.showToast({
            title: '评论发表成功',
          })
        }).catch(err=>{console.log(err)})
      }
    )
  },

  loadMore:function(){
    var id = this.data.movieId;
    wx.cloud.callFunction({
      name:"movieDetail",
      data:{
        id:id
      }
    }).then(res=>{
      var detail = JSON.parse(res.result)       
      this.setData({
        detail: detail
      })
      console.log(this.data.detail)
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.setData({
      movieId:options.id
    })
    this.loadMore()
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