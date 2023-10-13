window.onload = function () {

  // Липкое меню.
  // function stikyMenu(header) {
  //   let headerTop = header.offset().top;
  //   headerToggleClass();
  //   $(window).scroll(function () {
  //     headerToggleClass();
  //   });
  //   function headerToggleClass() {
  //     if ($(window).scrollTop() > headerTop + 200) {
  //       header.addClass('sticky');
  //     } else if ($(window).scrollTop() <= headerTop) {
  //       header.removeClass('sticky');
  //     }
  //   }
  // };
  // stikyMenu($('#headerSticky'));

  // Выпадайки при клике по кнопке
  // Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
  // Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
  // function dropBlock(btn, lock = false) {
  //   let $this = undefined,
  //       drop = undefined,
  //       close = $('.js-drop-close'),
  //       body = $('body');
  //   btn.on('click', function () {
  //     let $this = $(this);
  //     let drop = $('#' + $this.data('drop'));
  //     let scrollWidth = (window.innerWidth - $(window).width());
  //     if (!$this.hasClass('is-active')) {
  //       $this.addClass('is-active');
  //       drop.addClass('open');
  //       if (lock) {
  //         body.toggleClass('lock');
  //         body.css('padding-right', scrollWidth);
  //       }
  //     } else {
  //       $this.removeClass('is-active');
  //       drop.removeClass('open');
  //       body.removeClass('lock');
  //       body.css('padding-right', 0);
  //     }
  //     $(document).mouseup(function (e) {
  //       if (!$this.is(e.target)
  //         && $this.has(e.target).length === 0
  //         && !drop.is(e.target)
  //         && drop.has(e.target).length === 0) {
  //         $this.removeClass('is-active');
  //         drop.removeClass('open');
  //         body.removeClass('lock');
  //         body.css('padding-right', 0);
  //       }
  //     });
  //   })
  //   close.on('click', function () {
  //     $('[data-drop="' + $(this).data('drop') +'"]').removeClass('is-active');
  //     $('#' + $(this).data('drop')).removeClass('open');
  //     body.removeClass('lock');
  //     body.css('padding-right', 0);
  //   })
  // }
  // // dropBlock($('.js-drop-btn'));
  // dropBlock($('.js-drop-menu'), true);

  // Кнопка скролла вверх страницы
  function scrollUp() {
    const btn = $('.js-scrollup');
    $(window).scroll(function () {
      btnShowFade();
    });
    function btnShowFade() {
      if ($(this).scrollTop() > 200) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    }
    btnShowFade();
    btn.click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  }
  scrollUp();

  // Редактор изображениея 
  let image = document.getElementById('editImg');
  if (image) {
    let ratio = eval(image.dataset.ratio);
    let zoomIn = document.getElementById('zoomIn');
    let zoomOut = document.getElementById('zoomOut');
    let rotateRight = document.getElementById('rotateRight');
    let rotateLeft = document.getElementById('rotateLeft');
    let inputImage = document.getElementById('inputImage');
    let reverse = document.getElementById('reverse');
    let uploadedImageURL;
    let options = {
      aspectRatio: ratio,
      viewMode: 1,
      guides: false,
      zoomOnWheel: true,
      dragMode: 'move',
      cropBoxMovable: false,
      cropBoxResizable: false,
      autoCropArea: 1,
      toggleDragModeOnDblclick: false,
    }
    let optionsReverse = {
      aspectRatio: 4 / 3,
      viewMode: 1,
      guides: false,
      zoomOnWheel: true,
      dragMode: 'move',
      cropBoxMovable: false,
      cropBoxResizable: false,
      autoCropArea: 1,
      toggleDragModeOnDblclick: false,
    }
    let cropper = new Cropper(image, options);
    // Загрузка изображения
    if (URL) {
      inputImage.onchange = function () {
        var files = this.files;
        var file;

        if (files && files.length) {
          file = files[0];

          if (/^image\/\w+/.test(file.type)) {
            uploadedImageType = file.type;
            uploadedImageName = file.name;

            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
            }

            image.src = uploadedImageURL = URL.createObjectURL(file);

            if (cropper) {
              cropper.destroy();
            }

            cropper = new Cropper(image, options);
            inputImage.value = null;
          } else {
            window.alert('Пожалуйста загрузите файл изображения');
          }
        }
      };
    } else {
      inputImage.disabled = true;
      inputImage.parentNode.className += ' disabled';
    }
    // Увеличение
    zoomIn.addEventListener('click', function () {
      cropper.zoom(0.2);
    });
    // Уменьшение
    zoomOut.addEventListener('click', function () {
      cropper.zoom(-0.2);
    });
    // Поворот по часовой
    rotateRight.addEventListener('click', function () {
      cropper.rotate(10);
    });
    // Поворот против часовой
    rotateLeft.addEventListener('click', function () {
      cropper.rotate(-10);
    });
    // Поровот (вертикальная, горизонтальная)
    reverse.addEventListener('click', function () {
      if (! reverse.classList.contains('active')) {
        // cropper.setAspectRatio(4/3);
        // cropper.reset();
        cropper.destroy();
        cropper = new Cropper(image, optionsReverse);
        reverse.classList.add('active');
      } else {
        // cropper.setAspectRatio(ratio);
        // cropper.reset();
        cropper.destroy();
        cropper = new Cropper(image, options);
        reverse.classList.remove('active');
      }
    });
  }

  // Слайдер до и после
  if ($('.twentytwentySlider').length) {
    $(".twentytwentySlider").twentytwenty({
      no_overlay: true,
      click_to_move: true,
    });
  }

  // Маска для пароля | Inputmask
  if ($('#passwordInput').length) {
    $('#passwordInput').inputmask({
      mask: '999-999-999',
      placeholder: 'X',
      clearMaskOnLostFocus: false
    });
  }

  // Табы
  function tabs() {
    const tabs = $('.js-tabs');
    if (tabs.length) {
      tabs.each(function () {
        let triggers = $(this).find('.js-tabs-trigger');
        let contents = $(this).find('.js-tabs-content');
        let time = 300;
        triggers.on('click', function (e) {
          e.preventDefault();
          let trigger = $(this);
          let content = $('.js-tabs-content[data-href="' + trigger.attr('href') + '"]');
          if (!trigger.hasClass('active')) {
            triggers.removeClass('active');
            trigger.addClass('active');
            contents.hide();
            contents.removeClass('open');
            content.fadeIn(time, function () {
              $(this).addClass('open');
            });
          } else {
            return false;
          }
        })
      });
    }
  }
  tabs();

}