const syncWait = (ms) => {
  const end = Date.now() + ms;
  while (Date.now() < end) continue;
};

const el = document.createElement("p");
el.innerText = "Hello world!";

document.body.appendChild(el);
console.log(el.getBoundingClientRect());

syncWait(5000);
