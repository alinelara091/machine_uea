let handPose;
let video;
let hands = [];
let painting;

function preload() {
  handPose = ml5.handPose({flipped: true});
}

//funcion para ver datos 
function mousePressed(){
  console.log(hands);
}

function setup() {
  createCanvas(640, 480);
  painting= createGraphics(640,480);
  painting.clear();
  // Create the video and hide it
  video = createCapture(VIDEO, {flipped: true});
  video.size(640, 480);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

}
// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  image(video, 0, 0, width, height);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
     // let keypoint = hand.keypoints[j];
      let index = hand.keypoints [12];
      fill(0, 255, 0);
      noStroke();
      //circle(keypoint.x, keypoint.y, 9);
     painting.fill(102, 255, 153);
      painting.noStroke();
      painting.circle (index.x, index.y, 10, 10);


    }
  }
  image(painting, 0, 0);
}
