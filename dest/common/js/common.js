(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var COMMON = COMMON || {};

(function ($) {
  'use strict';

  COMMON.breakpoint = 767;
  COMMON.MediaQueries = '(max-width:767px)';
  var nowDevice, oldDevice;
  var html = document.documentElement;

  if (/\bAndroid\b/.test(navigator.userAgent)) {
    html.classList.add('android');

    if (/\bAndroid\s4\b/.test(navigator.userAgent)) {
      html.classList.add('android4');
    }
  }

  if (/\bi(?:Phone|Pad)\b/.test(navigator.userAgent)) {
    html.classList.add('ios');
  }

  if (/\b(?:MSIE|Trident)\b/.test(navigator.userAgent)) {
    html.classList.add('msie');
  } else if (/\bEdge\b/.test(navigator.userAgent)) {
    html.classList.add('msedge');
  } else if (/\bAppleWebKit\b/.test(navigator.userAgent)) {
    html.classList.add('webkit');

    if (/\bChrome\b/.test(navigator.userAgent)) {
      html.classList.add('chrome');
    } else if (/\bSafari\b/.test(navigator.userAgent)) {
      html.classList.add('safari');
    }
  } else if (/\bGecko\b/.test(navigator.userAgent)) {
    html.classList.add('gecko');
  }

  if ('ontouchstart' in document && 'orientation' in window) {
    html.classList.add('touchDevice');
  }
  /* ----------------------------------------------------------
      get Device
    ---------------------------------------------------------- */


  COMMON.get = {
    device: null,
    setDevice: function setDevice() {
      if (window.matchMedia(COMMON.MediaQueries).matches) {
        this.device = 'sp';
      } else {
        this.device = 'pc';
      }
    }
  };
  /* ----------------------------------------------------------
    smoothScroll
  ---------------------------------------------------------- */

  COMMON.smoothScroll = {
    emt: {
      $btn: $('.js-page-anchor')
    },
    init: function init() {
      var $btn = COMMON.smoothScroll.emt.$btn;

      if ($btn.length) {
        $btn.on('click', function (e) {
          e.preventDefault();
          var $this = $(this),
              adjust_height = $this.attr('data-adjust-height') ? $this.data('adjust-height') : 0,
              nav_height = $('.js-fixed-nav').length ? $('.js-fixed-nav').outerHeight() : 0,
              $target_el = $('#' + $this.data('target-scroll')),
              target_hei = $target_el.offset().top - adjust_height - nav_height;

          if ($this.closest('.p-modal').length) {
            // modal内のアンカーリンクの場合も
            var target_pos = $this.closest('.p-modal').find('#' + $this.data('target-scroll')).position(),
                padding_top = 54; // modal内のスクロール位置によって、プラスする値を変える

            if ($this.closest('.p-modal-content').scrollTop() > 0) {
              var adjust_pos = $this.closest('.p-modal-content').scrollTop();
              $this.closest('.p-modal-content').animate({
                scrollTop: target_pos.top + adjust_pos - padding_top
              });
            } else {
              $this.closest('.p-modal-content').animate({
                scrollTop: target_pos.top - padding_top
              });
            }
          } else {
            // 通常
            $('html, body').animate({
              scrollTop: target_hei
            });
          }
        });
      }
    }
  };
  /* ----------------------------------------------------------
    pageTopCtrl
  ---------------------------------------------------------- */

  COMMON.pageTopCtrl = {
    emt: {
      $tgt_el: $('.p-fixed-view'),
      $start_el: $('.l-header')
    },
    init: function init() {
      var $tgt_el = COMMON.pageTopCtrl.emt.$tgt_el,
          $start_el = COMMON.pageTopCtrl.emt.$start_el;

      if ($tgt_el.length === 0 || $start_el.length === 0) {
        return;
      }

      var state = null,
          pos_class = null;
      viewCtrl($tgt_el, $start_el);
      $(window).on('scroll', function () {
        viewCtrl($tgt_el, $start_el);
      });

      function viewCtrl(_el, _start) {
        var scroll_top = document.documentElement.scrollTop || document.body.scrollTop,
            start_pos = _start.offset().top + _start.outerHeight();

        if (scroll_top > start_pos) {
          if (state === 'duration') return;
          state = 'duration';

          _el.fadeIn(200);
        } else {
          if (state === 'top') return;
          state = 'top';

          _el.fadeOut(200);
        }
      }
    }
  };
  /* ----------------------------------------------------------
    modal
  ---------------------------------------------------------- */

  COMMON.modalCtrl = {
    emt: {
      $btn: $('.js-modal-trig')
    },
    opts: {
      bgSpeed: 200,
      // オーバーレイの表示速度
      contentSpeed: 300 // モーダルの表示速度

    },
    init: function init() {
      var $trig = COMMON.modalCtrl.emt.$btn;

      if ($trig.length) {
        var bgSpeed = COMMON.modalCtrl.opts.bgSpeed,
            contentSpeed = COMMON.modalCtrl.opts.contentSpeed,
            scrollY;
        var $win = $(window),
            $html = $('html'),
            $body = $('body');
        window.addEventListener('scroll', function () {
          document.documentElement.style.setProperty('--scroll-y', "".concat(window.scrollY, "px"));
        }, false); // モダールを開く

        var _openModal = function _openModal($target) {
          $target.addClass('is-open').fadeIn(contentSpeed);
          return false;
        }; // モーダルを閉じる


        var _closeModal = function _closeModal() {
          $('.js-modal').fadeOut(contentSpeed, function () {
            $(this).removeClass('is-open');
          });
          return false;
        }; // 閉じるボタン


        $('.js-close-modal').off('click').on('click', function (e) {
          e.preventDefault();

          var _y = scrollY.slice(0, -2);

          $body.attr({
            style: ''
          });
          $('html, body').prop({
            scrollTop: 0 - _y
          });

          _closeModal();

          return false;
        });
        $('.js-content-modal').on('click', function (e) {
          e.stopPropagation();
        });
        $trig.each(function (index) {
          var $content = $('#' + $(this).data('modal-open'));

          if ($content.length > 0) {
            $('[data-modal-open=' + $(this).data('modal-open') + ']').off('click').on('click', function (e) {
              e.preventDefault();

              var _self = $(this);

              $html.css('overflow-y', 'scroll');

              if (navigator.userAgent.match(/Trident\/7\./)) {
                _self.current_scroll_top = document.documentElement.scrollTop;
                scrollY = "-".concat(_self.current_scroll_top, "px");
              } else {
                scrollY = "-".concat(document.documentElement.style.getPropertyValue('--scroll-y'));
              }

              $body.css({
                'position': 'fixed',
                'top': scrollY,
                'width': '100%'
              });
              setTimeout(function () {
                _openModal($content);
              }, 200);
              return false;
            });
          }
        });
      }
    }
  };
  /* ----------------------------------------------------------
     accordion
   ---------------------------------------------------------- */

  COMMON.accordion = {
    init: function init() {
      var speed = 300;
      $('.js-accordion').each(function () {
        var hash = location.hash;
        var id = '#' + $(this).attr('id');

        if (id == hash) {
          $(this).removeClass('is-close');
          $(this).addClass('is-open');
        }
      });
      $('.js-accordion-trigger').each(function () {
        var $elem = $(this).closest('.js-accordion');
        var $trigger = $(this);

        var func = function func() {
          $elem.find('.js-accordion-body').slideToggle(speed);

          if ($elem.hasClass('is-open')) {
            $elem.removeClass('is-open');
            $elem.addClass('is-close');
          } else {
            $elem.removeClass('is-close');
            $elem.addClass('is-open');
          }

          return false;
        };

        $trigger.on('click', func);
      });
    }
  };
  COMMON.slider = {
    emt: {
      $tgt_el: $('.js-slider')
    },
    init: function init() {
      var $trig = COMMON.slider.emt.$tgt_el;
      $trig.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 700,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        pauseOnFocus: false,
        pauseOnDotsHover: false,
        customPaging: function customPaging(slick, index) {
          return '<a>' + $(slick.$slides[index]).find('.slide').attr('title') + '</a>';
        }
      });
    }
  };
  /* --------------- call --------------- */

  window.addEventListener('load', function () {
    COMMON.get.setDevice();
    COMMON.pageTopCtrl.init();
    COMMON.smoothScroll.init();
    COMMON.accordion.init();
    COMMON.modalCtrl.init();
    COMMON.slider.init();
  });
  window.addEventListener('resize', function () {
    var timer = false;
    timer = setTimeout(function () {
      COMMON.get.setDevice();
      nowDevice = COMMON.get.device;

      if (COMMON.get.device != oldDevice) {
        // matchMedia が 切り替わったら実行
        oldDevice = nowDevice;
        COMMON.pageTopCtrl.init();
        COMMON.smoothScroll.init(); // COMMON.accordion.init();

        COMMON.modalCtrl.init();
      }
    }, 200);
  });
})(jQuery);

},{}]},{},[1]);
