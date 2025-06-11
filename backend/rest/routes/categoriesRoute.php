<?php
//  
//  ----------------  Categories  -----------------------------------------------------
//
/**
 * @OA\Get(
 *      path="/categories",
 *      tags={"categories"},
 *      summary="Get all categories",
 *      @OA\Response(
 *           response=200,
 *           description="Array of all categories"
 *      )
 * )
 */
Flight::route('GET /categories', function(){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::categoriesService()->getCategories());
});

/**
 * @OA\Get(
 *     path="/categories/{name}",
 *     tags={"categories"},
 *     summary="Get category by name",
 *     @OA\Parameter(
 *         name="name",
 *         in="path",
 *         required=true,
 *         description="Name of the category",
 *         @OA\Schema(type="string", example="electronics")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the category with the given name"
 *     )
 * )
 */
Flight::route('GET /categories/@name', function($name){ 
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::categoriesService()->getCategoryByName($name));
});

/**
 * @OA\Get(
 *     path="/categories/id/{id}",
 *     tags={"categories"},
 *     summary="Get category by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the category",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the category with the given ID"
 *     )
 * )
 */
Flight::route('GET /categories/id/@id', function($id){
    Flight::authMiddleware()->authorizeRole([Roles::ADMIN, Roles::USER]);
    Flight::json(Flight::categoriesService()->getById($id));
});

/**
 * @OA\Post(
 *     path="/categories",
 *     tags={"categories"},
 *     summary="Add a new category",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"categoryName"},
 *             @OA\Property(property="categoryName", type="string", example="New Category")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="New category created"
 *     )
 * )
 */
Flight::route('POST /categories', function(){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::categoriesService()->add($data));
});

/**
 * @OA\Put(
 *     path="/categories/{id}",
 *     tags={"categories"},
 *     summary="Update category by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Category ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"categoryName"},
 *             @OA\Property(property="categoryName", type="string", example="Updated Category")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Category updated"
 *     )
 * )
 */
Flight::route('PUT /categories/@id', function($id) {
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    $categoryService = new CategoriesService();
    $result = $categoryService->update($id, $data);
    Flight::json($result);
});
/**
 * @OA\Delete(
 *     path="/categories/{id}",
 *     tags={"categories"},
 *     summary="Delete category by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Category ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Category deleted"
 *     )
 * )
 */
Flight::route('DELETE /categories/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::categoriesService()->delete($id));
});
?>