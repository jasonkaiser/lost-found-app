<?php
//  
//  ----------------  Claim Requests -----------------------------------------------------
//
/**
 * @OA\Get(
 *      path="/claim-requests",
 *      tags={"claim-requests"},
 *      summary="Get all claim requests",
 *      @OA\Parameter(
 *          name="status",
 *          in="query",
 *          required=false,
 *          @OA\Schema(type="string"),
 *          description="Optional status to filter requests (Pending, Approved, Rejected)"
 *      ),
 *      @OA\Response(
 *           response=200,
 *           description="Array of all claim requests in the database"
 *      )
 * )
 */
Flight::route('GET /claim-requests', function(){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $status = Flight::request()->query['status'] ?? null;
    Flight::json(Flight::claimRequestsService()->getClaimRequests($status));
});

/**
 * @OA\Get(
 *     path="/claim-requests/{id}",
 *     tags={"claim-requests"},
 *     summary="Get claim request by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID of the claim request",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Returns the claim request with the given ID"
 *     )
 * )
 */
Flight::route('GET /claim-requests/@id', function($id){ 
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::claimRequestsService()->getById($id));
});

/**
 * @OA\Post(
 *     path="/claim-requests",
 *     tags={"claim-requests"},
 *     summary="Create new claim request",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"userID"},
 *             @OA\Property(property="userID", type="integer", example=1),
 *             @OA\Property(property="foundID", type="integer", example=1),
 *             @OA\Property(property="status", type="string", example="Pending")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="New claim request created"
 *     )
 * )
 */
Flight::route('POST /claim-requests', function(){
    Flight::authMiddleware()->authorizeRoles([Roles::ADMIN, Roles::USER]);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::claimRequestsService()->add($data));
});

/**
 * @OA\Put(
 *     path="/claim-requests/{id}",
 *     tags={"claim-requests"},
 *     summary="Update claim request by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Claim request ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"status"},
 *             @OA\Property(property="status", type="string", example="Approved"),
 *             @OA\Property(property="foundID", type="integer", example=1)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Claim request updated"
 *     )
 * )
 */
Flight::route('PUT /claim-requests/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json(Flight::claimRequestsService()->update($id, $data));
});

/**
 * @OA\Delete(
 *     path="/claim-requests/{id}",
 *     tags={"claim-requests"},
 *     summary="Delete claim request by ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Claim request ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Claim request deleted"
 *     )
 * )
 */
Flight::route('DELETE /claim-requests/@id', function($id){
    Flight::authMiddleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::claimRequestsService()->delete($id));
});
?>