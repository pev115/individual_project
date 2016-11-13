it("Should issue a refund by owner only", function(done) {
  var c = Conference.at(Conference.deployed_address);
  Conference.new({ from: accounts[0] }).then(
    function(conference) {
      var ticketPrice = web3.toWei(.05, 'ether');
      var initialBalance = web3.eth.getBalance(conference.address).toNumber();
      conference.buyTicket({from: accounts[1], value: ticketPrice }).then(function() {

         var newBalance = web3.eth.getBalance(conference.address).toNumber();
         var difference = newBalance - initialBalance;
         assert.equal(difference, ticketPrice, "Difference should be what was sent");
         // Now try to issue refund as second user - should fail
         return conference.refundTicket(accounts[1], ticketPrice, {from: accounts[1]});
       }).then(function() {
       var balance = web3.eth.getBalance(conference.address).toNumber();
       assert.equal(web3.toBigNumber(balance), ticketPrice, "Balance should be unchanged");
       // Now try to issue refund as organizer/owner - should work
       return conference.refundTicket(accounts[1], ticketPrice, {from: accounts[0]});}).then( function() {
       var postRefundBalance = web3.eth.getBalance(conference.address).toNumber();
       assert.equal(postRefundBalance, initialBalance, "Balance should be initial balance");
       done();
     }).catch(done);
  }).catch(done);
});
