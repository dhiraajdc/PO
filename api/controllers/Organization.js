'use strict';

// var utils = require('../utils/writer.js');
var Organization = require('../services/OrganizationService');
var express = require('express');
var router = express.Router();

router.get('/', getAllOrganization);
router.get('/:organizationId/:sortBy', getOrganization);
router.delete('/:organizationId', deleteOrganization);
router.post('/', createOrganization);
router.put('/', updateOrganization);
router.patch('/', updateSingleOrganization);
module.exports = {
  getAllOrganization: getAllOrganization,
  createOrganization: createOrganization,
  updateOrganization: updateOrganization,
  deleteOrganization: deleteOrganization
}

/** 
* @author:Gokul
* @description:get All Organization details
*/


function getAllOrganization (req, res, next) {
  // console.log("req======>", req);
  Organization.getAllOrganization()
    .then(function (response) {
      res.json(response)
      console.log(response);
    })
    .catch(function (response) {
      res.json(response)
      console.log(response);
    });
};

function deleteOrganization (req, res, next) {
  var organizationId = req.swagger.params.orgId.value;
  Organization.deleteOrganization(organizationId)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      res.json(response)
    });
};

function getOrganization (req, res, next) {
  var organizationId = req.params.organizationId;
  var sortBy = req.params.sortBy;
  Organization.getOrganization(organizationId,sortBy)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      res.json(response)
    });
};

function createOrganization (req, res, next) {
  var body = req.body;
  
  Organization.createOrganization(body)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      res.json(response)
    });
};

function updateOrganization (req, res, next) {
  var body = req.body;
  Organization.updateOrganization(body)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      res.json(response)
    });
};

function updateSingleOrganization(req, res, next){
  var body = req.body;
  Organization.updateOrganization(body)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      res.json(response)
    });
}
