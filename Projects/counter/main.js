let countElement = document.getElementById("count-el");
countElement.textContent = count = 0;

function decrease() {
    count--;
    countElement.textContent = count;
}


function increase() {
    count++;
    countElement.textContent = count;
}


function reset() {
    count = 0;
    countElement.textContent = count;
}

console.log(count);