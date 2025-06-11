<?php
//  
//  ----------------  Users -----------------------------------------------------
//
/**
 * @OA\Get(
 *      path="/users",
 *      tags={"users"},
 *      summary="Get all users",
 *      @OA\Parameter(
 *          name="email",
 *          in="query",
 *          required=false,
 *          @OA\Schema(type="string"),
 *          description="Optional email to filter users"
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Array of all users in the database"
 *      )
 * )
 */
Flight::route('GET /users', function(){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $email = Flight::request()->query['email'] ?? null;
    
    if ($email) {

        Flight::json(Flight::usersService()->getUserByEmail($email));
    } else {
    
        Flight::json(Flight::usersService()->getAllUsers());
    }
});

/**
 * @OA\Get(
 *     path="/users/{id}",
 *     tags={"users"},
 *     summary="Get user by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the user",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the user with the given ID"
 *     )
 * )
 */
Flight::route('GET /users/@id', function($id){ 
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::usersService()->getById($id));
});

/**
 * @OA\Post(
 *     path="/users",
 *     tags={"users"},
 *     summary="Add a new user",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name", "email", "passwordHash"},
 *             @OA\Property(property="name", type="string", example="John Doe"),
 *             @OA\Property(property="email", type="string", example="john@example.com"),
 *             @OA\Property(property="passwordHash", type="string", example="securepassword123"),
 *             @OA\Property(property="role", type="string", example="User")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="New user created"
 *     )
 * )
 */
Flight::route('POST /users', function(){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::usersService()->add($data));
});

/**
 * @OA\Put(
 *     path="/users/{id}",
 *     tags={"users"},
 *     summary="Update an existing user by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name", "email"},
 *             @OA\Property(property="name", type="string", example="Updated Name"),
 *             @OA\Property(property="email", type="string", example="new.email@example.com"),
 *             @OA\Property(property="passwordHash", type="string", example="newpassword123"),
 *             @OA\Property(property="location", type="string", example="Los Angeles"),
 *             @OA\Property(property="phone_number", type="string", example="+1-555-765-4321")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User updated"
 *     )
 * )
 */
Flight::route('PUT /users/@id', function($id){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::usersService()->update($id, $data));
});

/**
 * @OA\Delete(
 *     path="/users/{id}",
 *     tags={"users"},
 *     summary="Delete a user by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User deleted"
 *     )
 * )
 */
Flight::route('DELETE /users/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::usersService()->delete($id));
});
?>