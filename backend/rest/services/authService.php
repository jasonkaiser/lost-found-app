<?php
require_once 'baseService.php';
require_once __DIR__ . '/../dao/authDao.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService extends BaseService {
    private $auth_dao;
    public function __construct() {
        $this->auth_dao = new AuthDao();
        parent::__construct(new AuthDao);
    }

    public function get_user_by_email($email){
        return $this->auth_dao->get_user_by_email($email);
    }

public function register($entity) {
    if (empty($entity['email']) || empty($entity['password'])) {
        return ['success' => false, 'error' => 'Email and password are required.'];
    }

    $email_exists = $this->auth_dao->get_user_by_email($entity['email']);
    if($email_exists){
        return ['success' => false, 'error' => 'Email already registered.'];
    }

 
    $entity['passwordHash'] = password_hash($entity['password'], PASSWORD_BCRYPT);
    unset($entity['password']);  
    $entity = parent::add($entity);

    unset($entity['passwordHash']);  
    
    return ['success' => true, 'data' => $entity];
}


  public function login($entity) {
    if (empty($entity['email']) || empty($entity['password'])) {
        return ['success' => false, 'error' => 'Email and password are required.'];
    }

    $user = $this->auth_dao->get_user_by_email($entity['email']);
    if (!$user) {
        return ['success' => false, 'error' => 'Invalid email or password.'];
    }

   
    if (!password_verify($entity['password'], $user['passwordHash'])) {
        return ['success' => false, 'error' => 'Invalid email or password.'];
    }

    unset($user['passwordHash']);  

    $jwt_payload = [
        'user' => $user,
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24) 
    ];


    $token = JWT::encode(
        $jwt_payload,
        Config::JWT_SECRET(),  
        'HS256'                
    );

    return ['success' => true, 'data' => array_merge($user, ['token' => $token])];
}

}