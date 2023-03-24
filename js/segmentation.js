var objXMLHttpRequest = new XMLHttpRequest();
objXMLHttpRequest.onreadystatechange = function () {
    if (objXMLHttpRequest.readyState === 4) {
        if (objXMLHttpRequest.status === 200) {
            var myArray = objXMLHttpRequest.responseText;
            myArray = myArray.replaceAll("[", "")
            myArray = myArray.replaceAll("]", "")
            myArray = myArray.replaceAll("\"", "")
            myArray = myArray.replaceAll(";", "")
            myArray = myArray.split(",");

            const num = Math.floor(Math.random() * myArray.length);
            var img = document.querySelector("#modal1 img");
            img.src = "uploads/" + (myArray[num]).replace("\"", "") + '.png';
            img.id = "cropper";
            var croppr = new Croppr('#cropper', {
                onInitialize: (instance) => { console.log(instance); },
                onCropStart: (data) => { console.log('start', data); },
                onCropEnd: (data) => {
                    console.log('end', data);
                    imagePath = img.src;
                    cropImage(imagePath, data['x'], data['y'], data['width'], data['height']);
                    document.getElementById("p1").innerHTML = "Segmentation Info: " + JSON.stringify(data);
                },
                onCropMove: (data) => { console.log('move', data); }
            });

        } else {
            console.log('Error Code: ' + objXMLHttpRequest.status);
            console.log('Error Message: ' + objXMLHttpRequest.statusText);
        }
    }
}
objXMLHttpRequest.open('GET', 'php/getfiles.php');
objXMLHttpRequest.send();


function cropImage(imagePath, newX, newY, newWidth, newHeight) {
    const originalImage = new Image();
    originalImage.src = imagePath;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    originalImage.addEventListener('load', function () {
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(originalImage, newX, newY, newWidth, newHeight, 0, 0, newWidth, newHeight);
    });

}

function drawbackground() {
    var elements = document.getElementsByClassName("croppr-region")

    if (document.querySelector('#btn_distortion').innerText == "Add Distortion on this segmentation") {
        document.querySelector('#btn_distortion').innerText = 'Remove Distortion';
        elements[0].style.background = "#BEBEBE"
        elements[0].style.opacity = 0.5;
        elements[0].style.filter = 'blur(20px)';

    } else {
        document.querySelector('#btn_distortion').innerText = 'Add Distortion on this segmentation';
        elements[0].style.background = "#FFFFFF"
        elements[0].style.opacity = 0;
        elements[0].style.filter = '';

    }
}
