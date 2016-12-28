//Creating a model
var cachedItems = [];
var List = {};
var averageTwentyReturn = 4.42;
var existingList = false;
var clearModels = function(){
    cachedItems.length = 0;
    List = {};
    existingList = false;
};
//controller
var createItem = function(item, price){
    return {item: {name: item, price: price}};
};
var input = function(price) {
    return price;
};
var cacheItem = function(item){
    cachedItems.push(item);
};