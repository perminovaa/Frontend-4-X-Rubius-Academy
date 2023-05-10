document.addEventListener('DOMContentLoaded', () => {     

    let mastersMap=[];
    let serviceMap=[];

    // берем данные о мастерах с сервера и добавляем на сайт
    getMasterCard ();

    async function getMasterCard () {
        const response = await fetch('http://localhost:3001/api/staff');
        const content = await response.json();
        console.log (content);    
    
        const masterList = document.querySelector('.mastersList');
    
        let key;

        for (key in content) {
            let fn = content[key].fullName
            mastersMap[fn] = content[key]
            masterList.innerHTML += `
            <option>${fn} </option>`
        }
    }

    // берем данные об услугах с сервера и добавляем на сайт
    getPosition ();

    async function getPosition () {
        const response = await fetch('http://localhost:3001/api/services');
        const content = await response.json();
        console.log (content);

        const serviceList = document.querySelector('.serviceList');
    
        let key;
    
        for (key in content) {
            let fn = content[key].name
            serviceMap[fn] = content[key]
            serviceList.innerHTML += `
            <option>${content[key].name} </option>`
        }
    }

    const form = document.getElementById('form'); 
    const formDialog = document.getElementById('form_dialog');             // находим формы
    const modal = document.querySelector('.modal-alert');                  // находим модальное окно сообщения
    let request;
    let imput;
    
    // обрабатываем данные с быстрой записи
    form.addEventListener('submit', function(e)  {                         // добавляем прослушиватель событий клик
        e.preventDefault();                                                // отключаем поведение по умолчанию
        
        const { name, tel } = this.elements;

        request = {                                                         // пишем в переменную коллекцию данных
            name: name.value,
            phone: tel.value,
        } 
        let formReq = document.querySelectorAll('._req');                   // находим все обязательные поля формы
        formValidate (formReq);                                             // передаем их в функцию проверки валидации
    })

    // обрабатываем данные с большой формы
    formDialog.addEventListener('submit', function(e)  {                    
        e.preventDefault();  

        const { name, tel, mastersList, serviceList, visitDate } = this.elements;

        let master = mastersList.value;
        let masterId = mastersMap[master].id
        
        let service = serviceList.value;
        let serviceId = serviceMap[service].id

        request = {                                                      
            name: name.value,
            phone: tel.value,
            masterId: masterId,
            serviceId: serviceId,
            visitDate: visitDate.value
        } 
        let formReqD = document.querySelectorAll('._reqD');
        formValidate (formReqD);
    })

    // проверяем форму на заполненность обязательных полей
    function formValidate (f) {
        let error = 0;
        
        // перебираем поля
        for (let i = 0; i < f.length; i++) {
            imput = f[i];
            formRemoveError (imput);
            // в случае пустого поля - добавляем подсвечивание
            if (imput.value ===''){
                formAddError(imput);
                error++;
            }
        }
        // если ошибок нет - запускаем функцию отправки данных на сервер
        if (error === 0){
            dispatch ();
        }
    }

    // вспомогательная функция убирает подсвечивание полей
    function formAddError(imput) {
        imput.classList.add('_error');
    }

    // вспомогательная функция добавляет подсвечивание полей
    function formRemoveError (imput) {
        imput.classList.remove('_error');
    }

    // функция отправки данных на сервер
    function dispatch () {
        const loading = document.querySelector('.loading');     // при запуске функции включаем gif loading
        loading.classList.add('_activeload');

        fetch('http://localhost:3001/api/orders', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        .then (response => {
            if (!response.ok) {
                setTimeout (() => {                                     // убрать gif loading через 0.5 секунды
                    loading.classList.remove('_activeload')
                }, 500);
                alert("Произошла ошибка. Повторите попытку позже");

            } else {
                setTimeout (() => {                                     // убрать gif loading и 
                    loading.classList.remove('_activeload');            //  включить модальное окно сообщения через 0.5 секунды
                    modal.classList.add('modal-alert_active'); 
                }, 500);

                $.fancybox.close();                                     // закрываем модальное окно
                form.reset();                   
                formDialog.reset();                                     // очищаем обе формы

                setTimeout (() => {                                      // закрывать модальное окно сообщения через 3 секунды
                    modal.classList.remove('modal-alert_active')
                }, 3000);
            }
        })
    }

    const buttonModalAlert = document.querySelector('.modal-alert-close');      // находим кнопку в модальном окне сообщения

    buttonModalAlert.onclick = () => {                                          // при нажатии на кнопку
        modal.classList.remove('modal-alert_active');                           // убираем активный стиль у модального окна сообщения
    } 
    
    window.addEventListener('click', e => {                                             // добавляем прослушиватель событий клик

        let target = e.target;                                                          // тот, по кому кликнули

        if (!target.closest('.modal-alert') && !target.closest('.modal-alert-close')) { // если клик не по модальному окну и кнопке
            modal.classList.remove('modal-alert_active')                                // убираем активный стиль у модального окна сообщения
        }
    })
})

