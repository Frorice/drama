var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//声明Schema
var nodeSchema = new mongoose.Schema({
    name: String,
    age: Number
});
//构建m
