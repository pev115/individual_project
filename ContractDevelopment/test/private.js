contract('Private', function(accounts){








    it("Checks the owner is set correctly",function(done){
      var priv = Private.deployed();
      priv.owner.call().then(function(owner){
        assert.equal(owner,accounts[0],"Default constructor failing");
      }).then(function(){
        Private.new(accounts[2],"testDescription",{from:accounts[1]}).then(function(instance){
          instance.owner.call().then(function(newOwner){
            assert.equal(newOwner,accounts[2],"Constructor parameter failing");
          }).then(done).catch(done);
        }).catch(done);
      }).catch(done);
    });








  it("checks Flags toggle correctly",function(done){
    var priv = Private.deployed();
    priv.building.call().then(function(flag){
      assert.equal(flag,false, "building not initialised false");
      return  priv.toggleBuilding.sendTransaction({from:accounts[0]}).then(function(){
                return priv.building.call();
              });
    }).then(function(changed){
        assert.equal(changed, true, "building did not toggle");
        return priv.recruiting.call();
    }).then(function(flag){
      assert.equal(flag,false, "recruiting not initalised to false");
      return priv.toggleRecruiting.sendTransaction({from:accounts[0]}).then(function(){
              return priv.recruiting.call();
            });
    }).then(function(changed){
      assert.equal(changed, true, " recruiting did not toggle");
      return priv.production.call();
    }).then(function(flag){
      assert.equal(flag,false, "production not initalised to false");
      return priv.toggleProduction.sendTransaction({from:accounts[0]}).then(function(){
            return priv.production.call();
          });
    }).then(function(changed){
      assert.equal(changed, true, " production did not toggle");
      return priv.investment.call();
    }).then(function(flag){
      assert.equal(flag,false, "investment not initalised to false");
      return priv.toggleSharesIssue.sendTransaction({from:accounts[0]}).then(function(){
          return priv.investment.call();
        });
    }).then(function(changed){
        assert.equal(changed, true, "investment did not toggle");
    }).then(done).catch(done);
  });





  it("Checks shares allocation is correct",function(done){
    Private.new(accounts[0],"testDescription",{from:accounts[0]}).then(function(priv){
      var account_zero = accounts[0];
      var account_one = accounts[1];
      var account_two = accounts[2];

      var total= 0;

      priv.toggleSharesIssue.sendTransaction({from:account_zero})
      .then(function(tx){
        return priv.investment.call();
      }).then(function(result){
        assert.equal(result,true,"Cannot create shares");
      }).then(function(){
        var amount = parseInt(web3.toWei(10, 'Ether'));
        for(var i =1 ; i<3; i++){
          priv.createShares.sendTransaction({from:accounts[i],value:amount}).catch(function(e){
            console.log("Error in creating shares");
            console.log(e);
        });
          total += amount;
          amount+= parseInt(web3.toWei(10, 'Ether'));
        }
        return priv.totalSupply.call() ;
      }).then(function(supply){
        assert.equal(supply.toNumber(), total, "total does not match")
      }).then(function(){
        return priv.transfer.sendTransaction(accounts[0], parseInt(web3.toWei(5,'Ether')),{from:accounts[2]}).then(function(){
            return priv.getShares.call();
        });
      }).then(function(sh){
        var expected = parseInt(web3.toWei(5,'Ether'));
        assert.equal(sh.toNumber(),expected, "Did not transfer correctly");
      }).then(done).catch(done);
    }).catch(done);
  });






  it("Checks proposals are added correctly",function(done){
     Private.new(accounts[0],"testDescription",{from:accounts[0]}).then(function(priv){

     var _reward= 2;
     var _reward2= 4;
      var _deposit= 3;
      var _deposit2= 6;
      var _desc="This is a proposal";
      var _desc2="This is a new proposal";
      var _ID = 12;

      priv.toggleRecruiting.sendTransaction({from:accounts[0]})
      .then(function(){
      priv.addProposal.sendTransaction(_reward,_deposit,_desc,_ID,{from:accounts[0]});
      return priv.proposals.call(_ID);



      }).then(function(prop){
      assert.equal(prop[0],_ID,"The id's dont match with regular create");
      var err = false;
      return  priv.addProposal.sendTransaction(_reward2,_deposit,_desc,_ID,{from:accounts[0]}).catch(function(e){
          err = true;
          return err;
      }).then(function(){
        return err;
      });


    }).then(function(err){
      assert.equal(err,true,"could create a second contract with same ID");
    }).then(done).catch(done);


    }).catch(done);


  });








it("Checks the normal hiring workflow",function(done){
Private.new(accounts[0],"testDescription",{from:accounts[0]}).then(function(priv){

var _reward= 2;
var _deposit= 3;
var _desc="This is a proposal";
var _ID = 12;
var _contractor = accounts[2];
var contractBalance;

priv.toggleRecruiting.sendTransaction({from:accounts[0]})
.then(function(){

  return priv.fuel.sendTransaction({from:accounts[0],value:20}).then(function(){
    return web3.eth.getBalance(priv.address);
  });
}).then(function(blance){
  contractBalance = blance;
  assert.equal(contractBalance,20,"The contract balance is not set properly");
}).then(function(){
  priv.addProposal.sendTransaction(_reward,_deposit,_desc,_ID,{from:accounts[0]});
  return priv.proposals.call(_ID);
}).then(function(prop){
  assert.equal(prop[0],_ID, "The id of the proposal does not match the input");
  assert.equal(prop[5],false,"Appointed is true before being set");
  var err = false;
  priv.hireContractor.sendTransaction(_contractor,10,{form:accounts[0]}).catch(function(e){
    err = true;
  }).then(function(){
    assert.equal(err,true, "Could hire contractor with invalid ID");
  });
}).then(function(){
  return priv.hireContractor.sendTransaction(_contractor,_ID,{form:accounts[0]})
          .then(function(){
            return priv.proposals.call(_ID);
          });
}).then(function(prop){
  assert.equal(prop[6],_contractor, "the contractor was not set properly");
  assert.equal(prop[5],true, "the appointed did not toggle");
  return web3.eth.getBalance(priv.address);
}).then(function(blance){
  var expected = contractBalance - _deposit;
  assert.equal(expected,blance, "The money was not sent from the contract");
}).then(function(){
  var err = false;
  priv.hireContractor.sendTransaction(accounts[7],_ID,{from:accounts[0]}).catch(function(e){
    err = true;
  }).then(function(){
    assert.equal(err,true, "Could hire while appointed");
  });
}).then(function(){
  var err = false;
  priv.finalise.sendTransaction(_ID,{from:accounts[0]}).catch(function(e){
    err = true;
  }).then(function(){
    assert.equal(err,true, "Could finalise before completed");
  });
}).then(function(){
  var err = false;
  priv.finalise.sendTransaction(10,{from:accounts[0]}).catch(function(e){
    err = true;
  }).then(function(){
    assert.equal(err,true, "Could with wrong proposal ID");
  });
}).then(function(){
  var err = false;
  priv.completeWork.sendTransaction(_ID,{from:accounts[0]}).catch(function(e){
    err = true;
  }).then(function(){
    assert.equal(err,true, "Could complete by not contractor");
  });
}).then(function(){
  return priv.completeWork.sendTransaction(_ID,{from:_contractor}).then(function(){
    return priv.proposals.call(_ID);
  });
}).then(function(prop){
  assert.equal(prop[4],true,"The proposal did not switch to complete properly");
}).then(function(){
  return priv.finalise.sendTransaction(_ID,{from:accounts[0]}).then(function(){
    return priv.proposals.call(_ID);
  });
}).then(function(prop){
  assert.equal(prop[7],true,"The proposal did not switch to finalised properly");
}).then(function(){
  return web3.eth.getBalance(priv.address);
}).then(function(blance){
  var expected = contractBalance - _deposit - _reward;
  assert.equal(expected,blance, "The reward was not sent from the contract");
}).then(done).catch(done);
}).catch(done);

});


it("Checks the layoff function",function(done){
Private.new(accounts[0],"testDescription",{from:accounts[0]}).then(function(priv){
  var _reward= 2;
  var _deposit= 3;
  var _desc="This is a proposal";
  var _ID = 12;
  var _contractor = accounts[2];

  var err = false;
  priv.layoffContractor.sendTransaction({from:accounts[0]}).catch(function(e){
    err = true;
  }).then(function(){
    assert.equal(err,true, "Could layoff while no one there");
  }).then(function(){
    priv.toggleRecruiting.sendTransaction({from:accounts[0]});
  }).then(function(){
    err= false;
    priv.hireContractor.sendTransaction(_contractor,_ID,{form:accounts[0]}).catch(function(e){
      err = true;
    }).then(function(){
      assert.equal(err,true, "could hire without money");
    });
  }).then(function(){
    console.log("GOT HERE");
    return priv.fuel.sendTransaction({from:accounts[0],value:20}).then(function(){
      return web3.eth.getBalance(priv.address);
    });
  }).then(function(blance){
    console.log("GOT HERE");
    assert.equal(blance,20,"fueling failed");
    console.log("GOT HERE");
    return priv.hireContractor.sendTransaction(_contractor,_ID,{form:accounts[0]})
            .then(function(){
              return priv.proposals.call(_ID);
            });
  }).then(function(prop){
    assert.equal(prop[6],_contractor, "the contractor was not set properly");
  }).then(done).catch(done);

}).catch(done);
});






it("Checks payment is distributed correctly", function(done){
  Private.new(accounts[0],"testDescription",{from:accounts[0]}).then(function(priv){
    var account_zero = accounts[0];
    var account_one = accounts[1];
    var account_two = accounts[2];

    var account_one_starting_balance;
    var account_one_ending_balance;


    priv.toggleSharesIssue.sendTransaction({from:account_zero}).then(function(tx){
      var amount = parseInt(web3.toWei(10, 'Ether'));
      for(var i =1 ; i<3; i++){
        priv.createShares.sendTransaction({from:accounts[i],value:amount}).catch(function(e){
          console.log("Error in creating shares");
          console.log(e);
      });

        amount+= parseInt(web3.toWei(10, 'Ether'));
      }
    }).then(function(){
      return priv.changeDividends.sendTransaction(50,{from:account_zero})
            .then(function(){
              return priv.percentDividends.call();
            });
    }).then(function(div){
      assert.equal(50,div.toNumber(),"dividends percent not set properly");
    }).then(function(){
      account_one_starting_balance= web3.eth.getBalance(account_one);
      console.log("account one starting balance");
      console.log(account_one_starting_balance.toNumber());
    }).then(function(){
      var pay = parseInt(web3.toWei(400,'ether'));
      priv.receivePayment.sendTransaction({from:accounts[3],value:pay});
    }).then(function(){
      account_one_ending_balance =web3.eth.getBalance(account_one);
      console.log("account one ending balance");
      console.log(account_one_ending_balance.toNumber());
    }).then(done).catch(done);
  }).catch(done);
});





});
