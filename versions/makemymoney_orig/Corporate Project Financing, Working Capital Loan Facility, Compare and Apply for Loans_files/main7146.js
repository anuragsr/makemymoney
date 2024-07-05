/*Variables declaration starts */
var current_menu_item = '';
//var planslideHeight;
var $baseurl = ''; //'http://idfapi.cabem.com';
var originalurl;
var $href;
var History = window.History;
var StateIndex = 0;
var isHome = false;
var $href_id = '';
var bHistoryIndex = 0;
var pointHeight = 0,
  ppcImg = 0,
  ppcImgTop = 0,
  ppcInHeight = 0,
  pointContHeight = 0,
  ppcInTop = 0;
var tabindex = 10;
var step2 = false;
var funnelStep2Email = ""; /*Variables declaration starts */
$(function() {
  function cleanhref(href) {
    var shorthref = href.substr(href.lastIndexOf("/") + 1, href.length).toLowerCase();
    var qmark = shorthref.indexOf("?");
    shorthref = shorthref.substr(0, qmark != -1 ? qmark : shorthref.length);
    var hash = shorthref.indexOf("#");
    shorthref = shorthref.substr(0, hash != -1 ? hash : shorthref.length);
    return shorthref;
  } /*Function for document.ready and ajax callbacks*/

  function init() { /*For proper footer display*/
    var inithref = cleanhref(window.location.href);
    //console.log(inithref);
    if (inithref === "") { /*Do not need homeFooter class if there are no blog posts on homepage*/
      //$("footer").addClass("homeFooter");
      $('#otherFoooter').css("display", "block");
      $('#businessFooter').css("display", "none");
    } else if (inithref === "business-and-government" || inithref === "partners" || inithref === "affiliates" || inithref === "government" || inithref === "breach" || inithref === "employee-benefits") {
      $("footer").removeClass("homeFooter");
      $('#businessFooter').css("display", "block");
      $('#otherFoooter').css("display", "none");
    } else {
      $("footer").removeClass("homeFooter");
      $('#otherFoooter').css("display", "block");
      $('#businessFooter').css("display", "none");
    }

    //$('#step1_link').addClass('current-menu-item')
    /*Step_2 tool tip*/
    $('#step2_link .helpTolltip').delay(5000).animate({
      'opacity': 0
    }).css('visibility', 'hidden');
    if($(window).width() > 768) {
      $('#step2_link').mouseenter(function() {
        $('#step2_link .helpTolltip').css('visibility', 'visible').stop().animate({
          'opacity': 1
        });
      });
      $('#step2_link').mouseleave(function() {
        $('#step2_link .helpTolltip').stop().animate({
          'opacity': 0
        }, function() {
          $(this).css('visibility', 'hidden');
        });
      }); /*End step_2 tool tip*/
    }
    $('.footerIn div.contactFieldBox').each(function() {
      $(this).removeClass('error');
    });
    $('.footerIn div.contactFieldBox div.ValidationErrors').each(function() {
      $(this).css('display', 'none');
    }); /*End*/
    /*Placeholder*/
    $('input, textarea').placeholder(); /*End*/
    /*For Login and Searchbox*/
    $('.login').click(function(e) {
      e.stopPropagation();
      $('header').css('z-index', '102');
      if ($('.loginBox').css('bottom') == '-323px') {
        $('.loginBox').stop().animate({
          bottom: '323px'
        }, 800, 'easeInQuad');
      } else {
        $('.searchBox').stop().animate({
          bottom: '110px'
        }, 800, 'easeInQuad');
        $(this).closest('.headerInCont').parent().find('div.loginBox').stop().animate({
          bottom: '-323px'
        }, 800, 'easeOutQuad');
        $('div.forgotPassword').fadeOut();
      }
    });
    $('.search').click(function(e) {
      e.stopPropagation();
      if ($('.searchBox').css('bottom') == '-110px') {
        $('.searchBox').stop().animate({
          bottom: '110px'
        }, 800, 'easeInQuad');
      } else {
        $('.loginBox').stop().animate({
          bottom: '323px'
        }, 800, 'easeInQuad');
        $(this).closest('.headerInCont').parent().find('div.searchBox').stop().animate({
          bottom: '-110px'
        }, 800, 'easeOutQuad');
        $('div.forgotPassword').fadeOut();
      }
    });
    $("body").click(function() {
      $(".loginBox").stop().animate({
        bottom: '323px'
      }, 800, 'easeOutQuad');
      $('.searchBox').stop().animate({
        bottom: '110px'
      }, 800, 'easeOutQuad');
      $('div.forgotPassword').fadeOut();
    });
    $('.loginBox, .searchBox').click(function(e) {
      e.stopPropagation();
    });
    $('.fpBtn').click(function() {
      $(this).next().fadeIn();
      $(this).next().fadeIn();
    });
    $('.loginBox form').jqTransform();
    $('#loginFromMain').jqTransform(); /*End*/
    /*For Point Box*/
    var pointHeight = $('.pointPan').height(),
      ppcImg = $('.pointPan img').height(),
      ppcImgTop = ppcImg / 2,
      ppcInHeight = $('.ppcIn').height(),
      pointContHeight = pointHeight / 2,
      ppcInTop = (pointContHeight - ppcInHeight) / 2;
    $('.pointPanCont').css({
      'height': pointContHeight + 'px',
      'bottom': -pointContHeight + 'px'
    });
    $('.ppcIn').css('top', ppcInTop - 20 + 'px');
    $('.pointPan').each(function() {
      $(this).on('mouseenter', function() {
        $(this).find('.overlay').css('z-index', '-1');
        $(this).find('.overlay').stop().animate({
          opacity: 0
        }, 300), $(this).find('img').stop().animate({
          'top': -ppcImgTop + 'px'
        }, 300), $(this).find('.pointPanCont').stop().animate({
          'bottom': '-10px',
          opacity: 1
        }, 300, function() {
          $(this).children().animate({
            'top': ppcInTop + 'px',
            opacity: 1
          }, 300);
        });
      });
      $(this).on('mouseleave', function() {
        $(this).find('.overlay').css('z-index', '1');
        $(this).find('.pointPanCont').stop().animate({
          'bottom': -pointContHeight + 'px'
        }, 200, function() {
          $(this).children().animate({
            'top': ppcInTop - 20 + 'px',
            opacity: 0
          }, 200);
        }), $(this).find('img').stop().animate({
          'top': '0px'
        }, 200), $(this).find('.overlay').animate({
          opacity: 1
        }, 200);
      });
    }); /*End*/
    /*For Home page blog section*/
    if ($('.homeCarousel').length > 0) {
      $('.homeCarousel').carouFredSel({
        responsive: true,
        prev: '.hbPrevBtn',
        next: '.hbNextBtn',
        width: '100%',
        height: 230,
        auto: false,
        circular: false,
        infinite: false,
        align: false,
        scroll: 1,
        items: {
          width: 255,
          visible: {
            min: 2,
            max: 4
          }
        }
      });
    }
    $('.homeBlogPrev, .homeBlogNext').mouseenter(function() {
      $(this).stop(true, true).animate({
        opacity: 1
      }, 400);
    });
    $('.homeBlogPrev, .homeBlogNext').mouseleave(function() {
      $(this).stop(true, true).animate({
        opacity: 0
      });
    }); /*End*/
    /*For Accordion*/
    var faq_drop_head = $('article.faqAcorPanIn div.head span'),
      faq_drop_body = $('.faqAcorPanIn .faqAcorCont');
    faq_drop_head.off().on('click', function(event) {
      event.preventDefault();
      var $el = $(this);
      if ($(this).attr('class') == 'active') {
        faq_drop_body.slideUp('fast');
        faq_drop_head.removeAttr("class")
      } else {
        faq_drop_body.slideUp('fast');
        $(this).parent().next().stop(true, true).slideDown('fast', function() {
          $("html,body").animate({scrollTop: $el.offset().top + "px"})
        });
        faq_drop_head.removeClass('active');
        $(this).addClass('active');
      }
    }); /*End*/
    /*For Article section infinite scroll*/
/* var $container = $('.articleCont');
    $container.infinitescroll({
    navSelector: '#articleNav',
    nextSelector: '#articleNav a',
    itemSelector: '.articleContPan',
    maxPage: 3,
    loading: {
    finishedMsg: ''
    }
    })*/
    /*End*/
    /*For Plan page slider*/
    var planslideHeight = $('.planSlide').innerHeight();
    var topval = -planslideHeight - 50;
    $('.planSlide').css('top', topval);
    $('.helpChoosePlan').unbind('click').on('click', function() {
      //console.log("click");
      if ($('.planSlide').css('top') == topval + 'px') {
        $(this).addClass('close');
        $('.planSlide').stop(true, true).animate({
          'top': '-50px'
        }, 800, 'easeInQuad');
      } else {
        $(this).removeClass('close');
        $('.planSlide').stop(true, true).animate({
          'top': topval + 'px'
        }, 800, 'easeOutQuad');
      }
    }); /*End*/
    /*For tooltip*/
    $('.help a').each(function() {
      $(this).mouseenter(function() {
        var tooltipH = $(this).next('.helpTolltip').height();
        var tooltippos = (tooltipH / 2) + 8;
        $(this).next('div.helpTolltip').css('top', -tooltippos + 'px');
        $(this).next('div.helpTolltip').stop(true, true).animate({
          'opacity': '1',
          'left': '30px'
        });
      });
      $(this).mouseleave(function() {
        $(this).next('div.helpTolltip').stop(true, true).animate({
          'left': '0',
          'opacity': '0'
        });
      });
    }); /*End*/
    /*Menu dropdown*/
    $('nav.menuBtm > ul > li').each(function() {
      var $this = $(this);
      var width = $this.width();
      var dropPos = width / 2;
      //$this.find('ul').css('left',-dropPos)
    });
    $('nav.menuBtm ul li').mouseenter(function() {
      $(this).find('ul').css({
        'visibility': 'visible'
      });
      $(this).find('ul').stop().animate({
        'opacity': '1',
        'top': '20px'
      });
    });
    $('nav.menuBtm ul li').mouseleave(function() {
      $(this).find('ul').css({
        'visibility': 'hidden'
      });
      $(this).find('ul').stop().animate({
        'opacity': '0',
        'top': '10px'
      });
    }); /*End*/
    /*For Quiz page*/
    var i = 0;
    $('.quizPan').each(function() {
      var isCellAlternate = i % 2;
      if (isCellAlternate) {
        $(this).addClass('odd');
      } else {
        $(this).addClass('even');
      }
      i++;
    });
    $('.quizCont form').jqTransform();
    $('input').change(function() {
      var yes = $('.yes:checked').length;
      var no = $('.no:checked').length;
      $('#yes').text(yes);
      $('#no').text(no);
    }); /*End*/
    /*For Contact form validation*/
    $('.AdvancedForm').validated(function() {
      $('.contactRight').load('thank-you.html');
    }); /*End*/
    /*login form validattion*/
    $("#femail").validate({
      expression: "if (VAL.match(/^[^\\W][a-zA-Z0-9\\_\\-\\.\\+]+([a-zA-Z0-9\\_\\-\\.\\+]+)*\\@[a-zA-Z0-9_]+(\\.[a-zA-Z0-9_]+)*\\.[a-zA-Z]{2,4}$/)) return true; else return false;",
      message: "Required"
    });
    $('#loginFrom').validated(function() {
      alert('Thank You');
    }); /*End*/
    /*login page form validattion*/
    $("#fpemail").validate({
      expression: "if (VAL.match(/^[^\\W][a-zA-Z0-9\\_\\-\\.\\+]+([a-zA-Z0-9\\_\\-\\.\\+]+)*\\@[a-zA-Z0-9\\_\\-]+(\\.[a-zA-Z0-9\\_\\-]+)*\\.[a-zA-Z]{2,4}$/)) return true; else return false;",
      message: "Required"
    });
    $('#loginFormMain').validated(function() {
      $('#loginFormMain').submit();
    }); /*End*/
    /*Menu*/
    $('.menuBtm').meanmenu();
    $('.blog a').addClass("blog"); /*End*/
    /*Home slider*/
    var homeslider = $('.homeSlider').height();
    var homesliderIn = $('.inner').height();
    var homesliderInTop = (homeslider - homesliderIn) / 2;
    $('section.homeSlider div.homeSlides').animate({
      opacity: 1
    }, function() {
      $('.homeSlider .inner').animate({
        'top': homesliderInTop + 'px',
        opacity: 1
      }, function() {
        // drop ribbon down
        $("#ribbon").animate({
          top: '0px'
        });
      });
    });

    function prevTimers() {
      return allTimers().slice(0, $('#pager a.selected').index());
    }

    function allTimers() {
      return $('#pager a span');
    }
    var homeslider = $('.homeSlider').height();
    var homesliderIn = $('.inner').height();
    var homesliderInTop = (homeslider - homesliderIn) / 2;
    $('.homeSlider .inner').css('top', homesliderInTop + 'px');
    if ($('.homeSlides').length > 0) {
      $('.homeSlides').carouFredSel({
        responsive: true,
        items: {
          visible: 1,
          width: 100,
          height: 465
        },
        /*      auto:false,
         */
        auto: {
          progress: {
            bar: '#pager a:first span'
          }
        },
        onCreate: function() {
          $('.homeSlider .inner').stop().animate({
            opacity: 1,
            'top': '0px'
          }, 'easeOutQuad');
        },
        scroll: {
          duration: 1500,
          timeoutDuration: 7000,
          fx: 'crossfade',
          onAfter: function() {
            allTimers().stop().width(0);
            prevTimers().width('100%');
            $(this).trigger('configuration', ['auto.progress.bar', '#pager a.selected span']);
            $('.homeSlider .inner .sliderCont').stop().animate({
              opacity: 1,
              'top': '0px'
            }, 'easeOutQuart');
          },
          onBefore: function() {
            $('.homeSlider .inner .sliderCont').stop().animate({
              opacity: 0,
              'top': '-30px'
            }, 'easeOutQuart');
          }
        },
        pagination: {
          container: '#pager',
          anchorBuilder: false
        }
      });
    }
    $("#homeSlider article img").hide();
    var homeSliderArticle = $("#homeSlider article");
    for (var i = 0; i < homeSliderArticle.length; i++) {
      var $source = $(homeSliderArticle[i]).find('img').attr("src");
      $(homeSliderArticle[i]).css({
        'backgroundImage': 'url(' + $source + ')',
        'backgroundRepeat': 'no-repeat',
        'backgroundPosition': 'top center',
        'backgroundSize': 'cover'
      });
    }
    $('div.homeSlides').css('opacity', '0');
    $('.homeSlider .inner').css({
      'opacity': '0',
      'top': '0'
    }); /*End*/
    /*Career Page Accordion*/
    var drop_head = $('.careersPan div.head a'),
      drop_body = $('.careersPan .careersAcorCont');
    drop_head.off().on('click', function(event) {
      event.preventDefault();
      var $el = $(this);
      if ($(this).attr('class') == 'active') {
        drop_body.slideUp('fast');
        drop_head.removeAttr("class");
      } else {
        drop_body.slideUp('fast');
        $(this).parent().next().stop(true, true).slideDown('fast', function() {
          $("html,body").animate({scrollTop: $el.offset().top + "px"})
        });
        drop_head.removeClass('active');
        $(this).addClass('active');
      }
    }); /*End*/
    /*article addthis scroll*/
    if ($('.asInRghtCont').length > 0) {
      var $sidebar = $(".asInRghtCont"),
        $window = $(window),
        offset = $sidebar.offset(),
        topPadding = 15;
      sideHeight = $(".asInRghtCont").height();
      wrapHeight = $(".mainContent").height();
      //$("#rightbar").css("height", wrapHeight - sideHeight);
      $window.scroll(function() {
        if ($window.scrollTop() > offset.top) {
          $sidebar.stop().animate({
            marginTop: $window.scrollTop() - offset.top + topPadding
          });
          var topMargin = $window.scrollTop() - offset.top + topPadding;
          if (topMargin > wrapHeight - sideHeight) {
            $(".asInRghtCont").css("bottom", 0);
          } else {
            $(".asInRghtCont").css("bottom", "auto");
          }
        } else {
          $sidebar.stop().animate({
            marginTop: 0
          });
        }
      });
    } /*End*/
    /*Sub page navigation*/
    if (
		$('article.bannerNav > .fw > ul > li').length &&
		(undefined == $('article.bannerNav > .fw > ul > li').first().prop("style")["width"] ||
		"" == $('article.bannerNav > .fw > ul > li').first().prop("style")["width"])
		)
    {
		var lisize = $('article.bannerNav .fw ul > li').length;
		var liwidth = 100 / lisize;
		$('article.bannerNav > .fw > ul > li').css('width', liwidth + '%');
	}
	$('section.banner article.bannerNav ul').animate({
	  opacity: 1
	}); /*End*/
    /*Funnel page navigation*/
    lisize = $('article.funnelNav > .fw > ul > li').length;
    liwidth = 100 / lisize;
    $('article.funnelNav > .fw > ul > li').css('width', liwidth + '%'); /*End*/
    /*For Contact Form*/
    $('.contactForm form').jqTransform();
    $('.contactFieldBox select').dropkick();
    $('#step2_relation').change(function(value, label) {
      if ($('#step2_relation').val() == "Child") {
        funnelStep2Email = $('#step2_email').val();
        $('#step2_email').val("");
        $('#step2_email').parent().fadeOut('slow');
      } else {
        if ($('#step2_email').val() == "") {
          $('#step2_email').val(funnelStep2Email);
        }
        if (!$('#step2_email').parent().is(':visible')) {
          $('#step2_email').parent().fadeIn('slow');
        }
        funnelStep2Email = "";
      }
    });
    $('#step2_relation').dropkick();
    $('#step3_squestion').dropkick();
    $('.AdvancedForm').jqTransform();
    $('.AdvancedForm').jqTransform(); /*End*/
    var location = window.location.href;
    var href = location.substr((location.lastIndexOf("/") + 1), location.length).toLowerCase();
    if (href == 'article-single.html') {
      href = 'article.html';
    }
    $('li:not([id*=step])').removeClass("current-menu-item");
    $('a').each(function() {
      if ($(this).length && $(this).attr('href') != undefined && $(this).attr('href').length && $(this).attr('href').indexOf("javascript") < 0 && $(this).attr('href') != "#") {
        var curhref = cleanhref($(this).attr('href'));
        if (curhref == href) {
          $(this).parents('li').addClass('current-menu-item');
        }
      }
    });
/*
    if(step2)
    {
    $('#step2_link').find('a').removeClass('disable');
    $('#step2_link').addClass('current-menu-item');
    }
    */
    $('article.funnelNav ul').animate({
      opacity: 1
    });
    $('.planSlide').css({
      'opacity': '1'
    });
    //$('#step1_link').addClass('current-menu-item');
    if ($('#step1_link').length > 0) {
      //$('#step1_link').addClass('current-menu-item');
      //step_1();
    }
    //choosePlan();
    //funnelslide();
    $('.fulltext').hide();
    $('.testiPan .more').click(function(event) {
      event.preventDefault();
      $(this).parent().find('.fulltext').slideToggle('slow');
      $(this).text($(this).text() == '[less]' ? '[more]' : '[less]');
    });
  } /*End of function*/
  $(window).load(function() {
    init();
    $('.planSlide').css({
      'opacity': '1'
    });
  }); /*Window Resize Call*/
  $(window).resize(function() {
    init();
    //funnelslide()
  }); /*End*/
  $(document).ready(function() {
    //choosePlan()
    //funnelslide()
  }); /*Document.Keyup Call*/
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('.loginBox').animate({
        bottom: '323px'
      }, 800, 'easeInQuad');
      $('.searchBox').animate({
        bottom: '110px'
      }, 800, 'easeInQuad');
      var planslideHeight = $('.planSlide').innerHeight();
      var topval = -planslideHeight - 50;
      $('.helpChoosePlan').removeClass('close');
      $('.planSlide').stop(true, true).animate({
        'top': topval + 'px'
      }, 800, 'easeOutQuad');
    } // esc
  }); /*End*/
  if (!History.enabled) {
    return false;
  } else {
    History.Adapter.bind(window, 'statechange', function() {
      var State = History.getState(),
        container = "#container",
        isSubpage = (typeof State.data.isSubpage !== null && State.data.isSubpage),
        hasSub = (typeof State.data.hasSub !== null && State.data.hasSub),
        step2 = (typeof State.data.step2 !== null && State.data.step2),
        isFunnel = (typeof State.data.isFunnel !== null && State.data.isFunnel),
        isBusiness = (typeof State.data.isBusiness !== null && State.data.isBusiness);
      if (isSubpage) {
        container = "#ajaxContent";
      }
      $href = State.url.substr((State.url.lastIndexOf("/") + 1), State.url.length);
      $(container).animate({
        opacity: 0
      }, 200, function() {
        $(container).delay(400).animate({
          opacity: 1
        }).load(State.url + ' ' + container, function(response, status, xhr) {
          if (status == "error") {
            var msg = "There was an error: ";
          } /*Loding Meta Data From page*/
          $("#meta_description").attr("content", $(response).filter('#meta_description').attr("content"));
          $("#meta_keyword").attr("content", $(response).filter('#meta_keyword').attr("content"));
          document.title = $(response).filter('title').text(); /*Loding Meta Data From End*/
          $(container).animate({
            opacity: 1,
            'top': '0'
          }, 500);
          $href = State.url.substr((State.url.lastIndexOf("/") + 1), State.url.length).toLowerCase();
          if ($href == 'article-single.html') {
            addthis.toolbox(".addthis_toolbox");
          }
          init();
          if ($href == 'article-single.html') {
            $href = 'article.html';
          }
          $('li:not([id*=step])').removeClass("current-menu-item");
          $('a').each(function() {
            if ($(this).length && $(this).attr('href') != undefined && $(this).attr('href').length && $(this).attr('href').indexOf("javascript") < 0 && $(this).attr('href') != "#") {
              var curhref = cleanhref($(this).attr('href'));
              if (curhref == $href) {
                $(this).parents('li').addClass('current-menu-item');
              }
            }
          });
          if (isBusiness) {
            $('#otherFoooter').css("display", "none");
            $('#businessFooter').css("display", "block");
          } else {
            $('#otherFoooter').css("display", "block");
            $('#businessFooter').css("display", "none");
          }
        });
        if (isHome) {
          $('body').addClass("home");
          $('footer').addClass("homeFooter");
        } else {
          $('body').removeClass("home");
          $('footer').removeClass("homeFooter");
        }
        var scrollTop = 0;
        if (isSubpage) {
          if (isFunnel) {
            scrollTop = $(container).offset().top - $(".funnelNav").height();
          } else {
            scrollTop = $(container).offset().top - $(".bannerNav").height();
          }
        } else if (hasSub && !isSubpage) {
          scrollTop = $(container).offset().top + 344;
        }
/*
          if(step2)
          {
          $('#step2_link').find('a').removeClass('disable');
          $('#step2_link').addClass('current-menu-item');
          }
          */
        $("html, body").animate({
          scrollTop: scrollTop
        }, 1000);
      });
    });
  } /*Event attachment*/
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1) { /*$(document).on("click", "a.logo", function(event){load_page($(this),event)} );*/
    $(document).on("click", ".hdrRight a", function(event) {
/*
      if (!$(this).parent().hasClass("blog") && !$(this).parent().hasClass("livechat") && !$(this).parent().hasClass("login") && !$(this).parent().hasClass("search") && !$(this).hasClass("tryfree") && !$(this).parent().hasClass("login") && $(this).attr("href") != "/plans-and-pricing") {
      load_page($(this), event);
      }
      */
    });
    $(document).on("click", "a.learnMore", function(event) {
      if (!$(this).parent().hasClass("inner") && !$(this).parent().hasClass("sliderCont")) {
        load_page($(this), event);
      }
    });
    $(document).on("click", "a.ourPromiseBtn", function(event) {
      load_page($(this), event);
    });
    $(document).on("click", ".yourFamilyBtm a", function(event) {
      load_page($(this), event);
    });
    $(document).on("click", "ul.fotMenu li a", function(event) {
      if (!$("fotBtmLeft").hasClas("login")) {
        load_page($(this), event);
      }
    });
    $(document).on("click", ".bannerNav ul.clearfix li a", function(event) {
      if ($(this).attr('id') !== 'you-and-your-fam-banner' && $(this).attr('id') !== 'child-watch-banner' && $(this).attr('id') !== 'medical-identity-theft-banner' && !$(this).hasClass("loadArticle")) {
        load_page($(this), event, true);
      }
    });
    $(document).on("click", ".funnelNav ul.clearfix li a", function(event) {
      if (!$(this).hasClass("disable")) {
        load_page($(this), event, true);
      } else {
        event.preventDefault();
      }
    });
    $(document).on("click", "a.viewarticle,article.articleContPan h3 a,article.articleContPan p a", function(event) {
      if (!$(this).hasClass("loadArticle")) {
        load_page($(this), event, true);
      }
    });
    $(document).on("click", "a.editmemberbutton", function(event) {
      load_page($(this), event, true);
    });
  }
  $(document).on("focus", ".contactFieldBox input[type=text], .contactFieldBox input[type=password]", function(event) {
    $(this).closest('.contactFieldBox').find('.ValidationErrors').remove();
  });
  $(document).on("focus", ".contactFieldBox .dk_options, .contactFieldBox .dk_container", function(event) {
    $(this).closest('.contactFieldBox').find('.ValidationErrors').remove();
  });
  //$(document).on("mouseenter", ".pointPan", function(){pointpan_mouseenter($(this))} );
  //$(document).on("mouseleave", ".pointPan", function(){pointpan_mouseout($(this))} );
  /*End*/

  function pointpan_mouseenter(obj) {
    $(obj).find('.overlay').css('z-index', '-1');
    $(obj).find('.overlay').stop().animate({
      opacity: 0
    }, 300), $(obj).find('img').stop().animate({
      'top': -ppcImgTop + 'px'
    }, 300), $(obj).find('.pointPanCont').stop().animate({
      'bottom': '-10px',
      opacity: 1
    }, 300, function() {
      $(obj).children().animate({
        'top': ppcInTop + 'px',
        opacity: 1
      }, 300);
    });
  }

  function pointpan_mouseout(obj) {
    $(obj).find('.overlay').css('z-index', '1');
    $(obj).find('.pointPanCont').stop().animate({
      'bottom': -pointContHeight + 'px'
    }, 200, function() {
      $(obj).children().animate({
        'top': ppcInTop - 20 + 'px',
        opacity: 0
      }, 200);
    }), $(obj).find('img').stop().animate({
      'top': '0px'
    }, 200), $(obj).find('.overlay').animate({
      opacity: 1
    }, 200);
  } /*Function for triggering history based ajax call*/

  function load_page(obj, event, isSubpage) {
	if ("undefined" !== typeof window.addthis) {
      window.addthis = null;
    }
    $.getScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=xa-51a9a4c749a43010');
    if (typeof isSubpage == null) isSubpage = false;
    var isBusiness = false;
    var hasSub = false;
    var isFunnel = false;
    if ($(obj).attr('href') != 'javascript:void(0)') {
      if (!$(obj).hasClass("blog")) {
        $href = $(obj).attr('href');
        if ($(obj).hasClass("bng")) {
          isBusiness = true;
        }
        if ($(obj).hasClass("hs")) {
          hasSub = true;
        }
        if ($(obj).hasClass("addmemberbutton")) {
          step2 = true;
        }
        if ($(obj).parent().parent().parent().parent().hasClass("funnelNav")) {
          isFunnel = true;
        }
        $href_id = $(obj).attr('href').substr(0, ($(obj).attr('href').indexOf(".")));
        isHome = $href == "/";
        event.preventDefault();
        var url = $baseurl + '/' + $href;
        StateIndex++;
        History.pushState({
          isSubpage: isSubpage,
          isBusiness: isBusiness,
          hasSub: hasSub,
          step2: step2,
          isFunnel: isFunnel,
          indx: StateIndex,
          name: $href,
          subpage: false,
          containerID: $href_id
        }, null, $baseurl + '/' + $href);
      }
    }
  } /*End*/

  function selectonchaange() {
    $('.contactFieldBox select').each(function() {
      if (jQuery(this).parent().hasClass('error')) {
        jQuery(this).parent().parent().removeClass('error');
      } else {}
    });
  } /*function for loading page meta data dynamicallly*/
  /*End*/
});

function hideloader() {
  $('.loader').hide();
}

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
} /*Function for funnel page funnel page hide loader Ends*/
/*End of funnel page functions*/
/*var defaultPageTitle = document.title;
$(window).on({
  "blur": function(e) {
    defaultPageTitle = document.title;
    document.title = 'Make My Money';
  },
  "focus": function(e) {
    document.title = defaultPageTitle;
  }
});*/

function get_age(born, now) {
  var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
  if (now >= birthday) return now.getFullYear() - born.getFullYear();
  else return now.getFullYear() - born.getFullYear() - 1;
}
var filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
var FormValidation = {
  show_error: function(id, msg) {
    $('#' + id).closest('.contactFieldBox').addClass("error");
    $('#' + id).closest('.contactFieldBox').append('<div class="ValidationErrors"><em></em>' + msg + '</div>');
  },
  hide_error: function(id) {
    $('#' + id).closest('.contactFieldBox').removeClass("error");
    $('#' + id).closest('.contactFieldBox').find('.ValidationErrors').remove();
  },
  submit_business_data: function() {
    var errors = 0;
    if ($('#bconname').val() === '') {
      FormValidation.show_error('bconname', 'Required');
      errors = 1;
    } else {
      FormValidation.hide_error('bconname');
    }
    if ($('#bconcompany').val() === '') {
      FormValidation.show_error('bconcompany', 'Required');
      errors = 1;
    } else {
      FormValidation.hide_error('bconcompany');
    }
    if ($('#bconemail').val() === '') {
      FormValidation.show_error('bconemail', 'Required');
      errors = 1;
    } else if (!filter.test($('#bconemail').val())) {
      FormValidation.show_error('bconemail', 'Invalid Email');
      errors = 1;
    } else {
      FormValidation.hide_error('bconemail');
    }
    if (errors === 0) {
      $.ajax({
        url: '/',
        type: 'POST',
        dataType: "json",
        data: {
          ServiceId: $('#bscontact #ServiceId').val(),
          Action: $('#bscontact #Action').val(),
          ResponseView: 'JSONServiceResultView',
          idWebForm: $('#bscontact #idWebForm').val(),
          bconname: $('#bscontact #bconname').val(),
          bconcompany: $('#bscontact #bconcompany').val(),
          bconphone: $('#bscontact #bconphone').val(),
          bconemail: $('#bscontact #bconemail').val(),
          timespancheck: $('#timespancheck').val(),
          timespan: $('#timespan').val()
        },
        success: function(data) {
          if (data.Details.Response != undefined) {
            switch (data.Details.Response) {
            case "Success":
              $('#yourMsgSent').css('z-index', '1').animate({
                'opacity': '1'
              }, function() {
                $('#bscontact input[type!="hidden"]').each(function() {
                  $(this).val('');
                });
                $(this).delay(5000).animate({
                  'opacity': '0'
                }, function() {
                  $(this).css('z-index', '-1');
                });
              });
              return false;
              break;
            case "Fail":
              return false;
              break;
            default:
              return false;
              break;
            }
          } else {
            return false;
          }
        }
      });
    }
  },
  submit_newsletter_data: function() {
    var errors = 0;
    if ($('#newsltremail').val() === '') {
      FormValidation.show_error('newsltremail', 'Required');
      errors = 1;
    } else if (!filter.test($('#newsltremail').val())) {
      FormValidation.show_error('newsltremail', 'Invalid Email');
      errors = 1;
    } else {
      FormValidation.hide_error('newsltremail');
    }
    if (errors === 0) {
      $.ajax({
        url: '/',
        type: 'POST',
        dataType: "json",
        data: {
          ServiceId: $('#newsletter #ServiceId').val(),
          Action: $('#newsletter #Action').val(),
          ResponseView: 'JSONServiceResultView',
          idWebForm: $('#newsletter #idWebForm').val(),
          newsltremail: $('#newsletter #newsltremail').val(),
          timespancheck: $('#timespancheck').val(),
          timespan: $('#timespan').val()
        },
        success: function(data) {
          if (data.Details.Response != undefined) {
            switch (data.Details.Response) {
            case "Success":
              $('#newsltrThank').fadeIn(function() {
                $(this).delay(3000).fadeOut();
                $('#newsletter #newsltremail').removeAttr('value');
              });
              return false;
              break;
            case "Fail":
              return false;
              break;
            default:
              return false;
              break;
            }
          } else {
            return false;
          }
        }
      });
    }
  },
  submit_contact_data: function() {
    var errors = 0;
    if ($('#fname').val() == '') {
      FormValidation.show_error('fname', 'Required');
      errors = 1;
    } else if (!/^[a-zA-Z\s\-']+$/.test($('#fname').val())) {
      FormValidation.show_error('fname', 'Invalid Name');
      errors = 1;
    } else {
      FormValidation.hide_error('fname');
    }
    if ($('#lname').val() == '') {
      FormValidation.show_error('lname', 'Required');
      errors = 1;
    } else if (!/^[a-zA-Z\s\-']+$/.test($('#lastname').val())) {
      FormValidation.show_error('lname', 'Invalid Name');
      errors = 1;
    } else {
      FormValidation.hide_error('lname');
    }
    if ($('#email').val() == '') {
      FormValidation.show_error('email', 'Required');
      errors = 1;
    } else if (!filter.test($('#email').val())) {
      FormValidation.show_error('email', 'Invalid Email');
      errors = 1;
    } else {
      FormValidation.hide_error('email');
    }
    if ($('#phone').val() == '') {
      FormValidation.show_error('phone', 'Required');
      errors = 1;
    } else {
      FormValidation.hide_error('phone');
    }
    if ($('#contacthow').val() == '') {
      FormValidation.show_error('contacthow', 'Required');
      errors = 1;
    } else {
      FormValidation.hide_error('contacthow');
    }
    if ($('#comments').val() == '') {
      FormValidation.show_error('comments', 'Required');
      errors = 1;
    } else {
      FormValidation.hide_error('comments');
    }
    if (errors === 0) {
      $.ajax({
        url: '/',
        type: 'POST',
        dataType: "json",
        data: {
          ServiceId: $('#ServiceId').val(),
          Action: $('#Action').val(),
          ResponseView: 'JSONServiceResultView',
          idWebForm: $('#idWebForm').val(),
          fname: $('#fname').val(),
          lname: $('#lname').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          //contacthow : $('#dk_container_contacthow a.dk_toggle span.dk_label').val(),
          contacthow: $('#contacthow').val(),
          comments: $('#comments').val(),
          timespancheck: $('#timespancheck').val(),
          timespan: $('#timespan').val()
        },
        success: function(data) {
          if (data.Details.Response != undefined) {
            switch (data.Details.Response) {
            case "Success":
              $('.contactForm').fadeOut();
              $('.thankyou').fadeIn();
              return false;
              break;
            case "Fail":
              return false;
              break;
            default:
              return false;
              break;
            }
          } else {
            return false;
          }
        }
      });
    }
  },
  submit_career_data: function(obj) {
    var careerid = obj.parent().parent().parent().find('h2').attr('id');
    var jqcareerid = "." + careerid;
    obj.parent().parent().addClass(careerid); /*Function for showing validation errors*/

    function career_show_error(id, msg) {
      $(jqcareerid + ' ' + id).closest('.contactFieldBox').addClass("error");
      $(jqcareerid + ' ' + id).closest('.contactFieldBox').append('<div class="ValidationErrors"><em></em>' + msg + '</div>');
    } /*Function for showing validation errors Ends*/
    /*Function for hiding validation errors*/

    function career_hide_error(id) {
      $(jqcareerid + ' ' + id).closest('.contactFieldBox').removeClass("error");
      $(jqcareerid + ' ' + id).closest('.contactFieldBox').find('.ValidationErrors').remove();
    } /*Function for hiding validation errors ends*/
    var errors = 0;
    if ($(jqcareerid + ' .careerfirstname').val() == '') {
      career_show_error('.careerfirstname', 'Required');
      errors = 1;
    } else if (!/^[a-zA-Z\s\-']+$/.test($(jqcareerid + ' .careerfirstname').val())) {
      career_show_error('.careerfirstname', 'Invalid Name');
      errors = 1;
    } else {
      career_hide_error('.careerfirstname');
    }
    if ($(jqcareerid + ' .careerlastname').val() == '') {
      career_show_error('.careerlastname', 'Required');
      errors = 1;
    } else if (!/^[a-zA-Z\s\-']+$/.test($(jqcareerid + ' .careerlastname').val())) {
      career_show_error('.careerlastname', 'Invalid Name');
      errors = 1;
    } else {
      career_hide_error('.careerlastname');
    }
    if ($(jqcareerid + ' .careerhow').val() == '') {
      career_show_error('.careerhow', 'Required');
      errors = 1;
    } else {
      career_hide_error('.careerhow');
    }
    if ($(jqcareerid + ' .careeremail').val() == '') {
      career_show_error('.careeremail', 'Required');
      errors = 1;
    } else if ($(jqcareerid + ' .careeremail').val() != '' && !filter.test($(jqcareerid + ' .careeremail').val())) {
      career_show_error('.careeremail', 'Invalid Email');
      errors = 1;
    } else {
      career_hide_error('.careeremail');
    }
    if ($(jqcareerid + ' .careerphone').val() == '') {
      career_show_error('.careerphone', 'Required');
      errors = 1;
    } else {
      career_hide_error('.careerphone');
    }
    if ($(jqcareerid + ' .careermessage').val() == '' || $(jqcareerid + ' .careermessage').val() == '*Message') {
      career_show_error('.careermessage', 'Required');
      errors = 1;
    } else {
      career_hide_error('.careermessage');
    }
    if (errors == 0) {
      $.ajax({
        url: '/',
        type: 'POST',
        dataType: "json",
        data: {
          ServiceId: $(jqcareerid + ' #ServiceId').val(),
          Action: $(jqcareerid + ' #Action').val(),
          ResponseView: 'JSONServiceResultView',
          idWebForm: $(jqcareerid + ' #idWebForm').val(),
          careerposition: careerid,
          careerfirstname: $(jqcareerid + ' .careerfirstname').val(),
          careerlastname: $(jqcareerid + ' .careerlastname').val(),
          careeremail: $(jqcareerid + ' .careeremail').val(),
          careerphone: $(jqcareerid + ' .careerphone').val(),
          //careerinterest  : $(jqcareerid+' #dk_container_careerinterest a.dk_toggle span.dk_label').val(),
          careerinterest: $(jqcareerid + ' .careerinterest').first().val(),
          //careerhow       : $(jqcareerid+' #dk_container_careerhow a.dk_toggle span.dk_label').val(),
          careerhow: $(jqcareerid + ' .careerhow').first().val(),
          careermessage: $(jqcareerid + ' .careermessage').val(),
          timespancheck: $('#timespancheck').val(),
          timespan: $('#timespan').val()
        },
        success: function(data) {
          if (data.Details.Response != undefined) {
            switch (data.Details.Response) {
            case "Success":
              $(jqcareerid + ' form, ' + jqcareerid + ' .send-it-btn').fadeOut();
              $(jqcareerid + ' span.contactForm').fadeIn().css('display', 'block');
              return false;
              break;
            case "Fail":
              return false;
              break;
            default:
              return false;
              break;
            }
          } else {
            return false;
          }
        }
      });
    }
  }
};
