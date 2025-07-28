"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.getProduct = getProduct;
const products_json_1 = __importDefault(require("../db/products.json"));
const products = products_json_1.default;
function listProducts(tenant_id) {
    return products.filter((p) => p.tenant_id === tenant_id);
}
function getProduct(tenant_id, id) {
    return products.find((p) => p.tenant_id === tenant_id && p.id === id);
}
