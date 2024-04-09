$(document).ready(function() {
  new WOW().init();

  //Прокрутка до якоря

  const anchors = document.querySelectorAll('a[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href').substr(1)
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  //Pagination

  function setActiveBullet (elem) {
    $(elem).css("background-color", "#C52F06");
  }

  function disableBullet (elem) {
    $(elem).each(function () {
      $(this).css("background-color", "transparent");
    });
  }

  function setLightBulletBorder () {
    $(".pagination__bullet").each(function () {
      $(this).css("border-color", "#ffffff");
    });
  }

  function setDarkBulletBorder () {
    $(".pagination__bullet").each(function () {
      $(this).css("border-color", "#2c2c2c");
    });
  }

  $(window).on("scroll", () => {

    if (($("#header").offset().top) <= (($(window).scrollTop()) + 490) && $("#header-end").offset().top > (($(window).scrollTop()) + 370)) {

      disableBullet($(".pagination__bullet"));
      setActiveBullet($(".bullet-header"));
      setLightBulletBorder();

    } else if (($("#offers").offset().top) <= (($(window).scrollTop()) + 490) && $("#offers-end").offset().top > (($(window).scrollTop()) + 370)) {

      disableBullet($(".pagination__bullet"));
      setActiveBullet($(".bullet-offers"));
      setDarkBulletBorder();

    } else if (($("#portfolio").offset().top) <= (($(window).scrollTop()) + 490) && $("#portfolio-end").offset().top > (($(window).scrollTop()) + 370)) {

      disableBullet($(".pagination__bullet"));
      setActiveBullet($(".bullet-portfolio"));
      setLightBulletBorder();

    } else if (($("#contacts").offset().top) <= (($(window).scrollTop()) + 490)) {

      disableBullet($(".pagination__bullet"));
      setActiveBullet($(".bullet-contacts"));
      setDarkBulletBorder();

    } else {
      disableBullet($(".pagination__bullet"));
    }

  })

  //Смена фона в portfolio

  const portfolioLinks = document.querySelectorAll(".portfolio__link"),
        portfolio = document.querySelector(".portfolio");

  function toggleBgColor() {
    let color = portfolio.style.backgroundColor
    if (color === "rgba(0, 0, 0, 0.8)") {
      portfolio.style.backgroundColor = "#1F1F1F"
    } else {
      portfolio.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
    }
  }

  function toggleBgImg(element) {
    let bg = ".portfolio__bg_" + element.id;
    bgElem = document.querySelector(bg)
    if (bgElem) {
      if (bgElem.style.visibility === "visible") {
        bgElem.style.visibility = "hidden"
      } else {
        bgElem.style.visibility = "visible"
      }
    }
  }

  function linkHoverHandler(element) {
    toggleBgColor();
    toggleBgImg(element)
  }

  portfolioLinks.forEach(element => {
    element.addEventListener("mouseover", () => linkHoverHandler(element));
    element.addEventListener("mouseout", () => linkHoverHandler(element));
  });

  //Модальные блоки

  const cases = document.querySelectorAll(".case"),
        form = document.querySelector(".form"),
        closeButtons = document.querySelectorAll(".modal__close"),
        formClose = document.querySelector(".form__close");

  function disableScroll() {
    body = document.querySelector("body")
    body.style.overflow = "hidden"
  }

  function enableScroll() {
    body = document.querySelector("body")
    body.style.overflow = "auto"
  }

  function openModal(index) {
    modalBlock = cases[index]
    modalBlock.classList.remove("slideOutLeft");
    modalBlock.classList.add("slideInLeft");
    modalBlock.style.display = "block";
    disableScroll()
    setTimeout(() => {
      modalBlock.classList.remove("slideInLeft");
    }, 1000)
  }

  function closeModal(index) {
    modalBlock = cases[index]
    modalBlock.classList.add("slideOutLeft");
    enableScroll()
    setTimeout(() => {
      modalBlock.classList.remove("slideInLeft");
    }, 200)
  }

  for (let i = 0; i < portfolioLinks.length; i++) {
    let element = portfolioLinks[i]
    element.addEventListener("click", () => openModal(i))
  }

  for (let i = 0; i < closeButtons.length; i++) {
    let element = closeButtons[i]
    element.addEventListener("click", () => closeModal(i))
  }

  $(".form-button").each(function(){
    $(this).click(() => {
      $(form).removeClass("slideOutLeft");
      $(form).addClass("slideInLeft");
      $(form).css("display", "block");
      $("body").css("overflow", "hidden");
      setTimeout(() => {
        $(form).removeClass("slideInLeft");
      }, 1000)
    })
  })

  formClose.addEventListener("click", function() {
    $(form).addClass("slideOutLeft");
    $("body").css("overflow", "auto");
    setTimeout(() => {
      $(form).removeClass("slideInLeft");
    }, 200)
  })

  //Мобильное меню

  const menuModal = document.querySelector(".menu-modal"),
        menuOverlay = document.querySelector(".menu-modal__overlay"),
        menuBurger = document.querySelector(".menu-mobile__wrapper"),
        menuBurgerLines = document.querySelector(".menu-mobile");

  function setLightMenuMobile () {
    $(menuBurgerLines).addClass("menu-mobile_light");
    $(menuBurgerLines).removeClass("menu-mobile_dark");
  }

  function setDarkMenuMobile () {
    $(menuBurgerLines).addClass("menu-mobile_dark");
    $(menuBurgerLines).removeClass("menu-mobile_light");
  }

  $(window).on("scroll", () => {

    if (($("#header").offset().top) <= (($(window).scrollTop()) + 20) && $("#header-end").offset().top > (($(window).scrollTop()) + 20) || // Большое и страшное условие для проверки
    ($("#portfolio").offset().top) <= (($(window).scrollTop()) + 20) && $("#portfolio-end").offset().top > (($(window).scrollTop()) + 20)) { // нахождения верхней границы экрана в пределах нужных блоков

      setLightMenuMobile()

    } else {

      setDarkMenuMobile()

    }

  })

  menuBurger.addEventListener("click", function () {
    $(menuModal).removeClass("fadeOutLeft");
    $(menuModal).addClass("fadeInLeft");
    $(menuOverlay).css("display", "block");
    $(menuModal).css("display", "block");
    setTimeout(() => {
      $(menuModal).removeClass("fadeInLeft");
    }, 400)
  })

  menuOverlay.addEventListener("click", function () {
    $(menuModal).addClass("fadeOutLeft");
    $(menuOverlay).css("display", "none");
    setTimeout(() => {
      $(menuModal).css("display", "none");
    }, 200)
  })

  menuModal.addEventListener("click", function () {
    $(menuModal).addClass("fadeOutLeft");
    $(menuOverlay).css("display", "none");
    setTimeout(() => {
      $(menuModal).css("display", "none");
    }, 200)
  })

})