stats = "";
iboxval = "";
objects = [];
function setup(){
    canvas = createCanvas(500,500);
    canvas.position(80,300);
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    background(0);
    image(video,0,0,500,500);
    if(stats == "true"){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            if(objects[i].label == iboxval){
            document.getElementById("stats").innerHTML = "Status: Detected";
            video.stop();

            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(iboxval + "found");
            synth.speak(utterThis);
            }
    }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("stats").innerHTML = "Status: Detecting";
    iboxval = document.getElementById("input_box").value;
}
function modelLoaded(){
    console.log("model Loaded");
    stats = "true";
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}