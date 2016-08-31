contract GovManager {
address public owner;
function GovManager() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _
    }

}
