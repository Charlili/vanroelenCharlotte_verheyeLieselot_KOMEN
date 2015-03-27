<?php



$usersDAO = new usersDAO();

//GET -> /users/
/*$app->get('/users/?',function() use ($usersDAO){
    header("Content-Type: application/json");

    $arr = $usersDAO->selectAll();
    
    foreach($arr as &$user){
        unset($user['password']);
        //$user['password'] = 'derpderp';
    }
    //echo json_encode($arr);
    echo json_encode($arr, JSON_NUMERIC_CHECK);
    exit();
});*/

//GET -> /users/:id
$app->get('/users/:id/?', function($id) use ($usersDAO){
    header("Content-Type: application/json");
    echo json_encode($usersDAO->selectById($id), JSON_NUMERIC_CHECK);
    exit();
});

$app->get('/users/email/:email/?', function($email) use ($usersDAO){
    header("Content-Type: application/json");

    $arr = $usersDAO->selectByEmail($email);
    unset($arr['password']);
    unset($arr['street']);
    unset($arr['town']);
        //$user['password'] = 'derpderp';
    
    //echo json_encode($arr);
    echo json_encode($arr, JSON_NUMERIC_CHECK);

    //echo json_encode($usersDAO->selectByEmail($email), JSON_NUMERIC_CHECK);
    exit();
});

//POST -> /users/
$app->post('/users/?', function() use ($app, $usersDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($usersDAO->insert($post), JSON_NUMERIC_CHECK);
    exit();
});

//DELETE -> /users/:id
$app->delete('/users/:id/?', function($id) use ($usersDAO){
    header("Content-Type: application/json");
    echo json_encode($usersDAO->delete($id));
    exit();
});
//PUT -> /users/:id

$app->put('/users/:id/?', function($id) use ($app, $usersDAO){
    header("Content-Type: application/json");
    $post = $app->request->post();
    if(empty($post)){
        $post = (array) json_decode($app->request()->getBody());
    }
    echo json_encode($usersDAO->update($id, $post), JSON_NUMERIC_CHECK);
    exit();
});