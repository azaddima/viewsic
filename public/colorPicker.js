let canvas = document.getElementById("canvasWheel");
let ctx = canvas.getContext("2d");
let img = document.getElementById("sourceImage");
let keyDisplay = document.getElementById("keyDisplay");

let red = [254,0,1,255],
    orange = [254,127,1,255],
    yellow = [254, 255, 1, 255],
    lightGreen = [128, 254, 0, 255],
    green = [0, 255, 1, 255],
    green0 = [0, 255, 0, 255],
    springGreen = [1, 255, 127, 255],
    cyan1 = [1, 255, 255, 255],
    cyan = [0, 255, 255, 255],
    lightBlue = [1, 128, 254, 255],
    blue = [1, 0, 253, 255],
    violet = [127, 1, 254, 255],
    pink = [255, 0, 255, 255],
    pink254 = [254, 0, 254, 255],
    magenta = [254, 0, 128, 255],
    magenta127 = [254, 0, 127, 255],
    magenta126 = [254, 1, 126, 255];


window.onload = function() {
  ctx.drawImage(img, 0, 0);
};

function getMousePos(canvas, e) {
  let rect = canvas.getBoundingClientRect();
  return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
}

function pixelData(pixelX, pixelY){
  return(ctx.getImageData(pixelX, pixelY, 1, 1));
}

canvas.addEventListener("mousedown", function (e) {
  let mousePos = getMousePos(canvas, e);
  let pixel = pixelData(mousePos.x, mousePos.y);
  let color = [];
  console.log(pixel);

  for (let i = 0; i < pixel.data.length;i++){
    color.push(pixel.data[i]);
  }
  switch (color.toString()) {
    case red.toString():
     console.log('Red');
     keyDisplay.innerHTML = 'Root: C';
     changeKey(0);
     break;
    case orange.toString():
      console.log('Orange');
      keyDisplay.innerHTML = 'Root: C#';
      changeKey(1);
      break;
    case yellow.toString():
      console.log('Yellow');
      keyDisplay.innerHTML = 'Root: D';
      changeKey(2);
      break;
    case lightGreen.toString():
      console.log('Light Green');
      keyDisplay.innerHTML = 'Root: D#';
      changeKey(3);
      break;
    case green.toString():
      console.log('Green');
      keyDisplay.innerHTML = 'Root: E';
      changeKey(4);
      break;
    case green0.toString():
      console.log('Green');
      keyDisplay.innerHTML = 'Root: E';
      changeKey(4);
      break;
    case springGreen.toString():
      console.log('Spring green');
      keyDisplay.innerHTML = 'Root: F';
      changeKey(5);
      break;
    case cyan.toString():
      console.log('Cyan');
      keyDisplay.innerHTML = 'Root: F#';
      changeKey(6);
      break;
    case cyan1.toString():
      console.log('Cyan');
      keyDisplay.innerHTML = 'Root: F#';
      changeKey(6);
      break;
    case lightBlue.toString():
      console.log('Light Blue');
      keyDisplay.innerHTML = 'Root: G';
      changeKey(7);
      break;
    case blue.toString():
      console.log('Blue');
      keyDisplay.innerHTML = 'Root: G#';
      changeKey(8);
      break;
    case violet.toString():
      console.log('Violet');
      keyDisplay.innerHTML = 'Root: A';
      changeKey(9);
      break;
    case pink.toString():
      console.log('Pink');
      keyDisplay.innerHTML = 'Root: A#';
      changeKey(10);
      break;
    case pink254.toString():
      console.log('Pink');
      keyDisplay.innerHTML = 'Root: A#';
      changeKey(10);
      break;
    case magenta.toString():
      console.log('Magenta');
      keyDisplay.innerHTML = 'Root: B';
      changeKey(11);
      break;
    case magenta126.toString():
      console.log('Magenta');
      keyDisplay.innerHTML = 'Root: B';
      changeKey(11);
      break;
    case magenta127.toString():
      console.log('Magenta');
      keyDisplay.innerHTML = 'Root: B';
      changeKey(11);
      break;
    default:
      console.log('something went wrong :o')
  }
});

