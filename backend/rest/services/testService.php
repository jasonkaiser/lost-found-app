
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../services/usersService.php';
require_once __DIR__ . '/../services/categoriesService.php';
require_once __DIR__ . '/../services/claimRequestsService.php';
require_once __DIR__ . '/../services/foundItemsService.php';
require_once __DIR__ . '/../services/lostItemsService.php';

$usersService = new UsersService();
$categoryService = new CategoriesService();
$claimRequestsService = new ClaimRequestsService();
$foundItemsService = new LostItemsService();

$foundItems = $foundItemsService->getLostItems();
$foundItemByName = $foundItemsService->getItemByName("Car");
$foundItemByCategory = $foundItemsService->getItemByCategory(2);
$foundItemByUser = $foundItemsService->getItemByUser(2);

echo "<pre>";
print_r($foundItems);
print_r($foundItemByName);
print_r($foundItemByCategory);
print_r($foundItemByUser);
echo "</pre>";



?>