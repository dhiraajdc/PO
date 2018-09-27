'use strict';

var crud = require('crud-sdk');
var collectionName = "PurchaseOrder";
var db = require('../../config.json')
var Q = require ('q');


/**
 * Delete purchase order by purchase Id
 * 
 *
 * poNumber Integer Fetch purchase order by purchaseId 
 * no response value expected for this operation
 **/
exports.deletePurchaseOrder = function(poNumber) {
  var deferred = Q.defer();
  var condition = {};
  condition["poNumber"] = parseInt(poNumber);
  //  Delete (Delete data from MongoDB)
  if(poNumber){
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
      message:'PO number is invalid'
    }
    deferred.reject(error);
  }
  return deferred.promise;
}


/**
 * Get all purchase order details
 *
 * returns all PurchaseOrder
 * 
 **/

exports.getPurchaseOrder = function(poNumber,sortBy,sortValue) {
  var deferred = Q.defer();
  var condition = {};
  if(poNumber){
    condition["poNumber"] = poNumber;
  }
  var paramNotReq = {_id:0};
  var sortField = {};
  var sortBy = sortBy || "poNumber";
  sortField[sortBy] = sortValue || 1;
  console.log(condition);
  //  Read (Read data from MongoDB)
  crud.sort(db.dbConnection, db.dbName, collectionName, condition, sortField, paramNotReq, function (err, data) {
    // console.log(data);
        if (err) {
          console.error(err);
          deferred.reject(err);
        }
        if (!data.length){
          var error = {
            message:'No Record Found'
          }
          deferred.reject(error);
        }
        deferred.resolve(data);
  });
  return deferred.promise;
}

/**
 * Get purchase order details by purchaseId
 * 
 *
 * poNumber Integer Fetch purchase order by Purchase Order Number 
 * returns PurchaseOrder
 * 
 **/
// exports.getPurchaseOrder = function(manufacturerName,sortBy) {
//   var deferred = Q.defer();
//   var condition = {};
//   condition["manufacturerName"] = manufacturerName;
//   // condition["orgID"] = orgID;
//   var sortField = {};
//   var sortBy = sortBy || "poNumber";
//   sortField[sortBy] = 1;
//   //  Read (Read data from MongoDB)
//   crud.sort(db.dbConnection, db.dbName, collectionName, condition, sortField, function (err, data) {
//         if (err) {
//           console.error(err);
//           deferred.reject(err);
//         }
//         if (!data.length){
//           var error = {
//             response:'No Record Found'
//           }
//           deferred.reject(error);
//         }
//         deferred.resolve(data);
//   });
//   return deferred.promise;
// }


/**
 * Place an order for a product
 * 
 *
 * body PurchaseOrder order placed for purchasing the product
 * returns ApiResponse
 **/
exports.createPurchaseOrder = function(body) {
  var deferred = Q.defer();
  // var data = body;
  var condition = {};
  condition["orderid"] = body.orderid;
  condition["poNumber"] = parseInt(body.poNumber);
  // console.log(condition);
  crud.readByCondition(db.dbConnection, db.dbName, collectionName, condition, function (err, data) {
    if (err) {
      deferred.reject(err);
    }
    if(data.length){
      var error = {
        response:'PO number ' + body.poNumber + ' already exists'
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
 * Update an existing purchase order
 * 
 *
 * body PurchaseOrder Update purchase order data
 * no response value expected for this operation
 **/
exports.updatePurchaseOrder = function(body) {
  var condition = body.condition;
  var data = body.update;
    var deferred = Q.defer();
    crud.update(db.dbConnection, db.dbName, collectionName, data, condition, function (err, result){
      if (err) {
        deferred.reject(err);
      }
      deferred.resolve(result);
    });
    return deferred.promise;
}

exports.searchPurchaseOrder = function(searchBy) {
  var deferred = Q.defer();
  var condition = {};
  // condition["orgID"] = orgID;
  condition["poNumber"] = parseInt(searchBy);
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
