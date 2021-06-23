const assert = require('assert');
const mongoose = require('mongoose');
const Task = require('../models/task');

//Describing Our tests
describe('OPERATIONS', function(){

  beforeEach(function(done){
    mongoose.connection.collections.tasks.drop(function(){
      done();
    });
  });


  // Create Tests
  it('Creating Tasks', function(){
    var t1 = new Task({
      Description: "Workout",
      Completed: true
    });

    var t2 = new Task({
      Description: "Yoga",
      Completed: false
    });
    var t3 = new Task({
      Description: "Dance",
      Completed: true
    });
    var t4 = new Task({
      Description: "Sing",
      Completed: false
    });

    t1.save();

    t2.save();
    t3.save();
    t4.save();
  });


  //Reading Records
  
  it('Reading Tasks', function(done){
    var t1 = new Task({
      Description: "Workout",
      Completed: true
    });

    var t2 = new Task({
      Description: "Yoga",
      Completed: false
    });

    var t3 = new Task({
      Description: "Dance",
      Completed: true
    });

    var t4 = new Task({
      Description: "Sing",
      Completed: false
    });

    t1.save();

    t2.save().then(function(){
       Task.findOne({Completed: false}).then(function(result){ 
         assert(result.Completed === false);
         done();
      });
    });
    t4.save().then(function(){
       Task.findOne({Completed: false}).then(function(result){ 
         assert(result.Completed === false);
         done();
      });
    });
  });




   //Update the Record 
   it('Updating Tasks', function(){
    var t1 = new Task({
      Description: "Workout",
      Completed: true
    });

    var t2 = new Task({
      Description: "Yoga",
      Completed: false
    });

    var t3 = new Task({
      Description: "Dance",
      Completed: true
    });

    var t4 = new Task({
      Description: "Sing",
      Completed: false
    });

    t1.save();

    t2.save().then(function(done){
      Task.findOneUpdate({Completed: false}, {Completed: true}).then(function(){
        Task.findOne({name: 'Yoga'}).then(function(result){
          asssert(result.Completed === true);
          done();
        });
      });
    });
    t4.save().then(function(done){
      Task.findOneUpdate({Completed: false}, {Completed: true}).then(function(){
        Task.findOne({name: 'Sing'}).then(function(result){
          asssert(result.Completed === true);
          done();
        });
      });
    });
  });



  //Delete the Record

  it('Deleting Tasks', function(){
    var t1 = new Task({
      Description: "Workout",
      Completed: true
    });

    var t2 = new Task({
      Description: "Yoga",
      Completed: false
    });

    
    var t3 = new Task({
      Description: "Dance",
      Completed: true
    });

    var t4 = new Task({
      Description: "Sing",
      Completed: false
    });

    t1.save();

    t2.save().then(function(done){
      Task.findOneAndRemove({Description: 'Workout'}).then(function(){
        Task.findOne({Description: 'Workout'}).then(function(result){
          asssert(result === null);
          done();
        });
      });
    });
  });

});