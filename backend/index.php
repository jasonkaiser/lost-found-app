<?php
require 'vendor/autoload.php';

require_once __DIR__.'/data/roles.php';
require_once __DIR__ . "/middleware/authMiddleware.php";



Flight::register('usersService', 'UsersService');
Flight::register('categoriesService', 'CategoriesService');
Flight::register('claimRequestsService', 'ClaimRequestsService');
Flight::register('foundItemsService', 'FoundItemsService');
Flight::register('lostItemsService', 'LostItemsService');
Flight::register('authService', 'AuthService');
Flight::register('authMiddleware', 'AuthMiddleware');




require_once __DIR__ . '/rest/services/usersService.php';
require_once __DIR__ . '/rest/services/categoriesService.php';
require_once __DIR__ . '/rest/services/claimRequestsService.php';
require_once __DIR__ . '/rest/services/foundItemsService.php';
require_once __DIR__ . '/rest/services/lostItemsService.php';
require_once __DIR__ . '/rest/services/authService.php';

require_once __DIR__ . '/rest/routes/usersRoute.php';
require_once __DIR__ . '/rest/routes/categoriesRoute.php';
require_once __DIR__ . '/rest/routes/claimRequestsRoute.php';
require_once __DIR__ . '/rest/routes/foundItemsRoute.php';
require_once __DIR__ . '/rest/routes/lostItemsRoute.php';
require_once __DIR__ . '/rest/routes/authRoute.php';


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$allowedOrigins = [
    "http://127.0.0.1:5501",
    "https://lost-found-2aizc.ondigitalocean.app",
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} 

header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authentication");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

Flight::route('GET /', function() {
    echo 'Lost and Found API is running!';
});

Flight::route('/*', function() {
    if(
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0
    ) {
        return TRUE;
    } else {
        try {
            $authHeader = Flight::request()->getHeader("Authorization");
            if (!$authHeader) {
                Flight::halt(401, "Missing Authorization header");
            }

            // Remove "Bearer " prefix if present
            if (strpos($authHeader, 'Bearer ') === 0) {
                $token = substr($authHeader, 7);
            } else {
                $token = $authHeader;
            }

            if (Flight::authMiddleware()->verifyToken($token)) {
                return TRUE;
            }

        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});


Flight::start();