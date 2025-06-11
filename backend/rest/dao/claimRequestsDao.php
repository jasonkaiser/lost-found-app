<?php

    require_once __DIR__ . "/baseDao.php";  


    class ClaimRequest extends BaseDao {

    protected $table_name;


        public function __construct(){

            $this->table_name = "claimRequests";
            parent::__construct($this->table_name);
        }


        public function getClaimRequests(){
            $query = "SELECT * FROM " . $this->table_name;
            return $this->query($query, []);
        }


    }




?>