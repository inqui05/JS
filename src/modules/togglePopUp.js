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

export default togglePopUp;