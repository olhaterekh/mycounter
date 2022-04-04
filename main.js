let form = document.forms['form'];
let tbody = document.querySelector('.tbody');

let currentId;
let id = 0;

class MyBank {
    constructor() {
        this.bank = form.bank.value;
        this.summa = form.summa.value;
        this.rate = form.rate.value;
        this.time = form.time.value;
    }
    block(block, none) {
        form.btnAdd.style.display = none;
        form.btnEdit.style.display = block;
    }
}
let myBank = new MyBank();



let input = x => document.querySelector(x);

let regSumma = /^(\d{5,6}|1000000)$/;
let regRate = /^([1-9]|1[0-9]|2[0-6])$/;
let regTime = /^([6-9]|\d{2}|[1-3][1-5][0-9]|360)$/;


form.btnAdd.addEventListener('click', function () {

    let test = regSumma.test(form.summa.value);
    let test2 = regRate.test(form.rate.value);
    let test3 = regTime.test(form.time.value);

    if (!test) {input('.number').style.borderColor = 'red'}
    else{ input('.number').style.borderColor = ''; }
    
    if (!test2) {input('.rate').style.borderColor = 'red'}
    else { input('.rate').style.borderColor = ''; }
    
    if (!test3) {input('.time').style.borderColor = 'red'}
    else { input('.time').style.borderColor = ''; }
    
    if (form.bank.value.length == 0) { input('.bank').style.borderColor = 'red'}
    else { input('.bank').style.borderColor = ''; }

    if (test && test2 && test3 && form.bank.value.length > 0) { addBank() }
    else {  alert('Перевірте,будь ласка, поля.') }


});
let arr = [];
function addBank() {
    myBank = new MyBank();
    arr.push(myBank);
    render();
    form.reset();

}


function render() {

    tbody.innerHTML = '';
    arr.forEach((iteam, ind) => {
    // let resSumma = +iteam.summa* +iteam.rate *(+iteam.time+1)/(24*100);
    
    let resMonth = ((+iteam.summa* +iteam.rate)/100+ +iteam.summa)/ +iteam.time;
    let resTotal = (+iteam.summa* +iteam.rate)/100+ +iteam.summa;
    let resSumma = resMonth-(+iteam.summa/ +iteam.time);

        let message = `
        <tr>
        <th>${ind + 1}.  ${iteam.bank}</th>
        <td class="papa" id="${ind}">${iteam.summa}</td>
        <td class="papa" id="${ind}">${iteam.rate}</td>
        <td class="papa" id="${ind}">${iteam.time}</td>
        // <td id="${ind}" style="color:green"> ${Math.round(resSumma)}</td>
        <td id="${ind}" style="color:green">${Math.round(resMonth)} </td>
        <td id="${ind}" style="color:green">${Math.round(resTotal)}</td>
        <td> <button id="${ind}"  type="button" class="btn btn-secondary edit" name="etid">Редагувати</button></td>
        <td> <button id="${ind}" type="button" class="btn btn-secondary delete">Видалити</button> </td>
        </tr>
        `;
        tbody.innerHTML += message;

    });
}
tbody.addEventListener('click', deleteBank);
function deleteBank(event) {
    let target = event.target.innerHTML;
    if (target === 'Видалити') {
        let id = event.target.getAttribute('id');
        arr.splice(id, 1);
        form.reset();
        render();
    }
}


tbody.addEventListener('click', editList);
function editList(event) {
    let target = event.target.innerHTML;
    if (target === 'Редагувати') {
        let id = event.target.getAttribute('id');
        arr.forEach((it, i) => {
            if (i == id) {
                form.bank.value = it.bank,
                    form.summa.value = it.summa,
                    form.rate.value = it.rate,
                    form.time.value = it.time;
            }
        });
        currentId = id;
        myBank.block('block', 'none');
    }
}



form.btnEdit.addEventListener('click', saveEditList);



function saveEditList() {
    let myBank = new MyBank();

    let test = regSumma.test(form.summa.value);
    let test2 = regRate.test(form.rate.value);
    let test3 = regTime.test(form.time.value);
    
    if (test && test2 && test3 && form.bank.value.length > 0) { 

    const formBank = myBank.bank;
    const formSumma = myBank.summa;
    const formRate = myBank.rate;
    const formTime = myBank.time;
    arr.forEach((el, i) => {
        if (i === +currentId) {
            if (el.time !== formTime)
                el.time = formTime;
            if (el.rate !== formRate)
                el.rate = formRate;
            if (el.summa !== formSumma)
                el.summa = formSumma;
            if (el.bank !== formBank)
                el.bank = formBank;
        }
    });
    
    }
    else {  alert('Перевірте,будь ласка, поля.') }
    render();
    form.reset();
    myBank.block('none', 'block');
}
