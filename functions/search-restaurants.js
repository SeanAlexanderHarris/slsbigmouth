"use strict";

const AWS = require("aws-sdk");
const Dynamodb = new AWS.DynamoDB.DocumentClient();
const resultCount = process.env.defaultResults || 8;
const tableName = process.env.restaurants_table;

async function searchRestaurants(theme, count) {
  let req = {
    TableName: tableName,
    Limit: count,
    // Figure out what this filter expression error is:
    // ValidationException: Invalid FilterExpression: Syntax error; token: "<EOF>", near: ":theme"
    // FilterExpression: "contains (themes, :theme",
    // ExpressionAttributeValues: { ":theme": theme },
  };

  let restaurantsResponse = await Dynamodb.scan(req).promise();

  return restaurantsResponse.Items;
}

module.exports.handler = async (event, context) => {
  let { theme } = JSON.parse(event.body);
  let restaurants = await searchRestaurants(theme, resultCount);

  const response = {
    statusCode: 200,
    body: JSON.stringify(restaurants),
  };

  return response;
};
