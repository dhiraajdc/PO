'use strict';

var crud = require('crud-sdk');
var collectionName = "Suppliers";  //collection name will be same as KYC collection name
var db = require('../../config.json')
var Q = require ('q');


/**
 * Get supplier details by organizationId
 * 
 *
 * organizationId Integer Fetch supplier data by organizationId 
 * returns organization
 **/
exports.getSuppliers = function(supplierID,sortBy,sortValue,searchBy) {
  var deferred = Q.defer();
  var condition = {};
  if(supplierID && supplierID.length){
    condition["supplierID"] = supplierID;
  }
  if(searchBy){
    condition["supplierName"] = searchBy;
  }
  var paramNotReq = {_id:0};
  var sortField = {};
  var sortBy = sortBy || "supplierID";
  sortField[sortBy] = sortValue || 1;
  //  Read (Read data from MongoDB)
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, paramNotReq, function (err, data) {
    console.log(data)
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        if (!data.length){
          var error = [{
            status : '404',
            message:'No Record Found'
          }]
          deferred.reject(error);
        }
        deferred.resolve(data);
  });
  return deferred.promise;
}

exports.createSuppliers = function(body) {
  var deferred = Q.defer();
  var data = body;
  // console.log('data ===>',data);
  //  Create (Store data in MongoDB)
  crud.create(db.dbConnection, db.dbName, collectionName, data, function (err, data) {
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        deferred.resolve(data);
  });
  return deferred.promise;
}

exports.updateSuppliers = function(body) {
  var condition = body.condition;
  var data = body.update;
    var deferred = Q.defer();
    crud.update(db.dbConnection, db.dbName, collectionName, data, condition, function (err, result){
      if (err) {
        console.error(err);
        deferred.reject(err);
      }
      deferred.resolve(data);
    });
    return deferred.promise;
}


/**
 * Delete supplier data by organizationId
 * 
 *
 * organizationId Integer Fetch supplier data by organizationId 
 * no response value expected for this operation
 **/
exports.deleteSuppliers = function(supplierID) {
  var deferred = Q.defer();
  var paramNotReq = {_id:0};
  var condition = {};
  condition["supplierID"] = parseInt(supplierID);
  //  Delete (Delete data from MongoDB)
  if(supplierID){
    crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, paramNotReq,function (err, data) {
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
        var error = [{
          status : '404',
          message:'No Record Found'
        }]
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

