function sum(a,b){
return a+b;
}

var prom = new Promise (res => {
setTimeout(res,1000,10);
});

var val = 12;
var val2 = {name:"jack"};

function* gen(){
const a = yield () => sum(1,2);
console.log(a);
const b = yield prom;
console.log(b);
const c = yield val;
console.log(c);
const d = yield val2;
console.log(d);
}
var iterator = gen();

function runner(iterator){
let data = [];
return new Promise(resolve => {

function execute(generator, yieldValue) {

    let next = generator.next(yieldValue);

    if (!next.done) {
        if (next.value instanceof Promise) {
            next.value.then(
                res => {
                    data.push(res);
                    execute(generator, res);
                },
                res => {
                    data.push(res);
                    execute(generator, res);
                }
            );
        } else if (typeof next.value === 'function') {
           data.push(next.value());
            execute(generator,next.value());
        } else {
            data.push(next.value);
            execute(generator, next.value);
        }
    } else {
        resolve(data);
    }
}
execute(iterator);
});
}

runner(iterator).then(data => console.log(data));