'use strict';

// var utils = require('../utils/writer.js');
var Organization = require('../services/OrganizationService');
var express = require('express');
var router = express.Router();

// router.get('/', getAllOrganization);
// router.get('/:organizationId/:sortBy', getOrganization);
// router.delete('/:organizationId', deleteOrganization);
// router.post('/', createOrganization);
// router.put('/', updateOrganization);
// router.patch('/', updateSingleOrganization);
module.exports = {
  getOrganization: getOrganization,
  createOrganization: createOrganization,
  updateOrganization: updateOrganization,
  deleteOrganization: deleteOrganization
}

/** 
* @author:Gokul
* @description:get All Organization details
*/


function getOrganization (req, res, next) {
  var orgId = req.swagger.params.orgId.value;
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
  Organization.getOrganization(orgId,sortBy,sortValue,searchBy)
    .then(function (response) {
      // console.log(response);
      res.json(response)
    })
    .catch(function (response) {
      // console.log(response);
      res.json(response)
    });
};

function deleteOrganization (req, res, next) {
  var organizationId = req.swagger.params.orgId.value;
  Organization.deleteOrganization(organizationId)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      console.log("err======>",response);
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
