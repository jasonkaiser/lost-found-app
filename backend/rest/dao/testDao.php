<?php

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

        require_once __DIR__ . "/baseDao.php";
        require_once __DIR__ . "/usersDao.php";


    $user = new User();
   /* $getUser = $user->getUserByEmail("john.doe@example.com");

    $categories = new Category();
    $getCategories = $categories->getCategories();

    $lostItems = new LostItem();
    $getLostItems = $lostItems->getLostItems();
    $getLostItemByCategory = $lostItems->getItemByCategory(2);
    $getLostItemByName = $lostItems->getItemByName("Lost Wallet");
    $getLostItemByUser = $lostItems->getItemByUser(1);

    $foundItems = new FoundItem();
    $getFoundItems = $foundItems->getFoundItems();

    $claims = new ClaimRequest();
    $getClaimRequests = $claims->getClaimRequests();

    $categoryByName = $categories->getCategoryByName("Electronics");

    if ($getUser) {
        echo "User ID: " . $getUser['id'] . "<br>";
        echo "User Name: " . $getUser['name'] . "<br>";
    } else {
        echo "No user found with the given email.<br>";
    }

    echo "<h3>Categories:</h3>";
    foreach ($getCategories as $category) {
        echo "Category ID: " . $category["id"] . " - Name: " . $category["categoryName"] . "<br>";
    }

    echo "<h3>Lost Items:</h3>";
    foreach ($getLostItems as $item) {
        echo "Lost Item: " . $item["itemName"] . " - Description: " . $item["description"] . "<br>";
    }

    echo "<h3>Lost Item by Category:</h3>";
    print_r($getLostItemByCategory);

    echo "<h3>Lost Item by Name:</h3>";
    print_r($getLostItemByName);

    echo "<h3>Lost Item by User:</h3>";
    print_r($getLostItemByUser);

    echo "<h3>Found Items:</h3>";
    foreach ($getFoundItems as $item) {
        echo "Found Item: " . $item["itemName"] . " - Description: " . $item["description"] . "<br>";
    }

    echo "<h3>Claim Requests:</h3>";
    foreach ($getClaimRequests as $claim) {
        echo "Claim ID: " . $claim["id"] . " - User ID: " . $claim["userID"] . "<br>";
    }

    echo "<h3>Category by Name:</h3>";
    print_r($categoryByName);

    $addUser = $user->add(["name" => "Test Test", "email" => "2adwads@example.com", "password" => "123456"]);
    echo "<h3>User Add Result:</h3>";
    print_r($addUser);
    
    $getUserById = $user->getById(1);
    echo "<h3>Get User By ID Result:</h3>";
    print_r($getUserById);
*/
    $user->update([
    "name" => "Test",
    "email" => "updated.email@example.com",
    "passwordHash" => "newpassword123"
], 1);


?>