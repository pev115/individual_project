
/*TODO: fizx weird bug with payment distributed test */

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
          total += amount / 1000000000000000000;
          amount+= parseInt(web3.toWei(10, 'Ether'));
        }
        return priv.totalSupply.call() ;
      }).then(function(supply){
        assert.equal(supply.toNumber(), total, "total does not match")
      }).then(function(){
        return priv.transfer.sendTransaction(accounts[0], 5,{from:accounts[2]}).then(function(){
            return priv.getShares.call();
        });
      }).then(function(sh){
        var expected = 5;
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

      return priv.fuel.sendTransaction({from:accounts[0],value:200000000000000000000}).then(function(){
        return web3.eth.getBalance(priv.address);
      });
    }).then(function(blance){
      contractBalance = blance;
      assert.equal(contractBalance.toNumber(),200000000000000000000,"The contract balance is not set properly");
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
      var expected = contractBalance - _deposit *1000000000000000000;
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
      var expected = contractBalance - _deposit*1000000000000000000 - _reward*1000000000000000000;
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




    priv.toggleRecruiting.sendTransaction({from:accounts[0]})
    .then(function(){
      return priv.recruiting.call();
    }).then(function(rec){
      assert.equal(rec,true,"The recruiting did not toggle");
      return priv.addProposal.sendTransaction(_reward,_deposit,_desc,_ID,{from:accounts[0]})
      .then(function(){
        return priv.proposals(_ID);
      });
    }).then(function(prop){
      var err = false;
      assert.equal(prop[0],_ID, "The id of the proposal does not match the input");
      assert.equal(prop[5],false,"Appointed is true before being set");
      priv.layoffContractor.sendTransaction(_ID,{from:accounts[0]}).catch(function(e){
        err = true;
      }).then(function(){
        assert.equal(err,true, "Could layoff while no one there");
      });
    }).then(function(){
      var err= false;
      priv.hireContractor.sendTransaction(_contractor,_ID,{form:accounts[0]}).catch(function(e){
        err = true;
      }).then(function(){
        assert.equal(err,true, "could hire without money");
      });

      return priv.proposals.call(_ID);

    }).then(function(prop){
      assert.equal(prop[5],false, "Toggled appoint even if no contractor");
      return priv.fuel.sendTransaction({from:accounts[0],value:200000000000000000000}).then(function(){
        return web3.eth.getBalance(priv.address);
      });
    }).then(function(blance){
      assert.equal(blance,200000000000000000000,"fueling failed");
      return priv.hireContractor.sendTransaction(_contractor,_ID,{form:accounts[0]})
              .then(function(){
                return priv.proposals.call(_ID);
              });
    }).then(function(prop){
      assert.equal(prop[6],_contractor, "the contractor was not set properly");
      assert.equal(prop[5],true,"Appointed not set properly");
    }).then(function(){
      return priv.layoffContractor.sendTransaction(_ID,{from:accounts[0]})
      .then(function(){
        return priv.proposals.call(_ID);
      });
    }).then(function(prop){
      assert.equal(prop[5],false, "appointed did not return to false after layoff");
      assert.equal(prop[4],false, "completed not false after layoff");
      assert.equal(prop[6],'0x0000000000000000000000000000000000000000', "Did not set contractor to 0");
    }).then(done).catch(done);

  }).catch(done);
  });










    it("Checks proposals are removed correctly",function(done){
      Private.new(accounts[0],"testDescription",{from:accounts[0]}).then(function(priv){
          var account_zero = accounts[0];
          var _reward= 2;
          var _deposit= 3;
          var _desc="This is a proposal";
          var _ID = 12;
          var _contractor = accounts[2];

          priv.toggleRecruiting.sendTransaction({from:account_zero})
          .then(function(){
            return priv.recruiting.call();
          }).then(function(rec){
            assert.equal(rec,true,"The recruiting did not toggle");
            return priv.addProposal.sendTransaction(_reward,_deposit,_desc,_ID,{from:accounts[0]})
            .then(function(){
              return priv.proposals(_ID);
            });
          }).then(function(prop){
              assert.equal(prop[0],_ID, "The id of the proposal does not match the input");
          }).then(function(){
            return priv.fuel.sendTransaction({from:accounts[0],value:200000000000000000000}).then(function(){
              return web3.eth.getBalance(priv.address);
            });
          }).then(function(blance){
            assert.equal(blance,200000000000000000000,"fueling failed");
            return priv.hireContractor.sendTransaction(_contractor,_ID,{form:accounts[0]})
                    .then(function(){
                      return priv.proposals.call(_ID);
                    });
          }).then(function(prop){
            assert.equal(prop[6],_contractor, "the contractor was not set properly");
            assert.equal(prop[5],true,"Appointed not set properly");
          }).then(function(){

             priv.removeProposal.sendTransaction(_ID,{form:accounts[0]})
             .catch(function(e){
               err = true;
             }).then(function(){
               assert.equal(err,true, "proposal removed even though it was appointed");
             });
            return priv.proposals.call(_ID);

          }).then(function(prop){
            assert.equal(prop[0],_ID, "proposal not having an ID when it should have one");
          }).then(function(){
            return priv.layoffContractor.sendTransaction(_ID,{from:accounts[0]})
            .then(function(){
              return priv.proposals.call(_ID);
            });
          }).then(function(prop){
            assert.equal(prop[5],false, "appointed did not return to false after layoff");
            assert.equal(prop[4],false, "completed not false after layoff");
            assert.equal(prop[6],'0x0000000000000000000000000000000000000000', "Did not set contractor to 0");
          }).then(function(){
            return priv.removeProposal.sendTransaction(_ID,{form:accounts[0]})
            .then(function(){
              return priv.proposals.call(_ID);
            });

          }).then(function(prop){
              assert.equal(prop[0],0, "proposal's ID is not 0 after removing");
              assert.equal(prop[5],0, "proposal appointed is true even though the ID is 0");
              assert.equal(prop[4],false, "completed not false even though ID is 0");
              assert.equal(prop[6],'0x0000000000000000000000000000000000000000', "contractor not 0 even though ID is 0");
          }).then(function(){
            var err= false;
            priv.hireContractor.sendTransaction(_contractor,_ID,{form:accounts[0]}).catch(function(e){
              err = true;
            }).then(function(){
              assert.equal(err,true, "could hire even though the proposal's ID was 0");
            });
          }).then(function(){
            priv.removeProposal.sendTransaction(_ID,{form:accounts[0]})
            .catch(function(e){
              err = true;
            }).then(function(){
              assert.equal(err,true, "Did not throw even though tryied to remove a proposal already removed");
            });
          }).then(function(){
            priv.removeProposal.sendTransaction(54,{form:accounts[0]})
            .catch(function(e){
              err = true;
            }).then(function(){
              assert.equal(err,true, "Did not throw even though tryied to remove a proposal that does not exist");
            });
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

      var _reward= 2;
      var _reward2= 4;
       var _deposit= 3;
       var _deposit2= 6;
       var _desc="This is a proposal";
       var _desc2="This is a new proposal";
       var _ID = 12;




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
        return priv.changeRate.sendTransaction(50,{from:account_zero})
              .then(function(){
                return priv.rewardRate.call();
              });
      }).then(function(div){
        assert.equal(50,div.toNumber(),"dividends percent not set properly");
      }).then(function(){
        account_one_starting_balance= web3.eth.getBalance(account_one);
        console.log("account one starting balance");
        console.log(account_one_starting_balance.toNumber());
      }).then(function(){
      return  priv.toggleRecruiting.sendTransaction({from:accounts[0]}).then(function(){
          return priv.addProposal.sendTransaction(_reward,_deposit,_desc,_ID,{from:accounts[0]})
          .then(function(){
            return priv.proposals.call(_ID);
          });
      });
      }).then(function(prop){
          assert.equal(prop[0],_ID, "The id of the proposal does not match the input");
      }).then(function(){

        return priv.toggleProduction.sendTransaction({from:accounts[0]}).then(function(){
              return priv.production.call();
            });
      }).then(function(changed){
        assert.equal(changed, true, " production did not toggle");
      }).then(function(){

        var pay = parseInt(web3.toWei(5,'ether'));
        var err =false;
        priv.receivePayment.sendTransaction(_ID,{from:accounts[3],value:pay}).catch(function(e){
          err = true;
        }).then(function(){
          assert.equal(err,true, "could receive payment even if not finalised");
        });
      }).then(function(){
        return priv.fuel.sendTransaction({from:accounts[0],value:5000}).then(function(){
          return priv.hireContractor.sendTransaction(account_two,_ID,{form:accounts[0]}).then(function(){
            return priv.completeWork.sendTransaction(_ID,{from:account_two}).then(function(){
              return priv.finalise.sendTransaction(_ID,{from:accounts[0]}).then(function(){
                return priv.proposals.call(_ID);
              });
            });
          });
        });
      }).then(function(prop){
        assert.equal(prop[7],true,"The proposal did not switch to finalised properly");
      }).then(function(){

        var pay = parseInt(web3.toWei(5,'ether'));
        var err =false;
        priv.receivePayment.sendTransaction(_ID,{from:accounts[3],value:pay}).catch(function(e){
          err = true;
        }).then(function(){
          assert.equal(err,false, "could not do payment");
        });
      }).then(function(){
        account_one_ending_balance =web3.eth.getBalance(account_one);
        console.log("account one ending balance");
        console.log(account_one_ending_balance.toNumber());
      }).then(done).catch(done);
    }).catch(done);
  });







});
