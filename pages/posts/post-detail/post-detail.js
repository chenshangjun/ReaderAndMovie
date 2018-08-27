var postData = require('../../../data/posts-data.js')
var app = getApp()

Page({
  data: {
    
  },

  onLoad: function(option) {
    var postId = option.id
    // console.log(postId)
    
    this.setData({
      postData: postData.postList[postId],
      currentPostId: postId
    })
    // console.log(this.data.currentPostId)
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      // this.data.isPlayingMusic = true
      this.setData({
        isPlayingMusic : true
      })
    }

    var that = this
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic : true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = that.data.currentPostId
    })
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic : false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    })
  },
  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]

    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected

    wx.setStorageSync('posts_collected', postsCollected)

    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000
    })
  },
  onShareTab: function(enent) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
      wx.showActionSheet({
        itemList: itemList,
        itemColor: "#405f80",
        success: function (res) {
          wx.showModal({
            title: itemList[res.tapIndex],
            content: '现在暂不支持分享功能',
          })
        }
      })
  },

  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic
    if(isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46',
        title: '此时此刻-许巍',
        coverImgUrl: "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000"
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }


})