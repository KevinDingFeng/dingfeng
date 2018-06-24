Page({
  data: {
    motto: 'Hello World',

  },

  onLoad: function () {
    this.login();
    // this.sss();
    // this.ddd();
    // this.fff();
  },
  fff: function () {
    console.log("asdfasdf");
    wx.request({
      url: "https://www.dingfengkj.com/wx/kevin/check_token",
      header: {
        'token': 'afsdfasdfasdfasdf'
      },
      data: {

      },
      success: function (res) {
        //设置返回的3rdsession
        // if (res.data.success) {
        //   _this.globalData.token = res.data.data.accessToken;
        //   try {
        //     wx.setStorageSync('accessToken', res.data.data.accessToken)
        //   } catch (e) {
        //   }
        //   _this.login();
        // }
        console.log("后台返回的信息： " + res.data.code);
      }
    })
  },
  ddd: function () {
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.startRecord()
        console.log("成功授权");
      },
      fail() {
        console.log("授权失败");
      }
    })
  },
  sss: function () {
    var that = this;
    wx.getSetting({

      success: (res) => {
        console.info(res.authSetting);


        wx.getUserInfo({
          success: res => {
            this.globalData.userInfo = res.userInfo
            console.info("一开始同意授权" + res.userInfo.nickName);

            // if (this.userInfoReadyCallback) {
            //   this.userInfoReadyCallback(res)
            // }
          },
          fail(err) {
            console.info(err.errMsg);
            wx.showModal({
              title: '警告',
              cancelText: '不授权',
              confirmText: '授权',
              confirmColor: '#37C31A',
              content: '若不授权微信登录，则无法使用XXXXXX；点击重新获取授权，则可重新使用；' +
              '若点击不授权，将无法使用便捷服务。',

              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                          success: res => {
                            that.globalData.userInfo = res.userInfo
                            console.info("再次同意授权" + res.userInfo.nickName);
                            // if (that.userInfoReadyCallback) {
                            //   that.userInfoReadyCallback(res)
                            // }
                          }
                        })
                      } else {
                        console.info("再次不允许");
                        wx.redirectTo({
                          url: 'home',
                        })
                      }
                    }
                  });
                } else if (res.cancel) {
                  console.log('弹出框用户点击取消')
                  wx.redirectTo({
                    url: 'home',
                  })

                }
              }
            })

          }

        })

      }
    })
  },
  login: function () {
    var _this = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code);
        wx.getUserInfo({
          success: function (res) {

            console.log("成功");
            console.log(res.userInfo);
            // _this.globalData.userInfo = res.userInfo;
            var iv = res.iv;
            console.log(res.iv);
            var encryptedData = res.encryptedData;
            console.log(res.encryptedData);
            var signature = res.signature;
            console.log(res.signature);
            var rawData = res.rawData;
            console.log(res.rawData);

            wx.request({
              url: "https://www.dingfengkj.com/wx/kevin/login_status",
              data: {
                code: code,
                signature: signature,
                rawData: rawData,
                encryptedData: encryptedData,
                iv: iv
              },
              success: function (res) {
                //设置返回的3rdsession
                // if (res.data.success) {
                //   _this.globalData.token = res.data.data.accessToken;
                //   try {
                //     wx.setStorageSync('accessToken', res.data.data.accessToken)
                //   } catch (e) {
                //   }
                //   _this.login();
                // }
                console.log("后台返回的信息： " + res.data.code);
              }
            })

          },
          fail: function () {
            console.log("失败");
            _this.authSetting();
          }
        })
      }
    })
  },
  //拒绝授权之后打开授权设置
  authSetting: function () {
    var _this = this;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("当前情况是 ，用户拒绝授权，获取不到用户相关的信息");
          //拒绝授权的情况下 打开工具开启授权
          wx.openSetting({
            success: (res) => {
              var authorization = res.authSetting['scope.userInfo'];
              if (authorization) {
                _this.login();//此时用户同意获取信息，可以继续登录
              } else {
                wx.showToast({
                  title: '授权失败'
                })
              }
            }
          })
        } else {
          console.log("测试已经过去到了用户的信息，可以继续登录");
          _this.login();
        }
      },
      fail: function () {
        console.log("获取不到用户信息");
        wx.showToast({
          title: '授权失败'
        })
      }
    })
  }
})
