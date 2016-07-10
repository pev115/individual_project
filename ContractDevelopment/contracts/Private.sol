import "owned.sol";

import "SharesManager.sol";

import "hasProposals.sol";
/*TODO:
Implement a board of directors
Implement a hashing for the description
Implement different types of proposals through new contracts eg. salary
Implement a way to lock funds of proposals
Can have the board receiving a fixed percent of shares and everytime there is a payment just do
dividends
Implement a way to tie proposals to a specific product that can be sold only when all proposals
for the product are finalised

*/


contract Private is owned, SharesManager, hasProposals {
  bool public recruiting;
  bool public building;
  bool public production;
  uint public percentDividends;
  string public description;

    modifier onlyShareholders {
          if (balances[msg.sender] == 0) throw;
          _
      }

    /* First time setup */
    function Private(address _owner, string _desc) {
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
      proposalsNumber = 0;
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
        percentDividends = percent;
    }

    function receivePayment(){
      if(!production){
        throw;
      }

      uint nbShareholders = shareholders.length;
      for (uint i=0; i<nbShareholders; ++i){
        address holder = shareholders[i];
        uint shares= balances[holder];
        holder.send(((msg.value*percentDividends)/100)*(shares/totalSupply));
      }

    }

    function fuel() onlyOwner{}

    function addProposal(uint _reward, uint _deposit, string _desc) onlyOwner {
      if(!recruiting || _reward<_deposit ){
        throw;
      }

      uint proposalID=  proposals.length++;
      proposal p = proposals[proposalID];
      p.ID = proposalID;
      p.reward = _reward;
      p.deposit = _deposit;
      p.completed = false;
      p.appointed = false;
      p.finalised = false;
      p.description = _desc;
      proposalsNumber = proposalsNumber +1;
    }

    function hireConrtactor (address _contractor, uint proposalID) onlyOwner{
      if(proposalID < proposalsNumber){
        throw;
      }
      proposal p = proposals[proposalID];
      if(p.appointed == true || p.finalised == true){
        throw;
      }
      p.appointed = true;
      p.contractor = _contractor;
      _contractor.send(p.deposit);

    }

    function layoffContractor (uint proposalID) onlyOwner{
      if(proposalID < proposalsNumber){
        throw;
      }

      proposal p = proposals[proposalID];

      if(p.appointed ==false || p.finalised==true){
        throw;
      }

      if(!recruiting){
        recruiting= true;
      }

      p.appointed = false;
      p.contractor = 0;

    }

    function completeWork (uint proposalID){
      if(proposalID < proposalsNumber){
        throw;
      }

      proposal p = proposals[proposalID];

      if(msg.sender != p.contractor){
        throw;
      }

      p.completed = true;

    }

    function finalise(uint proposalID) onlyOwner{
      if(proposalID < proposalsNumber){
        throw;
      }

      proposal p = proposals[proposalID];

      if(p.appointed == false){
        throw;
      }

      uint payment = p.reward - p.deposit;
      p.contractor.send(payment);
      p.finalised = true;

    }
}
