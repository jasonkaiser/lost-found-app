<?php
//  
//  ----------------  Found Items -----------------------------------------------------
//
/**
 * @OA\Get(
 *      path="/found-items",
 *      tags={"found-items"},
 *      summary="Get all found items",
 *      @OA\Parameter(
 *          name="category",
 *          in="query",
 *          required=false,
 *          @OA\Schema(type="integer"),
 *          description="Optional category ID to filter items"
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Array of all found items in the database"
 *      )
 * )
 */
Flight::route('GET /found-items', function(){
    $category = Flight::request()->query['category'] ?? null;
    Flight::json(Flight::foundItemsService()->getFoundItems($category));
});

/**
 * @OA\Get(
 *     path="/found-items/{id}",
 *     tags={"found-items"},
 *     summary="Get found item by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the found item",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the found item with the given ID"
 *     )
 * )
 */
Flight::route('GET /found-items/@id', function($id){ 
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);

    Flight::json(Flight::foundItemsService()->getById($id));
});

/**
 * @OA\Get(
 *     path="/found-items/category/{category}",
 *     tags={"found-items"},
 *     summary="Get found items by category",
 *     @OA\Parameter(
 *         name="category",
 *         in="path",
 *         required=true,
 *         description="Category ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns found items in the given category"
 *     )
 * )
 */
Flight::route('GET /found-items/category/@category', function($category){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::foundItemsService()->getItemByCategory($category));
});

/**
 * @OA\Get(
 *     path="/found-items/name/{name}",
 *     tags={"found-items"},
 *     summary="Search found items by name",
 *     @OA\Parameter(
 *         name="name",
 *         in="path",
 *         required=true,
 *         description="Name to search for",
 *         @OA\Schema(type="string", example="wallet")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns matching found items"
 *     )
 * )
 */
Flight::route('GET /found-items/name/@name', function($name){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);

    Flight::json(Flight::foundItemsService()->getItemByName($name));
});

/**
 * @OA\Get(
 *     path="/found-items/user/{user}",
 *     tags={"found-items"},
 *     summary="Get found items by user",
 *     @OA\Parameter(
 *         name="user",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns found items for the given user"
 *     )
 * )
 */
Flight::route('GET /found-items/user/@user', function($user){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::foundItemsService()->getItemByUser($user));
});

/**
 * @OA\Post(
 *     path="/found-items",
 *     tags={"found-items"},
 *     summary="Add a new found item",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"userID", "categoryID", "itemName", "description"},
 *             @OA\Property(property="userID", type="integer", example=1),
 *             @OA\Property(property="categoryID", type="integer", example=1),
 *             @OA\Property(property="itemName", type="string", example="Wallet"),
 *             @OA\Property(property="description", type="string", example="Black leather wallet"),
 *             @OA\Property(property="location", type="string", example="Main lobby"),
 *             @OA\Property(property="image", type="string", example="wallet.png"),
 *             @OA\Property(property="latitude", type="number", format="float", example=43.8563),
 *             @OA\Property(property="longitude", type="number", format="float", example=18.4131)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="New found item created"
 *     )
 * )
 */
Flight::route('POST /found-items', function(){
    Flight::authMiddleware()->authorizeRoles([Roles::ADMIN, Roles::USER]);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::foundItemsService()->add($data));
});


/**
 * @OA\Put(
 *     path="/found-items/{id}",
 *     tags={"found-items"},
 *     summary="Update an existing found item by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Found item ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"itemName", "description"},
 *             @OA\Property(property="itemName", type="string", example="Updated Wallet"),
 *             @OA\Property(property="description", type="string", example="Updated description"),
 *             @OA\Property(property="location", type="string", example="New location"),
 *             @OA\Property(property="image", type="string", example="wallet.png"),
 *             @OA\Property(property="latitude", type="number", format="float", example=43.8563),
 *             @OA\Property(property="longitude", type="number", format="float", example=18.4131)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Found item updated"
 *     )
 * )
 */
Flight::route('PUT /found-items/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::foundItemsService()->update($id, $data));
});



/**
 * @OA\Delete(
 *     path="/found-items/{id}",
 *     tags={"found-items"},
 *     summary="Delete a found item by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Found item ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Found item deleted"
 *     )
 * )
 */
Flight::route('DELETE /found-items/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::foundItemsService()->delete($id));
});
?>