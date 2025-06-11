<?php
require_once __DIR__ . '/baseService.php';
require_once __DIR__ . '/../dao/claimRequestsDao.php';  

class ClaimRequestsService extends BaseService
{   
    
    public function __construct()
    {
        parent::__construct(new ClaimRequest);
    }


    public function getClaimRequests(){
        
        $claimRequests = $this->dao->getClaimRequests();

        if(empty($claimRequests)){
            throw new RuntimeException("Claim Requests not found.");
        }

        return $claimRequests;

    }


}
?>