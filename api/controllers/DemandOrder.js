'use strict';

var util = require('util');
var DemandOrder = require('../services/DemandOrderService');
var express = require('express');
var router = express.Router();


module.exports ={
  getDemandOrder: getDemandOrder,
  createDemandOrder: createDemandOrder,
  updateDemandOrder: updateDemandOrder,
  deleteDemandOrder: deleteDemandOrder,
  updateSingleDemandOrder: updateSingleDemandOrder 
}

/** 
* @author:Gokul
* @argument:doNumber
* @description:delete Demand order
*/

function deleteDemandOrder (req, res, next) {
  var doNumber = req.swagger.params.doNumber.value;
  DemandOrder.deleteDemandOrder(doNumber)
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
* @argument:doNumber
* @description:create Demand order
*/

function createDemandOrder (req, res, next) {
  var body = req.body;
  DemandOrder.createDemandOrder(body)
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
* @description:get All Demand order
*/

function getDemandOrder (req, res, next) {
  var doNumber = req.swagger.params.doNumber.value;
  var sort = req.swagger.params.sortBy.value || "doNumber_asc";
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
  DemandOrder.getDemandOrder(doNumber,sortBy,sortValue,searchBy)
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
* @argument:manufacturerName
* @description:get Demand order
*/

function updateDemandOrder (req, res, next) {
  var body = req.body;
  DemandOrder.updateDemandOrder(body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};

function updateSingleDemandOrder(req, res, next){
  var body = req.body;
  DemandOrder.updateDemandOrder(body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
}
