let selButton = document.getElementById("selectVideo");
let counter = 0;

selButton.addEventListener('click', function () {
    counter++;
    console.log(counter);
    sendMessage("ViewSelectionCounter", counter);
});