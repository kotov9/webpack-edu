import('lodash').then(_ => console.log('Lodash', _.random(0, 100, true)))

const start = async () => {
  return Promise.resolve('Async is working!');
}

class Utill {
  static id = "23";
}

let unused = true;

start().then(console.log);
console.log("Id:", Utill.id);

