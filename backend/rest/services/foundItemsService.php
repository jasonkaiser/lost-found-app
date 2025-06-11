<?php
require_once __DIR__ . '/baseService.php';
require_once __DIR__ . '/../dao/foundItemsDao.php';  

class FoundItemsService extends BaseService
{   
    
    public function __construct()
    {
        parent::__construct(new FoundItem);
    }


    public function getFoundItems(){
        

        $foundItems = $this->dao->getFoundItems();

        if(empty($foundItems)){
            throw new RuntimeException("Found Items not found.");
        }

        return $foundItems;

    }

    public function getItemByCategory($category){
 

        if(empty($category)){
            throw new InvalidArgumentException("Category cannot be empty.");
        }
        
        $itemCategory = $this->dao->getItemByCategory($category);

        if(empty($itemCategory)){
            throw new RuntimeException("Found Items not found.");
        }

        return $itemCategory;

    }


    public function getItemByName($name){


        if(empty($name)){
            throw new InvalidArgumentException("Name cannot be empty.");
        }
        
        $itemName = $this->dao->getItemByName($name);

        if(empty($itemName)){
            throw new RuntimeException("Found Items not found.");
        }

        return $itemName;
    }

    
    public function getItemByUser($user){


        if(empty($user)){
            throw new InvalidArgumentException("Invalid User ID.");
        }
        
        $itemUser = $this->dao->getItemByUser($user);

        if(empty($itemUser)){
            throw new RuntimeException("Found Items not found.");
        }

        return $itemUser;
    }


}
?>