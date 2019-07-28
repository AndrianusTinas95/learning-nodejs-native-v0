// object reference 
// nilai induk akan berubah

var myObj ={
        name:'Tinas',
        age:23
}

// console.log(myObj);
var obj2 = myObj;
obj2.age = 19;

console.log(myObj);