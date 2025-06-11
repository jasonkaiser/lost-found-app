<?php
require_once __DIR__ . '/baseService.php';
require_once __DIR__ . '/../dao/categoriesDao.php';  

class CategoriesService extends BaseService
{   


    public function __construct()
    {
        parent::__construct(new Category);
    }



    public function getCategories(){
        
        $categories = $this->dao->getCategories();

        if(empty($categories)){
            throw new RuntimeException("Categories not found.");
        }

        return $categories;

    }

    

    public function getCategoryByName($category_name){

        if(empty($category_name)){
            throw new InvalidArgumentException("Category name cannot be empty.");
        }

        $category = $this->dao->getCategoryByName($category_name);

        if(empty($category)){
            throw new InvalidArgumentException("Invalid Category Name.");
        }

        return $category;

    }
}
?>