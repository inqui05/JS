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

export default toggleMenu;