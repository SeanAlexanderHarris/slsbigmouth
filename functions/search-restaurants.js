"use strict";

const AWS = require("aws-sdk");
const Dynamodb = new AWS.DynamoDB.DocumentClient();
const resultCount = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

async function searchRestaurants(theme, count) {
  console.log("Hit search");
  console.log("theme", theme);
  let req = {
    TableName: tableName,
    Limit: count,
    FilterExpression: "contains (themes, :theme",
    ExpressionAttributeValues: { ":theme": theme },
  };

  let restaurantsResponse = await Dynamodb.scan(req).promise();

  console.log("Searchy search", restaurantsResponse);

  return restaurantsResponse.Items;
}

module.exports.handler = async (event, context) => {
  console.log("event body", event);
  let { theme } = JSON.parse(event.body);
  console.log("themey theme", theme);
  let restaurants = await searchRestaurants(theme, resultCount);

  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants),
  };

  return response;
};
