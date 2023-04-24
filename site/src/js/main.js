
document.addEventListener('DOMContentLoaded', () => {    
    //плавный скролл ссылок
    const smoothLinks = document.querySelectorAll('a[href^="#"]'); //находим все ссылки
    for (let smoothLink of smoothLinks) {                       // for each
        smoothLink.addEventListener('click', function (e) {     // добавляем прослушиватель событий клик
            e.preventDefault();                                 // отключаем поведение по умолчанию
            const id = smoothLink.getAttribute('href');         // отпреляем id ссылки

            document.querySelector(id).scrollIntoView({         // скроллим по id
                behavior: 'smooth',                             // медленно
                block: 'start'                                  // пока контейнер не достигнет top 0
            });
        });
    };

    // активация меню 
    const button = document.querySelector('.burger');           // находим бургег
    const menu = document.querySelector('.container-menu');     // находим контейнер с меню

    button.onclick = () => {                                    // при клике на бургер
        menu.classList.toggle('container-menu_active');         // добавляем или убираем название класса для меню
        button.classList.toggle('burger_close');                // добавляем или убираем название класса для бургера
    }    

    window.addEventListener('click', e => {                     // добавляем прослушиватель событий клик
        const target = e.target;                                // тот, по кому кликнули

        if (!target.closest('.container-menu') && !target.closest('.burger')) {     // если клик не по меню и не по бургеру
        menu.classList.remove('container-menu_active');                             // убираем active стиль у меню
        button.classList.remove('burger_close')                                     // убираем close стиль у бургера
        }
    })

    // Услуги и цены
    openPosition = (e, positionName) => {
        // выключаем все вкладки
        const tabcontent = document.getElementsByClassName("position-list");      
        for (let i = 0; i < tabcontent.length; i++) {                           
        tabcontent[i].style.display = "none";                                
        }

        // убираем стиль у названия вкладок
        const tablinks = document.getElementsByClassName("tablinks");            
        for (let i = 0; i < tablinks.length; i++) {                            
        tablinks[i].className = tablinks[i].className.replace(" active", ""); 
        }

        // включаем нужную вкладку и выделяем название вкладки
        document.getElementById(positionName).style.display = "flex";           
        e.currentTarget.className += " active";                              
    }
})