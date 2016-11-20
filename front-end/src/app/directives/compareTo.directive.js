export function CompareToDirective($parse) {
	'ngInject'
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ngModel) {
			var mainModel = $parse(attrs.compareTo);
			var secondModel = $parse(attrs.ngModel);
			scope.$watch(attrs.ngModel, function (newValue) {
				ngModel.$setValidity(attrs.name, newValue === mainModel(scope));
			});

			scope.$watch(attrs.compareTo, function (newValue) {
				ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
			});
		}
	}
}



//this how $parse function works :S some time you dont have to understand the functions... just let it go
// function(s,l,a,i) {
// 	var v5;
// 	var v6 = l && ('pwd' in l);
// 	if(!(v6)) {
// 		if(s){
// 				v5=s.pwd;
// 			}
// 		}else{
// 			v5=l.pwd;
// 		}return v5;
// 	}