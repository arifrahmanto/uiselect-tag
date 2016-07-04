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

  vm.newTag = function (obj) {
    var item = {
      name: obj,
      group: 'Other'
    };

    return item;
  };

  vm.lsTag = [
    { name: 'Adam Comp', group: 'Company'},
    { name: 'Nicholas Comp', group: 'Company'},
    { name: 'Vladimir Comp', group: 'Company'},
    { name: 'Amalie Test', group: 'Test Case'},
    { name: 'Estefanía Test', group: 'Test Case'},
    { name: 'Adrian Test', group: 'Test Case'},
    { name: 'Nicole Test', group: 'Test Case'},
    { name: 'Michael Test', group: 'Test Case'},
    { name: 'Adam', group: 'Other'},
    { name: 'Amalie', group: 'Other'},
    { name: 'Estefanía', group: 'Other'},
    { name: 'Adrian', group: 'Other'},
    { name: 'Wladimir', group: 'Other'},
    { name: 'Samantha', group: 'Other'},
    { name: 'Nicole', group: 'Other'},
    { name: 'Natasha', group: 'Other'},
    { name: 'Michael', group: 'Other'}
  ];

  vm.selectedTag = [];

});
