<?php
//  
//  ----------------  Lost Items  -----------------------------------------------------
//
/**
 * @OA\Get(
 *      path="/lost-items",
 *      tags={"lost-items"},
 *      summary="Get all lost items",
 *      @OA\Parameter(
 *          name="category",
 *          in="query",
 *          required=false,
 *          @OA\Schema(type="integer"),
 *          description="Optional category ID to filter items"
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Array of all lost items in the database"
 *      )
 * )
 */
Flight::route('GET /lost-items', function(){
    $category = Flight::request()->query['category'] ?? null;
    Flight::json(Flight::lostItemsService()->getLostItems($category));
});

/**
 * @OA\Get(
 *     path="/lost-items/{id}",
 *     tags={"lost-items"},
 *     summary="Get lost item by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the lost item",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the lost item with the given ID"
 *     )
 * )
 */
Flight::route('GET /lost-items/@id', function($id){ 
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::lostItemsService()->getById($id));
});

/**
 * @OA\Get(
 *     path="/lost-items/category/{category}",
 *     tags={"lost-items"},
 *     summary="Get lost items by category",
 *     @OA\Parameter(
 *         name="category",
 *         in="path",
 *         required=true,
 *         description="Category ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns lost items in the given category"
 *     )
 * )
 */
Flight::route('GET /lost-items/category/@category', function($category){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::lostItemsService()->getItemByCategory($category));
});

/**
 * @OA\Get(
 *     path="/lost-items/name/{name}",
 *     tags={"lost-items"},
 *     summary="Search lost items by name",
 *     @OA\Parameter(
 *         name="name",
 *         in="path",
 *         required=true,
 *         description="Name to search for",
 *         @OA\Schema(type="string", example="wallet")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns matching lost items"
 *     )
 * )
 */
Flight::route('GET /lost-items/name/@name', function($name){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::lostItemsService()->getItemByName($name));
});

/**
 * @OA\Get(
 *     path="/lost-items/user/{user}",
 *     tags={"lost-items"},
 *     summary="Get lost items by user",
 *     @OA\Parameter(
 *         name="user",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns lost items for the given user"
 *     )
 * )
 */
Flight::route('GET /lost-items/user/@user', function($user){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::lostItemsService()->getItemByUser($user));
});

/**
 * @OA\Post(
 *     path="/lost-items",
 *     tags={"lost-items"},
 *     summary="Report a lost item",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"userID", "categoryID", "itemName"},
 *             @OA\Property(property="userID", type="integer", example=1),
 *             @OA\Property(property="categoryID", type="integer", example=1),
 *             @OA\Property(property="itemName", type="string", example="Wallet"),
 *             @OA\Property(property="description", type="string", example="Black leather wallet"),
 *             @OA\Property(property="location", type="string", example="Cafeteria"),
 *             @OA\Property(property="image", type="string", example="wallet.png", description="Filename of predefined image from assets"),
 *             @OA\Property(property="latitude", type="number", example=43.8563),
 *             @OA\Property(property="longitude", type="number", example=18.4131)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Lost item reported"
 *     )
 * )
 */
Flight::route('POST /lost-items', function(){
    Flight::authMiddleware()->authorizeRoles([Roles::ADMIN, Roles::USER]);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::lostItemsService()->add($data));
});

/**
 * @OA\Put(
 *     path="/lost-items/{id}",
 *     tags={"lost-items"},
 *     summary="Update lost item by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Lost item ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"itemName"},
 *             @OA\Property(property="itemName", type="string", example="Updated Wallet"),
 *             @OA\Property(property="description", type="string", example="Updated description"),
 *             @OA\Property(property="location", type="string", example="New location"),
 *             @OA\Property(property="image", type="string", example="wallet.png", description="Filename of predefined image from assets"),
 *             @OA\Property(property="latitude", type="number", example=43.8563),
 *             @OA\Property(property="longitude", type="number", example=18.4131)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Lost item updated"
 *     )
 * )
 */
Flight::route('PUT /lost-items/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::lostItemsService()->update($id, $data));
});

/**
 * @OA\Delete(
 *     path="/lost-items/{id}",
 *     tags={"lost-items"},
 *     summary="Delete lost item by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Lost item ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Lost item deleted"
 *     )
 * )
 */
Flight::route('DELETE /lost-items/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::lostItemsService()->delete($id));
});
?>