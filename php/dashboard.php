<?php
include_once 'session.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>

    <?php if(!isset($_SESSION['username'])): header("location: logout.php");?>

    <?php else: ?>

    <?php endif ?>

    <?php echo "<h1> Welcome ".$_SESSION['username']." To Dashboard </h1>" ?>

    <h2><a href="logout.php">Logout</a></h2>
    <h2><a href="../upload.html">Go to requirement 2 - Image segmentation and noise</a></h2>

    <h2><a href="../classifier.html">Go to requirement 2 (optional) - classifier</a></h2>

</body>
</html>