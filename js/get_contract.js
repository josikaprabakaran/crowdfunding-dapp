let contractAddress = "0xFA5d57964b73A91638C720982f90526976D0396a";

let manager;

const web3 = new Web3("http://127.0.0.1:7545")
const contract = new web3.eth.Contract(abi, contractAddress)
contract.methods.manager().call().then((e) => {
    manager = e;
})

function getManager() {
    document.getElementById("manager").innerHTML = manager;
}

const transact = async() => {
    console.log("Add method calling");
    
    let description = document.getElementById("description").value;
    let value = document.getElementById("value").value;
    // let recipient = document.getElementById("recipient").value;
    let rec = document.getElementById("recepient").value;
    
    var res;

    await contract.methods.createRequest(description,value,rec).send({ from: manager, gas: 3000000 }).then(e => res = e)
    if (res)
        alert("Request added Successfully");
    else
        alert("Couldn't Add!..");

}

const approvers = async() => {
    console.log("Add method calling");
    
    
    let rec = document.getElementById("recepient").value;
    
    var res;

    await contract.methods.manager().call().then(e => res = e)
    if (res)
        alert("APPROVER APPOINTED");
    else
        alert("Couldn't Add!..");

}

// html+=`<p>${cars[x]}:${data[x]}</p>`
function getSummary() {
    var inf = ["Minimum contribution", "Amount", "Request count","Approver count","Manager"];
    var html=""
    contract.methods.getSummary().call().then((data)=>{
        for(let x =0;x<5;x++){
            html+=`<p>${inf[x]}:${data[x]}</p>`
        }
        document.getElementById("summary").innerHTML = html;   
    })
     

}

function approve(){
    let approve = document.getElementById("Account").value;
    contract.methods.approveRequest(approve).send({from:manager ,gas: 3000000 }).then(e => res = e).catch(e=>{
        document.getElementById("approvererror").innerHTML = e
    })
    
}

function contribute(){
    let sendmoney = document.getElementById("contri").value;
    console.log(sendmoney);
    contract.methods.contribute().send({from:manager,gas:3000000 ,value:sendmoney}).then(console.log).catch(e=>{
        document.getElementById("contrierror").innerHTML = e
    })

}

function finalise(){
    let finalise = document.getElementById("final").value;
    contract.methods.finalizeRequest(finalise).send({from:manager ,gas: 3000000 }).then(e => res = e).catch(e=>{
        document.getElementById("finaliseerror").innerHTML = e
    })
    
}
const approvalcnt = async() => {
    
    
    var res;
    
        await contract.methods.approversCount().call().then(e => res = e)
      document.getElementById("cnt").innerHTML = res;
    }



const reqcnt = async() => {
    
    
    var res1;
    
        await contract.methods.getRequestsCount().call().then(e => res1 = e)
      document.getElementById("rcnt").innerHTML = res1;
    

}




const mincont = async() => {
    
    
    var res2;
    
        await contract.methods.minimumContribution().call().then(e => res2 = e)
      document.getElementById("mc").innerHTML = res2;
    

}


function request() {

 var html=""
    //contract.methods.requests(0).call().then(e=>console.log(e))
    let req = document.getElementById("index1").value;
    contract.methods.requests(req).call().then((data)=>{
        var information = ["Description", "Amount", "Address","Finalise","Approved"];
        for(let x =0;x<5;x++){
            html+=`<p>${information[x]}:${data[x]}</p>`
        }
        document.getElementById("index").innerHTML = html;   
    })
     

}
















const updatePackage = async() => {
    console.log("Update method calling");
    let _packageId = document.getElementById("pid").value;
    let _status;
    var res;

    var ele = document.getElementsByName('status');

    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            _status = ele[i].value;
    }
    let _time = document.getElementById("time-update").value;
    _status = _status + ' at ' + _time;

    await contract.methods.updateShipment(_packageId, _status).send({ from: adminId, gas: 3000000 }).then(e => res = e)
    if (res)
        alert("Status updated Successfully");
    else
        alert("Couldn't Update!..");

}




































































// const trackPackage = async() => {
//     console.log("Track method calling");
//     let _packageId = document.getElementById("pid").value;
//     var res;

//     await contract.methods.currentStatus(_packageId).call().then(e => res = e)
//     console.log(res);
//     if (res)
//         alert("See your status now!..");
//     else
//         alert("Couldn't Add!..");

// }

const getHistory = async() => {
    $(document).ready(function() {
        $("#status-history").show();
    });
    console.log("History method calling");
    let _packageId = document.getElementById("accounts").value;
    var res;
    await contract.methods.getStatusHistory(_packageId).call().then(e => res = e)
    if (res) {
        _arr = res;
        console.log(res[0], res[1], res[2], res[3]);
        var _status1 = res[0];
        var _status2 = res[1];
        var _status3 = res[2];
        var _status4 = res[3];
        if (_status2 == -1)
            _status2 = "...";
        if (_status3 == -1)
            _status3 = "...";
        if (_status4 == -1)
            _status4 = "...";
        document.getElementById("status2").innerHTML = _status2;
        document.getElementById("status3").innerHTML = _status3;
        document.getElementById("status4").innerHTML = _status4;

        var element;
        if (res[1] != "-1") {
            element = document.getElementById("shipped");
            element.classList.remove("progtrckr-todo");
            element.classList.add("progtrckr-done");
        }
        if (res[2] != "-1") {
            element = document.getElementById("ofd");
            element.classList.remove("progtrckr-todo");
            element.classList.add("progtrckr-done");
        }
        if (res[3] != "-1") {
            element = document.getElementById("delivered");
            element.classList.remove("progtrckr-todo");
            element.classList.add("progtrckr-done");
        }

    } else
        alert("Couldn't Add!..");

}

// $(document).ready(function() {
//     $("#").click(function() {
//         $("#status-history").show();
//     });
// });