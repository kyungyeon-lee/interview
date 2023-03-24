<?php

$upload_name = $_POST['upload_name'];

$idx = strpos($_FILES['myfile']['name'], '.');
$ext = substr($_FILES['myfile']['name'], $idx);

$file_name = $upload_name.".png";

$output_dir = "../uploads/";

  
if (isset($_FILES["myfile"])) {

    if ($_FILES["myfile"]["error"] > 0) {
        echo "Error: " . $_FILES["file"]["error"] . "<br>";

    } else {

        move_uploaded_file($_FILES["myfile"]["tmp_name"], $output_dir . $file_name);
        echo "Uploaded File :" . $file_name;
    }

}

?>