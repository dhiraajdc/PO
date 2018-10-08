'use strict';

var crud = require('../../resources/crudService');
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
  var paramNotReq = {_id:0};
  var condition = {};
  condition["doNumber"] = parseInt(doNumber);
  // return new Promise(function(resolve, reject) {
  if(doNumber){
    return crud.deleteData(db.dbConnection, db.dbName, collectionName, condition, paramNotReq)
  }
  else{
    var error = {
      statusCode:417,
      message: 'DO number is invalid'
    };
    return error;
  }
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
  var paramNotReq = {_id:0};
  var condition = {};
  // condition["manufacturerName"] = body.manufacturerName;
  condition["doNumber"] = parseInt(body.doNumber);
  return crud.insertData( db.dbConnection, db.dbName, collectionName, condition, paramNotReq, body)
}

/**
 * Get all demand order
 * 
 * returns DemandOrder
 **/

exports.getDemandOrder = function(doNumber,sortBy,sortValue,searchBy) {
  var deferred = Q.defer();
  var condition = {};
  if(doNumber){
    condition["doNumber"] = doNumber;
  }
  if(searchBy){
    condition["manufacturerName"] = searchBy;
  }
  var paramNotReq = {_id:0};
  var sortField = {};
  var sortBy = sortBy || "doNumber";
  sortField[sortBy] = sortValue || 1;
  //  Create (Store data in MongoDB)
  return crud.getData(db.dbConnection, db.dbName, collectionName, condition, sortField, paramNotReq)
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
  var paramNotReq = {_id:0};
   return crud.updateData(db.dbConnection, db.dbName, collectionName, data, condition, paramNotReq)
}
