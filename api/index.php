<?php
session_start();

define("WWW_ROOT", dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR);
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'UsersDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'DaysDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'WeeksDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'VotesDAO.php';
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'Slim'. DIRECTORY_SEPARATOR .'Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'routes' .DIRECTORY_SEPARATOR. 'users.php';
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'routes' .DIRECTORY_SEPARATOR. 'days.php';
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'routes' .DIRECTORY_SEPARATOR. 'weeks.php';
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'routes' .DIRECTORY_SEPARATOR. 'votes.php';


// file: api/index.php
 // Add this to the top of the file

/**
 * Quick and dirty login function with hard coded credentials (admin/admin)
 * This is just an example. Do not use this in a production environment
 */
/*function login() {
    if(!empty($_POST['email']) && !empty($_POST['password'])) {
        // normally you would load credentials from a database. 
        // This is just an example and is certainly not secure
        if($_POST['email'] == 'admin' && $_POST['password'] == 'admin') {
            $user = array("email"=>"admin", "name"=>"admin", "role"=>"user");
            $_SESSION['user'] = $user;
            echo json_encode($user);
        }
        else {
            echo '{"error":{"text":"You shall not pass..."}}';
        }
    }
    else {
        echo '{"error":{"text":"Username and Password are required."}}';
    }
}*/

$app->run();

function authorize($role = "user") {
    return function () use ( $role ) {
        // Get the Slim framework object
        $app = \Slim\Slim::getInstance();
        // First, check to see if the user is logged in at all
        if(!empty($_SESSION['user'])) {
            // Next, validate the role to make sure they can access the route
            // We will assume admin role can access everything
            if($_SESSION['user']['role'] == $role || 
                $_SESSION['user']['role'] == 'admin') {
                //User is logged in and has the correct permissions... Nice!
                return true;
            }
            else {
                // If a user is logged in, but doesn't have permissions, return 403
                $app->halt(403, 'You shall not pass!');
            }
        }
        else {
            // If a user is not logged in at all, return a 401
            $app->halt(401, 'You shall not pass!');
        }
    };
}

