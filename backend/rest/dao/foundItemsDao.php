<?php

    require_once __DIR__ . "/baseDao.php";  


    class FoundItem extends BaseDao {

    protected $table_name;


        public function __construct(){

            $this->table_name = "foundItems";
            parent::__construct($this->table_name);
        }


        public function getItemByCategory($category_id){

            $query = "SELECT * FROM " . $this->table_name . " WHERE categoryID = :categoryID";
            $params = [":categoryID" => $category_id];
            return $this->query($query, $params);
        }

   
        public function getItemByName($name){
            
            $query = "SELECT * FROM " . $this->table_name . " WHERE itemName LIKE :itemName";
            $params = [":itemName" => '%' . $name . '%'];
            return $this->query($query, $params);
        }

        public function getItemByUser($user_id){

            $query = "SELECT * FROM " . $this->table_name . " WHERE userID = :userID";
            $params = [":userID" => $user_id];
            return $this->query($query, $params);
        }

        public function getFoundItems(){
            $query = "SELECT * FROM ". $this->table_name;
            return $this->query($query, []);
        
        }


    }




?>