let handPose;
let video;
let hands = [];
let dedo;             // índice
let dedoMedio;        // medio
let pintar;           // capa para dibujar

let trayectoriaMedio = []; // guarda los puntos del dedo medio

function preload() {
  handPose = ml5.handPose({flipped:true});
}

function setup() {
  createCanvas(1280,720);
  video = createCapture(VIDEO,{flipped:true});
  video.size(1280,720);
  video.hide();
  handPose.detectStart(video, gotHands);

  pintar = createGraphics(1280,720);  // capa de dibujo
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    //  puntas del índice y medio
    dedo = hand.keypoints.find(p => p.name === "index_finger_tip");
    dedoMedio = hand.keypoints.find(p => p.name === "middle_finger_tip");

    // Dedo índice: pintar círculos 
    if (dedo) {
      pintar.fill(102, 0, 255); // naranja
      pintar.noStroke();
      pintar.circle(dedo.x, dedo.y, 25);
    }

    // Dedo medio: guardar y dibujar línea verde
    if (dedoMedio) {
      trayectoriaMedio.push({ x: dedoMedio.x, y: dedoMedio.y });

      pintar.noFill();
      pintar.stroke(0, 255, 0);  // verde
      pintar.strokeWeight(4);
      pintar.beginShape();
      for (let pt of trayectoriaMedio) {
        pintar.vertex(pt.x, pt.y);
      }
      pintar.endShape();
    }

    // (opcional) Comentado: dibujo de todos los puntos
    /*
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 15);
    }
    */
  }

  image(pintar, 0, 0); // Mostrar la capa de dibujo
}
