angular.module("banksykit", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","banksykit.controllers", "banksykit.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "banksyKit" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "banksykit",
				storeName : "banksykit",
				description : "The offline datastore for banksyKit app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}


		});
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("phpTime", function(){
		return function (input) {
			var timeStamp = parseInt(input) * 1000;
			return timeStamp ;
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("vi");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
	$translateProvider.useSanitizeValueStrategy("escapeParameters");
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("vi");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("banksykit",{
		url: "/banksykit",
			abstract: true,
			templateUrl: "templates/banksykit-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("banksykit.about_us", {
		url: "/about_us",
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.bookmarks", {
		url: "/bookmarks",
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-bookmarks.html",
						controller: "bookmarksCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.categories", {
		url: "/categories",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-categories.html",
						controller: "categoriesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.dashboard", {
		url: "/dashboard",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.faqs", {
		url: "/faqs",
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.home", {
		url: "/home",
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-home.html",
						controller: "homeCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.menu_one", {
		url: "/menu_one",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-menu_one.html",
						controller: "menu_oneCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.menu_two", {
		url: "/menu_two",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-menu_two.html",
						controller: "menu_twoCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.post_singles", {
		url: "/post_singles/:id",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-post_singles.html",
						controller: "post_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.product_cart", {
		url: "/product_cart",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-product_cart.html",
						controller: "product_cartCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.product_checkout", {
		url: "/product_checkout",
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-product_checkout.html",
						controller: "product_checkoutCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.product_singles", {
		url: "/product_singles/:id",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-product_singles.html",
						controller: "product_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.products", {
		url: "/products/:categories",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-products.html",
						controller: "productsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.tin_tuc", {
		url: "/tin_tuc",
		cache:false,
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-tin_tuc.html",
						controller: "tin_tucCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("banksykit.woo_menu", {
		url: "/woo_menu",
		views: {
			"banksykit-side_menus" : {
						templateUrl:"templates/banksykit-woo_menu.html",
						controller: "woo_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/banksykit/dashboard");
});
