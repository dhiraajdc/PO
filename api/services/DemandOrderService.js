'use strict';

var crud = require('crud-sdk');
var collectionName = "DemandOrder";
var db = require('../../config.json')
var Q = require ('q');

/**
 * Delete demand order by demand number
 * 
 *
 * doNumber Integer Fetch demand order by demand number 
 * no response value expected for this operation
 **/
exports.deleteDemandOrder = function(doNumber) {
  var deferred = Q.defer();
  var condition = {};
  condition["doNumber"] = parseInt(doNumber);
  // return new Promise(function(resolve, reject) {
    if(doNumber){
      crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, function (err, data) {
        // console.log(data);
        if (err) {
          deferred.reject(err);
        }
        if(data.length){
          crud.delete(db.dbConnection, db.dbName, collectionName, condition, function (err, result){
            if(err) {
              console.log(err);
              deferred.reject(err);
            }
            else{
              console.log(result);
              deferred.resolve(result);
            }
          });
        }
        else{
          var error = {
            message:'No Record Found'
          }
          console.log(error)
          deferred.reject(error);
        }
        
      });
    }
    else{
      var error = {
        message:'DO number is invalid'
      }
      deferred.reject(error);
    }
    return deferred.promise;
}


/**
 * Place an demand order for a product
 * 
 *
 * body DemandOrder demand order placed for product
 * returns ApiResponse
 **/
exports.createDemandOrder = function(body) {
  var deferred = Q.defer();
  // var data = body;
  var condition = {};
  condition["manufacturerName"] = body.manufacturerName;
  condition["doNumber"] = parseInt(body.doNumber);
  // console.log(condition);
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, function (err, data) {
    if(data == undefined){
      console.log(data);
      var error = {
        response:'Database Connection Error'
      }
      deferred.reject(error);
    }
    if (err) {
      deferred.reject(err);
    }

    if(data.length){
      var error = {
        response:'DO number ' + body.doNumber + ' already exists'
      }
      deferred.reject(error);
    }
    else{
      //  Create (Store data in MongoDB)
      crud.create(db.dbConnection, db.dbName, collectionName, body, function (err, data) {
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
    }
  });
  
  return deferred.promise;
}


/**
 * Get demand order by demand number
 * 
 *
 * doNumber Integer Fetch demand order by demand number
 * returns DemandOrder
 **/
exports.getDemandOrder = function(manufacturerName,sortBy) {
  var deferred = Q.defer();
  var condition = {};
  condition["manufacturerName"] = manufacturerName;
  var sortField = {};
  var sortBy = sortBy || "doNumber";
  sortField[sortBy] = 1;
  // console.log('condition ===>',condition);
  //  Create (Store data in MongoDB)
  crud.sort(db.dbConnection, db.dbName, collectionName, condition, sortField, function (err, data) {
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        if (!data.length){
          var error = {
            response:'Record not found'
          }
          deferred.reject(error);
        }
        deferred.resolve(data);
  });
  return deferred.promise;
}

/**
 * Get all demand order
 * 
 * returns DemandOrder
 **/

exports.getAllDemandOrder = function() {
  var deferred = Q.defer();
  var condition = {};
  var paramNotReq = {_id:0};
  //  Create (Store data in MongoDB)
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, paramNotReq, function (err, data) {
        
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        if (!data.length){
          var error = {
            message:'Record not found'
          }
          deferred.reject(error);
        }
        deferred.resolve(data);
  });
  return deferred.promise;
}


/**
 * Update an existing Demand order
 * 
 *
 * body DemandOrder Update demand order data
 * no response value expected for this operation
 **/
exports.updateDemandOrder = function(body) {
  var condition = body.condition;
  var data = body.update;
    var deferred = Q.defer();
    crud.update(db.dbConnection, db.dbName, collectionName, data, condition, function (err, result){
      console.log(result);
      if (err) {
        console.error(err);
        deferred.reject(err);
      }
      deferred.resolve(result);
    });
    return deferred.promise;
}

exports.searchDemandOrder = function(searchBy) {
  var deferred = Q.defer();
  var condition = {};
  // condition["orgID"] = orgID;
  condition["doNumber"] = parseInt(searchBy);
  console.log("Condition ====>",condition)
  //  Read (Read data from MongoDB)
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, function (err, data) {
        if (err) {
          console.error(err);
          deferred.reject(err);
        }else{
          if (!data.length){
            var error = {
              response:'No Record Found'
            }
            deferred.reject(error);
          }
        }
        deferred.resolve(data);
  });
  return deferred.promise;
}

