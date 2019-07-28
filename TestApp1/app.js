// setTimeout(function(){
//     console.log("saya ditampilakan denagan jeda 3 detik");
// },3000);
// function Order(id){
//     console.log("ID Order "+id);
//     ProsesOrder(id);
// }

// function ProsesOrder(idOrder){
//     setTimeout(function(){
//         console.log("ID Order "+ idOrder +" Prosessed");
//     },3000);
// }

// Order(101);//first exceusion
// Order(102);//secon exsecution
// Order(103);//last exsecusion

function Order(id,timeOut){
    console.log("ID Order "+id);
    ProsesOrder(id,timeOut);
}

function ProsesOrder(idOrder,timeOut){
    setTimeout(function(){
        console.log("ID Order "+ idOrder +" Prosessed");
    },timeOut);
}

Order(101,5000);//last exsecusion
Order(102,2000);//first exsecusion
Order(103,3000);//secon exsecusion

