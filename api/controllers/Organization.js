'use strict';

// var utils = require('../utils/writer.js');
var Organization = require('../services/OrganizationService');
var express = require('express');
var router = express.Router();

module.exports = {
  getOrganization: getOrganization,
  createOrganization: createOrganization,
  updateOrganization: updateOrganization,
  deleteOrganization: deleteOrganization,
  updateSingleOrganization: updateSingleOrganization
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
				statusCode: 400,
				message: 'Bad request'
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
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};

function deleteOrganization (req, res, next) {
  var organizationId = req.swagger.params.orgId.value;
  Organization.deleteOrganization(organizationId)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};

function createOrganization (req, res, next) {
  var body = req.body;
  Organization.createOrganization(body)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};

function updateOrganization (req, res, next) {
  var body = req.body;
  Organization.updateOrganization(body)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
};

function updateSingleOrganization(req, res, next){
  var body = req.body;
  Organization.updateOrganization(body)
    .then(function (response) {
      res.json(response)
    })
    .catch(function (response) {
      var statusCode = response.statusCode;
      var msg = response.message;
      res.status(statusCode).send({ message: msg });
    });
}
