let bodySegmentation;
let options = {
  maskType: "parts",
};
let video;
let segmentation;

function preload() {
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
}

function setup() {
  createCanvas(640, 480);
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
 
    // Start detecting body parts from the webcam video
    bodySegmentation.detectStart(video, gotResults);
  }
  
  function gotResults(result) {
    segmentation = result;
  }



function draw() {
  background(255);
  image(video, 0, 0);
  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }
}
