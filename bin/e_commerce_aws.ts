#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductAppStack } from '../lib/productsApp-stack';
import { ECommerceApiStack } from '../lib/ecommerceApi-stack';
import { ProductsAppLayersStack } from '../lib/productsAppLayers-stack';
import { EventsDdbStack } from 'lib/eventsDdb-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: '755590455598',
  region: 'us-east-1',
};

const tags = {
  cost: 'ECommerce',
  team: 'SiecolaCode',
};

const productsAppLayersStack = new ProductsAppLayersStack(app, 'ProductsAppLayers', {
  tags,
  env,
});

const eventsDdbStack = new EventsDdbStack(app, 'EventsDdb', {
  tags,
  env,
});

const productsAppStack = new ProductAppStack(app, 'ProductsApp', {
  eventsDdb: eventsDdbStack.table,
  tags,
  env,
});
productsAppStack.addDependency(productsAppLayersStack);
productsAppStack.addDependency(eventsDdbStack);

const eCommerceApiStack = new ECommerceApiStack(app, 'ECommerceApi', { 
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags,
  env,
});

eCommerceApiStack.addDependency(productsAppStack);
