<?php

$daysDAO = new daysDAO();

//GET -> /days/
$app->get('/days/?',function() use ($daysDAO){
    header("Content-Type: application/json");
    echo json_encode($daysDAO->selectAll(), JSON_NUMERIC_CHECK);
    exit();
});

//GET -> /days/:id
$app->get('/days/:user_id/?', function($user_id) use ($daysDAO){
    header("Content-Type: application/json");
    echo json_encode($daysDAO->selectByUserId($user_id), JSON_NUMERIC_CHECK);
    exit();
});

//POST -> /days/
$app->post('/days/?', function() use ($app, $daysDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($daysDAO->insert($post), JSON_NUMERIC_CHECK);
    exit();
});

//DELETE -> /days/:id
$app->delete('/days/:id/?', function($id) use ($daysDAO){
    header("Content-Type: application/json");
    echo json_encode($daysDAO->delete($id));
    exit();
});
//PUT -> /days/:id

$app->put('/days/:id/?', function($id) use ($app, $daysDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($daysDAO->update($id, $post), JSON_NUMERIC_CHECK);
    exit();
});