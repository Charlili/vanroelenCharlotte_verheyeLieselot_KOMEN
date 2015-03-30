<?php

define('DS', DIRECTORY_SEPARATOR);
$imagesDAO = new imagesDAO();

//define('WWW_ROOT', __DIR__ . DS);

$app->get('/images/:day_id/?',function($day_id) use ($imagesDAO){
    header("Content-Type: application/json");
    echo json_encode($imagesDAO->selectByDayId($day_id), JSON_NUMERIC_CHECK);
    exit();
});

$app->post('/images/?', function() use ($app, $imagesDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($imagesDAO->insert($post), JSON_NUMERIC_CHECK);
    exit();
});

$app->post('/upload/user', function(){
    //echo json_encode($_FILES);
    $user_id = $_SESSION['user']['id'];
    $file = $_FILES["SelectedFile"];

    // array of valid extensions
    $validExtensions = array('.jpg', '.jpeg', '.gif', '.png');
    // get extension of the uploaded file
    $fileExtension = strrchr($file['name'], ".");
    // check if file Extension is on the list of allowed ones
        
    if (in_array($fileExtension, $validExtensions)) {
    $newName = $user_id;
    $dotPos = strrpos($file['name'],'.');
    $extension = substr($file['name'],$dotPos+1);
    $manipulator = new ImageManipulator($file['tmp_name']);
    $width  = $manipulator->getWidth();
    $height = $manipulator->getHeight();
    $centreX = round($width / 2);
    $centreY = round($height / 2);
    // our dimensions will be 200x130
    $x1 = $centreX - 200; // 200 / 2
    $y1 = $centreY - 200; // 130 / 2

    $x2 = $centreX + 200; // 200 / 2
    $y2 = $centreY + 200; // 130 / 2

    // center cropping to 200x130
    $newImage = $manipulator->resample(400,400,true);
    //$manipulator2 = new ImageManipulator($newImage);
    //$newImage2 = $manipulator->crop($x1, $y1, $x2, $y2);
    // saving file to uploads folder
    $manipulator->save(WWW_ROOT . DS . 'uploads' . DS . 'users'.  DS . $newName . "." . $extension);
    //echo 'Done ...';
    } else {
    //echo 'You must upload an image...';
    }

});

$app->post('/upload/?', function(){
    //echo json_encode($_FILES);
    $file = $_FILES["SelectedFile"];

    // array of valid extensions
    $validExtensions = array('.jpg', '.jpeg', '.gif', '.png');
    // get extension of the uploaded file
    $fileExtension = strrchr($file['name'], ".");
    // check if file Extension is on the list of allowed ones
        
    if (in_array($fileExtension, $validExtensions)) {
    $newName = $file['name'];
    $dotPos = strrpos($file['name'],'.');
    $extension = substr($file['name'],$dotPos+1);
    $manipulator = new ImageManipulator($file['tmp_name']);
    $width  = $manipulator->getWidth();
    $height = $manipulator->getHeight();
    $centreX = round($width / 2);
    $centreY = round($height / 2);
    // our dimensions will be 200x130
    $x1 = $centreX - 200; // 200 / 2
    $y1 = $centreY - 200; // 130 / 2

    $x2 = $centreX + 200; // 200 / 2
    $y2 = $centreY + 200; // 130 / 2

    // center cropping to 200x130
    $newImage = $manipulator->resample(400,400,true);
    // saving file to uploads folder
    $manipulator->save(WWW_ROOT . DS . 'uploads' .  DS . $file['name']);
    //echo 'Done ...';
    } else {
    //echo 'You must upload an image...';
    }
});


