<?php



$weeksDAO = new weeksDAO();

//GET -> /weeks/
$app->get('/weeks/?',function() use ($weeksDAO){
    header("Content-Type: application/json");
    echo json_encode($weeksDAO->selectAll(), JSON_NUMERIC_CHECK);
    exit();
});

$app->get('/weeks/last/?',function() use ($weeksDAO){
    header("Content-Type: application/json");
    echo json_encode($weeksDAO->selectLast(), JSON_NUMERIC_CHECK);
    exit();
});

$app->put('/weeks/:id/?', function($id) use ($app, $weeksDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
        echo $app->request()->getBody();
    }
    echo json_encode($weeksDAO->update($id, $post), JSON_NUMERIC_CHECK);
    exit();
});
//GET -> /weeks/:id
$app->get('/weeks/:id/?', function($id) use ($weeksDAO){
    header("Content-Type: application/json");
    echo json_encode($weeksDAO->selectById($id), JSON_NUMERIC_CHECK);
    exit();
});

//POST -> /weeks/
$app->post('/weeks/?', function() use ($app, $weeksDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($weeksDAO->insert($post), JSON_NUMERIC_CHECK);
    exit();
});

//DELETE -> /weeks/:id
$app->delete('/weeks/:id/?', function($id) use ($weeksDAO){
    header("Content-Type: application/json");
    echo json_encode($weeksDAO->delete($id));
    exit();
});
//PUT -> /weeks/:id

