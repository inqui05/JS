const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        body = document.querySelector('body'),
        service = document.getElementById('service-block'),
        portfolio = document.getElementById('portfolio'),
        calc = document.getElementById('calc'),
        command = document.getElementById('command'),
        connect = document.getElementById('connect');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    body.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('menu') || target.closest('.menu')) {
            handlerMenu();
            return;
        } else if (target.classList.contains('close-btn')) {
            handlerMenu();
            return;
        } else if (target.tagName === 'A' && target.closest('.active-menu') && target.textContent === 'Наши услуги') {
            event.preventDefault();
            handlerMenu();
            service.scrollIntoView({behavior: "smooth"});
            return;
        } else if (target.tagName === 'A' && target.closest('.active-menu') && target.textContent === 'Портфолио') {
            event.preventDefault();
            handlerMenu();
            portfolio.scrollIntoView({behavior: "smooth"});
            return;
        } else if (target.tagName === 'A' && target.closest('.active-menu') && target.textContent === 'Калькулятор стоимости') {
            event.preventDefault();
            handlerMenu();
            calc.scrollIntoView({behavior: "smooth"});
            return;
        } else if (target.tagName === 'A' && target.closest('.active-menu') && target.textContent === 'Наша команда') {
            event.preventDefault();
            handlerMenu();
            command.scrollIntoView({behavior: "smooth"});
            return;
        } else if (target.tagName === 'A' && target.closest('.active-menu') && target.textContent === 'Остались вопросы?') {
            event.preventDefault();
            handlerMenu();
            connect.scrollIntoView({behavior: "smooth"});
            return;
        }

        if (document.getElementsByClassName('.active-menu').length > 0) {
            if (!target.classList.contains('.active-menu')) {
                handlerMenu();
            }
        }
    });
};

export default toggleMenu;