'use strict';

var util = require('util');
var DemandOrder = require('../services/DemandOrderService');
var express = require('express');
var router = express.Router();


// router.get('/', getAllDemandOrder);
// router.get('/search/:searchBy', searchDemandOrder);
// router.get('/:manufacturerName/:sortBy', getDemandOrder);
// router.delete('/:doNumber', deleteDemandOrder);
// router.post('/', createDemandOrder);
// router.put('/', updateDemandOrder);
// router.patch('/', updateSingleDemandOrder);
// module.exports = router;

module.exports ={
  getDemandOrder: getDemandOrder,
  createDemandOrder: createDemandOrder,
  updateDemandOrder: updateDemandOrder,
  deleteDemandOrder: deleteDemandOrder
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
      res.json(response);
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
      res.json(response);
    });
};

/** 
* @author:Gokul
* @description:get All Demand order
*/

function getDemandOrder (req, res, next) {
  var doNumber = req.swagger.params.doNumber.value;
  var sort = req.swagger.params.sortBy.value || "doNumber_";
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
      var error = [{
        message:'Bad request'
      }]
      res.json(error);
    }
  }
  DemandOrder.getDemandOrder(doNumber,sortBy,sortValue,searchBy)
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
* @argument:manufacturerName
* @description:get Demand order
*/

// function getDemandOrder (req, res, next) {
//   // var manufacturerName = req.params.manufacturerName;
//   // var sortBy = req.params.sortBy;
//   DemandOrder.getDemandOrder(manufacturerName,sortBy)
//     .then(function (response) {
//       res.json(response);
//     })
//     .catch(function (response) {
//       res.json(response);
//     });
// };

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
      res.json(response);
    });
};

function updateSingleDemandOrder(req, res, next){
  var body = req.body;
  DemandOrder.updateDemandOrder(body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      res.json(response);
    });
}

function searchDemandOrder(req, res, next){
  // var orgID = req.params.orgID;
  var searchBy = req.params.searchBy;
  DemandOrder.searchDemandOrder(searchBy)
    .then(function (response) {
      res.json(response);
      console.log(response);
    })
    .catch(function (response) {
      res.json(response);
      console.log(response);
    });
}
