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

exports.getAllOrganization = function() {
  var deferred = Q.defer();
  var condition = {};
  var paramNotReq = {_id:0};
  // console.log(condition);
  //  Read (Read data from MongoDB)
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, paramNotReq, function (err, data) {
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        if (!data.length){
          var error = {
            response:'No Record Found'
          }
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
  var condition = {};
  condition["orgId"] = parseInt(organizationId);
  // return new Promise(function(resolve, reject) {
    if(organizationId){
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
        message:'Organization ID is invalid'
      }
      deferred.reject(error);
    }
    return deferred.promise;
}


/**
 * Get organization  details by organizationId
 * 
 *
 * organizationId Integer Fetch organization data by organizationId 
 * returns organization
 **/
exports.getOrganization = function(organizationId,sortBy) {
  var deferred = Q.defer();
  var condition = {};
  condition["orgId"] = parseInt(organizationId);
  var sortField = {};
  var sortBy = sortBy || "orgName";
  sortField[sortBy] = 1;
  console.log('condition ===>',condition);
  //  Create (Store data in MongoDB)
  crud.sort(db.dbConnection, db.dbName, collectionName, condition, sortField, function (err, data) {
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        deferred.resolve(data);
  });
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
  var data = body;
  console.log('data ===>',data);
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

