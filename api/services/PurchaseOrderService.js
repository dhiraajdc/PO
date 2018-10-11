'use strict';

var crud = require('../../resources/crudService');
var collectionName = "PurchaseOrder";
var db = require('../../config.json')
var Q = require ('q');


/**
 * Get all purchase order details
 *
 * returns all PurchaseOrder
 * 
 **/

exports.getPurchaseOrder = function(poNumber,sortBy,sortValue,searchBy) {
  var condition = {};
  if(poNumber){
    condition["poNumber"] = poNumber;
  }
  if(searchBy){
    condition["manufacturerName"] = searchBy;
  }
  var paramNotReq = {_id:0};
  var sortField = {};
  var sortBy = sortBy || "poNumber";
  sortField[sortBy] = sortValue || 1;
  //  Read (Read data from MongoDB)
    return crud.getData(db.dbConnection, db.dbName, collectionName, condition, sortField, paramNotReq)
}

/**
 * Place an order for a product
 * 
 *
 * body PurchaseOrder order placed for purchasing the product
 * returns ApiResponse
 **/
exports.createPurchaseOrder = function(body) {
  // var data = body;
  var paramNotReq = {_id:0};
  var condition = {};
  // condition["orderid"] = body.orderid;
  condition["poNumber"] = parseInt(body.poNumber);
  return crud.insertData( db.dbConnection, db.dbName, collectionName, condition, paramNotReq, body)
}

/**
 * Delete purchase order by purchase Id
 * 
 *
 * poNumber Integer Fetch purchase order by purchaseId 
 * no response value expected for this operation
 **/
exports.deletePurchaseOrder = function(poNumber) {
  var paramNotReq = {_id:0};
  var condition = {};
  condition["poNumber"] = parseInt(poNumber);
  //  Delete (Delete data from MongoDB)
  if(poNumber){
    return crud.deleteData(db.dbConnection, db.dbName, collectionName, condition, paramNotReq)
  }
  else{
    var error = {
      statusCode:417,
      message: 'PO number is invalid'
    };
    return error;
  }
}

/**
 * Update an existing purchase order
 * 
 *
 * body PurchaseOrder Update purchase order data
 * no response value expected for this operation
 **/
exports.updatePurchaseOrder = function(poNumber,status) {
  var condition = {};
  condition["poNumber"] = poNumber;
  var body = {};
  body["status"] = status;
  // var data = body.update;
  var paramNotReq = {_id:0};
   return crud.updateData(db.dbConnection, db.dbName, collectionName, body, condition, paramNotReq)
}



