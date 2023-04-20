
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

document.addEventListener('DOMContentLoaded', () => {       // после загрузки окна

    let button = document.querySelector('.burger');         // находим бургег
    let menu = document.querySelector('.container-menu');   // находим контейнер с меню

    button.onclick = () => {                                // при клике на бургер
        menu.classList.toggle('container-menu_active');     // добавляем или убираем название класса для меню
        button.classList.toggle('burger_close');            // добавляем или убираем название класса для бургера
    }    

    window.addEventListener('click', e => {                 // добавляем прослушиватель событий клик
        let target = e.target;                              // тот, по кому кликнули

        if (!target.closest('.container-menu') && !target.closest('.burger')) {     // если клик не по меню и не по бургеру
        menu.classList.remove('container-menu_active');                             // убираем active стиль у меню
        button.classList.remove('burger_close')                                     // убираем close стиль у бургера
        }
    })
})

// Услуги и цены

// открывает вкладку с услугами, соответствующую названию вкладки
openPosition = function openPosition(e, positionName) {    
                          // функция приминает значения от tablinks
    // отключаем все вкладки
    let tabcontent = document.getElementsByClassName("position-list");      
    for (let i = 0; i < tabcontent.length; i++) {                           
      tabcontent[i].style.display = "none";                                
    }
    // убираем стиль у названия вкладок
    let tablinks = document.getElementsByClassName("tablinks");            
    for (let i = 0; i < tablinks.length; i++) {                            
      tablinks[i].className = tablinks[i].className.replace(" active", ""); 
    }
    // включаем нужную вкладку и выделяем название вкладки
    document.getElementById(positionName).style.display = "flex";           
    e.currentTarget.className += " active";                              
  }

//   работа с формой в футере

document.addEventListener('DOMContentLoaded', () => {                       // после загрузки окна
    const form = document.getElementById('form'); 
    const formDialog = document.getElementById('form_dialog');                // находим форму
    let modal = document.querySelector('.modal-alert');                     // находим модальное окно сообщения
        
    form.addEventListener('submit', function(e)  {                          // добавляем прослушиватель событий клик
        e.preventDefault();                                                 // отключаем поведение по умолчанию
        
        const { name, tel } = this.elements;

        console.log ({                                                      // пишем в консоль коллекцию данных
            name: name.value,
            phone: tel.value,
        })     

        modal.classList.add('modal-alert_active');                          // задаем модальному окну сообщения активный стиль

        setTimeout (() => {                                                 // закрывать модальное окно сообщения через 3 секунды
            modal.classList.remove('modal-alert_active')
        }, 3000);

        this.reset();                                                       // очищаем форму
    })

    formDialog.addEventListener('submit', function(e)  {                          // добавляем прослушиватель событий клик
        e.preventDefault();                                                 // отключаем поведение по умолчанию
        
        const { name, tel, mastersList, serviceList, visitDate } = this.elements;

        let masterId = mastersList.value - 1;
        console.log ({                                                      // пишем в консоль коллекцию данных
            name: name.value,
            phone: tel.value,
            masterId: mastersList.value,
            serviceId: serviceList[masterId].value,
            visitDate: visitDate.value
        })     


        modal.classList.add('modal-alert_active');                          // задаем модальному окну сообщения активный стиль

        setTimeout (() => {                                                 // закрывать модальное окно сообщения через 3 секунды
            modal.classList.remove('modal-alert_active')
        }, 3000);

        this.reset();                                                       // очищаем форму
    })

    let buttonModalAlert = document.querySelector('.modal-alert-close');        // находим кнопку в модальном окне сообщения

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

let select = document.getElementById('mastersList');
let block = document.querySelectorAll('.block-position');
let lastIndex = 0; // После каждой смены опции, сохраняем сюда индекс предыдущего блока

select.addEventListener('change', function() {
  block[lastIndex].style.display = "none"; 
  // Чтобы сразу делать именно его невидимым при следующей смене 

  let index = select.selectedIndex; // Определить индекс выбранной опции
  block[index].style.display = "block"; // Показать блок с соответствующим индексом

  lastIndex = index; // Обновить сохраненный индекс.
});