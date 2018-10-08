'use strict';

var crud = require('../../resources/crudService');
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
  return crud.getData(db.dbConnection, db.dbName, collectionName, condition, sortField, paramNotReq)
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
    return crud.deleteData(db.dbConnection, db.dbName, collectionName, condition, paramNotReq)
  }
  else{
    var error = {
      statusCode:417,
      message: 'Organization ID is invalid'
    };
    return error;
  }
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
  // condition["supplierName"] = body.supplierName;
  condition["supplierID"] = parseInt(body.supplierID);
  // console.log(condition);
    return crud.insertData( db.dbConnection, db.dbName, collectionName, condition, paramNotReq, body)
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
  var paramNotReq = {_id:0};
   return crud.updateData(db.dbConnection, db.dbName, collectionName, data, condition, paramNotReq)
}