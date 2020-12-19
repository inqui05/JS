/* eslint-disable strict */
window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function numberModification(number) {
            if (number  < 10) {
                return '0' + number;
            } else {
                return number;
            }
        }

        function updateClock() {
            const timer = getTimeRemaining(deadline);

            if (timer.seconds >= 0) {
                timerHours.textContent = numberModification(timer.hours);
                timerMinutes.textContent = numberModification(timer.minutes);
                timerSeconds.textContent = numberModification(timer.seconds);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        setInterval(updateClock, 1000);
    };
    countTimer('01/01/2021');

    //меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            body = document.querySelector('body');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        body.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('menu') || target.closest('.menu')) {
                handlerMenu();
                return;
            } else if (target.classList.contains('close-btn') || (target.tagName === 'LI' &&
             target.closest('.active-menu')) || (target.tagName === 'A' && target.closest('.active-menu'))) {
                handlerMenu();
                return;
            }

            if (document.getElementsByClassName('.active-menu').length > 0) {
                if (!target.classList.contains('.active-menu')) {
                    console.log(document.getElementsByClassName('.active-menu'));
                    handlerMenu();
                    console.log(document.getElementsByClassName('.active-menu'));
                }
            }
        });
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupWindow = document.querySelector('.popup-content');
        let request;
        let count = 0;

        const animatePopUp = function() {
            request = requestAnimationFrame(animatePopUp);
            count += 10;
            if (count < 500) {
                popupWindow.style.top = (-385 + count) + 'px';
            } else {
                count = 0;
                cancelAnimationFrame(request);
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (document.documentElement.clientWidth > 768) {
                    popupWindow.style.top = '-385px';
                    request = requestAnimationFrame(animatePopUp);
                }
            });
        });

        popUp.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(2000);

    };
    slider();
});
