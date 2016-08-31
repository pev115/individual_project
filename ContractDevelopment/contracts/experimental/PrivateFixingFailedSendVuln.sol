import "../GovManager.sol";

import "../SharesManager.sol";

import "../ProposalManager.sol";

contract PrivateFixingFailedSendVuln is GovManager, SharesManager, ProposalManager {
  bool public recruiting;
  bool public building;
  bool public production;
  uint public percentDividends;
  string public description;
  mapping (address=>uint) missedRewards;



    function PrivateFixingFailedSendVuln(address _owner, string _desc) {
      if(_owner != 0){
        owner = _owner;
      }else{
        owner = msg.sender;
      }

      description = _desc;

      investment =false;
      recruiting = false;
      building = false;
      production = false;
      percentDividends = 0;
    }

    function toggleSharesIssue() onlyOwner  {
      if(investment){
        investment=false;
      }else{
        investment = true;
      }
    }

    function toggleRecruiting() onlyOwner  {
      if(recruiting){
        recruiting=false;

      }else{
        recruiting = true;

      }
    }

    function toggleBuilding() onlyOwner  {
      if(building){
        building=false;

      }else{
        building = true;

      }
    }

    function toggleProduction() onlyOwner  {
      if(production){
        production=false;

      }else{
        production = true;

      }
    }

    function changeDividends(uint percent)onlyOwner{
        if(percent>100){
          throw;
        }
        if(percent<0){
          throw;
        }
        percentDividends = percent;
    }


    function receivePayment(uint _ID){
      if(!production){
        throw;
      }
      if(proposals[_ID].ID == 0){
        throw;
      }

      proposal p = proposals[_ID];
      if(p.finalised == false){
        throw;
      }

      if(totalSupply!=0){
        uint nbShareholders = shareholders.length;
        for (uint i=0; i<nbShareholders; ++i){
          address holder = shareholders[i];
          uint shares= balances[holder];
          if(!holder.send(((msg.value*percentDividends)/100)*(shares/totalSupply))){
            missedRewards[holder] = ((msg.value*percentDividends)/100)*(shares/totalSupply);
          }
        }
    }
    }

    function retrieveMissedRewards ( address _shareholder ){
        uint sum = missedRewards[_shareholder];
        if(sum <=  0 ){
         throw;
        }
       if(! _shareholder.send(sum)){
           throw;
       }
      }


    function fuel() onlyOwner{}



    function addProposal(uint _reward, uint _deposit, string _desc, uint _ID) onlyOwner {
      if(_ID<0){
        throw;
      }

      if(!recruiting || proposals[_ID].ID!=0 ){
        throw;
      }

      proposal p = proposals[_ID];
      p.ID = _ID;
      p.reward = _reward;
      p.deposit = _deposit;
      p.completed = false;
      p.appointed = false;
      p.finalised = false;
      p.contractor = 0;
      p.description = _desc;
    }

    function removeProposal(uint _ID) onlyOwner{
      if(proposals[_ID].ID == 0){
        throw;
      }

      proposal p = proposals[_ID];

      if(p.appointed == true){
        throw;
      }

      p.ID = 0;

    }


    function hireContractor (address _contractor, uint _ID) onlyOwner{

      if(!recruiting){
        throw;
      }

      if(proposals[_ID].ID == 0){
        throw;
      }

      proposal p = proposals[_ID];
      if(p.appointed == true){
        throw;
      }
      p.appointed = true;
      p.contractor = _contractor;
      if(!_contractor.send(p.deposit)){
        throw;
      }

    }

    function layoffContractor (uint _ID) onlyOwner{
      if(proposals[_ID].ID == 0){
        throw;
      }

      proposal p = proposals[_ID];

      if(p.appointed ==false || p.finalised==true){
        throw;
      }

      p.appointed = false;
      p.completed= false;
      p.contractor = 0;

    }


    function finalise(uint _ID) onlyOwner{
      if(proposals[_ID].ID==0){
        throw;
      }


      proposal p = proposals[_ID];

      if(p.appointed == false || p.completed ==false || p.finalised == true){
        throw;
      }

      uint payment = p.reward;
      p.finalised = true;

      if(!p.contractor.send(payment)){
        throw;
      }

    }



    function () {
    throw;
    }

}
