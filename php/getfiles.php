<?php $out = array();
foreach (glob('../uploads/*.png') as $filename) {
    $p = pathinfo($filename);
    $out[] = $p['filename'];
}
echo json_encode($out); ?>;