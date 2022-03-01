Webcam.set({
    width: 350,
    height: 320,
    image_format: 'png',
    png_quality : 100
});

    Webcam.attach('#camera');

    function takeSnapshot(){
        Webcam.snap(function(data_uri){
            document.getElementById('result').innerHTML = '<img id="capturedImage" src="'+data_uri+'">'
        });
    }

    console.log("ml5.version:", ml5.version)
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/o99aLtuyd/model.json',modelLoaded)

    function modelLoaded(){
        console.log("Model Loaded")
    }
    function speak(){
        synth = window.speechSynthesis;
        say_this_1 = "The first prediction is" + prediction_1;
        say_this_2 = "And The second prediction is" + prediction_2;
        Just_say = say_this_1, say_this_2
        utterThis = new SpeechSynthesisUtterance(Just_say);
        synth.speak(utterThis);
    }
    
    function predict(){
        image = document.getElementById("capturedImage");
        classifier.classify(image, gotResult);
    }
    
    function gotResult(error, results){
        if(error){
            console.error(error)
        }if(results){
            console.log(results);
            document.getElementById('result_hand_sign_name').innerHTML= results[0].label;
            document.getElementById('result_hand_sign_name2').innerHTML= results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();
        }
    }