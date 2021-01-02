'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calculater from './modules/calculater';
import changeImg from './modules/changeImg';
import sendForm from './modules/sendForm';

//таймер
countTimer('01/20/2021');
//меню
toggleMenu();
//popup
togglePopUp();
//табы
tabs();
//слайдер
slider();
//калькулятор
calculater();
//меняем изображения
changeImg();
//send-ajax-form
sendForm();