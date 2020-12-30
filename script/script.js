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
        updateClock();
        setInterval(updateClock, 1000);
    };
    countTimer('01/01/2021');

    //меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
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
                    handlerMenu();
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

    //калькулятор
    const calculater = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        //честно позаимствованный блок с learn.javascript.ru для анимации
        const animate = ({ timing, draw, duration }) => {
            const start = performance.now();

            requestAnimationFrame(function animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) {
                    timeFraction = 1;
                }

                const progress = timing(timeFraction);

                draw(progress);

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        };

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            animate({
                duration: 1000,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    totalValue.textContent = Math.floor(progress * total);
                },
            });
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (event.target.matches('.calc-square, .calc-count, .calc-day')) {
                event.target.value = event.target.value.replace(/\D/g, '');
            }

            if (target.matches('.calc-type, .calc-square, .calc-count, .calc-day')) {
                countSum();
            }
        });
    };
    calculater();

    //меняем изображения
    const numberOne = () => {
        const body = document.querySelector('body');

        const changeImg = () => {
            let temporaryImg;

            if (event.target.tagName === 'IMG' && event.target.dataset.img !== undefined) {
                temporaryImg = event.target.src;
                event.target.src = event.target.dataset.img;
                event.target.dataset.img = temporaryImg;
            }
        };

        body.addEventListener('mouseover', changeImg);
        body.addEventListener('mouseout', changeImg);
    };
    numberOne();

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById('form1'),
            bottomForm = document.getElementById('form2'),
            popUpForm = document.getElementById('form3'),
            body = document.querySelector('body');
        const statusMessage = document.createElement('div');

        //использована маска Максима, только маску сделал другую
        const maskPhone = (masked = '+7 (___) ___-__-__') => {
            const elems = document.querySelectorAll('.form-phone');

            function mask(event) {
                const keyCode = event.keyCode;
                const template = masked,
                    def = template.replace(/\D/g, ""),
                    val = this.value.replace(/\D/g, "");
                let i = 0,
                    newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
                i = newValue.indexOf("_");
                if (i !== -1) {
                    newValue = newValue.slice(0, i);
                }
                let reg = template.substr(0, this.value.length).replace(/_+/g,
                    a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                    this.value = newValue;
                }
                if (event.type === "blur" && this.value.length < 5) {
                    this.value = "";
                }
            }

            for (const elem of elems) {
                elem.addEventListener("input", mask);
                elem.addEventListener("focus", mask);
                elem.addEventListener("blur", mask);
            }
        };

        const checkName = () => {
            const elems = document.querySelectorAll('.form-name'),
                bottomElem = document.querySelector('#form2-name'),
                newElems = [...elems, bottomElem];

            for (const elem of newElems) {
                elem.addEventListener("input", event => {
                    event.target.value = event.target.value.replace(/[^А-ЯЁа-яё ]/g, '');
                });
            }
        };

        const checkEmail = () => {
            const elems = document.querySelectorAll('.form-email');

            for (const elem of elems) {
                elem.addEventListener("input", event => {
                    // eslint-disable-next-line max-len
                    event.target.value = event.target.value.replace(/[^a-zA-Z0-9.@!#$%&+_-]*$/, '');
                });
            }
        };

        const checkMessage = () => {
            document.getElementById('form2-message').addEventListener("input", event => {
                event.target.value = event.target.value.replace(/[^?!,.а-яА-ЯёЁ0-9\s]+$/g, '');
            });
        };
        maskPhone('+7 ___ ___-__-__');
        checkName();
        checkEmail();
        checkMessage();

        const postData = (currentForm, jsonBody) => fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'applicatin/json'
            },
            body: JSON.stringify(jsonBody)
        });

        body.addEventListener('submit', event => {
            event.preventDefault();
            const target = event.target;
            const jsonBody = {};

            let formData,
                currentForm;

            statusMessage.innerHTML = `
            <div class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
            <style type="text/css">
            .spinner {
                margin: 100px auto;
                width: 50px;
                height: 40px;
                text-align: center;
                font-size: 10px;
              }
              
              .spinner > div {
                background-color: #05C8FF;
                height: 100%;
                width: 6px;
                display: inline-block;
                
                -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
                animation: sk-stretchdelay 1.2s infinite ease-in-out;
              }
              
              .spinner .rect2 {
                -webkit-animation-delay: -1.1s;
                animation-delay: -1.1s;
              }
              
              .spinner .rect3 {
                -webkit-animation-delay: -1.0s;
                animation-delay: -1.0s;
              }
              
              .spinner .rect4 {
                -webkit-animation-delay: -0.9s;
                animation-delay: -0.9s;
              }
              
              .spinner .rect5 {
                -webkit-animation-delay: -0.8s;
                animation-delay: -0.8s;
              }
              
              @-webkit-keyframes sk-stretchdelay {
                0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
                20% { -webkit-transform: scaleY(1.0) }
              }
              
              @keyframes sk-stretchdelay {
                0%, 40%, 100% { 
                  transform: scaleY(0.4);
                  -webkit-transform: scaleY(0.4);
                }  20% { 
                  transform: scaleY(1.0);
                  -webkit-transform: scaleY(1.0);
                }
              }
           </style>`;

            if (target === form) {
                currentForm = form;
                formData = new FormData(form);
                form.appendChild(statusMessage);
            } else if (target === bottomForm) {
                currentForm = bottomForm;
                formData = new FormData(bottomForm);
                bottomForm.appendChild(statusMessage);
            } else if (target === popUpForm) {
                currentForm = popUpForm;
                formData = new FormData(popUpForm);
                popUpForm.appendChild(statusMessage);
            }

            formData.forEach((val, key) => {
                jsonBody[key] = val;
            });

            postData(currentForm, jsonBody)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Network status is not 200');
                    }
                    currentForm.reset();
                    statusMessage.style.cssText = 'font-size: 2rem;';
                    statusMessage.style.color = '#FFFFFF';
                    statusMessage.textContent = successMessage;
                    setTimeout(() => statusMessage.remove(), 5000);
                })
                .catch(error => {
                    statusMessage.style.cssText = 'font-size: 2rem;';
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });
    };
    sendForm();
});
