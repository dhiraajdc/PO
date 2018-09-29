/**
 * Created By :- Gokul
 * Created Date :- 19-09-2018 3:00 pm
 */

 'use strict';

var Supplier = require('../services/SupplierService');
var express = require('express');
var router = express.Router();

router.get('/:organizationId', getSuppliers);
router.delete('/:organizationId', deleteSuppliers);
module.exports = {
  getSuppliers: getSuppliers,
  createSuppliers: createSuppliers,
  updateSuppliers: updateSuppliers,
  deleteSuppliers: deleteSuppliers
}


function createSuppliers (req, res, next) {
  var body = req.body;
  
  Supplier.createSuppliers(body)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      res.json(response)
    });
};

function deleteSuppliers (req, res, next) {
  var supplierID = req.swagger.params.supplierID.value;
  Supplier.deleteSuppliers(supplierID)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      res.json(response);
    });
};

function getSuppliers (req, res, next) {
  var supplierID = req.swagger.params.orgId.value;
  var sort = req.swagger.params.sortBy.value || "orgId_asc";
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
        message:'Bad request'
      }
      res.json(error);
    }
  }
  Supplier.getSuppliers(supplierID,sortBy,sortValue,searchBy)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      res.json(response);
    });
};

function updateSuppliers (req, res, next) {
  var body = req.body;
  Supplier.updateSuppliers(body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (response) {
      res.json(response);
    });
};
