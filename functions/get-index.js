"use strict";

const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const axios = require("axios").default;
const Mustache = require("mustache");
const aws4sig = require("aws4");

const Url = require("url-parse");

const awsRegion = process.env.AWS_REGION;
const cognitoUserPoolId = process.env.cognito_user_pool_id;
const cognitoClientId = process.env.cognito_client_id;

const restaurantsApiRoot = process.env.restaurants_api;
const apiKey = process.env.BIG_MOUTH_API_KEY;

console.log("/get-index running...");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var html;

async function loadHtml() {
  // if (!html) {
  html = await readFile("static/index.html", "utf-8");
  // }

  return html;
}

async function getRestaurants() {
  // required for passing iam auth checks on the get-restaurants endpoint
  // when it is secured with iam as opposed to x-api-key
  // const { hostname, pathname } = new URL(restaurantsApiRoot); modern node version

  const { hostname, pathname } = new Url(restaurantsApiRoot);

  let options = {
    host: hostname,
    path: pathname,
  };

  aws4sig.sign(options);

  const hostHeaderConstant = "Host";
  const xAmzDateHeaderConstant = "X-Amz-Date";
  const authorizationHeaderConstant = "Authorization";
  const xAmzSecurityTokenHeaderConstant = "X-Amz-Security-Token";

  let headers = {
    hostHeaderConstant: options.headers[hostHeaderConstant],
    xAmzDateHeaderConstant: options.headers[xAmzDateHeaderConstant],
    authorizationHeaderConstant: options.headers[authorizationHeaderConstant],
  };
  // region end

  if (options.headers[xAmzSecurityTokenHeaderConstant]) {
    headers[xAmzSecurityTokenHeaderConstant] =
      options.headers[xAmzSecurityTokenHeaderConstant];
  }

  try {
    // x-api-key needs to be added to common headers rather than the axios config headers object passed in as an argument
    axios.defaults.headers.common = {
      "X-Api-Key": apiKey,
    };
    const { data } = await axios.get(restaurantsApiRoot, headers);
    // console.log("DATA", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

module.exports.handler = async (event, context) => {
  let template = await loadHtml();
  let restaurants = await getRestaurants();
  let dayOfWeek = days[new Date().getDay()];

  let view = {
    dayOfWeek,
    restaurants,
    awsRegion,
    cognitoUserPoolId,
    cognitoClientId,
    searchUrl: `${restaurantsApiRoot}/search`,
  };

  // let html = Mustache.render(template, { dayOfWeek, restaurants }); pre - sign up/in feature html
  let html = Mustache.render(template, view);

  const response = {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
  };

  return response;
};
