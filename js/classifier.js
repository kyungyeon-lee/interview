var loadFile = function (event) {
    var image = document.getElementById("image");
    image.src = URL.createObjectURL(event.target.files[0]);
};
const classifier = ml5.imageClassifier
    ("MobileNet", modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log("Model Loaded!");
}

function predict() {
    document.getElementById("predict").hidden = true;
    classifier.predict(document.getElementById("image"),
        function (err, results) {
            alert(results[0].label);
            document.getElementById("p1").innerHTML = "predicted:" + results[0].label;
            document.getElementById("correct").hidden = false;

            document.getElementById("incorrect").hidden = false;

        });
}
var myArray = "";
var total_num = 0;
var correct_num = 0;

var objXMLHttpRequest = new XMLHttpRequest();
objXMLHttpRequest.onreadystatechange = function () {
    if (objXMLHttpRequest.readyState === 4) {
        if (objXMLHttpRequest.status === 200) {
            myArray = objXMLHttpRequest.responseText;
            myArray = myArray.replaceAll("[", "")
            myArray = myArray.replaceAll("]", "")
            myArray = myArray.replaceAll("\"", "")
            myArray = myArray.replaceAll(";", "")
            myArray = myArray.split(",");

            const num = Math.floor(Math.random() * myArray.length);
            var img = document.querySelector("#image");
            img.src = "uploads/" + (myArray[num]).replace("\"", "") + '.png';

        } else {
            console.log('Error Code: ' + objXMLHttpRequest.status);
            console.log('Error Message: ' + objXMLHttpRequest.statusText);
        }
    }
}
objXMLHttpRequest.open('GET', 'php/getfiles.php');
objXMLHttpRequest.send();


function next() {
    document.getElementById("next").hidden = true;
    document.getElementById("correct").hidden = true;
    document.getElementById("incorrect").hidden = true;
    document.getElementById("incorrect").hidden = true;
    document.getElementById("p1").innerHTML = "predicted:";
    document.getElementById("predict").hidden = false;


    const num = Math.floor(Math.random() * myArray.length);
    var img = document.querySelector("#image");
    img.src = "uploads/" + (myArray[num]).replace("\"", "") + '.png';
}

function correct() {
    document.getElementById("next").hidden = false;
    document.getElementById("correct").hidden = true;
    document.getElementById("incorrect").hidden = true;

    correct_num++;
    total_num++;

    const div = document.getElementById("div1")
    div.innerHTML = "";
    const newContent = document.createTextNode("Correctness = " + correct_num + "/" + total_num);
    div.appendChild(newContent);
}

function incorrect() {
    document.getElementById("next").hidden = false;
    document.getElementById("correct").hidden = true;
    document.getElementById("incorrect").hidden = true;

    total_num++;

    const div = document.getElementById("div1")
    div.innerHTML = "";
    const newContent = document.createTextNode("Correctness = " + correct_num + "/" + total_num);
    div.appendChild(newContent);

}
