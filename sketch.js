/**
 * type using pixels of an invisibly draw text to draw a grid of dots 
 *
 * KEYS
 * a-z                  : text input (keyboard)
 * backspace            : delete last typed letter
 * ctrl                 : save png
 */

var textTyped = "HELLO";
var textText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
var textPointer = 0;
var font;
var fontSize = 250;
var textImg;
var rand;
var pointDensity = 8;
function preload() {
  font = loadFont("data/WorkSans-Bold.ttf");
  font2 = loadFont("data/WorkSans-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupText();
  textFont(font2);
  textSize(12);
  textAlign(LEFT,CENTER);
}

function setupText() {
  // create an offscreen graphics object to draw the text into
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textFont(font);
  textImg.textSize(fontSize)
  textImg.text(textTyped, 100, fontSize + 50);
  textImg.loadPixels();
}


function draw() {
  background(255);

  
//  noStroke();

    var tx = 10;
    var ty = 20;
    while (ty < 500) {

        // Calculate the index for the pixels array from x and y
        var index = floor(tx + ty * textImg.width) * 4;
        // Get the red value from image
        var r = textImg.pixels[index];

        
        var char = textText[textPointer];
        textPointer++;
        if (textPointer >= textText.length) {
            textPointer = 0;
        }
//        fill("#4d4d4f");
        fill("grey");
            textSize(12);
//            textStyle(NORMAL);
            textFont(font2);
            text(char, tx, ty);
            
        
        if (r < 128) {
           
            rand = Math.random();
            if(rand <0.3){
              
                 fill("#333132");
            } else if (rand < 0.5){
              
                fill("#322312");
            }
            else {
                fill("#122314");
               
            }
//            
//            fill("black");
            textFont(font);
            text(char, tx, ty-5);

        }
//            else{
//            fill("#4d4d4f");
//            textSize(12);
////            textStyle(NORMAL);
//            textFont(font2);
//            text(char, tx, ty);
//            
//        }
        
        
        var cWidth = textWidth(char);
        tx += cWidth;
        if (tx > width) {
            tx = 10;
            ty += 15;
        }
        
    }
    
    
    fill(0);
//  for (var x = 0; x < textImg.width; x += pointDensity) {
//    for (var y = 0; y < textImg.height; y += pointDensity) {
//      // Calculate the index for the pixels array from x and y
//      var index = (x + y * textImg.width) * 4;
//      // Get the red value from image
//      var r = textImg.pixels[index];
//
//      if (r < 128) {
//
//        // This might be the place to change things. From here ... ---------
//
////        ellipse(x, y, 10, 15);
//          
//          text("b", x, y);
//        // ... to here -----------------------------------------------------
//
//      }
//    }
//  }

}

function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      setupText();
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    setupText();
  }
}