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
  Supplier.getSuppliers()
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
