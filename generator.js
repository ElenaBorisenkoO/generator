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
const b = yield prom;
const c = yield val;
const d = yield val2;
}

var iterator = gen();

function runner(iterator){
const data = [];

return new Promise(resolve => {

function execute(generator, yieldValue) {
    const next = generator.next(yieldValue);
    let {value, done} = next;

    if (done) {
        return resolve(data);
    }
        if (value instanceof Promise) {
            value.then(
                res => {
                    data.push(res);
                  execute(generator, res);
                },
                res => {
                    data.push(res);
                    execute(generator, res);
                }
            );
        } else if (typeof value === 'function') {
            const result = value();
           data.push(result);
            execute(generator,result);
        }
            data.push(value);
            execute(generator, value);   
    } 
    
execute(iterator);
});
}

runner(iterator).then(data => console.log(data));