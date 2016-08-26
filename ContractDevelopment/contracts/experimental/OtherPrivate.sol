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
add employee rating : have a list and when someone has been contracted he can give a rating
*/

/*NEW TODO:
put a rating system
put a total shareholder payout
add title
check the appointed -completed finalised workflow again very carefuly
take out automatic recruiting switch when laying off contractor
i think get rid of the finalised= true in the hireContractor
think about very carefully what happens if the dao soes not have enough funds for the deposit
 identify all th points where the contract can throw (eg. where the contract sends money and make sure
 they are correctly reflected in the website's ui
 in complete work add condition that appointed is true and finalised is false
MUST DO: on finalise check that finalise is false!!!!
*/

contract OtherPrivate is owned, SharesManager, hasProposals {
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
        if(!holder.send(((msg.value*percentDividends)/100)*(shares/totalSupply))){
          throw;
        }
      }

    }

    function fuel() onlyOwner{}





    function addProposal(uint _reward, uint _deposit, string _desc, uint _ID) onlyOwner {
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
      p.description = _desc;
    }

    function hireContractor (address _contractor, uint _ID) onlyOwner{
      if(proposals[_ID].ID == 0){
        throw;
      }

      proposal p = proposals[_ID];
      if(p.appointed == true || p.finalised == true){
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

      if(!recruiting){
        recruiting= true;
      }

      p.appointed = false;
      p.completed= false;
      p.contractor = 0;

    }

    function completeWork (uint _ID){
      if(proposals[_ID].ID == 0){
        throw;
      }

      proposal p = proposals[_ID];
      if(msg.sender != p.contractor){
        throw;
      }
      p.completed = true;
    }

    function finalise(uint _ID) onlyOwner{
      if(proposals[_ID].ID==0){
        throw;
      }



      proposal p = proposals[_ID];

      if(p.appointed == false || p.completed ==false){
        throw;
      }

      uint payment = p.reward;

      if(!p.contractor.send(payment)){
        throw;
      }

      p.finalised = true;

    }
}
