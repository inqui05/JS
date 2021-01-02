const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById('form1'),
        bottomForm = document.getElementById('form2'),
        popUpForm = document.getElementById('form3'),
        body = document.querySelector('body');
    const statusMessage = document.createElement('div');

    //использована маска Максима, которую немного видоизменил
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

export default sendForm;