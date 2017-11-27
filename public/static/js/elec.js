/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	// require('./lib/bili-quick-elec.js');
	// require('//static.hdslb.com/elec_plugin/bili-quick-elec.js');
	__webpack_require__(1);
	(function ($) {
	  // jQuery.support.cors = true;
	
	  // document.write("<script language='javascript' src='//interface.bilibili.com/serverdate.js?t=201603231602'></script>");
	  function ElecRank() {
	    this.$wrap = $('div.v_small');
	    this.$elecWrp = $('div.elecrank-wrapper', this.$wrap);
	    this.elecUrl = '//api.bilibili.com/x/web-interface/elec/show';
	    // this.giftUrl   = '//www.bilibili.com/plus/widget/ajaxGetGift.php?act=get_event&gift_id=98';
	    // this.sBillIcon = '//static.hdslb.com/images/base/bill-626-s.jpg';
	    // this.lBillIcon = '//static.hdslb.com/images/base/bill-626-l.jpg';
	    // this.hasAni    = false;
	    // this.isWid     = $("body").hasClass('widescreen');//是否为宽屏
	    var $up = $('.usname .name');
	    var upAvatar = $('.u-face img').eq(0).attr('src');
	    this.upName = $up.attr('card') || $up.text();
	    this.upAvatar = typeof upAvatar == 'string' ? upAvatar.replace(/http:/i, '') : upAvatar;
	    this.avid = this.getAvNumber();
	    this.mid = mid;
	    this.upUrl = '//space.bilibili.com/' + this.mid;
	  }
	
	  ElecRank.prototype = {
	    getCookie: function (key) {
	      if (!key) return null;
	      var re = new RegExp(key + '\\s*=\\s*([^;]*)(?:;|$)');
	      var match = re.exec(document.cookie);
	      return match && match[1] || null;
	    },
	    getAvNumber: function () {
	      var url = window.location.pathname;
	      var re = /av(\d+)/;
	      var match = re.exec(url);
	      return parseInt(match && match[1]) || null;
	    },
	    init: function () {
	      if (this.$elecWrp.length > 0 || !mid) return;
	      this.isShowElec();
	    },
	    isShowElec: function () {
	      var that = this;
	      $.ajax({
	        url: this.elecUrl,
	        dataType: 'jsonp',
	        data: {
	          jsonp: 'jsonp',
	          aid: this.getAvNumber() || 0,
	          mid: that.mid
	        },
	        type: 'GET'
	      }).done(function (data) {
	        if (data && data.code == 0 && data.data && data.data.show_info.show) {//up主已开通充电   
	          that.panelReport(2, null, null, 1);
	          that.addRankBtnTpl();
	          that.addRankBtnStyle(data.data.isSpecial);
	
	          that.flashData = data;
	          that.flashData && that.flashData.data && (that.flashData.data.pic = window.wb_img || '');//视频播放完后显示排行榜
	          that.flashData && that.flashData.data && (that.flashData.data.show = true);
	
	          that.currentTab = 0;//当前tab，0表示作品榜，1表示月榜
	          that.total = data.data.total_count;//历史投喂人数
	          that.aCount = data.data.av_count;//作品投喂人数
	          that.mCount = data.data.count;//本月投喂人数
	          that.aLists = data.data.av_list || [];//作品投喂榜List数据
	          that.mLists = data.data.list || [];//本月投喂榜的list数据
	          that.aUser = data.data.av_user;//作品投喂榜中的我
	          that.mUser = data.data.user;//本月投喂榜中的我
	          that.displayNum = data.data.display_num;
	
	          var elecPlugin = {
	            getElecData: function () {
	              return that.flashData;
	            },
	            showModal: function () {
	              /*$.getScript("//static.hdslb.com/elec_plugin/bili-quick-elec.js", function(){            
	                window.biliQuickElec(function(){
	                  that.updateRank();
	                },{
	                  mid:      that.mid,
	                  upname:   that.upName,
	                  upurl:    that.upUrl,
	                  upavatar: that.upAvatar,
	                  avid:     that.avid,
	                  flash:    true
	                });
	              })*/
	              that.panelReport(1, 3, null, 2);
	              that.loginToElec(2);
	            },
	            isCharged: function () {
	              return that.mCount > 0 ? true : false;
	            },
	            isLastAv: function () {
	              return window.totalpage && window.pageno && parseInt(window.totalpage, 10) === parseInt(window.pageno, 10);
	            }
	          };
	          window.elecPlugin = elecPlugin;
	
	          that.addRank();//默认显示作品榜
	
	          that.addRankBtnStyle(false);
	          
	          //upinfo内的充电按钮
	          that.setElecBtnOfUpcard();
	        }
	      })
	    },
	    /**
	    *根据用户是否关注up主，显示up信息里面的充电按钮样式，并且绑定事件
	    */
	    setElecBtnOfUpcard: function () {
	      var follow_him = false;
	      if (typeof (window.AttentionList) != 'undefined' && typeof (window.AttentionList) != null) {
	        for (var i = 0; i < window.AttentionList.length; i++) {
	          if (window.AttentionList[i] == mid) {
	            follow_him = true;
	            break;
	          }
	        }
	      }
	      if (follow_him) {
	        $('.r-info > .elec').addClass('on').text('为TA充电').removeClass('hide');
	      } else {
	        $('.r-info > .elec').removeClass('hide');
	      }
	      this.bindElecBtn('.upinfo .b-btn.elec', 3);//绑定up信息里面的充电按钮
	    },
	    /**
	    *请求作品投喂榜
	    */
	    queryArticleRank: function () {
	      return $.ajax({
	        url: '//elec.bilibili.com/web/rank/query/av',
	        data: {
	          mid: mid,
	          av_no: this.getAvNumber() || 0,
	          type: 'jsonp'
	        },
	        dataType: 'jsonp',
	        crossDomain: true,
	        xhrFields: {
	          withCredentials: true
	        }
	        /*url: '//localhost:8000/web/rank/query/av',
	        dataType: 'json'*/
	      })
	    },
	    /**
	    *请求月榜
	    */
	    queryMonthRank: function () {
	      return $.ajax({
	        url: '//elec.bilibili.com/web/rank/query',
	        data: {
	          mid: mid,
	          type: 'jsonp'
	        },
	        dataType: 'jsonp',
	        crossDomain: true,
	        xhrFields: {
	          withCredentials: true
	        },
	      })
	    },
	    resizeCdnImage: function (url, size) {
	      if (url.indexOf('noface') > -1) {
	        return url;
	      }
	      size = size ? size : '160x100';
	      var ext = '.jpg';
	      if (url.indexOf('.jpg') > -1) ext = '.jpg';
	      else if (url.indexOf('.gif') > -1) ext = '.gif';
	      else if (url.indexOf('.png') > -1) ext = '.png';
	      if (url.indexOf('hdslb.com/group1/') > -1 || url.indexOf('hdslb.com/bfs/') > -1) {
	        var hasSize = /_\d+x\d+\.(jpg|jpeg|gif|png)/.exec(url);
	        if (hasSize) {
	          url = url.replace(hasSize[0], '');
	        }
	        return url + '_' + size + ext;
	      } else {
	        size = size.replace('x', '_');
	        var hasSize = /\.com\/(\d+_\d+)\//.exec(url);
	        if (hasSize) {
	          return url.replace(hasSize[1], size);
	        } else {
	          return url.replace('.com', '.com/' + size);
	        }
	      }
	    },
	    addRankBtnTpl: function () {
	      var that = this;
	      var $arcToolbar = $('.arc-toolbar');
	      if ($arcToolbar.length <= 0) return;
	      var tpl = __webpack_require__(6)();
	      $arcToolbar.append(tpl);
	      that.$rankBtn = $arcToolbar.find('.elecrank-btn');
	      that.$animateElement = $('.elecrank-bg', that.$rankBtn);
	
	      this.bindElecBtn('.arc-toolbar .elecrank-btn', 1);
	    },
	    addRankBtnStyle: function (isSpecial) {
	      var that = this;
	      var loopFrame = 1;
	      var animatorBattery;
	      if (that.$rankBtn && that.$rankBtn.length > 0 && that.$animateElement && that.$animateElement.length > 0 && window.Animator) {
	        if (!isSpecial) {
	          animatorBattery = new window.Animator({
	            element: that.$animateElement,
	            frameSource: '//static.hdslb.com/images/base/anim-battery.png',
	            frameWidth: 80,
	            frameHeight: 80,
	            fps: 10,
	            totalFrame: 4
	          })
	        } else {
	          that.$rankBtn.addClass('birth');//按钮样式
	          that.$rankBtn.append('<div class="birth-tips">今天是UP主生日哦~</div>')
	          that.$animateElement.css({//动画样式
	            top: "-52px",
	            left: "-75%"
	          });
	          animatorBattery = new window.Animator({
	            element: that.$animateElement,
	            frameSource: '//static.hdslb.com/images/base/elec-battery-birth.png',
	            frameWidth: 120,
	            frameHeight: 120,
	            fps: 10,
	            totalFrame: 7
	          })
	          window.rec_rp && window.rec_rp("event", "birthday_charge_button_show");
	        }
	        that.$rankBtn.mouseenter(function () {
	          animatorBattery.start(loopFrame);
	        }).mouseleave(function () {
	          animatorBattery.back();
	        });
	      }
	    },
	    /**
	    *绑定事件，显示充电插件
	    */
	    bindElecBtn: function (selector, src) {
	      var that = this;
	      if (typeof selector == 'string') {
	        $(selector).off('click.elecPlugin').on('click.elecPlugin', { src: src }, function (event) {
	          if (event.isTrigger) {
	            that.panelReport(1, 3, null, 2);
	          } else {
	            that.panelReport(1, 3, null, src);
	          }
	          var origin = event.isTrigger ? 2 : event.data ? event.data.src : 0//埋点使用,没有传src说明是h5触发
	          if ($(this).hasClass('elecrank-btn') && $(this).hasClass('birth')) {
	            window.rec_rp && window.rec_rp('event', 'birthday_charge_button_click');
	          }
	          that.loginToElec(origin);
	        })
	      }
	    },
	    loginToElec: function (origin) {
	      var that = this;
	      if (window.biliLoginStatus && window.biliLoginStatus.isLogin) {
	        that.showQuickElec(origin);
	      } else {
	        try {
	          if (RequireModule) {
	            RequireModule.getScript('biliQuickLogin', 'https://static-s.bilibili.com/account/bili_quick_login.js', function () {
	              window.biliQuickLogin(function () {
	                window.loadLoginStatus && window.loadLoginStatus(true);
	                that.showQuickElec(origin);
	              })
	            })
	          } else {
	            window.location.href = 'https://account.bilibili.com/login?gourl=' + encodeURIComponent(location.href);
	          }
	        } catch (e) {
	          window.location.href = 'https://account.bilibili.com/login?gourl=' + encodeURIComponent(location.href);
	        }
	      }
	    },
	    showQuickElec: function (origin) {
	      var that = this;
	      var params = {
	        mid: that.mid,
	        upname: that.upName,
	        upurl: that.upUrl,
	        upavatar: that.upAvatar,
	        avid: that.avid,
	        origin: origin ? origin : 2
	      }
	      if (RequireModule && RequireModule.getScript) {
	        RequireModule.getScript('biliQuickElec', '//static.hdslb.com/elec_plugin/bili-quick-elec.js', function () {
	          window.biliQuickElec(function () {
	            that.updateRank();
	          }, params)
	        })
	      } else {
	        if (!window.biliQuickElec) {
	          $.getScript("//static.hdslb.com/elec_plugin/bili-quick-elec.js", function () {
	            window.biliQuickElec(function () {
	              that.updateRank();
	            }, params);
	          })
	        } else {
	          window.biliQuickElec(function () {
	            that.updateRank();
	          }, params);
	        }
	      }
	
	    },
	    addRank: function () {
	      var that = this;
	      var $elecWrp = this.$wrap.find('.elecrank-wrapper');
	
	      var tpl = __webpack_require__(9)({
	        mid: this.mid,
	        upName: this.upName,
	        upUrl: this.upUrl,
	        total: this.total,
	        mCount: this.mCount,
	        aCount: this.aCount,
	        currentTab: this.currentTab
	      });
	      if ($elecWrp.length) {
	        $elecWrp.replaceWith(tpl);
	      } else {
	        this.$wrap.prepend(tpl);
	      }
	      if (this.aCount > 0 || this.mCount > 0) {
	
	        this.fillTpl();
	
	        var $rankTab = this.$wrap.find('.rank-tab');
	        $rankTab.on('click', function (e) {
	          if ($(this).hasClass('active')) {
	            return;
	          }
	          that.currentTab = $(this).data('tab');
	          $(this).removeClass('active').siblings().removeClass('active');
	          $(this).addClass('active');
	          that.fillTpl();
	        })
	      } else {
	        this.bindElecBtn('.elecrank-content.no-list .elec-btn, .elecrank-content.no-list .no-list-icon, .elecrank-content.no-list .desc');
	      }
	
	    },
	    /**
	    *分开添加content和footer
	    */
	    fillTpl: function () {
	      var that = this;
	      var $elecWrp = this.$wrap.find('.elecrank-wrapper');
	      var $content = this.$wrap.find('.elecrank-content');
	      var $footer = this.$wrap.find('.elecrank-footer');
	
	      var navNum;//当前排行榜，榜单的页数
	      var lists = [];//当前显示的榜单list
	      var listsLen = 0;//当前显示的榜单个数
	      var count = 0;//当前显示的榜单的个数
	      switch (this.currentTab) {
	        case 0:
	          lists = this.aLists;
	          user = this.aUser;
	          prompt1 = '本月还木有人为这个作品充电';
	          prompt2 = '让我来成为第一个充电侠吧';
	          break;
	        case 1:
	          lists = this.mLists;
	          user = this.mUser;
	          prompt1 = '本月还木有人为UP主充电';
	          prompt2 = '让我来成为第一个知音吧';
	          break;
	      }
	      listsLen = lists.length;
	      if (listsLen > 30) {
	        navNum = 3;
	      } else {
	        navNum = Math.ceil(listsLen / 10) || 1;
	      }
	      //content html
	      var conTpl = __webpack_require__(10)({
	        lists: lists,
	        listsLen: listsLen,
	        prompt1: prompt1,
	        prompt2: prompt2,
	        displayNum: this.displayNum,
	        userId: this.getCookie('DedeUserID')//登录用户的id，判断用户是否可以屏蔽操作
	      });
	      if ($content && $content.length > 0) {
	        $content.replaceWith(conTpl);
	      } else {
	        $elecWrp.append(conTpl);
	      }
	      //footer html
	      var footerTpl = __webpack_require__(11)({
	        user: user,
	        navNum: navNum,
	        listsLen: listsLen
	      })
	      if ($footer && $footer.length > 0) {
	        $footer.replaceWith(footerTpl);
	      } else {
	        $elecWrp.append(footerTpl);
	      }
	
	      var $userRank = $('.elecrank-wrapper .elecrank-user');
	      var $rankItems = $('.elecrank-wrapper .rank-item');
	      $rankItems.filter(':gt(9)').hide();
	
	      var $navItems = $('.elecrank-wrapper .nav-item');
	      $navItems.on('click', function (e) {
	        if ($(this).hasClass('active')) return;
	        $navItems.removeClass('active');
	        $rankItems.hide();
	        $(this).addClass('active');
	        var idx = parseInt($(this).attr('data-idx'), 10);
	        $rankItems.filter(function (index) {
	          if (idx === 0) {
	            return index < 10;
	          } else if (idx === 1) {
	            return index >= 10 && index < 20;
	          } else if (idx === 2) {
	            return index >= 20 && index < 30;
	          }
	        }).show();
	        if (user && user.rank <= (idx + 1) * 10) {
	          $userRank.addClass('no')
	        } else {
	          $userRank.removeClass('no')
	        }
	      });
	
	      var $shieldBtn = $('.elecrank-wrapper .shield-btn');
	      var shieldId;
	      $shieldBtn.on('click', function () {
	        var $shieldDialog = $("body").find('.elec-shield');
	        var shieldTpl = __webpack_require__(12)();
	        var posObj = $(this).parent().offset();
	        if ($shieldDialog && $shieldDialog.length > 0) {
	          $shieldDialog.replaceWith(shieldTpl);
	        } else {
	          $("body").append(shieldTpl);
	        }
	        $(".elec-shield").css({
	          top: posObj.top - 160,
	          left: posObj.left + 20
	        });
	
	        shieldId = $(this).attr('data-id');
	      });
	      $(window).on('resize', function () {
	        if ($shieldBtn && $shieldBtn.length) {
	          var posObj = $shieldBtn.parent().offset();
	          $('.elec-shield').css({
	            top: posObj.top - 160,
	            left: posObj.left + 20
	          });
	        }
	      });
	
	      $('body').off('click.confirmShield').on('click.confirmShield', '.shield-btn.ok', function () {
	        that.panelReport(1, 2, shieldId, null);
	        if (document.documentMode) {
	          var extendHTML = "<form id='iePost' name='iePost' method='post'></form><iframe width='0' height='0' id='iePostIframe' name='iePostIframe'></iframe><script type='text/javascript'>document.domain = 'bilibili.com';</script>";
	          $('body').append(extendHTML);
	          $.ajax({
	            url: '//elec.bilibili.com/web/captcha/csrf',
	            data: {
	              type: 'jsonp'
	            },
	            dataType: 'jsonp',
	            crossDomain: true,
	            xhrFields: {
	              withCredentials: true
	            },
	            type: 'GET'
	          }).done(function (data) {
	            if (data.code == 0) {
	              var captcha = data.data && data.data.csrf_captcha;
	              var form = $("#iePost")[0];
	              form.action = '//elec.bilibili.com/web/remark/hidden?type=jsonp&callback=%3Cscript%20type%3D%22text%2Fjavascript%22%3Edocument.domain%3D%22bilibili.com%22%3B%3C%2Fscript%3E';
	              $("#iePost").append('<input type="hidden" name="pay_mid" value="' + shieldId + '">');
	              $("#iePost").append('<input type="hidden" name="captcha" value="' + captcha + '">');
	              $("#iePost").append('<input type="hidden" name="app_id" value="' + 1 + '">');
	              form.target = "iePostIframe";
	              form.submit();
	              $("#iePostIframe").off();
	              $("#iePostIframe").load(function () {
	                var result = this.contentWindow.document.body.innerHTML;
	                var length = result.length;
	                var data = $.parseJSON(result.substring(1, length - 1));
	                if (data.code == 0 && data.data && data.data.status == 1) {
	                  $('.elec-shield').remove();
	                  /*$('.msg[data-id="' + shieldId + '"]').remove();*/
	                  that.updateRank(shieldId);
	                } else {
	                  new MessageBox({
	                    focusShowPos: 'down'
	                  }).show($('.elec-shield .shield-btn.ok'), '屏蔽留言失败', 1500);
	                }
	                $("#iePost").children().remove();
	              });
	            }
	          });
	        } else {
	          $.ajax({
	            url: '//elec.bilibili.com/web/captcha/csrf',
	            data: {
	              type: 'jsonp'
	            },
	            dataType: 'jsonp',
	            crossDomain: true,
	            xhrFields: {
	              withCredentials: true
	            },
	            type: 'GET'
	          }).done(function (data) {
	            if (data.code == 0) {
	              var captcha = data.data && data.data.csrf_captcha;
	              $.ajax({
	                url: '//elec.bilibili.com/web/remark/hidden',
	                type: 'POST',
	                data: {
	                  pay_mid: shieldId,
	                  captcha: captcha
	                  // app_id: 1
	                },
	                crossDomain: true,
	                xhrFields: {
	                  withCredentials: true
	                }
	              }).done(function (data) {
	                data = (typeof data === 'string') ? $.parseJSON(data) : data;
	                if (data.code == 0 && data.data && data.data.status == 1) {
	                  $('.elec-shield').remove();
	                  /*$('.msg[data-id="' + shieldId + '"]').remove();*/
	                  that.updateRank(shieldId);
	                  return;
	                } else {
	                  new MessageBox({
	                    focusShowPos: 'down'
	                  }).show($('.elec-shield .shield-btn.ok'), '屏蔽留言失败', 1500);
	                }
	              });
	            }
	          });
	        }
	      });
	
	      $('body').off('click.cancelShield').on('click.cancelShield', '.shield-btn.cancel, .shield-close', function () {
	        $(this).parents('.elec-shield').remove();
	      });
	
	      if (listsLen <= 0) {
	        this.bindElecBtn('.elecrank-content.no-list .elec-btn, .elecrank-content.no-list .no-list-icon, .elecrank-content.no-list .desc', 4);
	      }
	
	      if (window.bindCardEvent) {
	        window.bindCardEvent($('.elecrank-header'));
	        window.bindCardEvent();
	      }
	    },
	    /**
	    *充电成功后刷新排行榜
	    */
	    updateRank: function (shieldId) {
	      var that = this;
	      if (shieldId) {
	        // if(this.currentTab == 0){          
	        that.shieldRemark(shieldId, this.aLists);
	        // }else if(this.currentTab == 1){
	        that.shieldRemark(shieldId, this.mLists);
	        // }
	        that.addRank();
	        return;
	      }
	      var that = this;
	      $.ajax({
	        url: this.elecUrl,
	        dataType: 'jsonp',
	        data: {
	          jsonp: 'jsonp',
	          aid: this.getAvNumber() || 0,
	          mid: that.mid
	        },
	        type: 'GET'
	      }).done(function (data) {
	        if (data && data.code == 0 && data.data && data.data.show_info.show) {//up主已开通充电 
	            that.flashData = data;
	            that.flashData && that.flashData.data && (that.flashData.data.pic = window.wb_img || '');//视频播放完后显示排行榜
	            that.flashData && that.flashData.data && (that.flashData.data.show = true);
	    
	            that.currentTab = 0;//当前tab，0表示作品榜，1表示月榜
	            that.total = data.data.total_count;//历史投喂人数
	            that.aCount = data.data.av_count;//作品投喂人数
	            that.mCount = data.data.count;//本月投喂人数
	            that.aLists = data.data.av_list || [];//作品投喂榜List数据
	            that.mLists = data.data.list || [];//本月投喂榜的list数据
	            that.aUser = data.data.av_user;//作品投喂榜中的我
	            that.mUser = data.data.user;//本月投喂榜中的我
	            that.displayNum = data.data.display_num;
	
	            var elecPlugin = {
	              getElecData: function(){
	                return that.flashData;
	              },
	              showModal: function(){
	                /*$.getScript("//static.hdslb.com/elec_plugin/bili-quick-elec.js", function(){            
	                  window.biliQuickElec(function(){
	                    that.updateRank();
	                  },{
	                    mid:      that.mid,
	                    upname:   that.upName,
	                    upurl:    that.upUrl,
	                    upavatar: that.upAvatar,
	                    avid:     that.avid,
	                    flash:    true
	                  });
	                })*/
	                that.panelReport(1,3,null,2);
	                that.loginToElec(2);
	              },
	              isCharged: function(){
	                return that.mCount > 0 ? true : false;
	              },
	              isLastAv: function(){
	                return window.totalpage && window.pageno && parseInt(window.totalpage, 10) === parseInt(window.pageno, 10);
	              }
	            };
	            window.elecPlugin = elecPlugin;
	
	            that.addRank();//默认显示作品榜
	        }
	      })
	    },
	    shieldRemark: function (shieldId, list) {
	      if (list && list.length > 0) {
	        for (var i = 0; i < list.length; i++) {
	          if (i >= 3) {
	            break;
	          }
	          if (i < 3 && list[i].pay_mid == shieldId && !list[i].msg_deleted) {
	            list[i].msg_deleted = 1;
	            break;
	          }
	        }
	      }
	    },
	    panelReport: function (optype, clickid, value, src) {
	      window.rec_rp && window.rec_rp("web_charge_panel", {
	        pagetype: 1,
	        optype: optype,
	        showid: optype == 2 ? 1 : null,
	        clickid: optype == 1 ? clickid : null,
	        value: clickid == 2 ? value : 0,
	        src: src//点击来源
	      })
	    }
	
	  };
	
	  $(function () {
	    var elecRank = new ElecRank();
	    elecRank.init();
	  });
	
	})(jQuery);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// Prepare cssTransformation
	var transform;
	
	var options = {}
	options.transform = transform
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, options);
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./elec.less", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./elec.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, ".clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table;\n}\n.clearfix:after {\n  clear: both;\n}\n.elecrank-wrapper {\n  padding: 30px 0 40px 10px;\n}\n.elecrank-wrapper.no .elecrank-header.no-list {\n  border-bottom: none;\n}\n.elecrank-wrapper.no .elecrank-header.no-list .total-txt {\n  display: block;\n  margin-top: 30px;\n  font-size: 12px;\n  color: #99a2aa;\n}\n.elecrank-wrapper.no .elecrank-header.no-list .total-num {\n  display: block;\n  margin-top: 10px;\n  font-size: 24px;\n  font-weight: bold;\n  color: #6d757a;\n}\n.elecrank-wrapper .elecrank-header {\n  position: relative;\n  text-align: center;\n  border: 1px solid #e5e9ef;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  height: 83px;\n}\n.elecrank-wrapper .elecrank-header.empty {\n  border-radius: 4px 4px 0 0;\n}\n.elecrank-wrapper .elecrank-header .name {\n  font-size: 18px;\n  color: #00a1d6;\n  background: #fff;\n  position: relative;\n  top: -9px;\n  height: 18px;\n  line-height: 18px;\n  display: inline-block;\n  padding: 0 14px;\n}\n.elecrank-wrapper .elecrank-header .name:hover {\n  color: #f25d8e;\n}\n.elecrank-wrapper .elecrank-header .title {\n  font-size: 12px;\n  color: #222;\n  line-height: 1;\n  margin-top: -3px;\n}\n.elecrank-wrapper .elecrank-header .rank-tab {\n  position: relative;\n  float: left;\n  width: 50%;\n  height: 27px;\n  margin-top: 28px;\n  overflow: hidden;\n  color: #99a2aa;\n  cursor: pointer;\n}\n.elecrank-wrapper .elecrank-header .rank-tab .arr-up {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  margin-left: -6px;\n  display: none;\n  width: 12px;\n  height: 6px;\n  background: url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -856px -538px;\n}\n.elecrank-wrapper .elecrank-header .rank-tab.active {\n  color: #00a1d6;\n  border-bottom: 1px solid #00a1d6;\n}\n.elecrank-wrapper .elecrank-header .rank-tab.active .arr-up {\n  display: block;\n}\n.elecrank-wrapper .elecrank-header.no-result {\n  border-bottom: none;\n  height: 103px;\n}\n.elecrank-wrapper .elecrank-header.no-result .history {\n  margin-top: 30px;\n}\n.elecrank-wrapper .elecrank-header.no-result .history .desc {\n  display: block;\n  font-size: 12px;\n  line-height: 12px;\n  color: #99a2aa;\n}\n.elecrank-wrapper .elecrank-header.no-result .history .num {\n  margin-top: 10px;\n  display: block;\n  font-size: 24px;\n  line-height: 24px;\n  font-weight: bold;\n  color: #6d757a;\n}\n.elecrank-wrapper .elecrank-icon {\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat top left;\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n  position: absolute;\n  top: -5px;\n  z-index: 10;\n}\n.elecrank-wrapper .icon-battery {\n  background-position: -656px -1363px;\n  left: -28px;\n}\n.elecrank-wrapper .icon-charge {\n  background-position: -659px -1426px;\n  right: -20px;\n}\n.elecrank-wrapper .elecrank-content {\n  padding: 24px 0 12px 0;\n  border-bottom: 1px solid #e5e9ef;\n  border-left: 1px solid #e5e9ef;\n  border-right: 1px solid #e5e9ef;\n}\n.elecrank-wrapper .elecrank-content .rank-item {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n  margin-bottom: 20px;\n  /* .compare-icon{\n        position:absolute;\n        width:12px;\n        height:12px;\n        top:6px;\n        right:19px;\n        background: transparent url(//static.hdslb.com/images/base/icons.png) no-repeat -345px -2265px;\n        &.up{          \n          background: transparent url(//static.hdslb.com/images/base/icons.png) no-repeat -345px -2138px;\n        }\n        &.down{\n          background: transparent url(//static.hdslb.com/images/base/icons.png) no-repeat -345px -2203px;\n\n        }\n      } */\n}\n.elecrank-wrapper .elecrank-content .rank-item .item-num {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  line-height: 16px;\n  border-radius: 4px;\n  text-align: center;\n  font-size: 12px;\n  font-weight: bold;\n  background-color: #b8c0cc;\n  color: #fff;\n  vertical-align: middle;\n  margin-left: 20px;\n  margin-right: 10px;\n}\n.elecrank-wrapper .elecrank-content .rank-item .item-avatar {\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  margin-right: 12px;\n  vertical-align: middle;\n}\n.elecrank-wrapper .elecrank-content .rank-item .item-name {\n  display: inline-block;\n  width: 100px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n  color: #222;\n  vertical-align: middle;\n}\n.elecrank-wrapper .elecrank-content .rank-item .item-name.is-vip {\n  color: #fb7299;\n}\n.elecrank-wrapper .elecrank-content .rank-item .item-name.is-vip:hover {\n  color: #ff8dae;\n}\n.elecrank-wrapper .elecrank-content .rank-item .msg {\n  position: relative;\n  width: 138px;\n  word-wrap: break-word;\n  word-break: break-all;\n  left: 82px;\n  top: -7px;\n  background-color: #f4f5f7;\n  border-radius: 0 4px 4px 4px;\n  color: #6d757a;\n  padding: 8px 10px 8px 10px;\n}\n.elecrank-wrapper .elecrank-content .rank-item .msg:hover .shield-btn {\n  opacity: 1;\n  display: block\\9;\n}\n.elecrank-wrapper .elecrank-content .rank-item .msg .arrow {\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -861px -922px;\n  width: 8px;\n  height: 8px;\n  position: absolute;\n  left: 0;\n  top: -8px;\n}\n.elecrank-wrapper .elecrank-content .rank-item .msg .shield-btn {\n  position: absolute;\n  width: 48px;\n  height: 22px;\n  line-height: 22px;\n  top: 50%;\n  margin-top: -12px;\n  border-radius: 4px;\n  background-color: #fff;\n  border: 1px solid #f25d8e;\n  color: #f25d8e;\n  z-index: 10;\n  text-align: center;\n  cursor: pointer;\n  right: 10px;\n  opacity: 0;\n  transition: opacity 400ms linear;\n  display: none\\9;\n}\n.elecrank-wrapper .elecrank-content .rank-item .msg .shield-btn:hover {\n  color: #fff;\n  background-color: #f25d8e;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first,\n.elecrank-wrapper .elecrank-content .rank-item.second,\n.elecrank-wrapper .elecrank-content .rank-item.third {\n  position: relative;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .compare-icon,\n.elecrank-wrapper .elecrank-content .rank-item.second .compare-icon,\n.elecrank-wrapper .elecrank-content .rank-item.third .compare-icon {\n  top: 20px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .item-num,\n.elecrank-wrapper .elecrank-content .rank-item.second .item-num,\n.elecrank-wrapper .elecrank-content .rank-item.third .item-num {\n  position: absolute;\n  top: 28px;\n  left: 20px;\n  text-indent: -99999px;\n  margin: 0;\n  height: 24px;\n  width: 17px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .item-avatar,\n.elecrank-wrapper .elecrank-content .rank-item.second .item-avatar,\n.elecrank-wrapper .elecrank-content .rank-item.third .item-avatar {\n  float: left;\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  margin-left: 20px;\n  margin-right: 10px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .item-name,\n.elecrank-wrapper .elecrank-content .rank-item.second .item-name,\n.elecrank-wrapper .elecrank-content .rank-item.third .item-name {\n  float: left;\n  height: 52px;\n  line-height: 52px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .elec-num,\n.elecrank-wrapper .elecrank-content .rank-item.second .elec-num,\n.elecrank-wrapper .elecrank-content .rank-item.third .elec-num {\n  position: absolute;\n  right: 19px;\n  top: 16px;\n  height: 20px;\n  font-size: 0;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .elec-num > span,\n.elecrank-wrapper .elecrank-content .rank-item.second .elec-num > span,\n.elecrank-wrapper .elecrank-content .rank-item.third .elec-num > span {\n  display: inline-block;\n  width: 36px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  vertical-align: middle;\n  text-align: right;\n  font-size: 12px;\n  color: #f25d8e;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .elec-num .elec-icon,\n.elecrank-wrapper .elecrank-content .rank-item.second .elec-num .elec-icon,\n.elecrank-wrapper .elecrank-content .rank-item.third .elec-num .elec-icon {\n  display: inline-block;\n  height: 20px;\n  width: 16px;\n  margin-left: 4px;\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -664px -2326px;\n  vertical-align: middle;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first {\n  margin-bottom: 18px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .item-num {\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -664px -1492px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.first .item-avatar {\n  border: 2px solid #fed101;\n}\n.elecrank-wrapper .elecrank-content .rank-item.second {\n  margin-bottom: 18px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.second .item-num {\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -664px -1556px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.second .item-avatar {\n  border: 2px solid #aebccb;\n}\n.elecrank-wrapper .elecrank-content .rank-item.third {\n  margin-bottom: 24px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.third .item-num {\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -664px -1620px;\n}\n.elecrank-wrapper .elecrank-content .rank-item.third .item-avatar {\n  border: 2px solid #d9a57d;\n}\n.elecrank-wrapper .elecrank-content .rank-item.last {\n  margin-bottom: 0;\n}\n.elecrank-wrapper .elecrank-content.no-list {\n  padding: 0;\n  height: 358px;\n}\n.elecrank-wrapper .elecrank-content.no-list .title {\n  position: absolute;\n  text-align: center;\n  width: 100%;\n  bottom: 20px;\n  font-size: 12px;\n  color: #6d757a;\n  /* .elec-btn{\n          font-size:#00a1d6;\n        } */\n}\n.elecrank-wrapper .elecrank-content.no-list .no-list-icon {\n  display: block;\n  width: 200px;\n  height: 211px;\n  margin: 0 auto;\n  background: transparent url(\"//static.hdslb.com/images/elecrank-empty.png\") center 41px no-repeat;\n}\n.elecrank-wrapper .elecrank-content.no-list .desc {\n  display: block;\n  width: 200px;\n  margin: 30px auto 0;\n  text-align: center;\n  line-height: 18px;\n  color: #99a2aa;\n}\n.elecrank-wrapper .elecrank-content.no-list .desc span {\n  display: block;\n}\n.elecrank-wrapper .elecrank-content.no-list .elec-btn {\n  display: block;\n  width: 160px;\n  height: 40px;\n  margin: 16px auto 0;\n  text-align: center;\n  border-radius: 4px;\n  background: #00a1d6;\n  font-size: 14px;\n  line-height: 40px;\n  color: #fff;\n}\n.elecrank-wrapper .elecrank-content .compare-icon,\n.elecrank-wrapper .elecrank-footer .compare-icon {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  top: 6px;\n  right: 19px;\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -345px -2265px;\n}\n.elecrank-wrapper .elecrank-content .compare-icon.up,\n.elecrank-wrapper .elecrank-footer .compare-icon.up {\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -345px -2138px;\n}\n.elecrank-wrapper .elecrank-content .compare-icon.down,\n.elecrank-wrapper .elecrank-footer .compare-icon.down {\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -345px -2203px;\n}\n.elecrank-wrapper .elecrank-footer {\n  overflow: hidden;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border: 1px solid #e5e9ef;\n  border-top: none;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user {\n  position: relative;\n  margin: 16px 0;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user .user-rank {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  margin-left: 20px;\n  margin-right: 10px;\n  line-height: 16px;\n  text-align: center;\n  background-color: #f25d8e;\n  color: #fff;\n  border-radius: 4px;\n  vertical-align: middle;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user .user-rank.rank-long {\n  width: 24px;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user .user-avatar {\n  width: 24px;\n  height: 24px;\n  margin-right: 12px;\n  border-radius: 50%;\n  vertical-align: middle;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user .user-name {\n  display: inline-block;\n  width: 100px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n  color: #222;\n  vertical-align: middle;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user .user-name.is-vip {\n  color: #fb7299;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user .user-name.is-vip:hover {\n  color: #ff8dae;\n}\n.elecrank-wrapper .elecrank-footer .elecrank-user.no {\n  display: none;\n}\n.elecrank-wrapper .elecrank-footer .nav-wrap {\n  margin: 20px auto 20px auto;\n}\n.elecrank-wrapper .elecrank-footer .nav-item {\n  float: left;\n  border-radius: 5px;\n  background: #b8c0cc;\n  margin-right: 6px;\n  cursor: pointer;\n  width: 16px;\n  height: 10px;\n}\n.elecrank-wrapper .elecrank-footer .nav-item:hover {\n  background: #f25d8e;\n}\n.elecrank-wrapper .elecrank-footer .nav-item.active {\n  width: 30px;\n  background: #f25d8e;\n}\n.elecrank-wrapper .elecrank-footer .nav-item.last {\n  margin-right: 0;\n}\n.elecrank-wrapper .elecrank-empty-content {\n  border: 1px solid #e5e9ef;\n  border-radius: 0 0 4px 4px;\n  margin-top: -1px;\n  height: 230px;\n  position: relative;\n  background: transparent url(\"//static.hdslb.com/images/elecrank-empty.png\") center 20px no-repeat;\n}\n.elecrank-wrapper .elecrank-empty-content .title {\n  position: absolute;\n  text-align: center;\n  width: 100%;\n  bottom: 20px;\n  font-size: 12px;\n  color: #6d757a;\n  /* .elec-btn{\n        font-size:#00a1d6;\n      } */\n}\n.elecrank-btn {\n  position: absolute;\n  right: 20px;\n  top: 20px;\n  width: 131px;\n  height: 38px;\n  border-radius: 20px;\n  border: 1px solid #f37071;\n  font-size: 18px;\n  font-weight: bold;\n  color: #f37071;\n  text-align: center;\n  line-height: 38px;\n  cursor: pointer;\n  padding-left: 15px;\n}\n.elecrank-btn.birth {\n  border-color: #f25d8e;\n  color: #f25d8e;\n}\n.elecrank-btn.birth .birth-tips {\n  position: absolute;\n  top: -30px;\n  right: -55px;\n  width: 122px;\n  height: 25px;\n  color: #fff;\n  font-weight: normal;\n  line-height: 20px;\n  font-size: 12px;\n  background: url(\"//static.hdslb.com/images/base/elec-birth-tip-bg.png\") no-repeat;\n}\n.elecrank-btn .elecrank-bg {\n  position: absolute;\n  top: -20px;\n  left: -50%;\n  margin-left: 40px;\n  width: 80px;\n  height: 80px;\n}\n.elec-shield {\n  position: absolute;\n  width: 200px;\n  height: 126px;\n  border: 1px solid #ccd0d7;\n  background-color: #fff;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n  padding: 24px 20px 0 20px;\n  z-index: 100;\n  border-radius: 4px;\n  text-align: center;\n}\n.elec-shield .shield-close {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n  width: 18px;\n  height: 18px;\n  background: transparent url(\"//static.hdslb.com/images/base/icons.png\") no-repeat -471px -535px;\n  cursor: pointer;\n}\n.elec-shield .shield-close:hover {\n  background-position: -535px -535px;\n}\n.elec-shield .shield-title {\n  margin-bottom: 10px;\n  font-size: 14px;\n  font-weight: bold;\n  height: 18px;\n  line-height: 18px;\n}\n.elec-shield .shield-content {\n  color: #99a2aa;\n  margin-bottom: 16px;\n  height: 36px;\n  line-height: 18px;\n}\n.elec-shield .shield-btn {\n  width: 66px;\n  height: 22px;\n  line-height: 22px;\n  background-color: #fff;\n  border: 1px solid #ccd0d7;\n  color: #222;\n  cursor: pointer;\n  border-radius: 4px;\n  display: inline-block;\n}\n.elec-shield .shield-btn.ok {\n  margin-right: 20px;\n}\n.elec-shield .shield-btn:hover {\n  border-color: #f25d8e;\n  background-color: #f25d8e;\n  color: #fff;\n}\n.widescreen .bill-btn-wrap {\n  position: absolute;\n  padding-left: 73px;\n  right: 224px;\n  width: 129px;\n  height: 60px;\n  margin-top: 14px;\n}\n.widescreen .bill-btn-wrap .bill-icon {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 66px;\n  height: 60px;\n  background: transparent url(\"//static.hdslb.com/images/base/bill-626-l.jpg\") no-repeat;\n}\n.widescreen .bill-btn-wrap .bill-btn {\n  display: block;\n  margin-top: 12px;\n  color: #0497c8;\n  font-size: 14px;\n  line-height: 20px;\n  text-align: left;\n}\n.widescreen .bill-btn-wrap .bill-btn .arrow {\n  display: inline-block;\n  margin-top: 4px;\n  margin-left: 6px;\n  width: 5px;\n  height: 12px;\n  background: url(\"//static.hdslb.com/images/base/arrow-626.jpg\") no-repeat;\n}\n.widescreen .bill-btn-wrap .desc {\n  display: block;\n  color: #6d757a;\n}\n.bill-btn-wrap {\n  position: absolute;\n  padding: 0px;\n  right: 208px;\n  width: 129px;\n  height: 60px;\n  margin-top: 13px;\n}\n.bill-btn-wrap .bill-icon {\n  position: static;\n  margin: 0 auto;\n  width: 42px;\n  height: 38px;\n  background: transparent url(\"//static.hdslb.com/images/base/bill-626-s.jpg\") no-repeat;\n}\n.bill-btn-wrap .bill-btn {\n  display: block;\n  margin: 0px;\n  color: #0497c8;\n  font-size: 12px;\n  text-align: center;\n}\n.bill-btn-wrap .bill-btn .arrow {\n  display: none;\n  /*  margin-top:4px;\n      width:5px;\n      height:12px;\n      background-color:red; */\n}\n.bill-btn-wrap .desc {\n  display: none;\n}\n", ""]);
	
	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};
	
	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}
	
		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});
	
			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}
	
		return [content].join('\n');
	}
	
	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
	
		return '/*# ' + data + ' */';
	}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	
	var stylesInDom = {};
	
	var	memoize = function (fn) {
		var memo;
	
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	};
	
	var isOldIE = memoize(function () {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	});
	
	var getElement = (function (fn) {
		var memo = {};
	
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
	
			return memo[selector]
		};
	})(function (target) {
		return document.querySelector(target)
	});
	
	var singleton = null;
	var	singletonCounter = 0;
	var	stylesInsertedAtTop = [];
	
	var	fixUrls = __webpack_require__(5);
	
	module.exports = function(list, options) {
		if (false) {
			if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
	
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};
	
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (!options.singleton) options.singleton = isOldIE();
	
		// By default, add <style> tags to the <head> element
		if (!options.insertInto) options.insertInto = "head";
	
		// By default, add <style> tags to the bottom of the target
		if (!options.insertAt) options.insertAt = "bottom";
	
		var styles = listToStyles(list, options);
	
		addStylesToDom(styles, options);
	
		return function update (newList) {
			var mayRemove = [];
	
			for (var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
	
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
	
			if(newList) {
				var newStyles = listToStyles(newList, options);
				addStylesToDom(newStyles, options);
			}
	
			for (var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
	
				if(domStyle.refs === 0) {
					for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
	
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};
	
	function addStylesToDom (styles, options) {
		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
	
			if(domStyle) {
				domStyle.refs++;
	
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
	
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
	
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
	
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles (list, options) {
		var styles = [];
		var newStyles = {};
	
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = options.base ? item[0] + options.base : item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
	
			if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
			else newStyles[id].parts.push(part);
		}
	
		return styles;
	}
	
	function insertStyleElement (options, style) {
		var target = getElement(options.insertInto)
	
		if (!target) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}
	
		var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];
	
		if (options.insertAt === "top") {
			if (!lastStyleElementInsertedAtTop) {
				target.insertBefore(style, target.firstChild);
			} else if (lastStyleElementInsertedAtTop.nextSibling) {
				target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				target.appendChild(style);
			}
			stylesInsertedAtTop.push(style);
		} else if (options.insertAt === "bottom") {
			target.appendChild(style);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement (style) {
		if (style.parentNode === null) return false;
		style.parentNode.removeChild(style);
	
		var idx = stylesInsertedAtTop.indexOf(style);
		if(idx >= 0) {
			stylesInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement (options) {
		var style = document.createElement("style");
	
		options.attrs.type = "text/css";
	
		addAttrs(style, options.attrs);
		insertStyleElement(options, style);
	
		return style;
	}
	
	function createLinkElement (options) {
		var link = document.createElement("link");
	
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";
	
		addAttrs(link, options.attrs);
		insertStyleElement(options, link);
	
		return link;
	}
	
	function addAttrs (el, attrs) {
		Object.keys(attrs).forEach(function (key) {
			el.setAttribute(key, attrs[key]);
		});
	}
	
	function addStyle (obj, options) {
		var style, update, remove, result;
	
		// If a transform function was defined, run it on the css
		if (options.transform && obj.css) {
		    result = options.transform(obj.css);
	
		    if (result) {
		    	// If transform returns a value, use that instead of the original css.
		    	// This allows running runtime transformations on the css.
		    	obj.css = result;
		    } else {
		    	// If the transform function returns a falsy value, don't add this css.
		    	// This allows conditional loading of css
		    	return function() {
		    		// noop
		    	};
		    }
		}
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
	
			style = singleton || (singleton = createStyleElement(options));
	
			update = applyToSingletonTag.bind(null, style, styleIndex, false);
			remove = applyToSingletonTag.bind(null, style, styleIndex, true);
	
		} else if (
			obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function"
		) {
			style = createLinkElement(options);
			update = updateLink.bind(null, style, options);
			remove = function () {
				removeStyleElement(style);
	
				if(style.href) URL.revokeObjectURL(style.href);
			};
		} else {
			style = createStyleElement(options);
			update = applyToTag.bind(null, style);
			remove = function () {
				removeStyleElement(style);
			};
		}
	
		update(obj);
	
		return function updateStyle (newObj) {
			if (newObj) {
				if (
					newObj.css === obj.css &&
					newObj.media === obj.media &&
					newObj.sourceMap === obj.sourceMap
				) {
					return;
				}
	
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
	
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag (style, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (style.styleSheet) {
			style.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = style.childNodes;
	
			if (childNodes[index]) style.removeChild(childNodes[index]);
	
			if (childNodes.length) {
				style.insertBefore(cssNode, childNodes[index]);
			} else {
				style.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag (style, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			style.setAttribute("media", media)
		}
	
		if(style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			while(style.firstChild) {
				style.removeChild(style.firstChild);
			}
	
			style.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink (link, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		/*
			If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
			and there is no publicPath defined then lets turn convertToAbsoluteUrls
			on by default.  Otherwise default to the convertToAbsoluteUrls option
			directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
	
		if (options.convertToAbsoluteUrls || autoFixUrls) {
			css = fixUrls(css);
		}
	
		if (sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = link.href;
	
		link.href = URL.createObjectURL(blob);
	
		if(oldSrc) URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */
	
	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;
	
	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }
	
		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }
	
	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
	
		// convert each url(...)
		/*
		This regular expression is just a way to recursively match brackets within
		a string.
	
		 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
		   (  = Start a capturing group
		     (?:  = Start a non-capturing group
		         [^)(]  = Match anything that isn't a parentheses
		         |  = OR
		         \(  = Match a start parentheses
		             (?:  = Start another non-capturing groups
		                 [^)(]+  = Match anything that isn't a parentheses
		                 |  = OR
		                 \(  = Match a start parentheses
		                     [^)(]*  = Match anything that isn't a parentheses
		                 \)  = Match a end parentheses
		             )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
		 \)  = Match a close parens
	
		 /gi  = Get all matches, not the first.  Be case insensitive.
		 */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.trim()
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });
	
			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}
	
			// convert the url to a full url
			var newUrl;
	
			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}
	
			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});
	
		// send back the fixed css
		return fixedCss;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(7);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	buf.push("<div class=\"elecrank-btn\"><div class=\"elecrank-bg\"></div><span>为TA充电</span></div>");;return buf.join("");
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(8).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(7);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (aCount, currentTab, mCount, mid, total, upName, upUrl) {
	if (mCount > 0 || aCount > 0)
	{
	buf.push("<div class=\"elecrank-wrapper\"><div class=\"elecrank-header\"><a" + (jade.attr("href", upUrl, true, true)) + " target=\"_blank\"" + (jade.attr("card", upName, true, true)) + (jade.attr("mid", mid, true, true)) + " class=\"name\">" + (jade.escape(null == (jade_interp = (upName.length > 8 ? upName.slice(0, 7) + '…' : upName)) ? "" : jade_interp)) + "<div class=\"elecrank-icon icon-battery\"></div><div class=\"elecrank-icon icon-charge\"></div></a><div class=\"title\"> <span>历史充电人数：</span><sapn>" + (jade.escape(null == (jade_interp = total) ? "" : jade_interp)) + "</sapn><span>人</span></div><div data-tab='0'" + (jade.cls(['rank-tab',currentTab==0?'active':''], [null,true])) + "><span>本作品充电(</span><span>" + (jade.escape(null == (jade_interp = aCount) ? "" : jade_interp)) + "</span><span>人)</span><i class=\"arr-up\"></i></div><div data-tab='1'" + (jade.cls(['rank-tab',currentTab==1?'active':''], [null,true])) + "><span>本月所有充电(</span><span>" + (jade.escape(null == (jade_interp = mCount) ? "" : jade_interp)) + "</span><span>人)</span><i class=\"arr-up\"></i></div></div></div>");
	}
	else
	{
	buf.push("<div class=\"elecrank-wrapper no\"><div class=\"elecrank-header no-list\"><a" + (jade.attr("href", upUrl, true, true)) + " target=\"_blank\"" + (jade.attr("card", upName, true, true)) + (jade.attr("mid", mid, true, true)) + " class=\"name\">" + (jade.escape(null == (jade_interp = (upName.length > 8 ? upName.slice(0, 7) + '…' : upName)) ? "" : jade_interp)) + "<div class=\"elecrank-icon icon-battery\"></div><div class=\"elecrank-icon icon-charge\"></div></a><div class=\"title\"><span>月充电榜</span><span class=\"total-txt\">历史充电人数</span><span class=\"total-num\">" + (jade.escape(null == (jade_interp = total) ? "" : jade_interp)) + "</span></div></div><div class=\"elecrank-content no-list\"><a class=\"no-list-icon\"></a><a class=\"desc\"> <span>本月还木有人为UP主充电</span><span>让我来成为第一个充电侠吧~</span></a><a href=\"javascript:;\" class=\"elec-btn\">充电</a></div></div>");
	}}.call(this,"aCount" in locals_for_with?locals_for_with.aCount:typeof aCount!=="undefined"?aCount:undefined,"currentTab" in locals_for_with?locals_for_with.currentTab:typeof currentTab!=="undefined"?currentTab:undefined,"mCount" in locals_for_with?locals_for_with.mCount:typeof mCount!=="undefined"?mCount:undefined,"mid" in locals_for_with?locals_for_with.mid:typeof mid!=="undefined"?mid:undefined,"total" in locals_for_with?locals_for_with.total:typeof total!=="undefined"?total:undefined,"upName" in locals_for_with?locals_for_with.upName:typeof upName!=="undefined"?upName:undefined,"upUrl" in locals_for_with?locals_for_with.upUrl:typeof upUrl!=="undefined"?upUrl:undefined));;return buf.join("");
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(7);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (displayNum, lists, listsLen, prompt1, prompt2, userId) {
	if (listsLen>0)
	{
	buf.push("<div class=\"elecrank-content\"><ul>");
	for (var i = 0, len = (lists.length > 30 ? 30 : lists.length); i < len; i++)
	{
	buf.push("<li" + (jade.cls(['rank-item',i === 0 ? 'first' : i === 1 ? 'second' : i === 2 ? 'third' : '',i === len -1 ? 'last' : (i + 1) % 10 === 0 ? 'last': ''], [null,true,true])) + "><div><span class=\"item-num\">" + (jade.escape(null == (jade_interp = i + 1) ? "" : jade_interp)) + "</span><a" + (jade.attr("href", '//space.bilibili.com/' + lists[i].pay_mid, true, true)) + " target=\"_blank\"" + (jade.attr("card", lists[i].uname, true, true)) + (jade.attr("mid", lists[i].pay_mid, true, true)) + "><img" + (jade.attr("src", lists[i].avatar.replace(/http:/i, ''), true, true)) + (jade.attr("alt", lists[i].uname, true, true)) + " class=\"item-avatar\"></a><a" + (jade.attr("href", '//space.bilibili.com/' + lists[i].pay_mid, true, true)) + " target=\"_blank\"" + (jade.attr("card", lists[i].uname, true, true)) + (jade.attr("mid", lists[i].pay_mid, true, true)) + (jade.cls(['item-name',lists[i].vip_info && lists[i].vip_info.vipType==2 && lists[i].vip_info.vipStatus == 1?'is-vip':''], [null,true])) + ">" + (jade.escape(null == (jade_interp = (lists[i].uname && lists[i].uname.length > 14 ? lists[i].uname.slice(0, 13) + '…' : lists[i].uname)) ? "" : jade_interp)) + "</a></div>");
	if (i < 3 && displayNum)
	{
	buf.push("<div class=\"elec-num\"><span" + (jade.attr("title", lists[i].elec_num, true, true)) + ">" + (jade.escape(null == (jade_interp = lists[i].elec_num?lists[i].elec_num.toFixed(0):'--') ? "" : jade_interp)) + "</span><i class=\"elec-icon\"></i></div>");
	}
	else
	{
	buf.push("<i" + (jade.cls(['compare-icon',lists[i].trend_type==0?'':lists[i].trend_type==1?'up':'down'], [null,true])) + "></i>");
	}
	if (i < 3 && !lists[i].msg_deleted && lists[i].message && lists[i].message.length > 0)
	{
	buf.push("<div" + (jade.attr("data-id", lists[i].pay_mid, true, true)) + " class=\"msg\"><span>" + (null == (jade_interp = lists[i].message) ? "" : jade_interp) + "</span><i class=\"arrow\"></i>");
	if (lists[i].mid == userId)
	buf.push("<div" + (jade.attr("data-id", lists[i].pay_mid, true, true)) + (jade.attr("data-mid", userId, true, true)) + " class=\"shield-btn\">屏蔽</div></div>");
	}
	buf.push("</li>");
	}
	buf.push("</ul></div>");
	}
	else
	{
	buf.push("<div class=\"elecrank-content no-list\"><a class=\"no-list-icon\"></a><a class=\"desc\"> <span>" + (jade.escape(null == (jade_interp = prompt1) ? "" : jade_interp)) + "</span><span>" + (jade.escape(null == (jade_interp = prompt2) ? "" : jade_interp)) + "</span></a><a href=\"javascript:;\" class=\"elec-btn\">充电</a></div>");
	}}.call(this,"displayNum" in locals_for_with?locals_for_with.displayNum:typeof displayNum!=="undefined"?displayNum:undefined,"lists" in locals_for_with?locals_for_with.lists:typeof lists!=="undefined"?lists:undefined,"listsLen" in locals_for_with?locals_for_with.listsLen:typeof listsLen!=="undefined"?listsLen:undefined,"prompt1" in locals_for_with?locals_for_with.prompt1:typeof prompt1!=="undefined"?prompt1:undefined,"prompt2" in locals_for_with?locals_for_with.prompt2:typeof prompt2!=="undefined"?prompt2:undefined,"userId" in locals_for_with?locals_for_with.userId:typeof userId!=="undefined"?userId:undefined));;return buf.join("");
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(7);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (Object, listsLen, navNum, user) {
	if(listsLen > 0 && (user && Object.keys(user).length>0 || navNum>1))
	{
	buf.push("<div class=\"elecrank-footer\">");
	if (user && Object.keys(user).length>0)
	{
	buf.push("<div" + (jade.cls(['elecrank-user',user.rank>10?'':'no'], [null,true])) + "><span" + (jade.cls(['user-rank',user.rank>=100?'rank-long':''], [null,true])) + ">" + (jade.escape(null == (jade_interp = user.rank>999?999:user.rank) ? "" : jade_interp)) + "</span><a" + (jade.attr("href", '//space.bilibili.com/' + user.pay_mid, true, true)) + " target=\"_blank\"" + (jade.attr("card", user.uname, true, true)) + (jade.attr("mid", user.pay_mid, true, true)) + "><img" + (jade.attr("src", user.avatar, true, true)) + (jade.attr("alt", user.uname, true, true)) + " class=\"user-avatar\"></a><a" + (jade.attr("href", '//space.bilibili.com/' + user.pay_mid, true, true)) + " target=\"_blank\"" + (jade.attr("card", user.uname, true, true)) + (jade.attr("mid", user.pay_mid, true, true)) + (jade.cls(['user-name',user.vip_info && user.vip_info.vipType==2 && user.vip_info.vipStatus == 1?'is-vip':''], [null,true])) + ">" + (jade.escape(null == (jade_interp = user.uname) ? "" : jade_interp)) + "</a>");
	if (user.trend_type == 0 || user.trend_type == 1 || user.trend_type ==2)
	{
	buf.push("<i" + (jade.cls(['compare-icon',user.trend_type==0?'':user.trend_type==1?'up':'down'], [null,true])) + "></i>");
	}
	buf.push("</div>");
	}
	if (navNum > 1)  
	{
	buf.push("<ul" + (jade.attr("style", "width: " + ((navNum - 1) * 16 + (navNum -1) * 6 + 30 + 'px'), true, true)) + " class=\"nav-wrap clearfix\">");
	for (var i = 0; i < navNum; i++)
	{
	buf.push("<li" + (jade.attr("data-idx", i, true, true)) + (jade.cls(['nav-item',i === 0 ? 'active' : i === navNum - 1 ? 'last' : ''], [null,true])) + "></li>");
	}
	buf.push("</ul>");
	}
	buf.push("</div>");
	}}.call(this,"Object" in locals_for_with?locals_for_with.Object:typeof Object!=="undefined"?Object:undefined,"listsLen" in locals_for_with?locals_for_with.listsLen:typeof listsLen!=="undefined"?listsLen:undefined,"navNum" in locals_for_with?locals_for_with.navNum:typeof navNum!=="undefined"?navNum:undefined,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return buf.join("");
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(7);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	buf.push("<div class=\"elec-shield\"><div class=\"shield-close\"></div><div class=\"shield-title\">确定要屏蔽吗？</div><div class=\"shield-content\">屏蔽这个留言后，本月内这个用户给您的充电留言其他用户再也看不到了</div><div class=\"shiled-btn-wrp\"><div class=\"shield-btn ok\">屏蔽</div><div class=\"shield-btn cancel\">取消</div></div></div>");;return buf.join("");
	}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDY2MjNjN2Y5YWY3YjUzNDQ1NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL2VsZWMubGVzcz8wZjk3Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9lbGVjLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qYWRlL3JhbmtCdG5UcGwuamFkZSIsIndlYnBhY2s6Ly8vLi9+L2phZGUvbGliL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vLi9zcmMvamFkZS9yYW5rVHBsMi5qYWRlIiwid2VicGFjazovLy8uL3NyYy9qYWRlL3JhbmtMaXN0LmphZGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2phZGUvcmFua0Zvb3Rlci5qYWRlIiwid2VicGFjazovLy8uL3NyYy9qYWRlL3JhbmtTaGllbGQuamFkZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7OztBQy9WQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQSxFQUFDLG1DQUFtQyxFQUFFO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCt6QkFBOHpCO0FBQzl6QixHQUFFLDBxQkFBMHFCO0FBQzVxQixFOzs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsbUNBQW1DLEVBQUU7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsK0RBQThELFNBQVM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwU0FBeVM7QUFDelMsR0FBRSwwbUJBQTBtQjtBQUM1bUIsRTs7Ozs7O0FDbkNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxtQ0FBbUMsRUFBRTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsOFlBQThZO0FBQ2haLEU7Ozs7OztBQzlCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpVEFBZ1Q7QUFDaFQsRSIsImZpbGUiOiJlbGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDY2MjNjN2Y5YWY3YjUzNDQ1NzgiLCIvLyByZXF1aXJlKCcuL2xpYi9iaWxpLXF1aWNrLWVsZWMuanMnKTtcbi8vIHJlcXVpcmUoJy8vc3RhdGljLmhkc2xiLmNvbS9lbGVjX3BsdWdpbi9iaWxpLXF1aWNrLWVsZWMuanMnKTtcbnJlcXVpcmUoJy4vc3R5bGUvZWxlYy5sZXNzJyk7XG4oZnVuY3Rpb24gKCQpIHtcbiAgLy8galF1ZXJ5LnN1cHBvcnQuY29ycyA9IHRydWU7XG5cbiAgLy8gZG9jdW1lbnQud3JpdGUoXCI8c2NyaXB0IGxhbmd1YWdlPSdqYXZhc2NyaXB0JyBzcmM9Jy8vaW50ZXJmYWNlLmJpbGliaWxpLmNvbS9zZXJ2ZXJkYXRlLmpzP3Q9MjAxNjAzMjMxNjAyJz48L3NjcmlwdD5cIik7XG4gIGZ1bmN0aW9uIEVsZWNSYW5rKCkge1xuICAgIHRoaXMuJHdyYXAgPSAkKCdkaXYudl9zbWFsbCcpO1xuICAgIHRoaXMuJGVsZWNXcnAgPSAkKCdkaXYuZWxlY3Jhbmstd3JhcHBlcicsIHRoaXMuJHdyYXApO1xuICAgIHRoaXMuZWxlY1VybCA9ICcvL2FwaS5iaWxpYmlsaS5jb20veC93ZWItaW50ZXJmYWNlL2VsZWMvc2hvdyc7XG4gICAgLy8gdGhpcy5naWZ0VXJsICAgPSAnLy93d3cuYmlsaWJpbGkuY29tL3BsdXMvd2lkZ2V0L2FqYXhHZXRHaWZ0LnBocD9hY3Q9Z2V0X2V2ZW50JmdpZnRfaWQ9OTgnO1xuICAgIC8vIHRoaXMuc0JpbGxJY29uID0gJy8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9iaWxsLTYyNi1zLmpwZyc7XG4gICAgLy8gdGhpcy5sQmlsbEljb24gPSAnLy9zdGF0aWMuaGRzbGIuY29tL2ltYWdlcy9iYXNlL2JpbGwtNjI2LWwuanBnJztcbiAgICAvLyB0aGlzLmhhc0FuaSAgICA9IGZhbHNlO1xuICAgIC8vIHRoaXMuaXNXaWQgICAgID0gJChcImJvZHlcIikuaGFzQ2xhc3MoJ3dpZGVzY3JlZW4nKTsvL+aYr+WQpuS4uuWuveWxj1xuICAgIHZhciAkdXAgPSAkKCcudXNuYW1lIC5uYW1lJyk7XG4gICAgdmFyIHVwQXZhdGFyID0gJCgnLnUtZmFjZSBpbWcnKS5lcSgwKS5hdHRyKCdzcmMnKTtcbiAgICB0aGlzLnVwTmFtZSA9ICR1cC5hdHRyKCdjYXJkJykgfHwgJHVwLnRleHQoKTtcbiAgICB0aGlzLnVwQXZhdGFyID0gdHlwZW9mIHVwQXZhdGFyID09ICdzdHJpbmcnID8gdXBBdmF0YXIucmVwbGFjZSgvaHR0cDovaSwgJycpIDogdXBBdmF0YXI7XG4gICAgdGhpcy5hdmlkID0gdGhpcy5nZXRBdk51bWJlcigpO1xuICAgIHRoaXMubWlkID0gbWlkO1xuICAgIHRoaXMudXBVcmwgPSAnLy9zcGFjZS5iaWxpYmlsaS5jb20vJyArIHRoaXMubWlkO1xuICB9XG5cbiAgRWxlY1JhbmsucHJvdG90eXBlID0ge1xuICAgIGdldENvb2tpZTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCFrZXkpIHJldHVybiBudWxsO1xuICAgICAgdmFyIHJlID0gbmV3IFJlZ0V4cChrZXkgKyAnXFxcXHMqPVxcXFxzKihbXjtdKikoPzo7fCQpJyk7XG4gICAgICB2YXIgbWF0Y2ggPSByZS5leGVjKGRvY3VtZW50LmNvb2tpZSk7XG4gICAgICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgbnVsbDtcbiAgICB9LFxuICAgIGdldEF2TnVtYmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgdmFyIHJlID0gL2F2KFxcZCspLztcbiAgICAgIHZhciBtYXRjaCA9IHJlLmV4ZWModXJsKTtcbiAgICAgIHJldHVybiBwYXJzZUludChtYXRjaCAmJiBtYXRjaFsxXSkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLiRlbGVjV3JwLmxlbmd0aCA+IDAgfHwgIW1pZCkgcmV0dXJuO1xuICAgICAgdGhpcy5pc1Nob3dFbGVjKCk7XG4gICAgfSxcbiAgICBpc1Nob3dFbGVjOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHRoaXMuZWxlY1VybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBqc29ucDogJ2pzb25wJyxcbiAgICAgICAgICBhaWQ6IHRoaXMuZ2V0QXZOdW1iZXIoKSB8fCAwLFxuICAgICAgICAgIG1pZDogdGhhdC5taWRcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogJ0dFVCdcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jb2RlID09IDAgJiYgZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5zaG93X2luZm8uc2hvdykgey8vdXDkuLvlt7LlvIDpgJrlhYXnlLUgICBcbiAgICAgICAgICB0aGF0LnBhbmVsUmVwb3J0KDIsIG51bGwsIG51bGwsIDEpO1xuICAgICAgICAgIHRoYXQuYWRkUmFua0J0blRwbCgpO1xuICAgICAgICAgIHRoYXQuYWRkUmFua0J0blN0eWxlKGRhdGEuZGF0YS5pc1NwZWNpYWwpO1xuXG4gICAgICAgICAgdGhhdC5mbGFzaERhdGEgPSBkYXRhO1xuICAgICAgICAgIHRoYXQuZmxhc2hEYXRhICYmIHRoYXQuZmxhc2hEYXRhLmRhdGEgJiYgKHRoYXQuZmxhc2hEYXRhLmRhdGEucGljID0gd2luZG93LndiX2ltZyB8fCAnJyk7Ly/op4bpopHmkq3mlL7lrozlkI7mmL7npLrmjpLooYzmppxcbiAgICAgICAgICB0aGF0LmZsYXNoRGF0YSAmJiB0aGF0LmZsYXNoRGF0YS5kYXRhICYmICh0aGF0LmZsYXNoRGF0YS5kYXRhLnNob3cgPSB0cnVlKTtcblxuICAgICAgICAgIHRoYXQuY3VycmVudFRhYiA9IDA7Ly/lvZPliY10YWLvvIww6KGo56S65L2c5ZOB5qac77yMMeihqOekuuaciOamnFxuICAgICAgICAgIHRoYXQudG90YWwgPSBkYXRhLmRhdGEudG90YWxfY291bnQ7Ly/ljoblj7LmipXlloLkurrmlbBcbiAgICAgICAgICB0aGF0LmFDb3VudCA9IGRhdGEuZGF0YS5hdl9jb3VudDsvL+S9nOWTgeaKleWWguS6uuaVsFxuICAgICAgICAgIHRoYXQubUNvdW50ID0gZGF0YS5kYXRhLmNvdW50Oy8v5pys5pyI5oqV5ZaC5Lq65pWwXG4gICAgICAgICAgdGhhdC5hTGlzdHMgPSBkYXRhLmRhdGEuYXZfbGlzdCB8fCBbXTsvL+S9nOWTgeaKleWWguamnExpc3TmlbDmja5cbiAgICAgICAgICB0aGF0Lm1MaXN0cyA9IGRhdGEuZGF0YS5saXN0IHx8IFtdOy8v5pys5pyI5oqV5ZaC5qac55qEbGlzdOaVsOaNrlxuICAgICAgICAgIHRoYXQuYVVzZXIgPSBkYXRhLmRhdGEuYXZfdXNlcjsvL+S9nOWTgeaKleWWguamnOS4reeahOaIkVxuICAgICAgICAgIHRoYXQubVVzZXIgPSBkYXRhLmRhdGEudXNlcjsvL+acrOaciOaKleWWguamnOS4reeahOaIkVxuICAgICAgICAgIHRoYXQuZGlzcGxheU51bSA9IGRhdGEuZGF0YS5kaXNwbGF5X251bTtcblxuICAgICAgICAgIHZhciBlbGVjUGx1Z2luID0ge1xuICAgICAgICAgICAgZ2V0RWxlY0RhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZmxhc2hEYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb2RhbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAvKiQuZ2V0U2NyaXB0KFwiLy9zdGF0aWMuaGRzbGIuY29tL2VsZWNfcGx1Z2luL2JpbGktcXVpY2stZWxlYy5qc1wiLCBmdW5jdGlvbigpeyAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHdpbmRvdy5iaWxpUXVpY2tFbGVjKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVJhbmsoKTtcbiAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgIG1pZDogICAgICB0aGF0Lm1pZCxcbiAgICAgICAgICAgICAgICAgIHVwbmFtZTogICB0aGF0LnVwTmFtZSxcbiAgICAgICAgICAgICAgICAgIHVwdXJsOiAgICB0aGF0LnVwVXJsLFxuICAgICAgICAgICAgICAgICAgdXBhdmF0YXI6IHRoYXQudXBBdmF0YXIsXG4gICAgICAgICAgICAgICAgICBhdmlkOiAgICAgdGhhdC5hdmlkLFxuICAgICAgICAgICAgICAgICAgZmxhc2g6ICAgIHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSkqL1xuICAgICAgICAgICAgICB0aGF0LnBhbmVsUmVwb3J0KDEsIDMsIG51bGwsIDIpO1xuICAgICAgICAgICAgICB0aGF0LmxvZ2luVG9FbGVjKDIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzQ2hhcmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhhdC5tQ291bnQgPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzTGFzdEF2OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG90YWxwYWdlICYmIHdpbmRvdy5wYWdlbm8gJiYgcGFyc2VJbnQod2luZG93LnRvdGFscGFnZSwgMTApID09PSBwYXJzZUludCh3aW5kb3cucGFnZW5vLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICB3aW5kb3cuZWxlY1BsdWdpbiA9IGVsZWNQbHVnaW47XG5cbiAgICAgICAgICB0aGF0LmFkZFJhbmsoKTsvL+m7mOiupOaYvuekuuS9nOWTgeamnFxuXG4gICAgICAgICAgdGhhdC5hZGRSYW5rQnRuU3R5bGUoZmFsc2UpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vdXBpbmZv5YaF55qE5YWF55S15oyJ6ZKuXG4gICAgICAgICAgdGhhdC5zZXRFbGVjQnRuT2ZVcGNhcmQoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIC8qKlxuICAgICrmoLnmja7nlKjmiLfmmK/lkKblhbPms6h1cOS4u++8jOaYvuekunVw5L+h5oGv6YeM6Z2i55qE5YWF55S15oyJ6ZKu5qC35byP77yM5bm25LiU57uR5a6a5LqL5Lu2XG4gICAgKi9cbiAgICBzZXRFbGVjQnRuT2ZVcGNhcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBmb2xsb3dfaGltID0gZmFsc2U7XG4gICAgICBpZiAodHlwZW9mICh3aW5kb3cuQXR0ZW50aW9uTGlzdCkgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mICh3aW5kb3cuQXR0ZW50aW9uTGlzdCkgIT0gbnVsbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbmRvdy5BdHRlbnRpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5BdHRlbnRpb25MaXN0W2ldID09IG1pZCkge1xuICAgICAgICAgICAgZm9sbG93X2hpbSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb2xsb3dfaGltKSB7XG4gICAgICAgICQoJy5yLWluZm8gPiAuZWxlYycpLmFkZENsYXNzKCdvbicpLnRleHQoJ+S4ulRB5YWF55S1JykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5yLWluZm8gPiAuZWxlYycpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmJpbmRFbGVjQnRuKCcudXBpbmZvIC5iLWJ0bi5lbGVjJywgMyk7Ly/nu5Hlrpp1cOS/oeaBr+mHjOmdoueahOWFheeUteaMiemSrlxuICAgIH0sXG4gICAgLyoqXG4gICAgKuivt+axguS9nOWTgeaKleWWguamnFxuICAgICovXG4gICAgcXVlcnlBcnRpY2xlUmFuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHVybDogJy8vZWxlYy5iaWxpYmlsaS5jb20vd2ViL3JhbmsvcXVlcnkvYXYnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbWlkOiBtaWQsXG4gICAgICAgICAgYXZfbm86IHRoaXMuZ2V0QXZOdW1iZXIoKSB8fCAwLFxuICAgICAgICAgIHR5cGU6ICdqc29ucCdcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCcsXG4gICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgICAgICB4aHJGaWVsZHM6IHtcbiAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWVcbiAgICAgICAgfVxuICAgICAgICAvKnVybDogJy8vbG9jYWxob3N0OjgwMDAvd2ViL3JhbmsvcXVlcnkvYXYnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nKi9cbiAgICAgIH0pXG4gICAgfSxcbiAgICAvKipcbiAgICAq6K+35rGC5pyI5qacXG4gICAgKi9cbiAgICBxdWVyeU1vbnRoUmFuazogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgIHVybDogJy8vZWxlYy5iaWxpYmlsaS5jb20vd2ViL3JhbmsvcXVlcnknLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbWlkOiBtaWQsXG4gICAgICAgICAgdHlwZTogJ2pzb25wJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICAgIHhockZpZWxkczoge1xuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9LFxuICAgIHJlc2l6ZUNkbkltYWdlOiBmdW5jdGlvbiAodXJsLCBzaXplKSB7XG4gICAgICBpZiAodXJsLmluZGV4T2YoJ25vZmFjZScpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cbiAgICAgIHNpemUgPSBzaXplID8gc2l6ZSA6ICcxNjB4MTAwJztcbiAgICAgIHZhciBleHQgPSAnLmpwZyc7XG4gICAgICBpZiAodXJsLmluZGV4T2YoJy5qcGcnKSA+IC0xKSBleHQgPSAnLmpwZyc7XG4gICAgICBlbHNlIGlmICh1cmwuaW5kZXhPZignLmdpZicpID4gLTEpIGV4dCA9ICcuZ2lmJztcbiAgICAgIGVsc2UgaWYgKHVybC5pbmRleE9mKCcucG5nJykgPiAtMSkgZXh0ID0gJy5wbmcnO1xuICAgICAgaWYgKHVybC5pbmRleE9mKCdoZHNsYi5jb20vZ3JvdXAxLycpID4gLTEgfHwgdXJsLmluZGV4T2YoJ2hkc2xiLmNvbS9iZnMvJykgPiAtMSkge1xuICAgICAgICB2YXIgaGFzU2l6ZSA9IC9fXFxkK3hcXGQrXFwuKGpwZ3xqcGVnfGdpZnxwbmcpLy5leGVjKHVybCk7XG4gICAgICAgIGlmIChoYXNTaXplKSB7XG4gICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoaGFzU2l6ZVswXSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmwgKyAnXycgKyBzaXplICsgZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2l6ZSA9IHNpemUucmVwbGFjZSgneCcsICdfJyk7XG4gICAgICAgIHZhciBoYXNTaXplID0gL1xcLmNvbVxcLyhcXGQrX1xcZCspXFwvLy5leGVjKHVybCk7XG4gICAgICAgIGlmIChoYXNTaXplKSB7XG4gICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKGhhc1NpemVbMV0sIHNpemUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB1cmwucmVwbGFjZSgnLmNvbScsICcuY29tLycgKyBzaXplKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYWRkUmFua0J0blRwbDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyICRhcmNUb29sYmFyID0gJCgnLmFyYy10b29sYmFyJyk7XG4gICAgICBpZiAoJGFyY1Rvb2xiYXIubGVuZ3RoIDw9IDApIHJldHVybjtcbiAgICAgIHZhciB0cGwgPSByZXF1aXJlKCcuL2phZGUvcmFua0J0blRwbC5qYWRlJykoKTtcbiAgICAgICRhcmNUb29sYmFyLmFwcGVuZCh0cGwpO1xuICAgICAgdGhhdC4kcmFua0J0biA9ICRhcmNUb29sYmFyLmZpbmQoJy5lbGVjcmFuay1idG4nKTtcbiAgICAgIHRoYXQuJGFuaW1hdGVFbGVtZW50ID0gJCgnLmVsZWNyYW5rLWJnJywgdGhhdC4kcmFua0J0bik7XG5cbiAgICAgIHRoaXMuYmluZEVsZWNCdG4oJy5hcmMtdG9vbGJhciAuZWxlY3JhbmstYnRuJywgMSk7XG4gICAgfSxcbiAgICBhZGRSYW5rQnRuU3R5bGU6IGZ1bmN0aW9uIChpc1NwZWNpYWwpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBsb29wRnJhbWUgPSAxO1xuICAgICAgdmFyIGFuaW1hdG9yQmF0dGVyeTtcbiAgICAgIGlmICh0aGF0LiRyYW5rQnRuICYmIHRoYXQuJHJhbmtCdG4ubGVuZ3RoID4gMCAmJiB0aGF0LiRhbmltYXRlRWxlbWVudCAmJiB0aGF0LiRhbmltYXRlRWxlbWVudC5sZW5ndGggPiAwICYmIHdpbmRvdy5BbmltYXRvcikge1xuICAgICAgICBpZiAoIWlzU3BlY2lhbCkge1xuICAgICAgICAgIGFuaW1hdG9yQmF0dGVyeSA9IG5ldyB3aW5kb3cuQW5pbWF0b3Ioe1xuICAgICAgICAgICAgZWxlbWVudDogdGhhdC4kYW5pbWF0ZUVsZW1lbnQsXG4gICAgICAgICAgICBmcmFtZVNvdXJjZTogJy8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9hbmltLWJhdHRlcnkucG5nJyxcbiAgICAgICAgICAgIGZyYW1lV2lkdGg6IDgwLFxuICAgICAgICAgICAgZnJhbWVIZWlnaHQ6IDgwLFxuICAgICAgICAgICAgZnBzOiAxMCxcbiAgICAgICAgICAgIHRvdGFsRnJhbWU6IDRcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuJHJhbmtCdG4uYWRkQ2xhc3MoJ2JpcnRoJyk7Ly/mjInpkq7moLflvI9cbiAgICAgICAgICB0aGF0LiRyYW5rQnRuLmFwcGVuZCgnPGRpdiBjbGFzcz1cImJpcnRoLXRpcHNcIj7ku4rlpKnmmK9VUOS4u+eUn+aXpeWTpn48L2Rpdj4nKVxuICAgICAgICAgIHRoYXQuJGFuaW1hdGVFbGVtZW50LmNzcyh7Ly/liqjnlLvmoLflvI9cbiAgICAgICAgICAgIHRvcDogXCItNTJweFwiLFxuICAgICAgICAgICAgbGVmdDogXCItNzUlXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhbmltYXRvckJhdHRlcnkgPSBuZXcgd2luZG93LkFuaW1hdG9yKHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoYXQuJGFuaW1hdGVFbGVtZW50LFxuICAgICAgICAgICAgZnJhbWVTb3VyY2U6ICcvL3N0YXRpYy5oZHNsYi5jb20vaW1hZ2VzL2Jhc2UvZWxlYy1iYXR0ZXJ5LWJpcnRoLnBuZycsXG4gICAgICAgICAgICBmcmFtZVdpZHRoOiAxMjAsXG4gICAgICAgICAgICBmcmFtZUhlaWdodDogMTIwLFxuICAgICAgICAgICAgZnBzOiAxMCxcbiAgICAgICAgICAgIHRvdGFsRnJhbWU6IDdcbiAgICAgICAgICB9KVxuICAgICAgICAgIHdpbmRvdy5yZWNfcnAgJiYgd2luZG93LnJlY19ycChcImV2ZW50XCIsIFwiYmlydGhkYXlfY2hhcmdlX2J1dHRvbl9zaG93XCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuJHJhbmtCdG4ubW91c2VlbnRlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYW5pbWF0b3JCYXR0ZXJ5LnN0YXJ0KGxvb3BGcmFtZSk7XG4gICAgICAgIH0pLm1vdXNlbGVhdmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFuaW1hdG9yQmF0dGVyeS5iYWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgKue7keWumuS6i+S7tu+8jOaYvuekuuWFheeUteaPkuS7tlxuICAgICovXG4gICAgYmluZEVsZWNCdG46IGZ1bmN0aW9uIChzZWxlY3Rvciwgc3JjKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09ICdzdHJpbmcnKSB7XG4gICAgICAgICQoc2VsZWN0b3IpLm9mZignY2xpY2suZWxlY1BsdWdpbicpLm9uKCdjbGljay5lbGVjUGx1Z2luJywgeyBzcmM6IHNyYyB9LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaXNUcmlnZ2VyKSB7XG4gICAgICAgICAgICB0aGF0LnBhbmVsUmVwb3J0KDEsIDMsIG51bGwsIDIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGF0LnBhbmVsUmVwb3J0KDEsIDMsIG51bGwsIHNyYyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBvcmlnaW4gPSBldmVudC5pc1RyaWdnZXIgPyAyIDogZXZlbnQuZGF0YSA/IGV2ZW50LmRhdGEuc3JjIDogMC8v5Z+L54K55L2/55SoLOayoeacieS8oHNyY+ivtOaYjuaYr2g16Kem5Y+RXG4gICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2VsZWNyYW5rLWJ0bicpICYmICQodGhpcykuaGFzQ2xhc3MoJ2JpcnRoJykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZWNfcnAgJiYgd2luZG93LnJlY19ycCgnZXZlbnQnLCAnYmlydGhkYXlfY2hhcmdlX2J1dHRvbl9jbGljaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmxvZ2luVG9FbGVjKG9yaWdpbik7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBsb2dpblRvRWxlYzogZnVuY3Rpb24gKG9yaWdpbikge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKHdpbmRvdy5iaWxpTG9naW5TdGF0dXMgJiYgd2luZG93LmJpbGlMb2dpblN0YXR1cy5pc0xvZ2luKSB7XG4gICAgICAgIHRoYXQuc2hvd1F1aWNrRWxlYyhvcmlnaW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoUmVxdWlyZU1vZHVsZSkge1xuICAgICAgICAgICAgUmVxdWlyZU1vZHVsZS5nZXRTY3JpcHQoJ2JpbGlRdWlja0xvZ2luJywgJ2h0dHBzOi8vc3RhdGljLXMuYmlsaWJpbGkuY29tL2FjY291bnQvYmlsaV9xdWlja19sb2dpbi5qcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgd2luZG93LmJpbGlRdWlja0xvZ2luKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9hZExvZ2luU3RhdHVzICYmIHdpbmRvdy5sb2FkTG9naW5TdGF0dXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhhdC5zaG93UXVpY2tFbGVjKG9yaWdpbik7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2FjY291bnQuYmlsaWJpbGkuY29tL2xvZ2luP2dvdXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQobG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cHM6Ly9hY2NvdW50LmJpbGliaWxpLmNvbS9sb2dpbj9nb3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzaG93UXVpY2tFbGVjOiBmdW5jdGlvbiAob3JpZ2luKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICBtaWQ6IHRoYXQubWlkLFxuICAgICAgICB1cG5hbWU6IHRoYXQudXBOYW1lLFxuICAgICAgICB1cHVybDogdGhhdC51cFVybCxcbiAgICAgICAgdXBhdmF0YXI6IHRoYXQudXBBdmF0YXIsXG4gICAgICAgIGF2aWQ6IHRoYXQuYXZpZCxcbiAgICAgICAgb3JpZ2luOiBvcmlnaW4gPyBvcmlnaW4gOiAyXG4gICAgICB9XG4gICAgICBpZiAoUmVxdWlyZU1vZHVsZSAmJiBSZXF1aXJlTW9kdWxlLmdldFNjcmlwdCkge1xuICAgICAgICBSZXF1aXJlTW9kdWxlLmdldFNjcmlwdCgnYmlsaVF1aWNrRWxlYycsICcvL3N0YXRpYy5oZHNsYi5jb20vZWxlY19wbHVnaW4vYmlsaS1xdWljay1lbGVjLmpzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHdpbmRvdy5iaWxpUXVpY2tFbGVjKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoYXQudXBkYXRlUmFuaygpO1xuICAgICAgICAgIH0sIHBhcmFtcylcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghd2luZG93LmJpbGlRdWlja0VsZWMpIHtcbiAgICAgICAgICAkLmdldFNjcmlwdChcIi8vc3RhdGljLmhkc2xiLmNvbS9lbGVjX3BsdWdpbi9iaWxpLXF1aWNrLWVsZWMuanNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LmJpbGlRdWlja0VsZWMoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVJhbmsoKTtcbiAgICAgICAgICAgIH0sIHBhcmFtcyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuYmlsaVF1aWNrRWxlYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LnVwZGF0ZVJhbmsoKTtcbiAgICAgICAgICB9LCBwYXJhbXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9LFxuICAgIGFkZFJhbms6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciAkZWxlY1dycCA9IHRoaXMuJHdyYXAuZmluZCgnLmVsZWNyYW5rLXdyYXBwZXInKTtcblxuICAgICAgdmFyIHRwbCA9IHJlcXVpcmUoJy4vamFkZS9yYW5rVHBsMi5qYWRlJykoe1xuICAgICAgICBtaWQ6IHRoaXMubWlkLFxuICAgICAgICB1cE5hbWU6IHRoaXMudXBOYW1lLFxuICAgICAgICB1cFVybDogdGhpcy51cFVybCxcbiAgICAgICAgdG90YWw6IHRoaXMudG90YWwsXG4gICAgICAgIG1Db3VudDogdGhpcy5tQ291bnQsXG4gICAgICAgIGFDb3VudDogdGhpcy5hQ291bnQsXG4gICAgICAgIGN1cnJlbnRUYWI6IHRoaXMuY3VycmVudFRhYlxuICAgICAgfSk7XG4gICAgICBpZiAoJGVsZWNXcnAubGVuZ3RoKSB7XG4gICAgICAgICRlbGVjV3JwLnJlcGxhY2VXaXRoKHRwbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiR3cmFwLnByZXBlbmQodHBsKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFDb3VudCA+IDAgfHwgdGhpcy5tQ291bnQgPiAwKSB7XG5cbiAgICAgICAgdGhpcy5maWxsVHBsKCk7XG5cbiAgICAgICAgdmFyICRyYW5rVGFiID0gdGhpcy4kd3JhcC5maW5kKCcucmFuay10YWInKTtcbiAgICAgICAgJHJhbmtUYWIub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhhdC5jdXJyZW50VGFiID0gJCh0aGlzKS5kYXRhKCd0YWInKTtcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICB0aGF0LmZpbGxUcGwoKTtcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYmluZEVsZWNCdG4oJy5lbGVjcmFuay1jb250ZW50Lm5vLWxpc3QgLmVsZWMtYnRuLCAuZWxlY3JhbmstY29udGVudC5uby1saXN0IC5uby1saXN0LWljb24sIC5lbGVjcmFuay1jb250ZW50Lm5vLWxpc3QgLmRlc2MnKTtcbiAgICAgIH1cblxuICAgIH0sXG4gICAgLyoqXG4gICAgKuWIhuW8gOa3u+WKoGNvbnRlbnTlkoxmb290ZXJcbiAgICAqL1xuICAgIGZpbGxUcGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciAkZWxlY1dycCA9IHRoaXMuJHdyYXAuZmluZCgnLmVsZWNyYW5rLXdyYXBwZXInKTtcbiAgICAgIHZhciAkY29udGVudCA9IHRoaXMuJHdyYXAuZmluZCgnLmVsZWNyYW5rLWNvbnRlbnQnKTtcbiAgICAgIHZhciAkZm9vdGVyID0gdGhpcy4kd3JhcC5maW5kKCcuZWxlY3JhbmstZm9vdGVyJyk7XG5cbiAgICAgIHZhciBuYXZOdW07Ly/lvZPliY3mjpLooYzmppzvvIzmppzljZXnmoTpobXmlbBcbiAgICAgIHZhciBsaXN0cyA9IFtdOy8v5b2T5YmN5pi+56S655qE5qac5Y2VbGlzdFxuICAgICAgdmFyIGxpc3RzTGVuID0gMDsvL+W9k+WJjeaYvuekuueahOamnOWNleS4quaVsFxuICAgICAgdmFyIGNvdW50ID0gMDsvL+W9k+WJjeaYvuekuueahOamnOWNleeahOS4quaVsFxuICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRUYWIpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGxpc3RzID0gdGhpcy5hTGlzdHM7XG4gICAgICAgICAgdXNlciA9IHRoaXMuYVVzZXI7XG4gICAgICAgICAgcHJvbXB0MSA9ICfmnKzmnIjov5jmnKjmnInkurrkuLrov5nkuKrkvZzlk4HlhYXnlLUnO1xuICAgICAgICAgIHByb21wdDIgPSAn6K6p5oiR5p2l5oiQ5Li656ys5LiA5Liq5YWF55S15L6g5ZCnJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGxpc3RzID0gdGhpcy5tTGlzdHM7XG4gICAgICAgICAgdXNlciA9IHRoaXMubVVzZXI7XG4gICAgICAgICAgcHJvbXB0MSA9ICfmnKzmnIjov5jmnKjmnInkurrkuLpVUOS4u+WFheeUtSc7XG4gICAgICAgICAgcHJvbXB0MiA9ICforqnmiJHmnaXmiJDkuLrnrKzkuIDkuKrnn6Xpn7PlkKcnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGlzdHNMZW4gPSBsaXN0cy5sZW5ndGg7XG4gICAgICBpZiAobGlzdHNMZW4gPiAzMCkge1xuICAgICAgICBuYXZOdW0gPSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmF2TnVtID0gTWF0aC5jZWlsKGxpc3RzTGVuIC8gMTApIHx8IDE7XG4gICAgICB9XG4gICAgICAvL2NvbnRlbnQgaHRtbFxuICAgICAgdmFyIGNvblRwbCA9IHJlcXVpcmUoJy4vamFkZS9yYW5rTGlzdC5qYWRlJykoe1xuICAgICAgICBsaXN0czogbGlzdHMsXG4gICAgICAgIGxpc3RzTGVuOiBsaXN0c0xlbixcbiAgICAgICAgcHJvbXB0MTogcHJvbXB0MSxcbiAgICAgICAgcHJvbXB0MjogcHJvbXB0MixcbiAgICAgICAgZGlzcGxheU51bTogdGhpcy5kaXNwbGF5TnVtLFxuICAgICAgICB1c2VySWQ6IHRoaXMuZ2V0Q29va2llKCdEZWRlVXNlcklEJykvL+eZu+W9leeUqOaIt+eahGlk77yM5Yik5pat55So5oi35piv5ZCm5Y+v5Lul5bGP6JS95pON5L2cXG4gICAgICB9KTtcbiAgICAgIGlmICgkY29udGVudCAmJiAkY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICRjb250ZW50LnJlcGxhY2VXaXRoKGNvblRwbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZWxlY1dycC5hcHBlbmQoY29uVHBsKTtcbiAgICAgIH1cbiAgICAgIC8vZm9vdGVyIGh0bWxcbiAgICAgIHZhciBmb290ZXJUcGwgPSByZXF1aXJlKCcuL2phZGUvcmFua0Zvb3Rlci5qYWRlJykoe1xuICAgICAgICB1c2VyOiB1c2VyLFxuICAgICAgICBuYXZOdW06IG5hdk51bSxcbiAgICAgICAgbGlzdHNMZW46IGxpc3RzTGVuXG4gICAgICB9KVxuICAgICAgaWYgKCRmb290ZXIgJiYgJGZvb3Rlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICRmb290ZXIucmVwbGFjZVdpdGgoZm9vdGVyVHBsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRlbGVjV3JwLmFwcGVuZChmb290ZXJUcGwpO1xuICAgICAgfVxuXG4gICAgICB2YXIgJHVzZXJSYW5rID0gJCgnLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLXVzZXInKTtcbiAgICAgIHZhciAkcmFua0l0ZW1zID0gJCgnLmVsZWNyYW5rLXdyYXBwZXIgLnJhbmstaXRlbScpO1xuICAgICAgJHJhbmtJdGVtcy5maWx0ZXIoJzpndCg5KScpLmhpZGUoKTtcblxuICAgICAgdmFyICRuYXZJdGVtcyA9ICQoJy5lbGVjcmFuay13cmFwcGVyIC5uYXYtaXRlbScpO1xuICAgICAgJG5hdkl0ZW1zLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSkgcmV0dXJuO1xuICAgICAgICAkbmF2SXRlbXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkcmFua0l0ZW1zLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHZhciBpZHggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaWR4JyksIDEwKTtcbiAgICAgICAgJHJhbmtJdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgaWYgKGlkeCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4IDwgMTA7XG4gICAgICAgICAgfSBlbHNlIGlmIChpZHggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA+PSAxMCAmJiBpbmRleCA8IDIwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaWR4ID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPj0gMjAgJiYgaW5kZXggPCAzMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnNob3coKTtcbiAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5yYW5rIDw9IChpZHggKyAxKSAqIDEwKSB7XG4gICAgICAgICAgJHVzZXJSYW5rLmFkZENsYXNzKCdubycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHVzZXJSYW5rLnJlbW92ZUNsYXNzKCdubycpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgJHNoaWVsZEJ0biA9ICQoJy5lbGVjcmFuay13cmFwcGVyIC5zaGllbGQtYnRuJyk7XG4gICAgICB2YXIgc2hpZWxkSWQ7XG4gICAgICAkc2hpZWxkQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRzaGllbGREaWFsb2cgPSAkKFwiYm9keVwiKS5maW5kKCcuZWxlYy1zaGllbGQnKTtcbiAgICAgICAgdmFyIHNoaWVsZFRwbCA9IHJlcXVpcmUoJy4vamFkZS9yYW5rU2hpZWxkLmphZGUnKSgpO1xuICAgICAgICB2YXIgcG9zT2JqID0gJCh0aGlzKS5wYXJlbnQoKS5vZmZzZXQoKTtcbiAgICAgICAgaWYgKCRzaGllbGREaWFsb2cgJiYgJHNoaWVsZERpYWxvZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJHNoaWVsZERpYWxvZy5yZXBsYWNlV2l0aChzaGllbGRUcGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChzaGllbGRUcGwpO1xuICAgICAgICB9XG4gICAgICAgICQoXCIuZWxlYy1zaGllbGRcIikuY3NzKHtcbiAgICAgICAgICB0b3A6IHBvc09iai50b3AgLSAxNjAsXG4gICAgICAgICAgbGVmdDogcG9zT2JqLmxlZnQgKyAyMFxuICAgICAgICB9KTtcblxuICAgICAgICBzaGllbGRJZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xuICAgICAgfSk7XG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCRzaGllbGRCdG4gJiYgJHNoaWVsZEJ0bi5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgcG9zT2JqID0gJHNoaWVsZEJ0bi5wYXJlbnQoKS5vZmZzZXQoKTtcbiAgICAgICAgICAkKCcuZWxlYy1zaGllbGQnKS5jc3Moe1xuICAgICAgICAgICAgdG9wOiBwb3NPYmoudG9wIC0gMTYwLFxuICAgICAgICAgICAgbGVmdDogcG9zT2JqLmxlZnQgKyAyMFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnYm9keScpLm9mZignY2xpY2suY29uZmlybVNoaWVsZCcpLm9uKCdjbGljay5jb25maXJtU2hpZWxkJywgJy5zaGllbGQtYnRuLm9rJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LnBhbmVsUmVwb3J0KDEsIDIsIHNoaWVsZElkLCBudWxsKTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50TW9kZSkge1xuICAgICAgICAgIHZhciBleHRlbmRIVE1MID0gXCI8Zm9ybSBpZD0naWVQb3N0JyBuYW1lPSdpZVBvc3QnIG1ldGhvZD0ncG9zdCc+PC9mb3JtPjxpZnJhbWUgd2lkdGg9JzAnIGhlaWdodD0nMCcgaWQ9J2llUG9zdElmcmFtZScgbmFtZT0naWVQb3N0SWZyYW1lJz48L2lmcmFtZT48c2NyaXB0IHR5cGU9J3RleHQvamF2YXNjcmlwdCc+ZG9jdW1lbnQuZG9tYWluID0gJ2JpbGliaWxpLmNvbSc7PC9zY3JpcHQ+XCI7XG4gICAgICAgICAgJCgnYm9keScpLmFwcGVuZChleHRlbmRIVE1MKTtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnLy9lbGVjLmJpbGliaWxpLmNvbS93ZWIvY2FwdGNoYS9jc3JmJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2pzb25wJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICAgICAgICB4aHJGaWVsZHM6IHtcbiAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ0dFVCdcbiAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGNhcHRjaGEgPSBkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmNzcmZfY2FwdGNoYTtcbiAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiI2llUG9zdFwiKVswXTtcbiAgICAgICAgICAgICAgZm9ybS5hY3Rpb24gPSAnLy9lbGVjLmJpbGliaWxpLmNvbS93ZWIvcmVtYXJrL2hpZGRlbj90eXBlPWpzb25wJmNhbGxiYWNrPSUzQ3NjcmlwdCUyMHR5cGUlM0QlMjJ0ZXh0JTJGamF2YXNjcmlwdCUyMiUzRWRvY3VtZW50LmRvbWFpbiUzRCUyMmJpbGliaWxpLmNvbSUyMiUzQiUzQyUyRnNjcmlwdCUzRSc7XG4gICAgICAgICAgICAgICQoXCIjaWVQb3N0XCIpLmFwcGVuZCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwicGF5X21pZFwiIHZhbHVlPVwiJyArIHNoaWVsZElkICsgJ1wiPicpO1xuICAgICAgICAgICAgICAkKFwiI2llUG9zdFwiKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImNhcHRjaGFcIiB2YWx1ZT1cIicgKyBjYXB0Y2hhICsgJ1wiPicpO1xuICAgICAgICAgICAgICAkKFwiI2llUG9zdFwiKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImFwcF9pZFwiIHZhbHVlPVwiJyArIDEgKyAnXCI+Jyk7XG4gICAgICAgICAgICAgIGZvcm0udGFyZ2V0ID0gXCJpZVBvc3RJZnJhbWVcIjtcbiAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgJChcIiNpZVBvc3RJZnJhbWVcIikub2ZmKCk7XG4gICAgICAgICAgICAgICQoXCIjaWVQb3N0SWZyYW1lXCIpLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQuYm9keS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkLnBhcnNlSlNPTihyZXN1bHQuc3Vic3RyaW5nKDEsIGxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09IDAgJiYgZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgJCgnLmVsZWMtc2hpZWxkJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAvKiQoJy5tc2dbZGF0YS1pZD1cIicgKyBzaGllbGRJZCArICdcIl0nKS5yZW1vdmUoKTsqL1xuICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVSYW5rKHNoaWVsZElkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbmV3IE1lc3NhZ2VCb3goe1xuICAgICAgICAgICAgICAgICAgICBmb2N1c1Nob3dQb3M6ICdkb3duJ1xuICAgICAgICAgICAgICAgICAgfSkuc2hvdygkKCcuZWxlYy1zaGllbGQgLnNoaWVsZC1idG4ub2snKSwgJ+Wxj+iUveeVmeiogOWksei0pScsIDE1MDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKFwiI2llUG9zdFwiKS5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnLy9lbGVjLmJpbGliaWxpLmNvbS93ZWIvY2FwdGNoYS9jc3JmJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ2pzb25wJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICAgICAgICB4aHJGaWVsZHM6IHtcbiAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ0dFVCdcbiAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgdmFyIGNhcHRjaGEgPSBkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmNzcmZfY2FwdGNoYTtcbiAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvL2VsZWMuYmlsaWJpbGkuY29tL3dlYi9yZW1hcmsvaGlkZGVuJyxcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgcGF5X21pZDogc2hpZWxkSWQsXG4gICAgICAgICAgICAgICAgICBjYXB0Y2hhOiBjYXB0Y2hhXG4gICAgICAgICAgICAgICAgICAvLyBhcHBfaWQ6IDFcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyb3NzRG9tYWluOiB0cnVlLFxuICAgICAgICAgICAgICAgIHhockZpZWxkczoge1xuICAgICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpID8gJC5wYXJzZUpTT04oZGF0YSkgOiBkYXRhO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT0gMCAmJiBkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLnN0YXR1cyA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAkKCcuZWxlYy1zaGllbGQnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgIC8qJCgnLm1zZ1tkYXRhLWlkPVwiJyArIHNoaWVsZElkICsgJ1wiXScpLnJlbW92ZSgpOyovXG4gICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVJhbmsoc2hpZWxkSWQpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBuZXcgTWVzc2FnZUJveCh7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzU2hvd1BvczogJ2Rvd24nXG4gICAgICAgICAgICAgICAgICB9KS5zaG93KCQoJy5lbGVjLXNoaWVsZCAuc2hpZWxkLWJ0bi5vaycpLCAn5bGP6JS955WZ6KiA5aSx6LSlJywgMTUwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJ2JvZHknKS5vZmYoJ2NsaWNrLmNhbmNlbFNoaWVsZCcpLm9uKCdjbGljay5jYW5jZWxTaGllbGQnLCAnLnNoaWVsZC1idG4uY2FuY2VsLCAuc2hpZWxkLWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJy5lbGVjLXNoaWVsZCcpLnJlbW92ZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChsaXN0c0xlbiA8PSAwKSB7XG4gICAgICAgIHRoaXMuYmluZEVsZWNCdG4oJy5lbGVjcmFuay1jb250ZW50Lm5vLWxpc3QgLmVsZWMtYnRuLCAuZWxlY3JhbmstY29udGVudC5uby1saXN0IC5uby1saXN0LWljb24sIC5lbGVjcmFuay1jb250ZW50Lm5vLWxpc3QgLmRlc2MnLCA0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5iaW5kQ2FyZEV2ZW50KSB7XG4gICAgICAgIHdpbmRvdy5iaW5kQ2FyZEV2ZW50KCQoJy5lbGVjcmFuay1oZWFkZXInKSk7XG4gICAgICAgIHdpbmRvdy5iaW5kQ2FyZEV2ZW50KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAq5YWF55S15oiQ5Yqf5ZCO5Yi35paw5o6S6KGM5qacXG4gICAgKi9cbiAgICB1cGRhdGVSYW5rOiBmdW5jdGlvbiAoc2hpZWxkSWQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmIChzaGllbGRJZCkge1xuICAgICAgICAvLyBpZih0aGlzLmN1cnJlbnRUYWIgPT0gMCl7ICAgICAgICAgIFxuICAgICAgICB0aGF0LnNoaWVsZFJlbWFyayhzaGllbGRJZCwgdGhpcy5hTGlzdHMpO1xuICAgICAgICAvLyB9ZWxzZSBpZih0aGlzLmN1cnJlbnRUYWIgPT0gMSl7XG4gICAgICAgIHRoYXQuc2hpZWxkUmVtYXJrKHNoaWVsZElkLCB0aGlzLm1MaXN0cyk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhhdC5hZGRSYW5rKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogdGhpcy5lbGVjVXJsLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGpzb25wOiAnanNvbnAnLFxuICAgICAgICAgIGFpZDogdGhpcy5nZXRBdk51bWJlcigpIHx8IDAsXG4gICAgICAgICAgbWlkOiB0aGF0Lm1pZFxuICAgICAgICB9LFxuICAgICAgICB0eXBlOiAnR0VUJ1xuICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvZGUgPT0gMCAmJiBkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLnNob3dfaW5mby5zaG93KSB7Ly91cOS4u+W3suW8gOmAmuWFheeUtSBcbiAgICAgICAgICAgIHRoYXQuZmxhc2hEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHRoYXQuZmxhc2hEYXRhICYmIHRoYXQuZmxhc2hEYXRhLmRhdGEgJiYgKHRoYXQuZmxhc2hEYXRhLmRhdGEucGljID0gd2luZG93LndiX2ltZyB8fCAnJyk7Ly/op4bpopHmkq3mlL7lrozlkI7mmL7npLrmjpLooYzmppxcbiAgICAgICAgICAgIHRoYXQuZmxhc2hEYXRhICYmIHRoYXQuZmxhc2hEYXRhLmRhdGEgJiYgKHRoYXQuZmxhc2hEYXRhLmRhdGEuc2hvdyA9IHRydWUpO1xuICAgIFxuICAgICAgICAgICAgdGhhdC5jdXJyZW50VGFiID0gMDsvL+W9k+WJjXRhYu+8jDDooajnpLrkvZzlk4HmppzvvIwx6KGo56S65pyI5qacXG4gICAgICAgICAgICB0aGF0LnRvdGFsID0gZGF0YS5kYXRhLnRvdGFsX2NvdW50Oy8v5Y6G5Y+y5oqV5ZaC5Lq65pWwXG4gICAgICAgICAgICB0aGF0LmFDb3VudCA9IGRhdGEuZGF0YS5hdl9jb3VudDsvL+S9nOWTgeaKleWWguS6uuaVsFxuICAgICAgICAgICAgdGhhdC5tQ291bnQgPSBkYXRhLmRhdGEuY291bnQ7Ly/mnKzmnIjmipXlloLkurrmlbBcbiAgICAgICAgICAgIHRoYXQuYUxpc3RzID0gZGF0YS5kYXRhLmF2X2xpc3QgfHwgW107Ly/kvZzlk4HmipXlloLmppxMaXN05pWw5o2uXG4gICAgICAgICAgICB0aGF0Lm1MaXN0cyA9IGRhdGEuZGF0YS5saXN0IHx8IFtdOy8v5pys5pyI5oqV5ZaC5qac55qEbGlzdOaVsOaNrlxuICAgICAgICAgICAgdGhhdC5hVXNlciA9IGRhdGEuZGF0YS5hdl91c2VyOy8v5L2c5ZOB5oqV5ZaC5qac5Lit55qE5oiRXG4gICAgICAgICAgICB0aGF0Lm1Vc2VyID0gZGF0YS5kYXRhLnVzZXI7Ly/mnKzmnIjmipXlloLmppzkuK3nmoTmiJFcbiAgICAgICAgICAgIHRoYXQuZGlzcGxheU51bSA9IGRhdGEuZGF0YS5kaXNwbGF5X251bTtcblxuICAgICAgICAgICAgdmFyIGVsZWNQbHVnaW4gPSB7XG4gICAgICAgICAgICAgIGdldEVsZWNEYXRhOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmZsYXNoRGF0YTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2hvd01vZGFsOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8qJC5nZXRTY3JpcHQoXCIvL3N0YXRpYy5oZHNsYi5jb20vZWxlY19wbHVnaW4vYmlsaS1xdWljay1lbGVjLmpzXCIsIGZ1bmN0aW9uKCl7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB3aW5kb3cuYmlsaVF1aWNrRWxlYyhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVJhbmsoKTtcbiAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICBtaWQ6ICAgICAgdGhhdC5taWQsXG4gICAgICAgICAgICAgICAgICAgIHVwbmFtZTogICB0aGF0LnVwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdXB1cmw6ICAgIHRoYXQudXBVcmwsXG4gICAgICAgICAgICAgICAgICAgIHVwYXZhdGFyOiB0aGF0LnVwQXZhdGFyLFxuICAgICAgICAgICAgICAgICAgICBhdmlkOiAgICAgdGhhdC5hdmlkLFxuICAgICAgICAgICAgICAgICAgICBmbGFzaDogICAgdHJ1ZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkqL1xuICAgICAgICAgICAgICAgIHRoYXQucGFuZWxSZXBvcnQoMSwzLG51bGwsMik7XG4gICAgICAgICAgICAgICAgdGhhdC5sb2dpblRvRWxlYygyKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaXNDaGFyZ2VkOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lm1Db3VudCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGlzTGFzdEF2OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cudG90YWxwYWdlICYmIHdpbmRvdy5wYWdlbm8gJiYgcGFyc2VJbnQod2luZG93LnRvdGFscGFnZSwgMTApID09PSBwYXJzZUludCh3aW5kb3cucGFnZW5vLCAxMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuZWxlY1BsdWdpbiA9IGVsZWNQbHVnaW47XG5cbiAgICAgICAgICAgIHRoYXQuYWRkUmFuaygpOy8v6buY6K6k5pi+56S65L2c5ZOB5qacXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBzaGllbGRSZW1hcms6IGZ1bmN0aW9uIChzaGllbGRJZCwgbGlzdCkge1xuICAgICAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpID49IDMpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaSA8IDMgJiYgbGlzdFtpXS5wYXlfbWlkID09IHNoaWVsZElkICYmICFsaXN0W2ldLm1zZ19kZWxldGVkKSB7XG4gICAgICAgICAgICBsaXN0W2ldLm1zZ19kZWxldGVkID0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcGFuZWxSZXBvcnQ6IGZ1bmN0aW9uIChvcHR5cGUsIGNsaWNraWQsIHZhbHVlLCBzcmMpIHtcbiAgICAgIHdpbmRvdy5yZWNfcnAgJiYgd2luZG93LnJlY19ycChcIndlYl9jaGFyZ2VfcGFuZWxcIiwge1xuICAgICAgICBwYWdldHlwZTogMSxcbiAgICAgICAgb3B0eXBlOiBvcHR5cGUsXG4gICAgICAgIHNob3dpZDogb3B0eXBlID09IDIgPyAxIDogbnVsbCxcbiAgICAgICAgY2xpY2tpZDogb3B0eXBlID09IDEgPyBjbGlja2lkIDogbnVsbCxcbiAgICAgICAgdmFsdWU6IGNsaWNraWQgPT0gMiA/IHZhbHVlIDogMCxcbiAgICAgICAgc3JjOiBzcmMvL+eCueWHu+adpea6kFxuICAgICAgfSlcbiAgICB9XG5cbiAgfTtcblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZWxlY1JhbmsgPSBuZXcgRWxlY1JhbmsoKTtcbiAgICBlbGVjUmFuay5pbml0KCk7XG4gIH0pO1xuXG59KShqUXVlcnkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZWxlYy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZWxlYy5sZXNzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbGVzcy1sb2FkZXIvZGlzdC9janMuanMhLi9lbGVjLmxlc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9sZXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2VsZWMubGVzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGUvZWxlYy5sZXNzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5jbGVhcmZpeDpiZWZvcmUsXFxuLmNsZWFyZml4OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gIGRpc3BsYXk6IHRhYmxlO1xcbn1cXG4uY2xlYXJmaXg6YWZ0ZXIge1xcbiAgY2xlYXI6IGJvdGg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIHtcXG4gIHBhZGRpbmc6IDMwcHggMCA0MHB4IDEwcHg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyLm5vIC5lbGVjcmFuay1oZWFkZXIubm8tbGlzdCB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlci5ubyAuZWxlY3JhbmstaGVhZGVyLm5vLWxpc3QgLnRvdGFsLXR4dCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBjb2xvcjogIzk5YTJhYTtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIubm8gLmVsZWNyYW5rLWhlYWRlci5uby1saXN0IC50b3RhbC1udW0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBjb2xvcjogIzZkNzU3YTtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWhlYWRlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZTVlOWVmO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDRweDtcXG4gIGhlaWdodDogODNweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWhlYWRlci5lbXB0eSB7XFxuICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWhlYWRlciAubmFtZSB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzAwYTFkNjtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IC05cHg7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDAgMTRweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWhlYWRlciAubmFtZTpob3ZlciB7XFxuICBjb2xvcjogI2YyNWQ4ZTtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWhlYWRlciAudGl0bGUge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgY29sb3I6ICMyMjI7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIG1hcmdpbi10b3A6IC0zcHg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1oZWFkZXIgLnJhbmstdGFiIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGZsb2F0OiBsZWZ0O1xcbiAgd2lkdGg6IDUwJTtcXG4gIGhlaWdodDogMjdweDtcXG4gIG1hcmdpbi10b3A6IDI4cHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgY29sb3I6ICM5OWEyYWE7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1oZWFkZXIgLnJhbmstdGFiIC5hcnItdXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IC02cHg7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IDEycHg7XFxuICBoZWlnaHQ6IDZweDtcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLy9zdGF0aWMuaGRzbGIuY29tL2ltYWdlcy9iYXNlL2ljb25zLnBuZ1xcXCIpIG5vLXJlcGVhdCAtODU2cHggLTUzOHB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstaGVhZGVyIC5yYW5rLXRhYi5hY3RpdmUge1xcbiAgY29sb3I6ICMwMGExZDY7XFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwYTFkNjtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWhlYWRlciAucmFuay10YWIuYWN0aXZlIC5hcnItdXAge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1oZWFkZXIubm8tcmVzdWx0IHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBoZWlnaHQ6IDEwM3B4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstaGVhZGVyLm5vLXJlc3VsdCAuaGlzdG9yeSB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstaGVhZGVyLm5vLXJlc3VsdCAuaGlzdG9yeSAuZGVzYyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xcbiAgY29sb3I6ICM5OWEyYWE7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1oZWFkZXIubm8tcmVzdWx0IC5oaXN0b3J5IC5udW0ge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGNvbG9yOiAjNmQ3NTdhO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstaWNvbiB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXFxcIi8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9pY29ucy5wbmdcXFwiKSBuby1yZXBlYXQgdG9wIGxlZnQ7XFxuICB3aWR0aDogMjhweDtcXG4gIGhlaWdodDogMjhweDtcXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAtNXB4O1xcbiAgei1pbmRleDogMTA7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5pY29uLWJhdHRlcnkge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTY1NnB4IC0xMzYzcHg7XFxuICBsZWZ0OiAtMjhweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmljb24tY2hhcmdlIHtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IC02NTlweCAtMTQyNnB4O1xcbiAgcmlnaHQ6IC0yMHB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCB7XFxuICBwYWRkaW5nOiAyNHB4IDAgMTJweCAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU5ZWY7XFxuICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNlNWU5ZWY7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZTVlOWVmO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICAvKiAuY29tcGFyZS1pY29ue1xcbiAgICAgICAgcG9zaXRpb246YWJzb2x1dGU7XFxuICAgICAgICB3aWR0aDoxMnB4O1xcbiAgICAgICAgaGVpZ2h0OjEycHg7XFxuICAgICAgICB0b3A6NnB4O1xcbiAgICAgICAgcmlnaHQ6MTlweDtcXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybCgvL3N0YXRpYy5oZHNsYi5jb20vaW1hZ2VzL2Jhc2UvaWNvbnMucG5nKSBuby1yZXBlYXQgLTM0NXB4IC0yMjY1cHg7XFxuICAgICAgICAmLnVweyAgICAgICAgICBcXG4gICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKC8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9pY29ucy5wbmcpIG5vLXJlcGVhdCAtMzQ1cHggLTIxMzhweDtcXG4gICAgICAgIH1cXG4gICAgICAgICYuZG93bntcXG4gICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKC8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9pY29ucy5wbmcpIG5vLXJlcGVhdCAtMzQ1cHggLTIyMDNweDtcXG5cXG4gICAgICAgIH1cXG4gICAgICB9ICovXFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0gLml0ZW0tbnVtIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAxNnB4O1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiOGMwY2M7XFxuICBjb2xvcjogI2ZmZjtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbSAuaXRlbS1hdmF0YXIge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDI0cHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBtYXJnaW4tcmlnaHQ6IDEycHg7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtIC5pdGVtLW5hbWUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGhlaWdodDogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgY29sb3I6ICMyMjI7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtIC5pdGVtLW5hbWUuaXMtdmlwIHtcXG4gIGNvbG9yOiAjZmI3Mjk5O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtIC5pdGVtLW5hbWUuaXMtdmlwOmhvdmVyIHtcXG4gIGNvbG9yOiAjZmY4ZGFlO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtIC5tc2cge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEzOHB4O1xcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xcbiAgd29yZC1icmVhazogYnJlYWstYWxsO1xcbiAgbGVmdDogODJweDtcXG4gIHRvcDogLTdweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNGY1Zjc7XFxuICBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggNHB4O1xcbiAgY29sb3I6ICM2ZDc1N2E7XFxuICBwYWRkaW5nOiA4cHggMTBweCA4cHggMTBweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbSAubXNnOmhvdmVyIC5zaGllbGQtYnRuIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBkaXNwbGF5OiBibG9ja1xcXFw5O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtIC5tc2cgLmFycm93IHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcXFwiLy9zdGF0aWMuaGRzbGIuY29tL2ltYWdlcy9iYXNlL2ljb25zLnBuZ1xcXCIpIG5vLXJlcGVhdCAtODYxcHggLTkyMnB4O1xcbiAgd2lkdGg6IDhweDtcXG4gIGhlaWdodDogOHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogLThweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbSAubXNnIC5zaGllbGQtYnRuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiA0OHB4O1xcbiAgaGVpZ2h0OiAyMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDIycHg7XFxuICB0b3A6IDUwJTtcXG4gIG1hcmdpbi10b3A6IC0xMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNmMjVkOGU7XFxuICBjb2xvcjogI2YyNWQ4ZTtcXG4gIHotaW5kZXg6IDEwO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcmlnaHQ6IDEwcHg7XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSA0MDBtcyBsaW5lYXI7XFxuICBkaXNwbGF5OiBub25lXFxcXDk7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0gLm1zZyAuc2hpZWxkLWJ0bjpob3ZlciB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMjVkOGU7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uZmlyc3QsXFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbS5zZWNvbmQsXFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbS50aGlyZCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uZmlyc3QgLmNvbXBhcmUtaWNvbixcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCAuY29tcGFyZS1pY29uLFxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0udGhpcmQgLmNvbXBhcmUtaWNvbiB7XFxuICB0b3A6IDIwcHg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uZmlyc3QgLml0ZW0tbnVtLFxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uc2Vjb25kIC5pdGVtLW51bSxcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnRoaXJkIC5pdGVtLW51bSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDI4cHg7XFxuICBsZWZ0OiAyMHB4O1xcbiAgdGV4dC1pbmRlbnQ6IC05OTk5OXB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgaGVpZ2h0OiAyNHB4O1xcbiAgd2lkdGg6IDE3cHg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uZmlyc3QgLml0ZW0tYXZhdGFyLFxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uc2Vjb25kIC5pdGVtLWF2YXRhcixcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnRoaXJkIC5pdGVtLWF2YXRhciB7XFxuICBmbG9hdDogbGVmdDtcXG4gIHdpZHRoOiA0OHB4O1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uZmlyc3QgLml0ZW0tbmFtZSxcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCAuaXRlbS1uYW1lLFxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0udGhpcmQgLml0ZW0tbmFtZSB7XFxuICBmbG9hdDogbGVmdDtcXG4gIGhlaWdodDogNTJweDtcXG4gIGxpbmUtaGVpZ2h0OiA1MnB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLmZpcnN0IC5lbGVjLW51bSxcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCAuZWxlYy1udW0sXFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbS50aGlyZCAuZWxlYy1udW0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDE5cHg7XFxuICB0b3A6IDE2cHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICBmb250LXNpemU6IDA7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uZmlyc3QgLmVsZWMtbnVtID4gc3BhbixcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCAuZWxlYy1udW0gPiBzcGFuLFxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0udGhpcmQgLmVsZWMtbnVtID4gc3BhbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogMzZweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBjb2xvcjogI2YyNWQ4ZTtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbS5maXJzdCAuZWxlYy1udW0gLmVsZWMtaWNvbixcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCAuZWxlYy1udW0gLmVsZWMtaWNvbixcXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnRoaXJkIC5lbGVjLW51bSAuZWxlYy1pY29uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGhlaWdodDogMjBweDtcXG4gIHdpZHRoOiAxNnB4O1xcbiAgbWFyZ2luLWxlZnQ6IDRweDtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcXFwiLy9zdGF0aWMuaGRzbGIuY29tL2ltYWdlcy9iYXNlL2ljb25zLnBuZ1xcXCIpIG5vLXJlcGVhdCAtNjY0cHggLTIzMjZweDtcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0uZmlyc3Qge1xcbiAgbWFyZ2luLWJvdHRvbTogMThweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbS5maXJzdCAuaXRlbS1udW0ge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFxcXCIvL3N0YXRpYy5oZHNsYi5jb20vaW1hZ2VzL2Jhc2UvaWNvbnMucG5nXFxcIikgbm8tcmVwZWF0IC02NjRweCAtMTQ5MnB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLmZpcnN0IC5pdGVtLWF2YXRhciB7XFxuICBib3JkZXI6IDJweCBzb2xpZCAjZmVkMTAxO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCB7XFxuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCAuaXRlbS1udW0ge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFxcXCIvL3N0YXRpYy5oZHNsYi5jb20vaW1hZ2VzL2Jhc2UvaWNvbnMucG5nXFxcIikgbm8tcmVwZWF0IC02NjRweCAtMTU1NnB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnNlY29uZCAuaXRlbS1hdmF0YXIge1xcbiAgYm9yZGVyOiAycHggc29saWQgI2FlYmNjYjtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLnJhbmstaXRlbS50aGlyZCB7XFxuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAucmFuay1pdGVtLnRoaXJkIC5pdGVtLW51bSB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXFxcIi8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9pY29ucy5wbmdcXFwiKSBuby1yZXBlYXQgLTY2NHB4IC0xNjIwcHg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0udGhpcmQgLml0ZW0tYXZhdGFyIHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkOWE1N2Q7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5yYW5rLWl0ZW0ubGFzdCB7XFxuICBtYXJnaW4tYm90dG9tOiAwO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudC5uby1saXN0IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBoZWlnaHQ6IDM1OHB4O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudC5uby1saXN0IC50aXRsZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvdHRvbTogMjBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIGNvbG9yOiAjNmQ3NTdhO1xcbiAgLyogLmVsZWMtYnRue1xcbiAgICAgICAgICBmb250LXNpemU6IzAwYTFkNjtcXG4gICAgICAgIH0gKi9cXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQubm8tbGlzdCAubm8tbGlzdC1pY29uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgaGVpZ2h0OiAyMTFweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFxcXCIvL3N0YXRpYy5oZHNsYi5jb20vaW1hZ2VzL2VsZWNyYW5rLWVtcHR5LnBuZ1xcXCIpIGNlbnRlciA0MXB4IG5vLXJlcGVhdDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQubm8tbGlzdCAuZGVzYyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAyMDBweDtcXG4gIG1hcmdpbjogMzBweCBhdXRvIDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMThweDtcXG4gIGNvbG9yOiAjOTlhMmFhO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudC5uby1saXN0IC5kZXNjIHNwYW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50Lm5vLWxpc3QgLmVsZWMtYnRuIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDE2MHB4O1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgbWFyZ2luOiAxNnB4IGF1dG8gMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJhY2tncm91bmQ6ICMwMGExZDY7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBsaW5lLWhlaWdodDogNDBweDtcXG4gIGNvbG9yOiAjZmZmO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstY29udGVudCAuY29tcGFyZS1pY29uLFxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1mb290ZXIgLmNvbXBhcmUtaWNvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTJweDtcXG4gIGhlaWdodDogMTJweDtcXG4gIHRvcDogNnB4O1xcbiAgcmlnaHQ6IDE5cHg7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXFxcIi8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9pY29ucy5wbmdcXFwiKSBuby1yZXBlYXQgLTM0NXB4IC0yMjY1cHg7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1jb250ZW50IC5jb21wYXJlLWljb24udXAsXFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciAuY29tcGFyZS1pY29uLnVwIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcXFwiLy9zdGF0aWMuaGRzbGIuY29tL2ltYWdlcy9iYXNlL2ljb25zLnBuZ1xcXCIpIG5vLXJlcGVhdCAtMzQ1cHggLTIxMzhweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWNvbnRlbnQgLmNvbXBhcmUtaWNvbi5kb3duLFxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1mb290ZXIgLmNvbXBhcmUtaWNvbi5kb3duIHtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50IHVybChcXFwiLy9zdGF0aWMuaGRzbGIuY29tL2ltYWdlcy9iYXNlL2ljb25zLnBuZ1xcXCIpIG5vLXJlcGVhdCAtMzQ1cHggLTIyMDNweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciB7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNHB4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNWU5ZWY7XFxuICBib3JkZXItdG9wOiBub25lO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstZm9vdGVyIC5lbGVjcmFuay11c2VyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbjogMTZweCAwO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstZm9vdGVyIC5lbGVjcmFuay11c2VyIC51c2VyLXJhbmsge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDE2cHg7XFxuICBoZWlnaHQ6IDE2cHg7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyNWQ4ZTtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciAuZWxlY3JhbmstdXNlciAudXNlci1yYW5rLnJhbmstbG9uZyB7XFxuICB3aWR0aDogMjRweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciAuZWxlY3JhbmstdXNlciAudXNlci1hdmF0YXIge1xcbiAgd2lkdGg6IDI0cHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEycHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstZm9vdGVyIC5lbGVjcmFuay11c2VyIC51c2VyLW5hbWUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IDEwMHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGhlaWdodDogMjRweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgY29sb3I6ICMyMjI7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstZm9vdGVyIC5lbGVjcmFuay11c2VyIC51c2VyLW5hbWUuaXMtdmlwIHtcXG4gIGNvbG9yOiAjZmI3Mjk5O1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstZm9vdGVyIC5lbGVjcmFuay11c2VyIC51c2VyLW5hbWUuaXMtdmlwOmhvdmVyIHtcXG4gIGNvbG9yOiAjZmY4ZGFlO1xcbn1cXG4uZWxlY3Jhbmstd3JhcHBlciAuZWxlY3JhbmstZm9vdGVyIC5lbGVjcmFuay11c2VyLm5vIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1mb290ZXIgLm5hdi13cmFwIHtcXG4gIG1hcmdpbjogMjBweCBhdXRvIDIwcHggYXV0bztcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciAubmF2LWl0ZW0ge1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kOiAjYjhjMGNjO1xcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB3aWR0aDogMTZweDtcXG4gIGhlaWdodDogMTBweDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciAubmF2LWl0ZW06aG92ZXIge1xcbiAgYmFja2dyb3VuZDogI2YyNWQ4ZTtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciAubmF2LWl0ZW0uYWN0aXZlIHtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgYmFja2dyb3VuZDogI2YyNWQ4ZTtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWZvb3RlciAubmF2LWl0ZW0ubGFzdCB7XFxuICBtYXJnaW4tcmlnaHQ6IDA7XFxufVxcbi5lbGVjcmFuay13cmFwcGVyIC5lbGVjcmFuay1lbXB0eS1jb250ZW50IHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlNWU5ZWY7XFxuICBib3JkZXItcmFkaXVzOiAwIDAgNHB4IDRweDtcXG4gIG1hcmdpbi10b3A6IC0xcHg7XFxuICBoZWlnaHQ6IDIzMHB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFxcXCIvL3N0YXRpYy5oZHNsYi5jb20vaW1hZ2VzL2VsZWNyYW5rLWVtcHR5LnBuZ1xcXCIpIGNlbnRlciAyMHB4IG5vLXJlcGVhdDtcXG59XFxuLmVsZWNyYW5rLXdyYXBwZXIgLmVsZWNyYW5rLWVtcHR5LWNvbnRlbnQgLnRpdGxlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm90dG9tOiAyMHB4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgY29sb3I6ICM2ZDc1N2E7XFxuICAvKiAuZWxlYy1idG57XFxuICAgICAgICBmb250LXNpemU6IzAwYTFkNjtcXG4gICAgICB9ICovXFxufVxcbi5lbGVjcmFuay1idG4ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcmlnaHQ6IDIwcHg7XFxuICB0b3A6IDIwcHg7XFxuICB3aWR0aDogMTMxcHg7XFxuICBoZWlnaHQ6IDM4cHg7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2YzNzA3MTtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgY29sb3I6ICNmMzcwNzE7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBsaW5lLWhlaWdodDogMzhweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBhZGRpbmctbGVmdDogMTVweDtcXG59XFxuLmVsZWNyYW5rLWJ0bi5iaXJ0aCB7XFxuICBib3JkZXItY29sb3I6ICNmMjVkOGU7XFxuICBjb2xvcjogI2YyNWQ4ZTtcXG59XFxuLmVsZWNyYW5rLWJ0bi5iaXJ0aCAuYmlydGgtdGlwcyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IC0zMHB4O1xcbiAgcmlnaHQ6IC01NXB4O1xcbiAgd2lkdGg6IDEyMnB4O1xcbiAgaGVpZ2h0OiAyNXB4O1xcbiAgY29sb3I6ICNmZmY7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxuICBmb250LXNpemU6IDEycHg7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXFxcIi8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9lbGVjLWJpcnRoLXRpcC1iZy5wbmdcXFwiKSBuby1yZXBlYXQ7XFxufVxcbi5lbGVjcmFuay1idG4gLmVsZWNyYW5rLWJnIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogLTIwcHg7XFxuICBsZWZ0OiAtNTAlO1xcbiAgbWFyZ2luLWxlZnQ6IDQwcHg7XFxuICB3aWR0aDogODBweDtcXG4gIGhlaWdodDogODBweDtcXG59XFxuLmVsZWMtc2hpZWxkIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGhlaWdodDogMTI2cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NkMGQ3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IDJweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHBhZGRpbmc6IDI0cHggMjBweCAwIDIwcHg7XFxuICB6LWluZGV4OiAxMDA7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi5lbGVjLXNoaWVsZCAuc2hpZWxkLWNsb3NlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAxMHB4O1xcbiAgdG9wOiAxMHB4O1xcbiAgd2lkdGg6IDE4cHg7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXFxcIi8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9pY29ucy5wbmdcXFwiKSBuby1yZXBlYXQgLTQ3MXB4IC01MzVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLmVsZWMtc2hpZWxkIC5zaGllbGQtY2xvc2U6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTUzNXB4IC01MzVweDtcXG59XFxuLmVsZWMtc2hpZWxkIC5zaGllbGQtdGl0bGUge1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XFxufVxcbi5lbGVjLXNoaWVsZCAuc2hpZWxkLWNvbnRlbnQge1xcbiAgY29sb3I6ICM5OWEyYWE7XFxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xcbiAgaGVpZ2h0OiAzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XFxufVxcbi5lbGVjLXNoaWVsZCAuc2hpZWxkLWJ0biB7XFxuICB3aWR0aDogNjZweDtcXG4gIGhlaWdodDogMjJweDtcXG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2QwZDc7XFxuICBjb2xvcjogIzIyMjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmVsZWMtc2hpZWxkIC5zaGllbGQtYnRuLm9rIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuLmVsZWMtc2hpZWxkIC5zaGllbGQtYnRuOmhvdmVyIHtcXG4gIGJvcmRlci1jb2xvcjogI2YyNWQ4ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMjVkOGU7XFxuICBjb2xvcjogI2ZmZjtcXG59XFxuLndpZGVzY3JlZW4gLmJpbGwtYnRuLXdyYXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcGFkZGluZy1sZWZ0OiA3M3B4O1xcbiAgcmlnaHQ6IDIyNHB4O1xcbiAgd2lkdGg6IDEyOXB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgbWFyZ2luLXRvcDogMTRweDtcXG59XFxuLndpZGVzY3JlZW4gLmJpbGwtYnRuLXdyYXAgLmJpbGwtaWNvbiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwcHg7XFxuICB0b3A6IDBweDtcXG4gIHdpZHRoOiA2NnB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgdXJsKFxcXCIvL3N0YXRpYy5oZHNsYi5jb20vaW1hZ2VzL2Jhc2UvYmlsbC02MjYtbC5qcGdcXFwiKSBuby1yZXBlYXQ7XFxufVxcbi53aWRlc2NyZWVuIC5iaWxsLWJ0bi13cmFwIC5iaWxsLWJ0biB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbi10b3A6IDEycHg7XFxuICBjb2xvcjogIzA0OTdjODtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLndpZGVzY3JlZW4gLmJpbGwtYnRuLXdyYXAgLmJpbGwtYnRuIC5hcnJvdyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tdG9wOiA0cHg7XFxuICBtYXJnaW4tbGVmdDogNnB4O1xcbiAgd2lkdGg6IDVweDtcXG4gIGhlaWdodDogMTJweDtcXG4gIGJhY2tncm91bmQ6IHVybChcXFwiLy9zdGF0aWMuaGRzbGIuY29tL2ltYWdlcy9iYXNlL2Fycm93LTYyNi5qcGdcXFwiKSBuby1yZXBlYXQ7XFxufVxcbi53aWRlc2NyZWVuIC5iaWxsLWJ0bi13cmFwIC5kZXNjIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgY29sb3I6ICM2ZDc1N2E7XFxufVxcbi5iaWxsLWJ0bi13cmFwIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHBhZGRpbmc6IDBweDtcXG4gIHJpZ2h0OiAyMDhweDtcXG4gIHdpZHRoOiAxMjlweDtcXG4gIGhlaWdodDogNjBweDtcXG4gIG1hcmdpbi10b3A6IDEzcHg7XFxufVxcbi5iaWxsLWJ0bi13cmFwIC5iaWxsLWljb24ge1xcbiAgcG9zaXRpb246IHN0YXRpYztcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDQycHg7XFxuICBoZWlnaHQ6IDM4cHg7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXFxcIi8vc3RhdGljLmhkc2xiLmNvbS9pbWFnZXMvYmFzZS9iaWxsLTYyNi1zLmpwZ1xcXCIpIG5vLXJlcGVhdDtcXG59XFxuLmJpbGwtYnRuLXdyYXAgLmJpbGwtYnRuIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiAwcHg7XFxuICBjb2xvcjogIzA0OTdjODtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLmJpbGwtYnRuLXdyYXAgLmJpbGwtYnRuIC5hcnJvdyB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgLyogIG1hcmdpbi10b3A6NHB4O1xcbiAgICAgIHdpZHRoOjVweDtcXG4gICAgICBoZWlnaHQ6MTJweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOnJlZDsgKi9cXG59XFxuLmJpbGwtYnRuLXdyYXAgLmRlc2Mge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIhLi9+L2xlc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3JjL3N0eWxlL2VsZWMubGVzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXNlU291cmNlTWFwKSB7XG5cdHZhciBsaXN0ID0gW107XG5cblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmV0dXJuIFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgY29udGVudCArIFwifVwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSkuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcblx0dmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnO1xuXHR2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cdGlmICghY3NzTWFwcGluZykge1xuXHRcdHJldHVybiBjb250ZW50O1xuXHR9XG5cblx0aWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuXHRcdHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0XHRyZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKCdcXG4nKTtcblx0fVxuXG5cdHJldHVybiBbY29udGVudF0uam9pbignXFxuJyk7XG59XG5cbi8vIEFkYXB0ZWQgZnJvbSBjb252ZXJ0LXNvdXJjZS1tYXAgKE1JVClcbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuXHR2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuXG5cdHJldHVybiAnLyojICcgKyBkYXRhICsgJyAqLyc7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBmbi5jYWxsKHRoaXMsIHNlbGVjdG9yKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWVtb1tzZWxlY3Rvcl1cblx0fTtcbn0pKGZ1bmN0aW9uICh0YXJnZXQpIHtcblx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KVxufSk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIkQ6XFxcXFdvcmtzcGFjZVxcXFxjaGFyZ2VcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJlbGVjcmFuay1idG5cXFwiPjxkaXYgY2xhc3M9XFxcImVsZWNyYW5rLWJnXFxcIj48L2Rpdj48c3Bhbj7kuLpUQeWFheeUtTwvc3Bhbj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qYWRlL3JhbmtCdG5UcGwuamFkZVxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGphZGVfZW5jb2RlX2h0bWxfcnVsZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7J1xufTtcbnZhciBqYWRlX21hdGNoX2h0bWwgPSAvWyY8PlwiXS9nO1xuXG5mdW5jdGlvbiBqYWRlX2VuY29kZV9jaGFyKGMpIHtcbiAgcmV0dXJuIGphZGVfZW5jb2RlX2h0bWxfcnVsZXNbY10gfHwgYztcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBqYWRlX2VzY2FwZTtcbmZ1bmN0aW9uIGphZGVfZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpLnJlcGxhY2UoamFkZV9tYXRjaF9odG1sLCBqYWRlX2VuY29kZV9jaGFyKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vamFkZS9saWIvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBmcyAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGphZGUgPSByZXF1aXJlKFwiRDpcXFxcV29ya3NwYWNlXFxcXGNoYXJnZVxcXFxub2RlX21vZHVsZXNcXFxcamFkZVxcXFxsaWJcXFxccnVudGltZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKGFDb3VudCwgY3VycmVudFRhYiwgbUNvdW50LCBtaWQsIHRvdGFsLCB1cE5hbWUsIHVwVXJsKSB7XG5pZiAobUNvdW50ID4gMCB8fCBhQ291bnQgPiAwKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJlbGVjcmFuay13cmFwcGVyXFxcIj48ZGl2IGNsYXNzPVxcXCJlbGVjcmFuay1oZWFkZXJcXFwiPjxhXCIgKyAoamFkZS5hdHRyKFwiaHJlZlwiLCB1cFVybCwgdHJ1ZSwgdHJ1ZSkpICsgXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXCIgKyAoamFkZS5hdHRyKFwiY2FyZFwiLCB1cE5hbWUsIHRydWUsIHRydWUpKSArIChqYWRlLmF0dHIoXCJtaWRcIiwgbWlkLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwibmFtZVxcXCI+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSAodXBOYW1lLmxlbmd0aCA+IDggPyB1cE5hbWUuc2xpY2UoMCwgNykgKyAn4oCmJyA6IHVwTmFtZSkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjxkaXYgY2xhc3M9XFxcImVsZWNyYW5rLWljb24gaWNvbi1iYXR0ZXJ5XFxcIj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJlbGVjcmFuay1pY29uIGljb24tY2hhcmdlXFxcIj48L2Rpdj48L2E+PGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3Bhbj7ljoblj7LlhYXnlLXkurrmlbDvvJo8L3NwYW4+PHNhcG4+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSB0b3RhbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zYXBuPjxzcGFuPuS6ujwvc3Bhbj48L2Rpdj48ZGl2IGRhdGEtdGFiPScwJ1wiICsgKGphZGUuY2xzKFsncmFuay10YWInLGN1cnJlbnRUYWI9PTA/J2FjdGl2ZSc6JyddLCBbbnVsbCx0cnVlXSkpICsgXCI+PHNwYW4+5pys5L2c5ZOB5YWF55S1KDwvc3Bhbj48c3Bhbj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGFDb3VudCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPjxzcGFuPuS6uik8L3NwYW4+PGkgY2xhc3M9XFxcImFyci11cFxcXCI+PC9pPjwvZGl2PjxkaXYgZGF0YS10YWI9JzEnXCIgKyAoamFkZS5jbHMoWydyYW5rLXRhYicsY3VycmVudFRhYj09MT8nYWN0aXZlJzonJ10sIFtudWxsLHRydWVdKSkgKyBcIj48c3Bhbj7mnKzmnIjmiYDmnInlhYXnlLUoPC9zcGFuPjxzcGFuPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbUNvdW50KSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PHNwYW4+5Lq6KTwvc3Bhbj48aSBjbGFzcz1cXFwiYXJyLXVwXFxcIj48L2k+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO1xufVxuZWxzZVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJlbGVjcmFuay13cmFwcGVyIG5vXFxcIj48ZGl2IGNsYXNzPVxcXCJlbGVjcmFuay1oZWFkZXIgbm8tbGlzdFxcXCI+PGFcIiArIChqYWRlLmF0dHIoXCJocmVmXCIsIHVwVXJsLCB0cnVlLCB0cnVlKSkgKyBcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCJcIiArIChqYWRlLmF0dHIoXCJjYXJkXCIsIHVwTmFtZSwgdHJ1ZSwgdHJ1ZSkpICsgKGphZGUuYXR0cihcIm1pZFwiLCBtaWQsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJuYW1lXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9ICh1cE5hbWUubGVuZ3RoID4gOCA/IHVwTmFtZS5zbGljZSgwLCA3KSArICfigKYnIDogdXBOYW1lKSkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPGRpdiBjbGFzcz1cXFwiZWxlY3JhbmstaWNvbiBpY29uLWJhdHRlcnlcXFwiPjwvZGl2PjxkaXYgY2xhc3M9XFxcImVsZWNyYW5rLWljb24gaWNvbi1jaGFyZ2VcXFwiPjwvZGl2PjwvYT48ZGl2IGNsYXNzPVxcXCJ0aXRsZVxcXCI+PHNwYW4+5pyI5YWF55S15qacPC9zcGFuPjxzcGFuIGNsYXNzPVxcXCJ0b3RhbC10eHRcXFwiPuWOhuWPsuWFheeUteS6uuaVsDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwidG90YWwtbnVtXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHRvdGFsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZWxlY3JhbmstY29udGVudCBuby1saXN0XFxcIj48YSBjbGFzcz1cXFwibm8tbGlzdC1pY29uXFxcIj48L2E+PGEgY2xhc3M9XFxcImRlc2NcXFwiPiA8c3Bhbj7mnKzmnIjov5jmnKjmnInkurrkuLpVUOS4u+WFheeUtTwvc3Bhbj48c3Bhbj7orqnmiJHmnaXmiJDkuLrnrKzkuIDkuKrlhYXnlLXkvqDlkKd+PC9zcGFuPjwvYT48YSBocmVmPVxcXCJqYXZhc2NyaXB0OjtcXFwiIGNsYXNzPVxcXCJlbGVjLWJ0blxcXCI+5YWF55S1PC9hPjwvZGl2PjwvZGl2PlwiKTtcbn19LmNhbGwodGhpcyxcImFDb3VudFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguYUNvdW50OnR5cGVvZiBhQ291bnQhPT1cInVuZGVmaW5lZFwiP2FDb3VudDp1bmRlZmluZWQsXCJjdXJyZW50VGFiXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5jdXJyZW50VGFiOnR5cGVvZiBjdXJyZW50VGFiIT09XCJ1bmRlZmluZWRcIj9jdXJyZW50VGFiOnVuZGVmaW5lZCxcIm1Db3VudFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubUNvdW50OnR5cGVvZiBtQ291bnQhPT1cInVuZGVmaW5lZFwiP21Db3VudDp1bmRlZmluZWQsXCJtaWRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm1pZDp0eXBlb2YgbWlkIT09XCJ1bmRlZmluZWRcIj9taWQ6dW5kZWZpbmVkLFwidG90YWxcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnRvdGFsOnR5cGVvZiB0b3RhbCE9PVwidW5kZWZpbmVkXCI/dG90YWw6dW5kZWZpbmVkLFwidXBOYW1lXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51cE5hbWU6dHlwZW9mIHVwTmFtZSE9PVwidW5kZWZpbmVkXCI/dXBOYW1lOnVuZGVmaW5lZCxcInVwVXJsXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51cFVybDp0eXBlb2YgdXBVcmwhPT1cInVuZGVmaW5lZFwiP3VwVXJsOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvamFkZS9yYW5rVHBsMi5qYWRlXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqYWRlID0gcmVxdWlyZShcIkQ6XFxcXFdvcmtzcGFjZVxcXFxjaGFyZ2VcXFxcbm9kZV9tb2R1bGVzXFxcXGphZGVcXFxcbGliXFxcXHJ1bnRpbWUuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChkaXNwbGF5TnVtLCBsaXN0cywgbGlzdHNMZW4sIHByb21wdDEsIHByb21wdDIsIHVzZXJJZCkge1xuaWYgKGxpc3RzTGVuPjApXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImVsZWNyYW5rLWNvbnRlbnRcXFwiPjx1bD5cIik7XG5mb3IgKHZhciBpID0gMCwgbGVuID0gKGxpc3RzLmxlbmd0aCA+IDMwID8gMzAgOiBsaXN0cy5sZW5ndGgpOyBpIDwgbGVuOyBpKyspXG57XG5idWYucHVzaChcIjxsaVwiICsgKGphZGUuY2xzKFsncmFuay1pdGVtJyxpID09PSAwID8gJ2ZpcnN0JyA6IGkgPT09IDEgPyAnc2Vjb25kJyA6IGkgPT09IDIgPyAndGhpcmQnIDogJycsaSA9PT0gbGVuIC0xID8gJ2xhc3QnIDogKGkgKyAxKSAlIDEwID09PSAwID8gJ2xhc3QnOiAnJ10sIFtudWxsLHRydWUsdHJ1ZV0pKSArIFwiPjxkaXY+PHNwYW4gY2xhc3M9XFxcIml0ZW0tbnVtXFxcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IGkgKyAxKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PGFcIiArIChqYWRlLmF0dHIoXCJocmVmXCIsICcvL3NwYWNlLmJpbGliaWxpLmNvbS8nICsgbGlzdHNbaV0ucGF5X21pZCwgdHJ1ZSwgdHJ1ZSkpICsgXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXCIgKyAoamFkZS5hdHRyKFwiY2FyZFwiLCBsaXN0c1tpXS51bmFtZSwgdHJ1ZSwgdHJ1ZSkpICsgKGphZGUuYXR0cihcIm1pZFwiLCBsaXN0c1tpXS5wYXlfbWlkLCB0cnVlLCB0cnVlKSkgKyBcIj48aW1nXCIgKyAoamFkZS5hdHRyKFwic3JjXCIsIGxpc3RzW2ldLmF2YXRhci5yZXBsYWNlKC9odHRwOi9pLCAnJyksIHRydWUsIHRydWUpKSArIChqYWRlLmF0dHIoXCJhbHRcIiwgbGlzdHNbaV0udW5hbWUsIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJpdGVtLWF2YXRhclxcXCI+PC9hPjxhXCIgKyAoamFkZS5hdHRyKFwiaHJlZlwiLCAnLy9zcGFjZS5iaWxpYmlsaS5jb20vJyArIGxpc3RzW2ldLnBheV9taWQsIHRydWUsIHRydWUpKSArIFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIlwiICsgKGphZGUuYXR0cihcImNhcmRcIiwgbGlzdHNbaV0udW5hbWUsIHRydWUsIHRydWUpKSArIChqYWRlLmF0dHIoXCJtaWRcIiwgbGlzdHNbaV0ucGF5X21pZCwgdHJ1ZSwgdHJ1ZSkpICsgKGphZGUuY2xzKFsnaXRlbS1uYW1lJyxsaXN0c1tpXS52aXBfaW5mbyAmJiBsaXN0c1tpXS52aXBfaW5mby52aXBUeXBlPT0yICYmIGxpc3RzW2ldLnZpcF9pbmZvLnZpcFN0YXR1cyA9PSAxPydpcy12aXAnOicnXSwgW251bGwsdHJ1ZV0pKSArIFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gKGxpc3RzW2ldLnVuYW1lICYmIGxpc3RzW2ldLnVuYW1lLmxlbmd0aCA+IDE0ID8gbGlzdHNbaV0udW5hbWUuc2xpY2UoMCwgMTMpICsgJ+KApicgOiBsaXN0c1tpXS51bmFtZSkpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT48L2Rpdj5cIik7XG5pZiAoaSA8IDMgJiYgZGlzcGxheU51bSlcbntcbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiZWxlYy1udW1cXFwiPjxzcGFuXCIgKyAoamFkZS5hdHRyKFwidGl0bGVcIiwgbGlzdHNbaV0uZWxlY19udW0sIHRydWUsIHRydWUpKSArIFwiPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gbGlzdHNbaV0uZWxlY19udW0/bGlzdHNbaV0uZWxlY19udW0udG9GaXhlZCgwKTonLS0nKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PGkgY2xhc3M9XFxcImVsZWMtaWNvblxcXCI+PC9pPjwvZGl2PlwiKTtcbn1cbmVsc2VcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2NvbXBhcmUtaWNvbicsbGlzdHNbaV0udHJlbmRfdHlwZT09MD8nJzpsaXN0c1tpXS50cmVuZF90eXBlPT0xPyd1cCc6J2Rvd24nXSwgW251bGwsdHJ1ZV0pKSArIFwiPjwvaT5cIik7XG59XG5pZiAoaSA8IDMgJiYgIWxpc3RzW2ldLm1zZ19kZWxldGVkICYmIGxpc3RzW2ldLm1lc3NhZ2UgJiYgbGlzdHNbaV0ubWVzc2FnZS5sZW5ndGggPiAwKVxue1xuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5hdHRyKFwiZGF0YS1pZFwiLCBsaXN0c1tpXS5wYXlfbWlkLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwibXNnXFxcIj48c3Bhbj5cIiArIChudWxsID09IChqYWRlX2ludGVycCA9IGxpc3RzW2ldLm1lc3NhZ2UpID8gXCJcIiA6IGphZGVfaW50ZXJwKSArIFwiPC9zcGFuPjxpIGNsYXNzPVxcXCJhcnJvd1xcXCI+PC9pPlwiKTtcbmlmIChsaXN0c1tpXS5taWQgPT0gdXNlcklkKVxuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5hdHRyKFwiZGF0YS1pZFwiLCBsaXN0c1tpXS5wYXlfbWlkLCB0cnVlLCB0cnVlKSkgKyAoamFkZS5hdHRyKFwiZGF0YS1taWRcIiwgdXNlcklkLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwic2hpZWxkLWJ0blxcXCI+5bGP6JS9PC9kaXY+PC9kaXY+XCIpO1xufVxuYnVmLnB1c2goXCI8L2xpPlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPC91bD48L2Rpdj5cIik7XG59XG5lbHNlXG57XG5idWYucHVzaChcIjxkaXYgY2xhc3M9XFxcImVsZWNyYW5rLWNvbnRlbnQgbm8tbGlzdFxcXCI+PGEgY2xhc3M9XFxcIm5vLWxpc3QtaWNvblxcXCI+PC9hPjxhIGNsYXNzPVxcXCJkZXNjXFxcIj4gPHNwYW4+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBwcm9tcHQxKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PHNwYW4+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSBwcm9tcHQyKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L3NwYW4+PC9hPjxhIGhyZWY9XFxcImphdmFzY3JpcHQ6O1xcXCIgY2xhc3M9XFxcImVsZWMtYnRuXFxcIj7lhYXnlLU8L2E+PC9kaXY+XCIpO1xufX0uY2FsbCh0aGlzLFwiZGlzcGxheU51bVwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguZGlzcGxheU51bTp0eXBlb2YgZGlzcGxheU51bSE9PVwidW5kZWZpbmVkXCI/ZGlzcGxheU51bTp1bmRlZmluZWQsXCJsaXN0c1wiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGlzdHM6dHlwZW9mIGxpc3RzIT09XCJ1bmRlZmluZWRcIj9saXN0czp1bmRlZmluZWQsXCJsaXN0c0xlblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGlzdHNMZW46dHlwZW9mIGxpc3RzTGVuIT09XCJ1bmRlZmluZWRcIj9saXN0c0xlbjp1bmRlZmluZWQsXCJwcm9tcHQxXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5wcm9tcHQxOnR5cGVvZiBwcm9tcHQxIT09XCJ1bmRlZmluZWRcIj9wcm9tcHQxOnVuZGVmaW5lZCxcInByb21wdDJcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLnByb21wdDI6dHlwZW9mIHByb21wdDIhPT1cInVuZGVmaW5lZFwiP3Byb21wdDI6dW5kZWZpbmVkLFwidXNlcklkXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC51c2VySWQ6dHlwZW9mIHVzZXJJZCE9PVwidW5kZWZpbmVkXCI/dXNlcklkOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvamFkZS9yYW5rTGlzdC5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJEOlxcXFxXb3Jrc3BhY2VcXFxcY2hhcmdlXFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoT2JqZWN0LCBsaXN0c0xlbiwgbmF2TnVtLCB1c2VyKSB7XG5pZihsaXN0c0xlbiA+IDAgJiYgKHVzZXIgJiYgT2JqZWN0LmtleXModXNlcikubGVuZ3RoPjAgfHwgbmF2TnVtPjEpKVxue1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJlbGVjcmFuay1mb290ZXJcXFwiPlwiKTtcbmlmICh1c2VyICYmIE9iamVjdC5rZXlzKHVzZXIpLmxlbmd0aD4wKVxue1xuYnVmLnB1c2goXCI8ZGl2XCIgKyAoamFkZS5jbHMoWydlbGVjcmFuay11c2VyJyx1c2VyLnJhbms+MTA/Jyc6J25vJ10sIFtudWxsLHRydWVdKSkgKyBcIj48c3BhblwiICsgKGphZGUuY2xzKFsndXNlci1yYW5rJyx1c2VyLnJhbms+PTEwMD8ncmFuay1sb25nJzonJ10sIFtudWxsLHRydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHVzZXIucmFuaz45OTk/OTk5OnVzZXIucmFuaykgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9zcGFuPjxhXCIgKyAoamFkZS5hdHRyKFwiaHJlZlwiLCAnLy9zcGFjZS5iaWxpYmlsaS5jb20vJyArIHVzZXIucGF5X21pZCwgdHJ1ZSwgdHJ1ZSkpICsgXCIgdGFyZ2V0PVxcXCJfYmxhbmtcXFwiXCIgKyAoamFkZS5hdHRyKFwiY2FyZFwiLCB1c2VyLnVuYW1lLCB0cnVlLCB0cnVlKSkgKyAoamFkZS5hdHRyKFwibWlkXCIsIHVzZXIucGF5X21pZCwgdHJ1ZSwgdHJ1ZSkpICsgXCI+PGltZ1wiICsgKGphZGUuYXR0cihcInNyY1wiLCB1c2VyLmF2YXRhciwgdHJ1ZSwgdHJ1ZSkpICsgKGphZGUuYXR0cihcImFsdFwiLCB1c2VyLnVuYW1lLCB0cnVlLCB0cnVlKSkgKyBcIiBjbGFzcz1cXFwidXNlci1hdmF0YXJcXFwiPjwvYT48YVwiICsgKGphZGUuYXR0cihcImhyZWZcIiwgJy8vc3BhY2UuYmlsaWJpbGkuY29tLycgKyB1c2VyLnBheV9taWQsIHRydWUsIHRydWUpKSArIFwiIHRhcmdldD1cXFwiX2JsYW5rXFxcIlwiICsgKGphZGUuYXR0cihcImNhcmRcIiwgdXNlci51bmFtZSwgdHJ1ZSwgdHJ1ZSkpICsgKGphZGUuYXR0cihcIm1pZFwiLCB1c2VyLnBheV9taWQsIHRydWUsIHRydWUpKSArIChqYWRlLmNscyhbJ3VzZXItbmFtZScsdXNlci52aXBfaW5mbyAmJiB1c2VyLnZpcF9pbmZvLnZpcFR5cGU9PTIgJiYgdXNlci52aXBfaW5mby52aXBTdGF0dXMgPT0gMT8naXMtdmlwJzonJ10sIFtudWxsLHRydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHVzZXIudW5hbWUpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvYT5cIik7XG5pZiAodXNlci50cmVuZF90eXBlID09IDAgfHwgdXNlci50cmVuZF90eXBlID09IDEgfHwgdXNlci50cmVuZF90eXBlID09MilcbntcbmJ1Zi5wdXNoKFwiPGlcIiArIChqYWRlLmNscyhbJ2NvbXBhcmUtaWNvbicsdXNlci50cmVuZF90eXBlPT0wPycnOnVzZXIudHJlbmRfdHlwZT09MT8ndXAnOidkb3duJ10sIFtudWxsLHRydWVdKSkgKyBcIj48L2k+XCIpO1xufVxuYnVmLnB1c2goXCI8L2Rpdj5cIik7XG59XG5pZiAobmF2TnVtID4gMSkgIFxue1xuYnVmLnB1c2goXCI8dWxcIiArIChqYWRlLmF0dHIoXCJzdHlsZVwiLCBcIndpZHRoOiBcIiArICgobmF2TnVtIC0gMSkgKiAxNiArIChuYXZOdW0gLTEpICogNiArIDMwICsgJ3B4JyksIHRydWUsIHRydWUpKSArIFwiIGNsYXNzPVxcXCJuYXYtd3JhcCBjbGVhcmZpeFxcXCI+XCIpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCBuYXZOdW07IGkrKylcbntcbmJ1Zi5wdXNoKFwiPGxpXCIgKyAoamFkZS5hdHRyKFwiZGF0YS1pZHhcIiwgaSwgdHJ1ZSwgdHJ1ZSkpICsgKGphZGUuY2xzKFsnbmF2LWl0ZW0nLGkgPT09IDAgPyAnYWN0aXZlJyA6IGkgPT09IG5hdk51bSAtIDEgPyAnbGFzdCcgOiAnJ10sIFtudWxsLHRydWVdKSkgKyBcIj48L2xpPlwiKTtcbn1cbmJ1Zi5wdXNoKFwiPC91bD5cIik7XG59XG5idWYucHVzaChcIjwvZGl2PlwiKTtcbn19LmNhbGwodGhpcyxcIk9iamVjdFwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGguT2JqZWN0OnR5cGVvZiBPYmplY3QhPT1cInVuZGVmaW5lZFwiP09iamVjdDp1bmRlZmluZWQsXCJsaXN0c0xlblwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgubGlzdHNMZW46dHlwZW9mIGxpc3RzTGVuIT09XCJ1bmRlZmluZWRcIj9saXN0c0xlbjp1bmRlZmluZWQsXCJuYXZOdW1cIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hdk51bTp0eXBlb2YgbmF2TnVtIT09XCJ1bmRlZmluZWRcIj9uYXZOdW06dW5kZWZpbmVkLFwidXNlclwiIGluIGxvY2Fsc19mb3Jfd2l0aD9sb2NhbHNfZm9yX3dpdGgudXNlcjp0eXBlb2YgdXNlciE9PVwidW5kZWZpbmVkXCI/dXNlcjp1bmRlZmluZWQpKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2phZGUvcmFua0Zvb3Rlci5qYWRlXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJEOlxcXFxXb3Jrc3BhY2VcXFxcY2hhcmdlXFxcXG5vZGVfbW9kdWxlc1xcXFxqYWRlXFxcXGxpYlxcXFxydW50aW1lLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdiBjbGFzcz1cXFwiZWxlYy1zaGllbGRcXFwiPjxkaXYgY2xhc3M9XFxcInNoaWVsZC1jbG9zZVxcXCI+PC9kaXY+PGRpdiBjbGFzcz1cXFwic2hpZWxkLXRpdGxlXFxcIj7noa7lrpropoHlsY/olL3lkJfvvJ88L2Rpdj48ZGl2IGNsYXNzPVxcXCJzaGllbGQtY29udGVudFxcXCI+5bGP6JS96L+Z5Liq55WZ6KiA5ZCO77yM5pys5pyI5YaF6L+Z5Liq55So5oi357uZ5oKo55qE5YWF55S155WZ6KiA5YW25LuW55So5oi35YaN5Lmf55yL5LiN5Yiw5LqGPC9kaXY+PGRpdiBjbGFzcz1cXFwic2hpbGVkLWJ0bi13cnBcXFwiPjxkaXYgY2xhc3M9XFxcInNoaWVsZC1idG4gb2tcXFwiPuWxj+iUvTwvZGl2PjxkaXYgY2xhc3M9XFxcInNoaWVsZC1idG4gY2FuY2VsXFxcIj7lj5bmtog8L2Rpdj48L2Rpdj48L2Rpdj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qYWRlL3JhbmtTaGllbGQuamFkZVxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==