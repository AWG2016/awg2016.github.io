(function($) {

  var ffnav = {
    // properties
    selector: 'header .pane-system-main-menu .pane-content',
    firstLevel: $('header .pane-system-main-menu .pane-content > ul'),
    firstLevelList: $('header .pane-system-main-menu .pane-content > ul > li'),

    mobileReady: false,
    desktopReady: false,

    // Methods
    resetDesktop: function() {
      var nav = this;

      $('header .pane-system-main-menu .pane-content > ul > li').unbind('mouseover mouseout');

      $('button.open_mobile_btn').removeClass('active');

      $("header .pane-system-main-menu").removeClass('navigation-wrap-opened');
      $('header .pane-search-form').removeClass('block-search-form-open');


      $("header .pane-system-main-menu .pane-content > ul > li").find('.menu').removeAttr('style');
    },

    resetMobile: function() {
      $("header .pane-system-main-menu li.back-wraper").each(function() {
        $(this).remove();
      });

      $("header .pane-system-main-menu li.first-level-link").each(function() {
        $(this).remove();
      });

      $('body').removeAttr('style');

      $("header .pane-system-main-menu .pane-content > ul > li").find('.menu').removeAttr('style');

      $('aside .pane-menu-menu-iqualit').find(".pane-content").show();
    },

    buildMobile: function() {
      var nav = this;

      if (nav.mobileReady === true) {
        return;
      }

      nav.resetDesktop();

      $("header .pane-locale-language").appendTo(".pane-system-main-menu > .pane-content");
      $("header .pane-menu-menu-top-menu").appendTo(".pane-system-main-menu > .pane-content");

      $('header .pane-system-main-menu .pane-content > ul > li.expanded > a').click(function(event) {
        if ($(window).width() <= 768) {
          event.preventDefault();

          var $submenu = $(this).parent('li').children('.menu');
          if ($submenu.find('.back-wraper').size() === 0) {
            $submenu.prepend('<li class="back-wraper"><a class="back-menu" href="#">Back to main menu</a></li>');
          }

          // Insert link for First menu item
          var $firstLevelMenuItem = $(this).parent("li").children("a");
          if ($firstLevelMenuItem.attr("href") !== "") {

            if ($submenu.find(".first-level-link").size() === 0) {
              $submenu.find(".first").before("<li class='first-level-link'><a href=" + $firstLevelMenuItem.attr("href") + ">" + $firstLevelMenuItem.text() + "</li>");
            }
          }

          $submenu.show(0, function() {
            $('body').css({
              'min-height': $submenu.height()
            });

            $(this).animate({
              'left': 0
            }, '600', 'swing');
          });

          // Temp
          $("header .pane-locale-language").hide();
          $("header .pane-menu-menu-top-menu").hide();

          $submenu.find('.back-menu').click(function(event) {
            event.preventDefault();

            $submenu.animate({
              'left': '100%'
            }, '1500', 'swing', function() {

              $(this).hide(0, function() {
                $submenu.find('.back-wraper').remove();
                $submenu.find('.first-level-link').remove();
                $('body').removeAttr('style');
              });

              // Temp
              $("header .pane-locale-language").show();
              $("header .pane-menu-menu-top-menu").show();
            });
          });
        }
      });

      // Make NEWS block title as link
      var newsBlock = $(".articles_on_black");
      var newsBlockTitle = newsBlock.find(".pane-views-news-block");
      var newsPageUrl = newsBlock.find(".readmore").attr("href");
      if (newsBlock.size()) {
        var heading = newsBlock.find(".pane-views-news-block h2");
        heading.clone().prependTo(newsBlockTitle).wrapInner("<a href=" + newsPageUrl + "></a>").addClass("heading-link");
      }

      nav.mobileReady = true;
      nav.desktopReady = false;
    },

    buildDesktop: function() {
      var nav = this;

      if (nav.desktopReady === true) {
        return;
      }

      nav.resetMobile();

      var $languages = $('header .pane-system-main-menu .pane-locale-language');
      var $additionalLinks = $('header .pane-system-main-menu .pane-menu-menu-top-menu');

      $languages.insertAfter("header .pane-page-logo");
      $additionalLinks.insertAfter("header .pane-locale-language");

      nav.desktopReady = true;
      nav.mobileReady = false;
    },

    init: function() {
      // Check if navigation is present on the page.
      if ($(this.selector).length < 1) {
        return;
      }

      if ($(window).width() <= 768) {
        this.buildMobile();
      }
      else {
        this.buildDesktop();
      }
    }
  };

  $(function() {
    ffnav.init();

    $(window).resize(function(event) {
      ffnav.init();
    });
  });

  $(document).ready(function() {
    if ($('header').find('.open_mobile_btn.open_menu').size() === 0) {
      $('header').prepend('<button class="open_mobile_btn open_menu"><span></span><span></span><span></span></button>');
    }

    if ($('header').find('.open_mobile_btn.open_search_form').size() === 0) {
      $('header .pane-search-form').append('<button class="open_mobile_btn open_search_form"></button>');
    }

    if ($('.has_sidebar_left').size() !== 0) {
      var aside = $('.has_sidebar_left').find('aside');

      if (aside.find('ul.menu').size() !== 0) {
        aside.find('.pane-title').append('<button class="toggle_sport_menu">show all</button>');
      }
    }

    function prepareMobile() {
      var windowWidth = $(window).width();

      // Match User Agent
      var ua = navigator.userAgent,
          event = (ua.match(/iPad/i)) ? "touchstart" : "click";

      if (windowWidth <= 768) {

        if (!($('body').hasClass('mobile_view_need'))) {

          $('body').addClass('mobile_view_need');
        }

        $('body').addClass('mobile_elements_ready');
      }
      else {

        $('body').removeClass('mobile_view_need');
      }
    }

    prepareMobile();

    $(window).resize(function() {
      prepareMobile();
    });

    $('html').click(function() {
      $('button.open_mobile_btn').removeClass('active');

      $("header .pane-system-main-menu").removeClass('navigation-wrap-opened');
      $('header .pane-search-form').removeClass('block-search-form-open');

      $('header #logo').show();
    });

    $('button.open_menu').click(function(event) {
      event.stopPropagation();

      if ($(this).hasClass('active')) {

        $(this).toggleClass('active');
        $("header .pane-system-main-menu").toggleClass('navigation-wrap-opened');
      }
      else {

        $('button.open_mobile_btn').removeClass('active');
        $('header .pane-search-form').removeClass('block-search-form-open');

        $('header #logo').show();

        $(this).toggleClass('active');
        $("header .pane-system-main-menu").toggleClass('navigation-wrap-opened');
      }

      $("header .pane-system-main-menu .pane-content > ul > li > .menu").hide(0, function() {
        $(this).removeAttr('style');
        $('header .pane-system-main-menu').find('.back-wraper').remove();
        $('header .pane-system-main-menu').find('.first-level-link').remove();

        $('body').removeAttr('style');
      });
    });

    $('button.open_search_form').click(function(event) {
      event.stopPropagation();

      if ($(this).hasClass('active')) {
        $(this).toggleClass('active');
        $('header .pane-search-form').toggleClass('block-search-form-open');

        $('header #logo').show();
      }
      else {
        $('button.open_mobile_btn').removeClass('active');

        // Hide Logo for small devices when Search form is opened
        if ($(window).width() < 520) {
          $('header #logo').hide();
        }

        $(this).toggleClass('active');
        $('header .pane-search-form').toggleClass('block-search-form-open');
      }
    });

    $("header .pane-system-main-menu, header .pane-search-form").click(function(event) {
      event.stopPropagation();
    });


    // Toggle Sports menu
    $('.toggle_sport_menu').click(function() {
      $(this).toggleClass('menu-visible');
      if ($(this).hasClass('menu-visible')) {
        $(this).html(Drupal.t('hide'));
      }
      else {
        $(this).html(Drupal.t('show all'));
      }
      $(this).parents('.pane-menu-menu-iqualit').find(".pane-content").toggle();
    });

    // Re-order blocks on Culture page
    if ($("body").hasClass("page-node-236")) {
      var blocks = $('.container .pane-views-gallery-block');
      $('.container .pane-node-content').after(blocks);
    }
  });

  Drupal.behaviors.arctic = {
    attach: function(context, settings) {

      $('#main_slider .views-row').slidesjs({
        width: 100,
        height: 491,
        navigation: {
          active: false,
          effect: 'fade'
        },
        pagination: {
          active: true,
          effect: 'fade'
        },
        play: {
          active: true,
          auto: true,
          interval: 6000,
          restartDelay: 2500,
          effect: 'fade'
        }
      });

      $('.view-id-programs .node-program').each(function() {
        var redirect_url = $(this).attr('data-internal-link');
        $(this).add($(this).find('img')).add($(this).find('.name')).click(function() {
              document.location = redirect_url;
            }
        );
      });
    }
  };

  Drupal.behaviors.responsive = {
    attach: function(context, settings) {
      $(".player").fitVids();
    }
  };

  Drupal.behaviors.medalCounter = {
    attach: function(context, settings) {
      $('.medal-counter', context).once('medal-counter', function() {
        var url = 'http://awg2016.gems.pro/WebAPI/api/MedalCountModel/GetMedalCount?Culture=en-CA',
            $container = $(this);


        $.getJSON(url, function(data, status) {
          if (status == 'success' && $.isArray(data)) {
            var table = renderTable(data);

            $container.html(table).removeClass('element-invisible');
          }
        });

        function renderTable(data) {
          var caption = Drupal.t('Final Medal Count');
          var header = [
            '<tr>',
            '<th>' + Drupal.t('Contingent') +'</th>',
            '<th>' + Drupal.t('Gold') + '</th>',
            '<th>' + Drupal.t('Silver') + '</th>',
            '<th>' + Drupal.t('Bronze') + '</th>',
            '<th>' + Drupal.t('Total') + '</th>',
            '</tr>'
          ].join('');

          var rows = $.map(data, function(item, index) {
            var medals = {
              contingent: {
                name: item.Contingent.Name,
                flag: item.Contingent.FlagLinkMedium
              },
              gold: item.GoldCount,
              silver: item.SilverCount,
              bronze: item.BronzeCount,
              total: item.GoldCount + item.SilverCount + item.BronzeCount
            };

            var row = [
              '<tr>',
              '<td class="contingent"><img class="flag" src="' + medals.contingent.flag + '" alt="' + medals.contingent.name + '" /><span class="country-name">' + medals.contingent.name + '</span></td>',
              '<td class="gold">' + medals.gold + '</td>',
              '<td class="silver">' + medals.silver + '</td>',
              '<td class="bronze">' + medals.bronze + '</td>',
              '<td class="total"><b>' + medals.total + '</b></td>',
              '</tr>'
            ].join('');

            return row;
          });

          var body = rows.join('');

          return [
            '<table class="final-medals-count">',
            '<caption>' + caption + '</caption>',
            '<thead>' + header + '</thead>',
            '<tbody>' + body + '</tbody>',
            '</table>'
          ].join('');
        }
      });
    }
  }

})(jQuery);
