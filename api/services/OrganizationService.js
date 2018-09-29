'use strict';

var crud = require('crud-sdk');
var collectionName = "Organization";
var db = require('../../config.json')
var Q = require ('q');


/**
 * Get All Organization details
 *
 * returns All Organization details
 * 
 **/

exports.getOrganization = function(orgId,sortBy,sortValue,searchBy) {
  var deferred = Q.defer();
  var condition = {};
  if(orgId){
    condition["orgId"] = orgId;
  }
  if(searchBy){
    condition["orgName"] = searchBy;
  }
  var paramNotReq = {_id:0};
  var sortField = {};
  var sortBy = sortBy || "orgId";
  sortField[sortBy] = sortValue || 1;
  // console.log(condition);
  //  Read (Read data from MongoDB)
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, paramNotReq, function (err, data) {
    console.log(data);
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        if (data.length){
        }
        else{
          var error = [{
            status : '404',
            message:'No Record Found'
          }]
          console.log(error)
          deferred.reject(error);
        }
        deferred.resolve(data);
  });
  return deferred.promise;
}

/**
 * Delete organization data by organizationId
 * 
 *
 * organizationId Integer Fetch organization data by organizationId 
 * no response value expected for this operation
 **/
exports.deleteOrganization = function(organizationId) {
  var deferred = Q.defer();
  var paramNotReq = {_id:0};
  var condition = {};
  condition["orgId"] = parseInt(organizationId);
  var paramNotReq = {_id:0};
  // return new Promise(function(resolve, reject) {
    if(organizationId){
      crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, paramNotReq, function (err, data) {
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
          deferred.reject(error);
        }
        
      });
    }
    else{
      var error = [{
        message:'Organization ID is invalid'
      }]
      deferred.reject(error);
    }
    return deferred.promise;
}



/**
 * Place an order for a product
 * 
 *
 * body Organization set data for organization
 * returns ApiResponse
 **/
exports.createOrganization = function(body) {
  var deferred = Q.defer();
  // var data = body;
  var paramNotReq = {_id:0};
  var condition = {};
  condition["supplierName"] = body.supplierName;
  condition["supplierID"] = parseInt(body.supplierID);
  // console.log(condition);
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, paramNotReq, function (err, data) {
    if(data == undefined){
      // console.log(data);
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
        response:'Supplier ID ' + body.supplierID + ' already exists'
      }
      deferred.reject(error);
    }
    else{
      crud.create(db.dbConnection, db.dbName, collectionName, data, function (err, data) {
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
 * Update an existing Organization
 * 
 *
 * body Organization Update organization data
 * no response value expected for this operation
 **/
exports.updateOrganization = function(body) {
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

