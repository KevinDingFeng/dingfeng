var app = getApp();
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    years: (new Date).getFullYear(),
    mound: (new Date).getMonth()+1,
    weeks: ['日','一','二','三','四','五','六'],
    days: []
  },
  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function () {
    var arr = [];
    var dates = new Date();
    var thatWeek = new Date(dates.getFullYear(), dates.getMonth() + 2, 1).getDay();
    for (let i = 0; i < thatWeek+2; i++) {
      arr.push(0);
    }
    for (let i = 0; i < this.mGetDate();i++){
      arr.push(i + 1);
      console.log(1);
    }
    this.setData({
      days: arr
    })
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {

  },
  //获取某月多少天
  mGetDate() {  
    var date = new Date();  
    var year = date.getFullYear();  
    var month = date.getMonth() + 1;  
    var d = new Date(year, month, 0);  
    return d.getDate();  
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