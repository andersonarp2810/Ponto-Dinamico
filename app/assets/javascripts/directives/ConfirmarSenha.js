(function () {
    angular
        .module('pdApp')
        .directive('passwordConfirm', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                scope: {
                    matchTarget: '=',
                },
                require: 'ngModel',
                link: function link(scope, elem, attrs, ctrl) {
                    var validator = function (value) {
                        ctrl.$setValidity('match', value === scope.matchTarget);
                        return value;
                    }

                    ctrl.$parsers.unshift(validator);
                    ctrl.$formatters.push(validator);

                    // This is to force validator when the original password gets changed
                    scope.$watch('matchTarget', function (newval, oldval) {
                        validator(ctrl.$viewValue);
                    });

                }
            };
        }]);
})();