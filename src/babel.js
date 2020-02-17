const start = async () => {
  return Promise.resolve('Async is working!');
}

class Utill {
  static id = "23";
}

start().then(console.log);
console.log("Id:", Utill.id);