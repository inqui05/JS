const changeImg = () => {
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

export default changeImg;