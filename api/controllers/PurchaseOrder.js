/**
 * Created By :- Gokul
 * Created Date :- 17-09-2018 11:00 am
 */

 'use strict';

var util = require('util');
var PurchaseOrder = require('../services/PurchaseOrderService');
var express = require('express');
var router = express.Router();


module.exports = {
  getPurchaseOrder: getPurchaseOrder,
  createPurchaseOrder: createPurchaseOrder,
  updatePurchaseOrder: updatePurchaseOrder,
  deletePurchaseOrder: deletePurchaseOrder,
  updateSinglePurchaseOrder: updateSinglePurchaseOrder
};


/** 
* @author:Gokul
* @argument:poNumber
* @description:get Purchase order
*/


function getPurchaseOrder (req, res, next) {
  var poNumber = req.swagger.params.poNumber.value;
  var sort = req.swagger.params.sortBy.value || "poNumber_asc";
  var searchBy = req.swagger.params.searchBy.value
  if(sort){
    var sortBy = sort.split("_")[0];
    var value = sort.split("_")[1];
    if (value === "asc")
    {
      var sortValue = 1;
    }else if (value === "desc"){
      var sortValue = -1;
    }else{
      var error = {
				statusCode: 400,
				message: 'Bad request'
			}
      res.json(error);
    }
  }
  PurchaseOrder.getPurchaseOrder(poNumber,sortBy,sortValue,searchBy)
    .then(function (response) {
      // console.log(response);
      res.json(response);
    })
    .catch(function (response) {
      // console.log(response);
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg }); 
    });
};


/** 
* @author:Gokul
* @argument:poNumber
* @description:delete Purchase order
*/

function deletePurchaseOrder (req, res, next) {
  // console.log("req",req.params.poNumber);
  var poNumber = req.swagger.params.poNumber.value;
  PurchaseOrder.deletePurchaseOrder(poNumber)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};

/** 
* @author:Gokul
* @argument:body
* @description:create Purchase order
*/

function createPurchaseOrder (req, res) {
  var body = req.body;
  // console.log("in create -- >",req);
  PurchaseOrder.createPurchaseOrder(body)
    .then(function (response) {
      // console.log(response);
      res.json(response);
    })
    .catch(function (response) {
      // console.log(response);
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};


/** 
* @author:Gokul
* @argument:body
* @description:update Purchase order
*/
function updatePurchaseOrder (req, res, next) {
  var body = req.body;
  var poNumber = req.swagger.params.poNumber.value;
  PurchaseOrder.updatePurchaseOrder(poNumber,body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};

function updateSinglePurchaseOrder(req, res, next) {
  var status = req.swagger.params.status.value;
  var poNumber = req.swagger.params.poNumber.value;
  PurchaseOrder.updatePurchaseOrder(poNumber,status)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      console.log(response);
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};