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
            if (target.classList.contains('menu') || target.tagName === 'IMG' || target.tagName === 'SMALL') {
                handlerMenu();
                return;
            } else if (target.classList.contains('close-btn') || target.tagName === 'LI' || target.tagName === 'A') {
                handlerMenu();
                return;
            }

            if (document.getElementsByClassName('.active-menu')) {
                if (!target.classList.contains('.active-menu')) {
                    handlerMenu();
                }
            }
        });

        /*const onClick = () => {
            const target = event.target;
            if (target.classList.contains('close-btn') || target.tagName === 'A') {
                body.removeEventListener('click', onClick);
                handlerMenu();
            } else {
                if (!target.classList.contains('active-menu')) {
                    handlerMenu();
                }
            }
        };

        btnMenu.addEventListener('click', event => {
            const target = event.target;

            if (target.classList.contains('menu')) {
                handlerMenu();
            }

            body.addEventListener('click', onClick);
        });*/
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
});
