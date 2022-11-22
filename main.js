song1 = "";
song2 = "";
status1 = "";
status2 = "";
scorerightwrist= 0
scoreleftwrist= 0
leftWristx= 0
leftWristy= 0
rightWristx= 0 
rightWristy= 0 
function preload(){
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelloaded)
    poseNet.on("pose",gotposes )
}

function gotposes(results){
   if (results.length > 0) {
      console.log(results)
      scoreleftwrist = results[0].pose.keypoints[9].score
      scorerightwrist = results[0].pose.keypoints[10].score
      console.log("scoreleftwrist = " +scoreleftwrist);
      console.log("scorerightwrist = " +scorerightwrist);

      leftWristx=results[0].pose.leftWrist.x
      leftWristy=results[0].pose.leftWrist.y
      console.log("leftWristX =" + leftWristx +" leftWristY = " + leftWristy);
      
      rightWristx=results[0].pose.rightWrist.x
      rightWristy=results[0].pose.rightWrist.y
      console.log("rightWristX =" + rightWristx +" rightWristY = " + rightWristy);
   }
}

function modelloaded(){
   console.log("model is loaded")
}

function draw() {
	image(video, 0, 0, 600, 500);
   status1 = song1.isPlaying()
   status2 = song2.isPlaying()
if (scoreleftwrist > 0.2 ) {
   song2.stop();
	fill("#FF0000");
	stroke("#FF0000");
	circle(leftWristx,leftWristy,20);
   if (status1 == false) { 
      song1.play();
      document.getElementById("song_playing").innerHTML = "song1 is playing";
   }
      }
   if (scorerightwrist > 0.2) {
   song1.stop();
         fill("#FF0000");
         stroke("#FF0000");
         circle(rightWristx,rightWristy,20);
         if (status2 == false) {
            song2.play();
            document.getElementById("song_playing").innerHTML = "song2 is playing";
         }
}	
}


