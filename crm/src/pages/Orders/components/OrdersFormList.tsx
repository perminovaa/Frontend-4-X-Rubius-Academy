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