<?php



$usersDAO = new usersDAO();

//GET -> /users/
/*$app->get('/users/?', authorize('user'),function() use ($usersDAO){
    header("Content-Type: application/json");

    $arr = $usersDAO->selectAll();
    
    foreach($arr as &$user){
        unset($user['password']);
        unset($user['street']);
        unset($user['town']);
        //$user['password'] = 'derpderp';
    }
    //echo json_encode($arr);
    echo json_encode($arr, JSON_NUMERIC_CHECK);
    exit();
});*/
//$app->post('/login', 'login');
$app->post('/me', function() use ($usersDAO){
    if(!empty($_POST)){
        $_SESSION['user'] = $usersDAO->selectById($_POST['id']);  
    }
    header("Content-Type: application/json");
    echo json_encode($_SESSION['user']);
    exit();
});

$app->get('/me', function(){
    header("Content-Type: application/json");
    if(!empty($_SESSION['user'])){
        $arr = $_SESSION['user'];
        unset($arr['password']);
        echo json_encode($arr, JSON_NUMERIC_CHECK);
    }else{
        echo json_encode([]);
    }
    exit();
});

//GET -> /users/:id
$app->get('/users/:id/?'/*, authorize('user')*/, function($id) use ($usersDAO){
    header("Content-Type: application/json");
    //$arr = $usersDAO->selectByEmail($id);
    //unset($arr['password']);
    //echo json_encode($arr, JSON_NUMERIC_CHECK);
    echo json_encode($usersDAO->selectByEmail($id), JSON_NUMERIC_CHECK);
    exit();
});

$app->get('/week/users/:week_id/?', authorize('user'), function($week_id) use ($usersDAO){
    header("Content-Type: application/json");

    $arr = $usersDAO->selectByWeek($week_id);
    
    foreach($arr as &$user){
        unset($user['password']);
    }
    echo json_encode($arr, JSON_NUMERIC_CHECK);
    exit();
});

/*$app->get('/users/email/:email/?', function($email) use ($usersDAO){
    header("Content-Type: application/json");

    $arr = $usersDAO->selectByEmail($email);
    unset($arr['password']);
    unset($arr['street']);
    unset($arr['town']);
    echo json_encode($arr, JSON_NUMERIC_CHECK);
    exit();
});*/

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