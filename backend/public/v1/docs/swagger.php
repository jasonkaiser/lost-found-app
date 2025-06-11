<?php
require __DIR__ . '/../../../vendor/autoload.php';

define('LOCALSERVER', 'http://localhost/fullstack-web-app/backend/');
define('PRODSERVER', 'https://lost-found-2aizc.ondigitalocean.app/api/');

if($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1'){
    define('BASE_URL', 'http://localhost/fullstack-web-app/backend/');
} else {
    define('BASE_URL', 'https://lost-found-2aizc.ondigitalocean.app/api/');
}

$openapi = \OpenApi\Generator::scan([
    __DIR__ . '/doc_setup.php',
    __DIR__ . '/../../../rest/routes'
]);
header('Content-Type: application/json');
echo $openapi->toJson();


?>
