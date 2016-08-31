
contract salaryProposalManager{
  mapping (uint => proposal)  public proposals;


  struct proposal{

    uint ID;
    uint startDate;
    uint expiryDate;
    uint previousPaymentDate;
    string  description;
    uint salary;
    address  contractor;
    bool finalised;
  }


  function salaryProposalManager(){}


  function receivePay (uint _ID){
    if(proposals[_ID].ID == 0){
          throw;
        }

    proposal p = proposals[_ID];

    if(this.balance<p.salary){
      throw;
    }


    if(now > p.expiryDate || now <p.previousPaymentDate+2628000){
      throw;
    }

    p.previousPaymentDate=now;
    if(!p.contractor.send(p.salary)){throw;}


  }



}
