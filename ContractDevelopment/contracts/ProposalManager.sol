contract ProposalManager{
  mapping (uint => proposal)  public proposals;

  struct proposal{
    uint ID;
    string  description;
    uint  reward;
    uint deposit;
    bool completed;
    bool appointed;
    address  contractor;
    bool finalised;
  }

  /*Constructor*/
  function ProposalManager(){}

  /*Function for completing proposal*/
  function completeWork (uint _ID){
    if(proposals[_ID].ID == 0){
      throw;
    }

    proposal p = proposals[_ID];


    if(p.appointed == false || p.finalised==true || p.completed ==true){
      throw;
    }

    if(msg.sender != p.contractor){
      throw;
    }
    p.completed = true;
  }




}
