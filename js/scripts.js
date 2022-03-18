var today = new Date();
var Hours, Minutes, date, month, year;
date = today.getDate();
month = today.getMonth()
year = today.getFullYear();
Hours = today.getHours();
Minutes = today.getMinutes();
meridiem = (Hours <= 12) ? 'AM' : 'PM';
Hours = Hours ? Hours : '12';
Hours = Hours > 12 ? Hours - 12 : Hours;
Minutes = (10 > Minutes) ? '0' + Minutes : Minutes;
currentDate = date + '/' + month + '/' + year + ' - ' + Hours + ' : ' + Minutes + ' : ' + today.getSeconds() + ' ' + meridiem;

document.getElementById("time-add").value = currentDate;
document.getElementById("time-update").value = currentDate;

web3 = new Web3("http://127.0.0.1:7545")
async function updateAccounts() {
    await web3.eth.getAccounts().then(async(e) => {
        accounts = e;
        html = ""
        await e.forEach((element, i) => {
            if (i == 0) {
                html += `<option value="${element}" selected>${element}</option> `
            } else {
                html += `<option value="${element}">${element}</option> `
            }
        });
        await $("#accounts").html(html)
    })
}