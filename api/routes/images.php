<?php

define('DS', DIRECTORY_SEPARATOR);

//define('WWW_ROOT', __DIR__ . DS);

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
    $newImage = $manipulator->resample(200,200,true);
    //$newImage2 = $manipulator->crop($x1, $y1, $x2, $y2);
    // saving file to uploads folder
    $manipulator->save(WWW_ROOT . DS . 'uploads' . DS . 'users'.  DS . $newName . "." . $extension);
    //echo 'Done ...';
    } else {
    //echo 'You must upload an image...';
    }
    




        /*$destFile = WWW_ROOT . 'uploads' . DS . $_FILES["SelectedFile"]['name'];
        move_uploaded_file($sourceFile, $destFile);
        $dest = 'uploads' . DS . $_FILES["SelectedFile"]['name'];
        
        $dotPos = strrpos($_FILES["SelectedFile"]['name'],'.');
        $name = substr($_FILES["SelectedFile"]['name'],0,$dotPos);
        $extension = substr($_FILES["SelectedFile"]['name'],$dotPos+1);
        $dest = 'uploads' . DS . 'users' . DS . $name . "." . $extension;

        echo "<input type='hidden' id='sourceFile' value= '{$dest}' />";*/
});

$app->post('/upload', function(){
    $sourceFile = $_FILES["SelectedFile"]['tmp_name'];
        $destFile = WWW_ROOT . 'uploads' . DS . $_FILES["SelectedFile"]['name'];
        move_uploaded_file($sourceFile, $destFile);
        $dest = 'uploads' . DS . $_FILES["SelectedFile"]['name'];
        
        $dotPos = strrpos($_FILES["SelectedFile"]['name'],'.');
        $name = substr($_FILES["SelectedFile"]['name'],0,$dotPos);
        $extension = substr($_FILES["SelectedFile"]['name'],$dotPos+1);
        $dest = 'uploads' . DS . $name . "." . $extension;

        echo "<input type='hidden' id='sourceFile' value= '{$dest}' />";
});

