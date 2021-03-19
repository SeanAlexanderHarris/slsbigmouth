"use strict";

const AWS = require("aws-sdk");
const Dynamodb = new AWS.DynamoDB.DocumentClient();
const resultCount = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

async function getRestaurants(count) {
  let req = {
    TableName: tableName,
    Limit: count,
  };

  let restaurantsResponse = await Dynamodb.scan(req).promise();

  return restaurantsResponse.Items;
}

module.exports.handler = async (event, context) => {
  let restaurants = await getRestaurants(resultCount);

  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants),
  };

  return response;
};
