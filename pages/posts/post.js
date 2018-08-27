var postData = require('../../data/posts-data.js')

Page({
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      posts_key: postData.postList
    })
  },

  onPostTab: function(event) {
    var postId = event.currentTarget.dataset.postid
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiperTap: function(event) {
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})