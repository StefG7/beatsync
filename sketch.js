//global variables
let scene = 1;
let cnv,amp,song1,song2,song3,song4,song5,song6,sun,font;
let planet,sat,satimg,star,sides,hue,sel,sel2,mainsong;
let skull,gas,mountain,linePattern,vaporwave,vaporwave1;
let angry,angry1,gold,vol,metal,pedestal,treeLow,play,pause;
// var button1,button2,button3;
let pick = 'My Universe'
let big = 0.1;
let spin = 1;
let p1,p2,p3,t1,t2;
let playToggle = false;
//particles
var diam = 50;
var boxSz = 10;
var boxSy = 150;
var boxMove = 50;
var numSpheres = 100;
var balls = [];
var t = 0.0;

function preload() {
  // songs & other
  song1 = loadSound('songs/myuniverse.mp3')
  song2 = loadSound('songs/cpr.mp3')
  song3 = loadSound('songs/slowdownturbo.mp3')
  song4 = loadSound('songs/canyoufeelmyheart.mp3')
  song5 = loadSound('songs/mcr.mp3')
  song6 = loadSound('songs/kissme_neon.mp3')
  play = loadImage('assets/play.png')
  pause = loadImage('assets/pause.png')
  // scene1
  skull = loadModel('assets/skull.obj', true)
  gas = loadImage('assets/gas.jpeg')
  mountain = loadModel('assets/Mountain.obj')
  linePattern = loadImage('assets/linePattern1.jpeg')
  vaporwave = loadImage('assets/vaporwave.jpeg')
  vaporwave1 = loadImage('assets/vaporwave1.jpeg')
  pedestal = loadModel('assets/pedestal.obj', true)
  treeLow = loadModel('assets/treeLow.obj', true)
  angry = loadImage('assets/angry.jpeg')
  angry1 = loadImage('assets/angry1.jpeg')
  metal = loadImage('assets/metal.jpeg')
  // scene2
  font = loadFont('assets/Hubballi-Regular.ttf')
  sun = loadImage('assets/sun.jpeg')
  gold = loadImage('assets/blue.jpeg')
  p1 = loadModel('assets/ringedplanet.obj',true)
  t1 = loadImage('assets/ringedplanet.jpg')
  sat = loadModel('assets/satellite.obj',true)
  satimg = loadImage('assets/satimg.jpg')
  star = loadModel('assets/star.obj',true)
}

function setup() {
  // create canvas
  cnv = createCanvas(windowWidth, windowHeight,WEBGL);
  cnv.mousePressed(canvasPressed);
  noStroke();
  // text
  textSize(20)
  textFont(font)
  textAlign(LEFT)
  // song dropdown
  sel = createSelect();
  sel.position(100,100)
  sel.option('My Universe')
  sel.option('Slow Down Turbo')
  sel.option('Can You Feel My Heart')
  sel.option('Welcome to the Black Parade')
  sel.option('CPR')
  sel.option('Kiss Me + Neon')
  sel.selected('My Universe')
  sel.changed(mySelectEvent);
  // scene dropdown
  sel2 = createSelect();
  sel2.position(300,100)
  sel2.option('Vaporwave')
  sel2.option('Space')
  sel2.selected('Vaporwave')
  sel2.changed(mySelectEvent2);
  // sound devices
  amp = new p5.Amplitude()
  fft = new p5.FFT(0.8, 256);

  // particles
  // init random balls
  specularMaterial(255);
  for (var i = 0; i < numSpheres; i++) {
    x = random(-boxSz, boxSz);
    y = random(-boxSz, boxSz);
    z = random(-boxSz, boxSz);
    
    balls[i] = new Ball(x,y,z)
  }
}

function draw() {
  // scene settings
  background(0);
  orbitControl(2,0.5);
  // SONG CHOICE
  switch (String(pick)){
    case 'My Universe':
      mainsong = song1;
      break;
    case 'CPR':
      mainsong = song2;
      break;
    case 'Slow Down Turbo':
      mainsong = song3;
      break;
    case 'Can You Feel My Heart':
      mainsong = song4;
      break;
    case 'Welcome to the Black Parade':
      mainsong = song5;
      break;
    case 'Kiss Me + Neon':
      mainsong = song6;
      break;
  }
  //create mapped variables & UI content
  vol = amp.getLevel();
  hue = map(animate_radius()[4],0,animate_radius()[9],0,255)
  if (mainsong.isPlaying() == true){
    big = animate_radius()[0]*2
    diam = animate_radius()[1]*2
    boxSz = animate_radius()[2]*150
    boxMove = animate_radius()[3]*200
    text('PLEASE pause the current song before choosing another song from the 1st dropdown.',100,windowHeight/6)
    text('You can change the 3D scene in the 2nd dropdown.',100,(windowHeight/6)+20)
    push()
      translate(0,0,100)
      scale(0.3)
      image(play,(windowWidth*1.2),(-windowHeight*1.3))
    pop()
    spin = 5;
  } else {
    //instructions
    push()
      fill(255)
      textSize(40)
      text('INSTRUCTIONS:',-windowWidth/5,-windowHeight/5);
      textSize(20)
      text('Tap the screen to start playing the song shown above.',windowWidth/7,windowHeight/6)
      text('Tap again to pause the current song.',windowWidth/6,(windowHeight/6)+20)
      translate(0,0,100)
      scale(0.3)
      image(pause,(windowWidth*1.2),(-windowHeight*1.3))
    pop()
    big = 100
    diam = 50
    boxSz = 150
    boxMove = 50
    spin = 1
  }
  // create lighting
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(255, 189, 0, locX, locY, 50);
  pointLight(25, 130, 196, width/4, -height/4, -50);
  pointLight(255, 0, 84, -width/4, -height/4, -50);
  pointLight(138, 201, 38, width/4, height/4, -50);
  pointLight(143, 0, 255, -width/4, height/4, -50);
  ambientLight(90)
  shininess(50);
  
  // pick which scene to render
  if (scene == 1) {
    scene1()
  }
  if (scene == 2) {
    scene2()
  }
}

//scene functions
function scene1() {
  push()
    translate(0,0,50)
    rotateZ(PI)
    rotateY(frameCount * 0.01)
    normalMaterial()
    radius=(animate_radius()[1]/40)
    if (radius < 1){
      radius = 1
    }
    else{
      radius=radius
    }
    scale(radius)
    model(skull)
  pop()

  push()
    translate(0,0,50)
    rotateZ(PI)
    rotateY(-frameCount * 0.01)
    normalMaterial()
    radius=(animate_radius()[1]/40)
    if (radius < 1){
      radius = 1
    }
    else{
      radius=radius
    }
    scale(radius)
    model(skull)
  pop()

  push()
    noStroke()
    translate(0,200,100)
    rotateX(PI/2)
    rotateZ(PI/2)
    texture(metal)
    model(pedestal)
  pop()

  push()
    noStroke()
    translate(280,-50,-200)
    rotateX(PI)
    specularMaterial(200)
    fill(animate_radius()[2]*10%255,0,0)
    model(treeLow)
  pop()

  push()
    noStroke()
    translate(-420,-130,-200)
    rotateX(PI)
    rotateY(PI)
    specularMaterial(200)
    fill(0,animate_radius()[3]*10%255,0)
    model(treeLow)
  pop()

  push()
    fill(255,0,0)
    translate(0, -250, 0)
    rotateY(frameCount * 0.01)
    sphere(animate_radius()[0])
  pop()

  push()
    translate(0,250,-2050)
    rotateZ(PI)
    normalMaterial()
    model(mountain)
  pop()

  push()
    noStroke()
    texture(vaporwave1)
    translate(0,490,-10)
    rotateX(PI/4)
    plane(5*windowWidth/4,  3*windowHeight/5)
  pop()
}

function scene2() {
  // overall movement
  rotateY(frameCount *0.001);
  ballDisp()
  // load models
  push()
    scale(0.5)
    rotateZ(frameCount *-0.001*spin);
    rotateY(frameCount *-0.001*spin);
    rotateX(frameCount *-0.001*spin);
    texture(t1)
    translate(-width/2,-height/2,-50)
    planet = model(p1)
  pop()

  push()
    scale(2.5)
    rotateZ(frameCount *-0.003*spin);
    rotateY(frameCount *-0.002*spin);
    rotateX(frameCount *-0.001*spin);
    texture(satimg)
    translate(width/7,height/7,-50)
    model(sat)
  pop()

  push()
    starboy(-width+150,height+150,0.2) 
    starboy(width+150,-height+150,0.3)
  pop()
    
  push()
    texture(sun)
    shininess(300);
    rotateY(frameCount * 0.01);
    pointLight(255, 234, 0, 0, 0, 0);
    sphere(diam)
  pop()
    
  push()
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(gold)
    torus(diam*1.3,5)
  pop()
    
  push()
    rotateZ(frameCount * 0.01);
    rotateY(frameCount * 0.01); 
    cube(big)
  pop()
}

//helper functions
//could've put this in another linked file but...had limited time
function mySelectEvent() {
  pick = sel.value();
}
function mySelectEvent2() {
  if (sel2.value() == 'Space') {
    scene = 2;
  } else {
    scene = 1;
  }
}

function animate_radius(){
  let spectrum = fft.analyze();
  for(let i = 0; i < spectrum.length; i+=1) {
    spec1 = average(spectrum.slice(0,50))
    spec2 = average(spectrum.slice(50,100))
    spec3 = average(spectrum.slice(100,150))
    spec4 = average(spectrum.slice(150,200))
    spec5 = average(spectrum.slice(200,spectrum.length))
    spec6 = max(spec1)
    spec7 = max(spec2)
    spec8 = max(spec3)
    spec9 = max(spec4)
    spec10 = max(spec5)
    // console.log(spec1, spec2)
    return [spec1/2, spec2/2, spec3/3, spec4,4, spec5/5,spec6,spec7,spec8,spec9,spec10]
  }
}

function average(arr){
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  let average = sum / arr.length;
  return average
}

function starboy(w,l,s) {
  push()
  scale(s)
  rotateZ(frameCount *-0.001*spin);
  rotateY(frameCount *-0.002*spin);
  rotateX(frameCount *-0.003*spin);
  translate(w,l,-50)
  model(star)
  rotateX(-PI)
  translate(0,0,45)
  model(star)
  pop() 
}

function cube(boxSz) {
  stroke(255);
  //front
  line(-boxSz, -boxSz,  boxSz,  boxSz, -boxSz,  boxSz);
  line(-boxSz,  boxSz,  boxSz,  boxSz,  boxSz,  boxSz);
  line(-boxSz, -boxSz,  boxSz, -boxSz,  boxSz,  boxSz);
  line( boxSz, -boxSz,  boxSz,  boxSz,  boxSz,  boxSz);
  //back
  line(-boxSz, -boxSz, -boxSz,  boxSz, -boxSz, -boxSz);
  line(-boxSz,  boxSz, -boxSz,  boxSz,  boxSz, -boxSz);
  line(-boxSz, -boxSz, -boxSz, -boxSz,  boxSz, -boxSz);
  line( boxSz, -boxSz, -boxSz,  boxSz,  boxSz, -boxSz);
  //left top
  line(-boxSz, -boxSz,  boxSz, -boxSz, -boxSz, -boxSz);
  //left bottom
  line(-boxSz,  boxSz, -boxSz, -boxSz,  boxSz,  boxSz);
  //right top
  line( boxSz, -boxSz,  boxSz,  boxSz, -boxSz, -boxSz);
  // // right bottom
  line( boxSz,  boxSz, -boxSz,  boxSz,  boxSz,  boxSz);
}

function ballDisp() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].display();
  }
  if (frameCount % 25 == 0) {
    balls[int(random(balls.length))].move();
  }
  if(frameCount % 100 == 0) {
    for (var i = 0; i < balls.length; i++) {
      balls[i].move();
    }
  }
}

function Ball(_x, _y, _z) {  
  this.x = _x;
  this.y = _y;
  this.z = _z;
  this.newX = 0;
  this.newY = 0;
  this.newZ = 0;

  this.display = function() {
    push();
      translate(this.x, this.y, this.z);
      specularMaterial(hue)
      // fill()
      sphere(boxSz/70, 16);
    pop();
      this.x = lerp(this.x, this.newX, 0.01);
      this.y = lerp(this.y, this.newY, 0.01);
      this.z = lerp(this.z, this.newZ, 0.01);
  }

  this.move = function() {
    this.newX = random(-boxMove, boxMove);
    this.newY = random(-boxMove, boxMove);
    this.newZ = random(-boxMove, boxMove);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function canvasPressed() {
  if(!playToggle){
    //mainsong.loop(0,1,0.3)
    mainsong.play()
    mainsong.setVolume(0.5)
  }
  else{
    mainsong.pause()
  }
  playToggle = !playToggle
}
