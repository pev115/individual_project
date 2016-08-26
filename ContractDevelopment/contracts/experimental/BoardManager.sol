contract BoardManager{

  mapping(address => uint) public Board;
  uint boardSize;
  bool public appointed;
  boardChange[] changes;
  mapping(uint=>Resolution) public resolutions;

  struct boardChange{
    address candidate;
    uint changeNumber;
    uint changeType;
    boardVote[] votes;
    bool decided;
    bool completed;
  }

  struct Resolution{
    mapping (address=>bool) voted;
    bool executed;
    uint _ID;
    boardVote[] votes;
    string description;
  }

  struct boardVote{
    bool inSupport;
    address voter;
    string justification;
  }

  function BoardManager() {
    appointed = false;
    boardSize=0;
  }

  modifier onlyBoard {
    if (Board[msg.sender] == 0){ throw;}
    _
  }

  modifier onlyVoted(uint resID){
    if(resID<0){
        throw;
      }

    if(resolutions[resID]._ID==0 ){
        throw;
      }

    Resolution r =resolutions[resID];

    if(r.executed == true) throw;

    uint positiveVotes=0;
    for(uint i =0; i< r.votes.length ; i++){
      if(r.votes[i].inSupport){
        positiveVotes=positiveVotes+1;
      }
    }

    if(positiveVotes> boardSize/2){
      r.executed = true;
    }else{
      throw;
    }
   _


  }


  function addResolution(string Description, uint _ID){
    if(_ID<0){
        throw;
      }
      if(resolutions[_ID]._ID!=0 ){
        throw;
      }
      Resolution r =resolutions[_ID];
      r.executed=false;
      r._ID=_ID;
      r.description=Description;
  }

  function voteResolution(uint resID, bool _inSupport, string _justification)onlyBoard{
    if(resID<0){
        throw;
      }

    if(resolutions[resID]._ID==0 ){
        throw;
      }
    Resolution r =resolutions[resID];

    if(r.voted[msg.sender]) throw;

    r.voted[msg.sender] =true;

    uint voteId= r.votes.length++;
    boardVote v=r.votes[voteId];
    v.inSupport=_inSupport;
    v.voter =msg.sender;
    v.justification =_justification;



  }


  function appointBoard(address[] members ){
    for (uint i=0; i<members.length;++i){
      Board[members[i]]=1 ;
      boardSize=boardSize+1;
    }
    appointed = true;
  }


  function addBoardChange(address _candidate) onlyBoard {
    uint chType;
    uint changeID;

    if (Board[_candidate]!= 0 ){
      chType = 0;
    }


    if(Board[_candidate]==0){
      chType = 1;
    }

    changeID = changes.length++;
    boardChange c = changes[changeID];
    c.candidate = _candidate;
    c.changeType =chType;
    c.completed = false;
    c.changeNumber = changeID;

  }


}
