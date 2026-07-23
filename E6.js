/*function sayhello(a,b){
    console.log("Hello World");
    return a+b;
}
console.log(sayhello(3,2));
//arrow function
const sayhello1 = (a,b) => {
    console.log("Hello World");
    return a+b;
}
console.log(sayhello1(8,3));*/

//DAY 2
//synchronous function
console.log("task 3")
function hello(){
    console.log("task 2");       //setTimeout function-delay
    setTimeout(function(){
        console.log("task 4");
    }, 2000);
}
hello();
console.log("task 2");