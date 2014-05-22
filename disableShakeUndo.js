/*
 * disable-shake-undo,
 * Disable the iphone alert for undo/redo alert when the user
 * shakes their phones, this is greatly use for accelerometer games
 * and web apps
 *
 */


(function() {

	'use strict';

	angular.module('disable-shake-undo',[]).directive('disableShakeUndo', [
		'$window', function ($window) {
			return {
				require: 'ngModel',
				link: function (scope, element, attrs, ctrl) {

					/**
					 * Detect device type
					 * http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/
					 * @type {{Android: Android, BlackBerry: BlackBerry, iOS: iOS, Opera: Opera, Windows: Windows, any: any}}
					 */
					var isMobile = {
						Android: function () {
							return navigator.userAgent.match(/Android/i);
						}, BlackBerry: function () {
							return navigator.userAgent.match(/BlackBerry/i);
						}, iOS: function () {
							return navigator.userAgent.match(/iPhone|iPad|iPod/i);
						}, Opera: function () {
							return navigator.userAgent.match(/Opera Mini/i);
						}, Windows: function () {
							return navigator.userAgent.match(/IEMobile/i);
						}, any: function () {
							return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() ||
								isMobile.Windows());
						}
					};

					//lets only do IOS devices
					if( !isMobile.iOS())
						return;

					var value = ""
					var keydownHelper = function (e) {

						e.preventDefault();
						element.unbind("input", inputHelper);

						var keyCode = getKeyCodeValue(e.keyCode, e.keyIdentifier);
						if (!keyCode) {
							return;
						}

						if(keyCode == 'GO'){
							scope.submitEmail()
							return;
						}

						// Delete
						if ( keyCode == 'backspace' && value.length) {
							value = value.slice(0, value.length - 1);
						} else if (keyCode != 'backspace' && keyCode != 'shift' && keyCode != 'GO' ) { //do not append the following
							value += keyCode == 'space'?" ":keyCode;
						}

						ctrl.$setViewValue(value);
						ctrl.$render();
						scope.$apply();

					};

					var inputHelper = function (e) {
						e.preventDefault();
						window.removeEventListener("keydown", keydownHelper);
					};


					element.bind("input", inputHelper);
					angular.element($window).bind('keydown', keydownHelper)



					function getKeyCodeValue(code, identifier){
						var val = false;
						for(var i in keyCodes){
							if(keyCodes[i].code == code && keyCodes[i].identifier == identifier){
								val = keyCodes[i].value
							}
						}
						return val;
					}


					var keyCodes = [
						{code: 192, identifier: "U+0060", value: "`"},
						{code: 220, identifier: "U+007C", value: "|"},
						{code: 219, identifier: "U+007B", value: "{"},
						{code: 221, identifier: "U+007D", value: "}"},
						{code: 191, identifier: "U+003F", value: "?"},
						{code: 53, identifier: "U+0025", value: "%"},
						{code: 54, identifier: "U+005E", value: "^"},
						{code: 56, identifier: "U+002A", value: "*"},
						{code: 191, identifier: "U+002F", value: "/"},
						{code: 222, identifier: "U+0027", value: "'"},
						{code: 52, identifier: "U+0024", value: "$"},
						{code: 49, identifier: "U+0021", value: "!"},
						{code: 192, identifier: "U+007E", value: "~"},
						{code: 55, identifier: "U+0026", value: "&"},
						{code: 187, identifier: "U+003D", value: "="},
						{code: 51, identifier: "U+0023", value: "#"},
						{code: 219, identifier: "U+005B", value: "["},
						{code: 221, identifier: "U+005D", value: "]"},
						{code: 190, identifier: "U+002E", value: "."},
						{code: 189, identifier: "U+005F", value: "_"},
						{code: 186, identifier: "U+003A", value: ":"},
						{code: 186, identifier: "U+003B", value: ";"},
						{code: 57, identifier: "U+0028", value: "("},
						{code: 48, identifier: "U+0029", value: ")"},
						{code: 188, identifier: "U+002C", value: ","},
						{code: 220, identifier: "U+005C", value: "\\"},
						{code: 188, identifier: "U+003C", value: ">"},
						{code: 190, identifier: "U+003E", value: "<"},
						{code: 0, identifier: "U+20AC", value: "€"},
						{code: 0, identifier: "U+00A3", value: "£"},
						{code: 0, identifier: "U+00A5", value: "¥"},
						{code: 0, identifier: "U+2022", value: "•"},
						{code: 189, identifier: "U+002D", value: "-"},
						{code: 187, identifier: "U+002B", value: "+"},
						{code: 222, identifier: "U+0022", value: '"'},
						{code: 8, identifier: "U+0008", value: "backspace"},
						{code: 32, identifier: "U+0020", value: "space"},
						{code: 16, identifier: "Shift", value: "shift"}, //this is not an iphone identifier
						{code: 50, identifier: "U+0040", value: "@"},
						{code: 13, identifier: "Enter", value: "GO"},
						{code: 49, identifier: "U+0031", value: "1"},
						{code: 50, identifier: "U+0032", value: "2"},
						{code: 51, identifier: "U+0033", value: "3"},
						{code: 52, identifier: "U+0034", value: "4"},
						{code: 53, identifier: "U+0035", value: "5"},
						{code: 54, identifier: "U+0036", value: "6"},
						{code: 55, identifier: "U+0037", value: "7"},
						{code: 56, identifier: "U+0038", value: "8"},
						{code: 57, identifier: "U+0039", value: "9"},
						{code: 48, identifier: "U+0030", value: "0"},
						{code: 81, identifier: "U+0051", value: "q"},
						{code: 87, identifier: "U+0057", value: "w"},
						{code: 69, identifier: "U+0045", value: "e"},
						{code: 82, identifier: "U+0052", value: "r"},
						{code: 84, identifier: "U+0054", value: "t"},
						{code: 89, identifier: "U+0059", value: "y"},
						{code: 85, identifier: "U+0055", value: "u"},
						{code: 73, identifier: "U+0049", value: "i"},
						{code: 79, identifier: "U+004F", value: "o"},
						{code: 80, identifier: "U+0050", value: "p"},
						{code: 65, identifier: "U+0041", value: "a"},
						{code: 83, identifier: "U+0053", value: "s"},
						{code: 68, identifier: "U+0044", value: "d"},
						{code: 70, identifier: "U+0046", value: "f"},
						{code: 71, identifier: "U+0047", value: "g"},
						{code: 72, identifier: "U+0048", value: "h"},
						{code: 74, identifier: "U+004A", value: "j"},
						{code: 75, identifier: "U+004B", value: "k"},
						{code: 76, identifier: "U+004C", value: "l"},
						{code: 90, identifier: "U+005A", value: "z"},
						{code: 88, identifier: "U+0058", value: "x"},
						{code: 67, identifier: "U+0043", value: "c"},
						{code: 86, identifier: "U+0056", value: "v"},
						{code: 66, identifier: "U+0042", value: "b"},
						{code: 78, identifier: "U+004E", value: "n"},
						{code: 77, identifier: "U+004D", value: "m"},
						//UNICODE
						{code: 0, identifier: "U+00E8", value: "è"},
						{code: 0, identifier: "U+00E9", value: "é"},
						{code: 0, identifier: "U+00EA", value: "ê"},
						{code: 0, identifier: "U+00EB", value: "ë"},
						{code: 0, identifier: "U+0113", value: "ē"},
						{code: 0, identifier: "U+0117", value: "ė"},
						{code: 0, identifier: "U+0119", value: "ę"},
						{code: 0, identifier: "U+00FF", value: "ÿ"},
						{code: 0, identifier: "U+00FB", value: "û"},
						{code: 0, identifier: "U+00FC", value: "ü"},
						{code: 0, identifier: "U+00F9", value: "ù"},
						{code: 0, identifier: "U+00FA", value: "ú"},
						{code: 0, identifier: "U+016B", value: "ū"},
						{code: 0, identifier: "U+00EE", value: "î"},
						{code: 0, identifier: "U+00EF", value: "ï"},
						{code: 0, identifier: "U+00ED", value: "í"},
						{code: 0, identifier: "U+012B", value: "ī"},
						{code: 0, identifier: "U+012F", value: "į"},
						{code: 0, identifier: "U+00EC", value: "ì"},
						{code: 0, identifier: "U+00F4", value: "ô"},
						{code: 0, identifier: "U+00F0", value: "ð"},
						{code: 0, identifier: "U+00F1", value: "ñ"},
						{code: 0, identifier: "U+00F2", value: "ò"},
						{code: 0, identifier: "U+00B5", value: "µ"}

					]

				}
			};
		}
	])

})();       //