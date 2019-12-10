let selButton = document.getElementById("selectVideo");
let counter = 0;

selButton.addEventListener('click', function () {
    counter = (counter + 1) % 3;

    console.log(counter);
    sendMessage("ViewSelectionCounter", counter);
});