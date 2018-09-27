/**
 * Created By :- Gokul
 * Created Date :- 17-09-2018 11:00 am
 */

 'use strict';

var util = require('util');
var PurchaseOrder = require('../services/PurchaseOrderService');
var express = require('express');
var router = express.Router();


// router.get('/', getAllPurchaseOrder);
// router.get('/search/:searchBy', searchPurchaseOrder);
// router.get('/:manufacturerName/:sortBy', getPurchaseOrder);
// router.delete('/:poNumber', deletePurchaseOrder);
// router.post('/', createPurchaseOrder);
// router.put('/', updatePurchaseOrder);
// router.patch('/', updateSinglePurchaseOrder);
// module.exports = router;
module.exports = {
  getPurchaseOrder: getPurchaseOrder,
  createPurchaseOrder: createPurchaseOrder,
  updatePurchaseOrder: updatePurchaseOrder,
  deletePurchaseOrder: deletePurchaseOrder
};


/** 
* @author:Gokul
* @argument:poNumber
* @description:get Purchase order
*/


function getPurchaseOrder (req, res, next) {
  var poNumber = req.swagger.params.poNumber.value;
  var sort = req.swagger.params.sortBy.value || "poNumber_asc";
  if(sort){
    var sortBy = sort.split("_",1);
    var value = sort.split("_",2);
    if (value == "asc")
    {
      var sortValue = 1;
    }else{
      var sortValue = -1;
    }
  }
  PurchaseOrder.getPurchaseOrder(poNumber,sortBy,sortValue)
    .then(function (response) {
      console.log(response);
      res.json(response);
    })
    .catch(function (response) {
      console.log(response);
      res.json(response);
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
      console.log(response);
      res.json(response);
    })
    .catch(function (response) {
      res.json(response);
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
      res.json(response);
      // console.log(response);
    });
};


/** 
* @author:Gokul
* @argument:body
* @description:update Purchase order
*/
function updatePurchaseOrder (req, res, next) {
  var body = req.body;
  PurchaseOrder.updatePurchaseOrder(body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      res.json(response);
    });
};


/** 
* @author:Gokul
* @argument:body
* @description:update Purchase order
*/
function updateSinglePurchaseOrder (req, res, next) {
  var body = req.body;
  PurchaseOrder.updatePurchaseOrder(body)
    .then(function (response) {
      utils.writeJson(res, response);
      console.log(response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      console.log(response);
    });
};

/** 
* @author:Gokul
* @argument:orgID,poNumber
* @description:search for poNumber for corresponding orgID
*/

function searchPurchaseOrder(req, res, next){
  // var orgID = req.params.orgID;
  var searchBy = req.params.searchBy;
  PurchaseOrder.searchPurchaseOrder(searchBy)
    .then(function (response) {
      utils.writeJson(res, response);
      console.log(response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
      console.log(response);
    });
}