'use strict';

angular.module('campusApp')
.directive('isGranted', function (Principal) {
    return function (scope, element, attr) {
        attr.$observe('isGranted', function(value) {
            if(!Principal.isGranted(value)){
                element.hide();
            }
        });
    };
})
.directive('myCodeBar', function () {
    return function (scope, element, attr) {
        attr.$observe('myCodeBar', function(value) {
            element.barcode(value, 'codabar');
        });
    };
})
.directive('mySelect', function () {
	return function (scope, element) {
	    element.select2();
 	};
})
.directive('myCheckbox', function () {
	return function (scope, element) {
	    element.radiocheck();
 	};
})
.directive('myTooltip', function () {
	return function (scope, element) {
	    element.tooltip('show');
 	};
})
.directive('myShelf', function () {
	return function (scope, element) {
		element.bind('click', function() {
			$(document.body).toggleClass('shelf');
			element.find('.fa').toggleClass('fa-arrow-right');
      });
 	};
})
.directive('myDatePicker', function () {
	return function (scope, element) {
    	element.datepicker({
	      showOtherMonths: true,
	      selectOtherMonths: true,
	      dateFormat: 'yy-mm-dd',
	    }).prev('.btn').on('click', function (e) {
	      if(e){
	      	e.preventDefault();
	      }
	      element.focus();
	    });

    	$.extend($.datepicker, {_checkOffset:function(inst,offset){return offset;}});
    	element.datepicker('widget').css({'margin-left': -element.prev('.input-group-btn').find('.btn').outerWidth()});
 	};
})
.directive('mySortabale', function() {
    return {
        link: function(scope, elem) {
            elem.on('click', function() {
                $(this).addClass('sorted').siblings().removeClass('sorted');
            });
        }
    };
})
.directive('myPrinter', function($window) {
    return {
        link: function(scope, elem) {
            elem.on('click', function() {
                $window.print();
            });
        }
    };
});