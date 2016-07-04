'use strict';

var app = angular.module('demo', ['ngSanitize', 'ui.select']);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs an AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform an OR.
 */
app.filter('propsFilter', function () {
  return function (items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function (item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

app.controller('DemoCtrl', function ($scope, $http, $timeout, $interval) {
  var vm = this;

  vm.tagTransform = function (newTag) {
    var item = {
      name: newTag,
      email: newTag.toLowerCase() + '@email.com',
      age: 'unknown',
      country: 'unknown'
    };

    return item;
  };

  vm.people = [
    { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
    { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
    { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
    { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
    { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
    { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
    { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
    { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
    { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
    { name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia' }
  ];

});
