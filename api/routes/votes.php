<?php



$votesDAO = new votesDAO();

//GET -> /votes/
$app->get('/votes/?',function() use ($votesDAO){
    header("Content-Type: application/json");
    echo json_encode($votesDAO->selectAll(), JSON_NUMERIC_CHECK);
    exit();
});

//GET -> /votes/:id
$app->get('/votes/:id/?', function($id) use ($votesDAO){
    header("Content-Type: application/json");
    echo json_encode($votesDAO->selectById($id), JSON_NUMERIC_CHECK);
    exit();
});

$app->get('/votes/day/:week_id/?', function($week_id) use ($votesDAO){
    header("Content-Type: application/json");
    echo json_encode($votesDAO->selectByDayId($week_id), JSON_NUMERIC_CHECK);
    exit();
});

$app->get('/votes/:day_id/:user_id?', function($day_id,$user_id) use ($votesDAO){
    header("Content-Type: application/json");
    echo json_encode($votesDAO->selectByDayAndUser($day_id,$user_id), JSON_NUMERIC_CHECK);
    exit();
});

//POST -> /votes/
$app->post('/votes/?', function() use ($app, $votesDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($votesDAO->insert($post), JSON_NUMERIC_CHECK);
    exit();
});

//DELETE -> /votes/:id
$app->delete('/votes/:id/?', function($id) use ($votesDAO){
    header("Content-Type: application/json");
    echo json_encode($votesDAO->delete($id));
    exit();
});
//PUT -> /votes/:id

$app->put('/votes/:id/?', function($id) use ($app, $votesDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($votesDAO->update($id, $post), JSON_NUMERIC_CHECK);
    exit();
});