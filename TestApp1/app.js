// object this
var myObj = {
    name : "Tinas",
    age :23,
    print:function(){
        console.log(this.name + ' is ' +this.age +' years old');
        console.log(this===myObj);
    }
}

// myObj.print();

function myFunction(){
    console.log(" I am My Function");
    console.log(this===global);
}


myObj.print();
console.log('------------');
myFunction();