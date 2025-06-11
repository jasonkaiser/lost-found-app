<?php

require_once __DIR__ . "/baseDao.php";  

class User extends BaseDao {
    
 
    protected $table_name;


    public function __construct(){

        $this->table_name = "users";
        parent::__construct("$this->table_name");
    }

    public function getAllUsers()
    {
        $query = "SELECT * FROM " . $this->table_name;
        return $this->query($query, []);
    }

    public function getUserByEmail($email) {
        
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = :email";
        $params = [':email' => $email];  
        return $this->query($query, $params);  
    }

    public function updateUser($data, $id) {
        return $this->update($data, $id);
    }
    
}

?>


