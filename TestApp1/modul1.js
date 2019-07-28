// var name    = "Tinas";
// var age     = 23;

// function Print(){
//     console.log("my name is " + name +" age " +age +" years old"); 
// }

// module.exports.myName = name;
// module.exports.age = age;
// module.exports.print = Print();

module.exports = {
    name : "Tinas",
    age :23,
    print:function(){
        // console.log("I am a function");
        console.log(this.name + ' is ' + this.age + ' years old');
    }
}