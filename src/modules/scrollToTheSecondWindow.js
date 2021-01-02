const scrollTotheSecondWindow = () => {
    const btn = document.querySelector('main').querySelectorAll('img');
    const expectedElement = document.getElementById('service-block');

    btn[3].addEventListener('click', (event) => {
        event.preventDefault();
        expectedElement.scrollIntoView({behavior: "smooth"});
    });
};

export default scrollTotheSecondWindow;