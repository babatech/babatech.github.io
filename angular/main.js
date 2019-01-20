(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/assets/css/main.css":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src??embedded!./src/assets/css/main.css ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = [[module.i, "/*------------------------------------------------------------------\r\nProject:  Shahab Shakoor resume\r\nVersion:  0.0.1\r\nLast change:\r\nAssigned to:  Shahab Shakoor\r\nPrimary use:\r\n-------------------------------------------------------------------*/\r\n\r\n\r\nbody{\r\n  padding-top: 50px;\r\n  width: 100%;\r\n  overflow-x: hidden;\r\n}\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hc3NldHMvY3NzL21haW4uY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7b0VBTW9FOzs7QUFHcEU7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztFQUNYLGtCQUFrQjtBQUNwQiIsImZpbGUiOiJzcmMvYXNzZXRzL2Nzcy9tYWluLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblByb2plY3Q6ICBTaGFoYWIgU2hha29vciByZXN1bWVcclxuVmVyc2lvbjogIDAuMC4xXHJcbkxhc3QgY2hhbmdlOlxyXG5Bc3NpZ25lZCB0bzogIFNoYWhhYiBTaGFrb29yXHJcblByaW1hcnkgdXNlOlxyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblxyXG5ib2R5e1xyXG4gIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxufVxyXG5cclxuIl19 */", '', '']]

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import 'https://bootswatch.com/4/cosmo/bootstrap.min.css';\r\n@import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';\r\nbody{\r\n  padding-top: 50px;\r\n  width: 100%;\r\n  overflow-x: hidden;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBQzFELHdGQUF3RjtBQUN4RjtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsa0JBQWtCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICdodHRwczovL2Jvb3Rzd2F0Y2guY29tLzQvY29zbW8vYm9vdHN0cmFwLm1pbi5jc3MnO1xyXG5AaW1wb3J0ICdodHRwczovL3N0YWNrcGF0aC5ib290c3RyYXBjZG4uY29tL2ZvbnQtYXdlc29tZS80LjcuMC9jc3MvZm9udC1hd2Vzb21lLm1pbi5jc3MnO1xyXG5ib2R5e1xyXG4gIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<app-info></app-info>\n<app-ews></app-ews>\n<app-skills></app-skills>\n<app-languages></app-languages>\n<app-reference></app-reference>\n<app-past-work></app-past-work>\n<router-outlet></router-outlet>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'angular';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css"), __webpack_require__(/*! ../assets/css/main.css */ "./src/assets/css/main.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _info_info_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./info/info.component */ "./src/app/info/info.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _ews_ews_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ews/ews.component */ "./src/app/ews/ews.component.ts");
/* harmony import */ var _skills_skills_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./skills/skills.component */ "./src/app/skills/skills.component.ts");
/* harmony import */ var _languages_languages_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./languages/languages.component */ "./src/app/languages/languages.component.ts");
/* harmony import */ var _reference_reference_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./reference/reference.component */ "./src/app/reference/reference.component.ts");
/* harmony import */ var _past_work_past_work_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./past-work/past-work.component */ "./src/app/past-work/past-work.component.ts");













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _info_info_component__WEBPACK_IMPORTED_MODULE_5__["InfoComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"],
                _ews_ews_component__WEBPACK_IMPORTED_MODULE_8__["EwsComponent"],
                _skills_skills_component__WEBPACK_IMPORTED_MODULE_9__["SkillsComponent"],
                _languages_languages_component__WEBPACK_IMPORTED_MODULE_10__["LanguagesComponent"],
                _reference_reference_component__WEBPACK_IMPORTED_MODULE_11__["ReferenceComponent"],
                _past_work_past_work_component__WEBPACK_IMPORTED_MODULE_12__["PastWorkComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/ews/ews.component.css":
/*!***************************************!*\
  !*** ./src/app/ews/ews.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.circle {\r\n  padding: 13px 20px;\r\n  border-radius: 50%;\r\n  background-color: #2780E3;\r\n  color: #fff;\r\n  max-height: 50px;\r\n  z-index: 2;\r\n}\r\n.how-it-works.row .col-2 {\r\n  align-self: stretch;\r\n}\r\n.how-it-works.row .col-2::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  border-left: 3px solid #2780E3;\r\n  z-index: 1;\r\n}\r\n.how-it-works.row .col-2.bottom::after {\r\n  height: 50%;\r\n  left: 50%;\r\n  top: 50%;\r\n}\r\n.how-it-works.row .col-2.full::after {\r\n  height: 100%;\r\n  left: calc(50% - 3px);\r\n}\r\n.how-it-works.row .col-2.full.left-item::after {\r\n  left: 50%;\r\n}\r\n.how-it-works.row .col-2.top::after {\r\n  height: 50%;\r\n  left: 50%;\r\n  top: 0;\r\n}\r\n.how-it-works.row .col-2.last-item::after {\r\n  height: 50% !important;\r\n  top: 0;\r\n}\r\n.timeline div {\r\n  padding: 0;\r\n  height: 40px;\r\n}\r\n.timeline hr {\r\n  border-top: 3px solid #2780E3;\r\n  margin: 0;\r\n  top: 17px;\r\n  position: relative;\r\n}\r\n.timeline .col-2 {\r\n  display: flex;\r\n  overflow: hidden;\r\n}\r\n.timeline .corner {\r\n  border: 3px solid #2780E3;\r\n  width: 100%;\r\n  position: relative;\r\n  border-radius: 15px;\r\n}\r\n.timeline .top-right {\r\n  left: 50%;\r\n  top: -50%;\r\n}\r\n.timeline .left-bottom {\r\n  left: -50%;\r\n  top: calc(50% - 3px);\r\n}\r\n.timeline .top-left {\r\n  left: -50%;\r\n  top: -50%;\r\n}\r\n.timeline .right-bottom {\r\n  left: 50%;\r\n  top: calc(50% - 3px);\r\n}\r\n.skill-set .badge{\r\n  margin: 5px;\r\n  padding: 15px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZXdzL2V3cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIsVUFBVTtBQUNaO0FBQ0E7RUFDRSxtQkFBbUI7QUFDckI7QUFDQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsOEJBQThCO0VBQzlCLFVBQVU7QUFDWjtBQUNBO0VBQ0UsV0FBVztFQUNYLFNBQVM7RUFDVCxRQUFRO0FBQ1Y7QUFDQTtFQUNFLFlBQVk7RUFDWixxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLFNBQVM7QUFDWDtBQUNBO0VBQ0UsV0FBVztFQUNYLFNBQVM7RUFDVCxNQUFNO0FBQ1I7QUFDQTtFQUNFLHNCQUFzQjtFQUN0QixNQUFNO0FBQ1I7QUFFQTtFQUNFLFVBQVU7RUFDVixZQUFZO0FBQ2Q7QUFDQTtFQUNFLDZCQUE2QjtFQUM3QixTQUFTO0VBQ1QsU0FBUztFQUNULGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxTQUFTO0VBQ1QsU0FBUztBQUNYO0FBQ0E7RUFDRSxVQUFVO0VBQ1Ysb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxVQUFVO0VBQ1YsU0FBUztBQUNYO0FBQ0E7RUFDRSxTQUFTO0VBQ1Qsb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsYUFBYTtBQUNmIiwiZmlsZSI6InNyYy9hcHAvZXdzL2V3cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5jaXJjbGUge1xyXG4gIHBhZGRpbmc6IDEzcHggMjBweDtcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI3ODBFMztcclxuICBjb2xvcjogI2ZmZjtcclxuICBtYXgtaGVpZ2h0OiA1MHB4O1xyXG4gIHotaW5kZXg6IDI7XHJcbn1cclxuLmhvdy1pdC13b3Jrcy5yb3cgLmNvbC0yIHtcclxuICBhbGlnbi1zZWxmOiBzdHJldGNoO1xyXG59XHJcbi5ob3ctaXQtd29ya3Mucm93IC5jb2wtMjo6YWZ0ZXIge1xyXG4gIGNvbnRlbnQ6IFwiXCI7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzI3ODBFMztcclxuICB6LWluZGV4OiAxO1xyXG59XHJcbi5ob3ctaXQtd29ya3Mucm93IC5jb2wtMi5ib3R0b206OmFmdGVyIHtcclxuICBoZWlnaHQ6IDUwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdG9wOiA1MCU7XHJcbn1cclxuLmhvdy1pdC13b3Jrcy5yb3cgLmNvbC0yLmZ1bGw6OmFmdGVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgbGVmdDogY2FsYyg1MCUgLSAzcHgpO1xyXG59XHJcbi5ob3ctaXQtd29ya3Mucm93IC5jb2wtMi5mdWxsLmxlZnQtaXRlbTo6YWZ0ZXIge1xyXG4gIGxlZnQ6IDUwJTtcclxufVxyXG4uaG93LWl0LXdvcmtzLnJvdyAuY29sLTIudG9wOjphZnRlciB7XHJcbiAgaGVpZ2h0OiA1MCU7XHJcbiAgbGVmdDogNTAlO1xyXG4gIHRvcDogMDtcclxufVxyXG4uaG93LWl0LXdvcmtzLnJvdyAuY29sLTIubGFzdC1pdGVtOjphZnRlciB7XHJcbiAgaGVpZ2h0OiA1MCUgIWltcG9ydGFudDtcclxuICB0b3A6IDA7XHJcbn1cclxuXHJcbi50aW1lbGluZSBkaXYge1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG59XHJcbi50aW1lbGluZSBociB7XHJcbiAgYm9yZGVyLXRvcDogM3B4IHNvbGlkICMyNzgwRTM7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHRvcDogMTdweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnRpbWVsaW5lIC5jb2wtMiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcbi50aW1lbGluZSAuY29ybmVyIHtcclxuICBib3JkZXI6IDNweCBzb2xpZCAjMjc4MEUzO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG59XHJcbi50aW1lbGluZSAudG9wLXJpZ2h0IHtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdG9wOiAtNTAlO1xyXG59XHJcbi50aW1lbGluZSAubGVmdC1ib3R0b20ge1xyXG4gIGxlZnQ6IC01MCU7XHJcbiAgdG9wOiBjYWxjKDUwJSAtIDNweCk7XHJcbn1cclxuLnRpbWVsaW5lIC50b3AtbGVmdCB7XHJcbiAgbGVmdDogLTUwJTtcclxuICB0b3A6IC01MCU7XHJcbn1cclxuLnRpbWVsaW5lIC5yaWdodC1ib3R0b20ge1xyXG4gIGxlZnQ6IDUwJTtcclxuICB0b3A6IGNhbGMoNTAlIC0gM3B4KTtcclxufVxyXG4uc2tpbGwtc2V0IC5iYWRnZXtcclxuICBtYXJnaW46IDVweDtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/ews/ews.component.html":
/*!****************************************!*\
  !*** ./src/app/ews/ews.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"py-5\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-6\" data-aos=\"fade-right\">\n        <h4 class=\"\" id=\"education-box\"><i class=\"fa fa-graduation-cap\"></i> Education</h4>\n        <!--first section-->\n        <div class=\"row align-items-center how-it-works d-flex\">\n          <div class=\"col-2 text-center bottom d-inline-flex justify-content-center align-items-center\">\n            <div class=\"circle font-weight-bold\">1</div>\n          </div>\n          <div class=\"col-8\" data-aos=\"fade-right\" >\n            <h5>M.Sc Information Engineering</h5>\n            <h6>2016 - 2019</h6>\n            <h6>Fachhochschule Kiel</h6>\n            <div>\n              <b>Modules:</b>\n              <ul>\n                <li>Advanced IT-Project Management</li>\n                <li>Business Process Management and Simulation</li>\n                <li>Cross-Cultural Leadership and Human Resource Management</li>\n                <li>Requirements Engineering</li>\n                <li>Advanced Software Programming</li>\n                <li>Privacy and Data Protection</li>\n                <li>Electronic Business & Social Media</li>\n                <li>Privacy and Data Protection</li>\n                <li>Cloud Computing and Security</li>\n                <li>DevOps - Agile in progress</li>\n              </ul>\n              <b>Master project:</b>\n              <ul>\n                <li>Decode Raw Audio/Video data on browser.</li>\n                <li>C Library conversion to JavaScript using WebAssembly (Wasm, WA)</li>\n                <li>In this project, technologies like, Node.js, Express, socket.io, websocket, JSON, WebAssembly, Emscripten compiler, C/C++ and FFmpeg library were practiced</li>\n              </ul>\n              <b>Master thesis:</b>\n              <ul>\n                <li>Consumer driven contract testing on Microservice Architecture system.</li>\n                <li>Software quality framework suggestion for Project GeRDI</li>\n                <li>Consumer driven contract testing on Project GeRDI</li>\n                <li>In this thesis, technologies/framework like, Node.js, VueJS, JSON, Pact-js, Mocha, Test pyramid, BDD and scrum were practiced</li>\n              </ul>\n            </div>\n          </div>\n        </div>\n        <!--path between 1-2-->\n        <div class=\"row timeline\">\n          <div class=\"col-2\">\n            <div class=\"corner top-right\"></div>\n          </div>\n          <div class=\"col-8\">\n            <hr/>\n          </div>\n          <div class=\"col-2\">\n            <div class=\"corner left-bottom\"></div>\n          </div>\n        </div>\n        <!--second section-->\n        <div class=\"row align-items-center justify-content-end how-it-works d-flex\">\n          <div class=\"col-8\" data-aos=\"fade-left\">\n            <h5>BS Software Engineering</h5>\n            <h6>2010 - 2014</h6>\n            <h6>International Islamic university, Islamabad</h6>\n            <div>\n              <b>Modules</b>\n            <ul>\n              <li>Software Project Management</li>\n              <li>Software Quality Assurance</li>\n              <li>Human Computer Interaction</li>\n              <li>Web Based Application Development</li>\n              <li>Distributed Application Development</li>\n              <li>Object Oriented Analysis And Design</li>\n              <li>Database Technologies</li>\n              <li>Analysis Of Algorithms</li>\n              <li>Data Structures And Algorithms</li>\n            </ul>\n            <b>Bachelor project:</b>\n            <ul>\n              <li>Android based mobile application for mobile security and data recovery.</li>\n              <li>The application will act as moderator.User can trigger mobile lock Through SMS or email. The trigger will Encrypt the data on mobile.</li>\n            </ul>\n            </div>\n          </div>\n          <div class=\"col-2 text-center full d-inline-flex justify-content-center align-items-center last-item\">\n            <div class=\"circle font-weight-bold\">2</div>\n          </div>\n        </div>\n\n        <!--skill for desktop view-->\n        <div class=\"d-none d-md-block\">\n          <br><br>\n          <h4  data-aos=\"fade-right\" id=\"skills-set\"><i class=\"fa fa-user-secret py-2\"></i> Skills</h4>\n          <h4 class=\"text-center skill-set\">\n            <span class=\"badge badge-primary\" data-aos=\"flip-up\" >PHP</span>\n            <span class=\"badge badge-primary\" data-aos=\"flip-up\" >JavaScript</span>\n            <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Wordpress</span>\n            <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Git</span>\n            <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Contao</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Typo3</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Symfony</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >eZ Publish </span>\n            <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Web Services(REST/SOAP)</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Angular</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Vue.js</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Bower</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >NPM</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >SASS</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Lass</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Gulp</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >twitter-bootstrap</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >MySQL</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >OSCLASS</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Woocommerce</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Linux Administration</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Jira</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Kanban</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Agile development</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >DevOps</span>\n            <span data-aos=\"flip-up\"  class=\"badge badge-secondary\">SCRUM</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >MicroService</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >WASM</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >WebAssembly</span>\n            <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Emscripten</span>\n          </h4>\n        </div>\n      </div>\n      <div class=\"col-md-6\" data-aos=\"fade-left\">\n        <h4 class=\"\" id=\"experience-box\"><i class=\"fa fa-briefcase\"></i> Experience</h4>\n        <!--first section-->\n        <div class=\"row align-items-center how-it-works d-flex\">\n          <div class=\"col-2 text-center bottom d-inline-flex justify-content-center align-items-center\">\n            <div class=\"circle font-weight-bold\">1</div>\n          </div>\n          <div class=\"col-8\" data-aos=\"fade-right\">\n            <h5><a href=\"https://www.concept.one/\" target=\"_blank\">Concept One GmbH, Hamburg</a> </h5>\n            <h6>August 2016 - Present</h6>\n            <h6>Software developer</h6>\n            <div>\n              My job includes the following tasks:\n            <ul>\n              <li>Implementation of design layouts in front-end components and templates</li>\n              <li>Implementation of back-end templates</li>\n              <li>Debugging and troubleshooting existing web application</li>\n              <li>Implementation of templates, back-end and front-end components for CMS supported applications</li>\n              <li>Implementation of plugins for Typo3 and Contao CMS</li>\n              <li>Development of Progressive Web Applications (PWA)</li>\n            </ul><br>\n\n            <b>Skills:</b><br>\n            JavaScript, PHP, contao, typo3, twitter-bootstrap, MySQL, Debian, git, html5, CSS, jquery, bower, npm, gulp, sass, less, phpstorm, symfony, angularjs, angular, WordPress, ezpublish\n            </div>\n          </div>\n        </div>\n        <!--path between 1-2-->\n        <div class=\"row timeline\">\n          <div class=\"col-2\">\n            <div class=\"corner top-right\"></div>\n          </div>\n          <div class=\"col-8\">\n            <hr/>\n          </div>\n          <div class=\"col-2\">\n            <div class=\"corner left-bottom\"></div>\n          </div>\n        </div>\n        <!--second section-->\n        <div class=\"row align-items-center justify-content-end how-it-works d-flex\">\n          <div class=\"col-8\" data-aos=\"fade-left\">\n            <h5><a href=\"http://www.zbw.eu/de/\" target=\"_blank\">ZBW - Leibniz-Informationszentrum Wirtschaft, Kiel</a> </h5>\n            <h6>May 2018 - January 2019</h6>\n            <h6>Studentische Aushilfskraft</h6>\n            <div>\n              My job includes the following tasks:<br>\n              <b>Support in frontend development of GeRDI project</b><br>\n            <ul>\n              <li>Research of implementation options</li>\n              <li>Evaluation of technologies for the development of possible solutions existing use cases</li>\n              <li>Support of the GeRDI development team in the implementation of Services, special features and fixing bugs</li>\n              <li>Development of the project-specific npm package</li>\n              <li>Development with Vue.js, Node.js, NPM, HTML5, CSS2, JavaScript, Typescript, JQuery, Git, Twitter Bootstrap 4, Jira, Atlassian Confluence, Serum, Docker, Web Service (REST), Responsive web design.</li>\n            </ul><br>\n            <b>Maintenance of the GeRDI project website:</b><br>\n            <ul>\n              <li>Development with Wordpress, PHP, CSS, WordPress Plugin, WordPress Theme</li>\n            </ul><br>\n            </div>\n          </div>\n          <div class=\"col-2 text-center full d-inline-flex justify-content-center align-items-center\">\n            <div class=\"circle font-weight-bold\">2</div>\n          </div>\n        </div>\n        <!--path between 2-3-->\n        <div class=\"row timeline\">\n          <div class=\"col-2\">\n            <div class=\"corner right-bottom\"></div>\n          </div>\n          <div class=\"col-8\">\n            <hr/>\n          </div>\n          <div class=\"col-2\">\n            <div class=\"corner top-left\"></div>\n          </div>\n        </div>\n        <!--third section-->\n        <div class=\"row align-items-center how-it-works d-flex\">\n          <div class=\"col-2 text-center full left-item d-inline-flex justify-content-center align-items-center\">\n            <div class=\"circle font-weight-bold\">3</div>\n          </div>\n          <div class=\"col-8\" data-aos=\"fade-right\">\n            <h5><a href=\"https://www.fiverr.com/babatech\" target=\"_blank\">Babatech</a></h5>\n            <h6>March 2015 - March 2016</h6>\n            <h6>Freelance web Developer</h6>\n            <div>\n              <b>Development expertise:</b><br>\n              PHP, OSClass, WordPress, WHMCS, Woocommerce Plugins, Smarty, MYSQL,Smarty Template engine, pay-pal integration, Telecash payment integration, Webservices (SOAP, REST)<br>\n              <b>Design expertise:</b><br>\n              HTML5, CSS3, Bootstrap design, Responsive design\n            </div>\n          </div>\n        </div>\n        <!--path between 3-4-->\n        <div class=\"row timeline\">\n          <div class=\"col-2\">\n            <div class=\"corner top-right\"></div>\n          </div>\n          <div class=\"col-8\">\n            <hr/>\n          </div>\n          <div class=\"col-2\">\n            <div class=\"corner left-bottom\"></div>\n          </div>\n        </div>\n        <!--fourth section-->\n        <div class=\"row align-items-center justify-content-end how-it-works d-flex\">\n          <div class=\"col-8 \" data-aos=\"fade-left\">\n            <h5>WDNEC, Islamabad</h5>\n            <h6>Febuary  2014 - March 2015</h6>\n            <h6>Web Developer</h6>\n            <p>\n              My responsibility for this job was:<br>\n              Convert PSD's to HTML pages.<br>\n              PHP backend development.<br>\n              Responsive WEB pages using Twitter bootstrap<br>\n              Multilingual HTML pages using Smarty template engine.<br>\n              Themes Development for WHMCS and OSCLASS (CMS).<br>\n              Make Plugins for WHMCS and OSCLASS (CMS).<br>\n              Paypal and Stripe payment gateway.\n            </p>\n          </div>\n          <div class=\"col-2 text-center full d-inline-flex justify-content-center align-items-center last-item\">\n            <div class=\"circle font-weight-bold\">4</div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/ews/ews.component.ts":
/*!**************************************!*\
  !*** ./src/app/ews/ews.component.ts ***!
  \**************************************/
/*! exports provided: EwsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EwsComponent", function() { return EwsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var EwsComponent = /** @class */ (function () {
    function EwsComponent() {
    }
    EwsComponent.prototype.ngOnInit = function () {
    };
    EwsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-ews',
            template: __webpack_require__(/*! ./ews.component.html */ "./src/app/ews/ews.component.html"),
            styles: [__webpack_require__(/*! ./ews.component.css */ "./src/app/ews/ews.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], EwsComponent);
    return EwsComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer-copyright,.footer-copyright a{\r\n  color: white;\r\n}\r\n\r\n\r\na.btn-social,\r\n.btn-social\r\n{\r\n  border-radius: 50%;\r\n  color: #ffffff !important;\r\n  display: inline-block;\r\n  height: 54px;\r\n  line-height: 54px;\r\n  margin: 8px 4px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  transition: background-color .3s;\r\n  webkit-transition: background-color .3s;\r\n  width: 54px;\r\n}\r\n\r\n\r\n.btn-social .fa,.btn-social i\r\n{\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  moz-backface-visibility: hidden;\r\n  ms-transform: scale(1);\r\n  o-transform: scale(1);\r\n  -webkit-transform: scale(1);\r\n          transform: scale(1);\r\n  transition: all .25s;\r\n  webkit-backface-visibility: hidden;\r\n  webkit-transform: scale(1);\r\n  webkit-transition: all .25s;\r\n}\r\n\r\n\r\n.btn-social:hover,.btn-social:focus\r\n{\r\n  color: #fff;\r\n  outline: none;\r\n  text-decoration: none;\r\n}\r\n\r\n\r\n.btn-social:hover .fa,.btn-social:focus .fa,.btn-social:hover i,.btn-social:focus i\r\n{\r\n  ms-transform: scale(1.3);\r\n  o-transform: scale(1.3);\r\n  -webkit-transform: scale(1.3);\r\n          transform: scale(1.3);\r\n  webkit-transform: scale(1.3);\r\n}\r\n\r\n\r\n.btn-social.btn-xs\r\n{\r\n  font-size: 9px;\r\n  height: 24px;\r\n  line-height: 13px;\r\n  margin: 6px 2px;\r\n  width: 24px;\r\n}\r\n\r\n\r\n.btn-social.btn-sm\r\n{\r\n  font-size: 13px;\r\n  height: 36px;\r\n  line-height: 18px;\r\n  margin: 6px 2px;\r\n  width: 36px;\r\n}\r\n\r\n\r\n.btn-social.btn-lg\r\n{\r\n  font-size: 22px;\r\n  height: 72px;\r\n  line-height: 40px;\r\n  margin: 10px 6px;\r\n  width: 72px;\r\n}\r\n\r\n\r\n.btn-behance\r\n{\r\n  background-color: #1769ff;\r\n}\r\n\r\n\r\n.btn-behance:hover\r\n{\r\n  background-color: #4a8aff;\r\n}\r\n\r\n\r\n.btn-bitbucket\r\n{\r\n  background-color: #205081;\r\n}\r\n\r\n\r\n.btn-bitbucket:hover\r\n{\r\n  background-color: #2a69aa;\r\n}\r\n\r\n\r\n.btn-codepen\r\n{\r\n  background-color: #76daff;\r\n}\r\n\r\n\r\n.btn-codepen:hover\r\n{\r\n  background-color: #a9e8ff;\r\n}\r\n\r\n\r\n.btn-deviantart\r\n{\r\n  background-color: #4e6252;\r\n}\r\n\r\n\r\n.btn-deviantart:hover\r\n{\r\n  background-color: #657e6a;\r\n}\r\n\r\n\r\n.btn-digg\r\n{\r\n  background-color: #000;\r\n}\r\n\r\n\r\n.btn-digg:hover\r\n{\r\n  background-color: #1a1a1a;\r\n}\r\n\r\n\r\n.btn-dribbble\r\n{\r\n  background-color: #ea4c89;\r\n}\r\n\r\n\r\n.btn-dribbble:hover\r\n{\r\n  background-color: #ef7aa7;\r\n}\r\n\r\n\r\n.btn-dropbox\r\n{\r\n  background-color: #007ee5;\r\n}\r\n\r\n\r\n.btn-dropbox:hover\r\n{\r\n  background-color: #1998ff;\r\n}\r\n\r\n\r\n.btn-facebook\r\n{\r\n  background-color: #3b5998;\r\n}\r\n\r\n\r\n.btn-facebook:hover\r\n{\r\n  background-color: #4c70ba;\r\n}\r\n\r\n\r\n.btn-flickr\r\n{\r\n  background-color: #0063dc;\r\n}\r\n\r\n\r\n.btn-flickr:hover\r\n{\r\n  background-color: #107cff;\r\n}\r\n\r\n\r\n.btn-foursquare\r\n{\r\n  background-color: #ef4b78;\r\n}\r\n\r\n\r\n.btn-foursquare:hover\r\n{\r\n  background-color: #f37a9b;\r\n}\r\n\r\n\r\n.btn-github\r\n{\r\n  background-color: #4183c4;\r\n}\r\n\r\n\r\n.btn-github:hover\r\n{\r\n  background-color: #689cd0;\r\n}\r\n\r\n\r\n.btn-google-plus\r\n{\r\n  background-color: #dd4b39;\r\n}\r\n\r\n\r\n.btn-google-plus:hover\r\n{\r\n  background-color: #e47365;\r\n}\r\n\r\n\r\n.btn-instagram\r\n{\r\n  background-color: #3f729b;\r\n}\r\n\r\n\r\n.btn-instagram:hover\r\n{\r\n  background-color: #548cb9;\r\n}\r\n\r\n\r\n.btn-jsfiddle\r\n{\r\n  background-color: #4679bd;\r\n}\r\n\r\n\r\n.btn-jsfiddle:hover\r\n{\r\n  background-color: #6c94ca;\r\n}\r\n\r\n\r\n.btn-lastfm\r\n{\r\n  background-color: #e31b23;\r\n}\r\n\r\n\r\n.btn-lastfm:hover\r\n{\r\n  background-color: #e9484e;\r\n}\r\n\r\n\r\n.btn-linkedin\r\n{\r\n  background-color: #0976b4;\r\n}\r\n\r\n\r\n.btn-linkedin:hover\r\n{\r\n  background-color: #0b96e5;\r\n}\r\n\r\n\r\n.btn-paypal\r\n{\r\n  background-color: #253b80;\r\n}\r\n\r\n\r\n.btn-paypal:hover\r\n{\r\n  background-color: #304da8;\r\n}\r\n\r\n\r\n.btn-pinterest\r\n{\r\n  background-color: #cc2127;\r\n}\r\n\r\n\r\n.btn-pinterest:hover\r\n{\r\n  background-color: #e04046;\r\n}\r\n\r\n\r\n.btn-reddit\r\n{\r\n  background-color: #ff4500;\r\n}\r\n\r\n\r\n.btn-reddit:hover\r\n{\r\n  background-color: #ff6a33;\r\n}\r\n\r\n\r\n.btn-skype\r\n{\r\n  background-color: #00aff0;\r\n}\r\n\r\n\r\n.btn-skype:hover\r\n{\r\n  background-color: #24c4ff;\r\n}\r\n\r\n\r\n.btn-soundcloud\r\n{\r\n  background-color: #f80;\r\n}\r\n\r\n\r\n.btn-soundcloud:hover\r\n{\r\n  background-color: #ffa033;\r\n}\r\n\r\n\r\n.btn-stack-overflow\r\n{\r\n  background-color: #fe7a15;\r\n}\r\n\r\n\r\n.btn-stack-overflow:hover\r\n{\r\n  background-color: #fe9748;\r\n}\r\n\r\n\r\n.btn-steam\r\n{\r\n  background-color: #7da10e;\r\n}\r\n\r\n\r\n.btn-steam:hover\r\n{\r\n  background-color: #a1d012;\r\n}\r\n\r\n\r\n.btn-stumbleupon\r\n{\r\n  background-color: #eb4924;\r\n}\r\n\r\n\r\n.btn-stumbleupon:hover\r\n{\r\n  background-color: #ef7053;\r\n}\r\n\r\n\r\n.btn-trello\r\n{\r\n  background-color: #256a92;\r\n}\r\n\r\n\r\n.btn-trello:hover\r\n{\r\n  background-color: #2f88bb;\r\n}\r\n\r\n\r\n.btn-tumblr\r\n{\r\n  background-color: #35465c;\r\n}\r\n\r\n\r\n.btn-tumblr:hover\r\n{\r\n  background-color: #485f7c;\r\n}\r\n\r\n\r\n.btn-twitch\r\n{\r\n  background-color: #6441a5;\r\n}\r\n\r\n\r\n.btn-twitch:hover\r\n{\r\n  background-color: #7e5bbe;\r\n}\r\n\r\n\r\n.btn-twitter\r\n{\r\n  background-color: #55acee;\r\n}\r\n\r\n\r\n.btn-twitter:hover\r\n{\r\n  background-color: #83c3f3;\r\n}\r\n\r\n\r\n.btn-vimeo\r\n{\r\n  background-color: #1ab7ea;\r\n}\r\n\r\n\r\n.btn-vimeo:hover\r\n{\r\n  background-color: #49c6ee;\r\n}\r\n\r\n\r\n.btn-vine\r\n{\r\n  background-color: #00b488;\r\n}\r\n\r\n\r\n.btn-vine:hover\r\n{\r\n  background-color: #00e7af;\r\n}\r\n\r\n\r\n.btn-vk\r\n{\r\n  background-color: #45668e;\r\n}\r\n\r\n\r\n.btn-vk:hover\r\n{\r\n  background-color: #587fae;\r\n}\r\n\r\n\r\n.btn-wechat\r\n{\r\n  background-color: #98d11c;\r\n}\r\n\r\n\r\n.btn-wechat:hover\r\n{\r\n  background-color: #afe53b;\r\n}\r\n\r\n\r\n.btn-wordpress\r\n{\r\n  background-color: #21759b;\r\n}\r\n\r\n\r\n.btn-wordpress:hover\r\n{\r\n  background-color: #2a95c5;\r\n}\r\n\r\n\r\n.btn-xing\r\n{\r\n  background-color: #026466;\r\n}\r\n\r\n\r\n.btn-xing:hover\r\n{\r\n  background-color: #039598;\r\n}\r\n\r\n\r\n.btn-yahoo\r\n{\r\n  background-color: #400191;\r\n}\r\n\r\n\r\n.btn-yahoo:hover\r\n{\r\n  background-color: #5601c4;\r\n}\r\n\r\n\r\n.btn-yelp\r\n{\r\n  background-color: #af0606;\r\n}\r\n\r\n\r\n.btn-yelp:hover\r\n{\r\n  background-color: #e00808;\r\n}\r\n\r\n\r\n.btn-youtube\r\n{\r\n  background-color: #e52d27;\r\n}\r\n\r\n\r\n.btn-youtube:hover\r\n{\r\n  background-color: #ea5955;\r\n}\r\n\r\n\r\n.btn-email\r\n{\r\n  background-color: #44c456;\r\n}\r\n\r\n\r\n.btn-email:hover\r\n{\r\n  background-color: #6bd079;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtBQUNkOzs7QUFHQTs7O0VBR0Usa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixxQkFBcUI7RUFDckIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixnQ0FBZ0M7RUFDaEMsdUNBQXVDO0VBQ3ZDLFdBQVc7QUFDYjs7O0FBRUE7O0VBRUUsbUNBQTJCO1VBQTNCLDJCQUEyQjtFQUMzQiwrQkFBK0I7RUFDL0Isc0JBQXNCO0VBQ3RCLHFCQUFxQjtFQUNyQiwyQkFBbUI7VUFBbkIsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixrQ0FBa0M7RUFDbEMsMEJBQTBCO0VBQzFCLDJCQUEyQjtBQUM3Qjs7O0FBQ0E7O0VBRUUsV0FBVztFQUNYLGFBQWE7RUFDYixxQkFBcUI7QUFDdkI7OztBQUNBOztFQUVFLHdCQUF3QjtFQUN4Qix1QkFBdUI7RUFDdkIsNkJBQXFCO1VBQXJCLHFCQUFxQjtFQUNyQiw0QkFBNEI7QUFDOUI7OztBQUNBOztFQUVFLGNBQWM7RUFDZCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixXQUFXO0FBQ2I7OztBQUNBOztFQUVFLGVBQWU7RUFDZixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixXQUFXO0FBQ2I7OztBQUNBOztFQUVFLGVBQWU7RUFDZixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7OztBQUVBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSxzQkFBc0I7QUFDeEI7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUsc0JBQXNCO0FBQ3hCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQjs7O0FBQ0E7O0VBRUUseUJBQXlCO0FBQzNCOzs7QUFDQTs7RUFFRSx5QkFBeUI7QUFDM0I7OztBQUNBOztFQUVFLHlCQUF5QjtBQUMzQiIsImZpbGUiOiJzcmMvYXBwL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb290ZXItY29weXJpZ2h0LC5mb290ZXItY29weXJpZ2h0IGF7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG5cclxuYS5idG4tc29jaWFsLFxyXG4uYnRuLXNvY2lhbFxyXG57XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGhlaWdodDogNTRweDtcclxuICBsaW5lLWhlaWdodDogNTRweDtcclxuICBtYXJnaW46IDhweCA0cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIC4zcztcclxuICB3ZWJraXQtdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAuM3M7XHJcbiAgd2lkdGg6IDU0cHg7XHJcbn1cclxuXHJcbi5idG4tc29jaWFsIC5mYSwuYnRuLXNvY2lhbCBpXHJcbntcclxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgbW96LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcclxuICBtcy10cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gIG8tdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gIHRyYW5zaXRpb246IGFsbCAuMjVzO1xyXG4gIHdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XHJcbiAgd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgd2Via2l0LXRyYW5zaXRpb246IGFsbCAuMjVzO1xyXG59XHJcbi5idG4tc29jaWFsOmhvdmVyLC5idG4tc29jaWFsOmZvY3VzXHJcbntcclxuICBjb2xvcjogI2ZmZjtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4uYnRuLXNvY2lhbDpob3ZlciAuZmEsLmJ0bi1zb2NpYWw6Zm9jdXMgLmZhLC5idG4tc29jaWFsOmhvdmVyIGksLmJ0bi1zb2NpYWw6Zm9jdXMgaVxyXG57XHJcbiAgbXMtdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xyXG4gIG8tdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4zKTtcclxuICB3ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xyXG59XHJcbi5idG4tc29jaWFsLmJ0bi14c1xyXG57XHJcbiAgZm9udC1zaXplOiA5cHg7XHJcbiAgaGVpZ2h0OiAyNHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxM3B4O1xyXG4gIG1hcmdpbjogNnB4IDJweDtcclxuICB3aWR0aDogMjRweDtcclxufVxyXG4uYnRuLXNvY2lhbC5idG4tc21cclxue1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBoZWlnaHQ6IDM2cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XHJcbiAgbWFyZ2luOiA2cHggMnB4O1xyXG4gIHdpZHRoOiAzNnB4O1xyXG59XHJcbi5idG4tc29jaWFsLmJ0bi1sZ1xyXG57XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG4gIGhlaWdodDogNzJweDtcclxuICBsaW5lLWhlaWdodDogNDBweDtcclxuICBtYXJnaW46IDEwcHggNnB4O1xyXG4gIHdpZHRoOiA3MnB4O1xyXG59XHJcblxyXG4uYnRuLWJlaGFuY2Vcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxNzY5ZmY7XHJcbn1cclxuLmJ0bi1iZWhhbmNlOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGE4YWZmO1xyXG59XHJcbi5idG4tYml0YnVja2V0XHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjA1MDgxO1xyXG59XHJcbi5idG4tYml0YnVja2V0OmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmE2OWFhO1xyXG59XHJcbi5idG4tY29kZXBlblxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc2ZGFmZjtcclxufVxyXG4uYnRuLWNvZGVwZW46aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNhOWU4ZmY7XHJcbn1cclxuLmJ0bi1kZXZpYW50YXJ0XHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGU2MjUyO1xyXG59XHJcbi5idG4tZGV2aWFudGFydDpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzY1N2U2YTtcclxufVxyXG4uYnRuLWRpZ2dcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XHJcbn1cclxuLmJ0bi1kaWdnOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYTFhO1xyXG59XHJcbi5idG4tZHJpYmJibGVcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlYTRjODk7XHJcbn1cclxuLmJ0bi1kcmliYmJsZTpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmN2FhNztcclxufVxyXG4uYnRuLWRyb3Bib3hcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDdlZTU7XHJcbn1cclxuLmJ0bi1kcm9wYm94OmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTk5OGZmO1xyXG59XHJcbi5idG4tZmFjZWJvb2tcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzYjU5OTg7XHJcbn1cclxuLmJ0bi1mYWNlYm9vazpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjNzBiYTtcclxufVxyXG4uYnRuLWZsaWNrclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwNjNkYztcclxufVxyXG4uYnRuLWZsaWNrcjpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEwN2NmZjtcclxufVxyXG4uYnRuLWZvdXJzcXVhcmVcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZjRiNzg7XHJcbn1cclxuLmJ0bi1mb3Vyc3F1YXJlOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjM3YTliO1xyXG59XHJcbi5idG4tZ2l0aHViXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDE4M2M0O1xyXG59XHJcbi5idG4tZ2l0aHViOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjg5Y2QwO1xyXG59XHJcbi5idG4tZ29vZ2xlLXBsdXNcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkZDRiMzk7XHJcbn1cclxuLmJ0bi1nb29nbGUtcGx1czpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U0NzM2NTtcclxufVxyXG4uYnRuLWluc3RhZ3JhbVxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNmNzI5YjtcclxufVxyXG4uYnRuLWluc3RhZ3JhbTpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU0OGNiOTtcclxufVxyXG4uYnRuLWpzZmlkZGxlXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDY3OWJkO1xyXG59XHJcbi5idG4tanNmaWRkbGU6aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM2Yzk0Y2E7XHJcbn1cclxuLmJ0bi1sYXN0Zm1cclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMzFiMjM7XHJcbn1cclxuLmJ0bi1sYXN0Zm06aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOTQ4NGU7XHJcbn1cclxuLmJ0bi1saW5rZWRpblxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA5NzZiNDtcclxufVxyXG4uYnRuLWxpbmtlZGluOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGI5NmU1O1xyXG59XHJcbi5idG4tcGF5cGFsXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjUzYjgwO1xyXG59XHJcbi5idG4tcGF5cGFsOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzA0ZGE4O1xyXG59XHJcbi5idG4tcGludGVyZXN0XHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2MyMTI3O1xyXG59XHJcbi5idG4tcGludGVyZXN0OmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTA0MDQ2O1xyXG59XHJcbi5idG4tcmVkZGl0XHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY0NTAwO1xyXG59XHJcbi5idG4tcmVkZGl0OmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmY2YTMzO1xyXG59XHJcbi5idG4tc2t5cGVcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGFmZjA7XHJcbn1cclxuLmJ0bi1za3lwZTpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI0YzRmZjtcclxufVxyXG4uYnRuLXNvdW5kY2xvdWRcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmODA7XHJcbn1cclxuLmJ0bi1zb3VuZGNsb3VkOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZhMDMzO1xyXG59XHJcbi5idG4tc3RhY2stb3ZlcmZsb3dcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZTdhMTU7XHJcbn1cclxuLmJ0bi1zdGFjay1vdmVyZmxvdzpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlOTc0ODtcclxufVxyXG4uYnRuLXN0ZWFtXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2RhMTBlO1xyXG59XHJcbi5idG4tc3RlYW06aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNhMWQwMTI7XHJcbn1cclxuLmJ0bi1zdHVtYmxldXBvblxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ViNDkyNDtcclxufVxyXG4uYnRuLXN0dW1ibGV1cG9uOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWY3MDUzO1xyXG59XHJcbi5idG4tdHJlbGxvXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjU2YTkyO1xyXG59XHJcbi5idG4tdHJlbGxvOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmY4OGJiO1xyXG59XHJcbi5idG4tdHVtYmxyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzU0NjVjO1xyXG59XHJcbi5idG4tdHVtYmxyOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDg1ZjdjO1xyXG59XHJcbi5idG4tdHdpdGNoXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjQ0MWE1O1xyXG59XHJcbi5idG4tdHdpdGNoOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjN2U1YmJlO1xyXG59XHJcbi5idG4tdHdpdHRlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1YWNlZTtcclxufVxyXG4uYnRuLXR3aXR0ZXI6aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM4M2MzZjM7XHJcbn1cclxuLmJ0bi12aW1lb1xyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhYjdlYTtcclxufVxyXG4uYnRuLXZpbWVvOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDljNmVlO1xyXG59XHJcbi5idG4tdmluZVxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwYjQ4ODtcclxufVxyXG4uYnRuLXZpbmU6aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMGU3YWY7XHJcbn1cclxuLmJ0bi12a1xyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ1NjY4ZTtcclxufVxyXG4uYnRuLXZrOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTg3ZmFlO1xyXG59XHJcbi5idG4td2VjaGF0XHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOThkMTFjO1xyXG59XHJcbi5idG4td2VjaGF0OmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYWZlNTNiO1xyXG59XHJcbi5idG4td29yZHByZXNzXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE3NTliO1xyXG59XHJcbi5idG4td29yZHByZXNzOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmE5NWM1O1xyXG59XHJcbi5idG4teGluZ1xyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyNjQ2NjtcclxufVxyXG4uYnRuLXhpbmc6aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzk1OTg7XHJcbn1cclxuLmJ0bi15YWhvb1xyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwMDE5MTtcclxufVxyXG4uYnRuLXlhaG9vOmhvdmVyXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTYwMWM0O1xyXG59XHJcbi5idG4teWVscFxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2FmMDYwNjtcclxufVxyXG4uYnRuLXllbHA6aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMDA4MDg7XHJcbn1cclxuLmJ0bi15b3V0dWJlXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTUyZDI3O1xyXG59XHJcbi5idG4teW91dHViZTpob3ZlclxyXG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VhNTk1NTtcclxufVxyXG4uYnRuLWVtYWlsXHJcbntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDRjNDU2O1xyXG59XHJcbi5idG4tZW1haWw6aG92ZXJcclxue1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICM2YmQwNzk7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"page-footer font-small blue  bg-primary\">\n  <!-- Footer Elements -->\n  <div class=\"container\">\n\n    <!-- Social buttons -->\n    <ul class=\"list-unstyled list-inline text-center\">\n      <li class=\"list-inline-item\">\n        <a class=\"btn-social btn-facebook \" target=\"_blank\" href=\"https://www.facebook.com/beingshabab\">\n          <i class=\"fa fa-facebook\"> </i>\n        </a>\n      </li>\n      <li class=\"list-inline-item\">\n        <a  class=\"btn-social btn-twitter\" target=\"_blank\" href=\"https://twitter.com/beingshahabi\">\n          <i class=\"fa fa-twitter\"> </i>\n        </a>\n      </li>\n      <li class=\"list-inline-item\">\n        <a class=\"btn-social btn-github\" target=\"_blank\" href=\"https://github.com/babatech\">\n          <i class=\"fa fa-github\"> </i>\n        </a>\n      </li>\n      <li class=\"list-inline-item\">\n        <a class=\"btn-social btn-linkedin\" target=\"_blank\" href=\"https://www.linkedin.com/in/shahabshakoor\">\n          <i class=\"fa fa-linkedin\"> </i>\n        </a>\n      </li>\n      <li class=\"list-inline-item\" >\n        <a class=\"btn-social btn-instagram\" target=\"_blank\" href=\"https://www.instagram.com/beingshahab/\">\n          <i class=\"fa fa-instagram\"> </i>\n        </a>\n      </li>\n      <li class=\"list-inline-item\" >\n        <a class=\"btn-social btn-stack-overflow\" target=\"_blank\" href=\"https://stackoverflow.com/users/3318657/shahabi\">\n          <i class=\"fa fa-stack-overflow\"> </i>\n        </a>\n      </li>\n    </ul>\n    <!-- Social buttons -->\n\n  </div>\n  <!-- Footer Elements -->\n  <!-- Copyright -->\n  <div class=\"footer-copyright text-center py-3\">© 2019 Copyright:\n    <a href=\"https://babatech.github.io/\">Shahab Shakoor</a>,\n    powered by <a href=\"https://angular.io/\" target=\"_blank\" title=\"Angular 7\">Angular 7</a>\n  </div>\n  <!-- Copyright -->\n\n</footer>\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg bg-primary navbar-dark fixed-top\">\n  <div class=\"container\"> <button class=\"navbar-toggler navbar-toggler-right border-0 p-0\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar14\">\n    <p class=\"navbar-brand mb-0 text-white\">\n      <i class=\"fa d-inline fa-lg fa-stop-circle\"></i> Shahab Shakoor </p>\n  </button>\n    <div class=\"collapse navbar-collapse\" id=\"navbar14\">\n      <ul class=\"navbar-nav mr-auto\">\n        <li class=\"nav-item\"> <a class=\"nav-link active\" href=\"#personal-info\" >Personal Info<br></a> </li>\n        <li class=\"nav-item\"> <a class=\"nav-link active\" href=\"#experience-box\">Experience</a> </li>\n        <li class=\"nav-item\"> <a class=\"nav-link active\" href=\"#education-box\" >Education</a> </li>\n        <li class=\"nav-item\"> <a class=\"nav-link active\" href=\"#skills-set\">Skills</a> </li>\n      </ul>\n      <p class=\"d-none d-md-block lead mb-0  text-white\"><a class=\"navbar-brand\" href=\"#start\">Shahab Shakoor</a></p>\n      <ul class=\"navbar-nav ml-auto\">\n        <li class=\"nav-item mx-1\"> <a class=\"nav-link\" href=\"https://github.com/babatech\" target=\"_blank\">\n          <i class=\"fa fa-github fa-fw fa-lg\"></i>\n        </a> </li>\n        <li class=\"nav-item mx-1\"> <a class=\"nav-link\" target=\"_blank\" href=\"https://stackoverflow.com/users/3318657/shahabi\">\n          <i class=\"fa fa-stack-overflow fa-fw fa-lg\"></i>\n        </a> </li>\n      </ul>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/info/info.component.css":
/*!*****************************************!*\
  !*** ./src/app/info/info.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2luZm8vaW5mby5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/info/info.component.html":
/*!******************************************!*\
  !*** ./src/app/info/info.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"py-5\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-5 col-sm-6\">\n        <img class=\"img-fluid d-block resume-photo\" src=\"../assets/images/shahabshakoor.jpg\" data-aos=\"flip-up\" />\n      </div>\n      <div class=\"col-md-7 col-sm-6\" data-aos=\"zoom-in-up\">\n        <h2 class=\"\">Shahab Shakoor</h2>\n        <h4 class=\"\" id=\"personal-info\"><i class=\"fa fa-info\"></i> Personal Info</h4>\n        <table class=\"table\">\n          <tbody>\n          <tr>\n            <td>Full name</td>\n            <td>Shahab Shakoor</td>\n          </tr>\n          <tr>\n            <td>Tel.</td>\n            <td>004917657949013</td>\n          </tr>\n          <tr>\n            <td>E-mail</td>\n            <td>shahabi1209@gmail.com</td>\n          </tr>\n          <tr>\n            <td>DOB</td>\n            <td>19 March, 1992</td>\n          </tr>\n          <tr>\n            <td>CV</td>\n            <td><a target=\"_blank\" href=\"../../assets/pdf/Lebenslauf-Shahab-Shakoor.pdf\" title=\"Lebenslauf Shahab Shakoor\" class=\"btn btn-primary\">Download</a></td>\n          </tr>\n          </tbody>\n        </table>\n        <h5>Objective</h5>\n        <p>\n          Software Developer, experienced in the design and development of different types of software:\n          single page web applications, REST web services. Experienced in architectural aspects of software development, including design, prototyping, performance tuning, security.\n          The best thing of mine is that, I'm a quick learner and a good \"googler\" too.\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/info/info.component.ts":
/*!****************************************!*\
  !*** ./src/app/info/info.component.ts ***!
  \****************************************/
/*! exports provided: InfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfoComponent", function() { return InfoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var InfoComponent = /** @class */ (function () {
    function InfoComponent() {
    }
    InfoComponent.prototype.ngOnInit = function () {
    };
    InfoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-info',
            template: __webpack_require__(/*! ./info.component.html */ "./src/app/info/info.component.html"),
            styles: [__webpack_require__(/*! ./info.component.css */ "./src/app/info/info.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], InfoComponent);
    return InfoComponent;
}());



/***/ }),

/***/ "./src/app/languages/languages.component.css":
/*!***************************************************!*\
  !*** ./src/app/languages/languages.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".language-set .progress{\r\n  height: 25px;\r\n}\r\n.language-set .progress .progress-bar{\r\n  font-size: 1rem;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGFuZ3VhZ2VzL2xhbmd1YWdlcy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxlQUFlO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvbGFuZ3VhZ2VzL2xhbmd1YWdlcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxhbmd1YWdlLXNldCAucHJvZ3Jlc3N7XHJcbiAgaGVpZ2h0OiAyNXB4O1xyXG59XHJcbi5sYW5ndWFnZS1zZXQgLnByb2dyZXNzIC5wcm9ncmVzcy1iYXJ7XHJcbiAgZm9udC1zaXplOiAxcmVtO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/languages/languages.component.html":
/*!****************************************************!*\
  !*** ./src/app/languages/languages.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"py-5\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12 language-set\">\n        <h4 data-aos=\"fade-right\"><i class=\"fa fa-language py-2\"></i> Languages</h4>\n        <h5>\n          <div class=\"progress\" data-aos=\"zoom-in-up\">\n            <div class=\"progress-bar w-100 bg-success progress-bar-striped progress-bar-animated\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">English</div>\n          </div><br>\n          <div class=\"progress\" data-aos=\"zoom-in-up\">\n            <div class=\"progress-bar w-25 bg-primary progress-bar-striped progress-bar-animated\" role=\"progressbar\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\">Deutsch</div>\n          </div><br>\n          <div class=\"progress\" data-aos=\"zoom-in-up\">\n            <div class=\"progress-bar w-100 bg-success progress-bar-striped progress-bar-animated\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">Urdu</div>\n          </div><br>\n          <div class=\"progress\" data-aos=\"zoom-in-up\">\n            <div class=\"progress-bar w-100 bg-success progress-bar-striped progress-bar-animated\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">Punjabi</div>\n          </div>\n        </h5>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/languages/languages.component.ts":
/*!**************************************************!*\
  !*** ./src/app/languages/languages.component.ts ***!
  \**************************************************/
/*! exports provided: LanguagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguagesComponent", function() { return LanguagesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var LanguagesComponent = /** @class */ (function () {
    function LanguagesComponent() {
    }
    LanguagesComponent.prototype.ngOnInit = function () {
    };
    LanguagesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-languages',
            template: __webpack_require__(/*! ./languages.component.html */ "./src/app/languages/languages.component.html"),
            styles: [__webpack_require__(/*! ./languages.component.css */ "./src/app/languages/languages.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], LanguagesComponent);
    return LanguagesComponent;
}());



/***/ }),

/***/ "./src/app/past-work/past-work.component.css":
/*!***************************************************!*\
  !*** ./src/app/past-work/past-work.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card.bg-primary,.card.bg-primary .text-muted,.card.bg-primary a{\r\n  color: white !important;\r\n}\r\n.card.bg-primary .card-title{\r\n  font-weight: 700;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFzdC13b3JrL3Bhc3Qtd29yay5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9wYXN0LXdvcmsvcGFzdC13b3JrLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZC5iZy1wcmltYXJ5LC5jYXJkLmJnLXByaW1hcnkgLnRleHQtbXV0ZWQsLmNhcmQuYmctcHJpbWFyeSBhe1xyXG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG59XHJcbi5jYXJkLmJnLXByaW1hcnkgLmNhcmQtdGl0bGV7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/past-work/past-work.component.html":
/*!****************************************************!*\
  !*** ./src/app/past-work/past-work.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"py-5\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12 language-set\">\n        <h4 data-aos=\"fade-right\"><i class=\"fa fa-star py-2\"></i> Projects</h4>\n        <div class=\"row\">\n          <div class=\"card-columns\">\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\">Consumer Driven Contract Testing (2018)</h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Master Thesis</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  It was Master Thesis. The main purpose of thesis is to do research on Microservice architecture, Behaviour driven development model and testing practices in Microservice architecture environment. The thesis research will propose a quality assurance framework for <a href=\"https://www.gerdi-project.eu/\" target=\"_blank\">GeRDI Project</a>\n                  <br>In the Thesis case project, technologies like, Node.js, Vue.js, Git, Pact-js, Vue-Unit, NPM, JSON, were practiced\n                </p>\n                <p class=\"card-text text-right\"></p>\n              </div>\n            </div>\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\">Browser Bytecode using WebAssembly (2018)</h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Master Project</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  It was Master project. The idea was to decode Raw Video data on browser. For decodeing raw video data, the WebAssembly used. WebAssembly (Wasm, WA) is a web standard that defines a binary format and a corresponding assembly-like text format for executable code in Web pages.\n                  <br>In this project, technologies like, Node.js, Express, socket.io, websocket, JSON, WebAssembly, Emscripten compiler, C/C++ and FFmpeg library were practiced\n                </p>\n                <p class=\"card-text text-right\"></p>\n              </div>\n            </div>\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\"><a href=\"https://github.com/babatech/ASP\" target=\"_blank\">City Guide (2016)</a></h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Semester Project</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  It was an semester project for Master. The idea was to help a personal to guide tourist on their vacation by guiding them to their near possible tourist attractions and tourist can have chat with the other touriest who are in the same city.<br>\n                  In this project, technologies like, Node.js, Express, socket.io, websocket, MySQL, Google Map API, twitter Bootstrap, Git, and UML were practiced\n                </p>\n                <p class=\"card-text text-right\"></p>\n              </div>\n            </div>\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\">WebSite for the Kotowski GmbH (2015)</h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Semester Project</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  This was a semester project in which we practiced Customer interaction and team work . The project is to make website for the Kotowski GmbH. The website had functionality to make car trailer booking online. In this project we gathered requirements for the website in a meeting with the Kotowski GmbH.\n                  <br>We use WordPress CMS for the project.\n                  <br>Documentation with Coding in PHP\n                </p>\n              </div>\n            </div>\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\">Andro Cop (2014)</h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Bachelor Project</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  It was Bachelor project. The idea is to secure the user data in android based mobile In real life, when someone loses mobile,Mostly it is impossible to get back your mobile, and hence data recovery is also impossible.\n                  The andro cop application will act as moderator. User can trigger mobile lock Through SMS or EMail. The trigger will Encrypt the data on mobile. Hence it will impossible for stranger to see the user data on mobile.\n                </p>\n              </div>\n            </div>\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\">Online Auction and Bidding Website (2013)</h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Semester Project</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  It was semester project. In this project user place there thing for online bidding. Person who interested for that thing can place there bidding. Owner user reviews the bids and approve any bid. This project is done using Asp.net, C#, HTML, CSS and Jquery\n                </p>\n              </div>\n            </div>\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\">Online Project Management Tool (2012)</h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Semester Project</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  It was an semester project. It was done with PHP,HTML,Apache2 server, MySQL. It targeted the software development teams that tend to work from home and manage their project activities online.\n                </p>\n              </div>\n            </div>\n            <div data-aos=\"flip-up\" class=\"card bg-primary\">\n              <div class=\"card-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12 \">\n                    <h4 class=\"card-title\">Housing Society Management Application (2012)</h4>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <small class=\"text-muted\">\n                      <strong>Semester Project</strong>\n                    </small>\n                  </div>\n                </div>\n                <p class=\"card-text\">\n                  It was an semester project. It was done with Java, OOP and UML. During the project, object oriented design and analysis practice were followed. In this project, requirements were gathered  for a housing project named ABAD. After requirements, UML Usecases and UML designs were formulated. The implemented for the system was done in Java.\n                </p>\n              </div>\n            </div>\n            <!--<div class=\"card\">-->\n            <!--<div class=\"card-body\">-->\n            <!--<div class=\"row\">-->\n            <!--<div class=\"col-sm-12 \">-->\n            <!--<h4 class=\"card-title\"></h4>-->\n            <!--</div>-->\n            <!--<div class=\"col-sm-12\">-->\n            <!--<small class=\"text-muted\">-->\n            <!--<strong>Semester Project</strong>-->\n            <!--</small>-->\n            <!--</div>-->\n            <!--</div>-->\n            <!--<p class=\"card-text\">-->\n\n            <!--</p>-->\n            <!--</div>-->\n            <!--</div>-->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/past-work/past-work.component.ts":
/*!**************************************************!*\
  !*** ./src/app/past-work/past-work.component.ts ***!
  \**************************************************/
/*! exports provided: PastWorkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PastWorkComponent", function() { return PastWorkComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PastWorkComponent = /** @class */ (function () {
    function PastWorkComponent() {
    }
    PastWorkComponent.prototype.ngOnInit = function () {
    };
    PastWorkComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-past-work',
            template: __webpack_require__(/*! ./past-work.component.html */ "./src/app/past-work/past-work.component.html"),
            styles: [__webpack_require__(/*! ./past-work.component.css */ "./src/app/past-work/past-work.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PastWorkComponent);
    return PastWorkComponent;
}());



/***/ }),

/***/ "./src/app/reference/reference.component.css":
/*!***************************************************!*\
  !*** ./src/app/reference/reference.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card.bg-primary,.card.bg-primary .text-muted,.card.bg-primary a{\r\n  color: white !important;\r\n}\r\n.card.bg-primary .card-title{\r\n  font-weight: 700;\r\n}\r\n.card {\r\n  margin: 0 auto;\r\n}\r\n.card .carousel-item {\r\n  height: 200px;\r\n}\r\n.card .carousel-caption {\r\n  padding: 0;\r\n  right: 0;\r\n  left: 0;\r\n  color: #3d3d3d;\r\n}\r\n.card .carousel-caption h3 {\r\n  color: #3d3d3d;\r\n}\r\n.card .carousel-caption p {\r\n  line-height: 30px;\r\n}\r\n.card .carousel-caption .col-sm-3 {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n.card .carousel-caption .col-sm-9 {\r\n  text-align: left;\r\n}\r\n.navi a {\r\n  text-decoration:none;\r\n}\r\na > .ico {\r\n  background-color: grey;\r\n  padding: 10px;\r\n}\r\na:hover > .ico {\r\n  background-color: #666;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcmVmZXJlbmNlL3JlZmVyZW5jZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGFBQWE7QUFDZjtBQUNBO0VBQ0UsVUFBVTtFQUNWLFFBQVE7RUFDUixPQUFPO0VBQ1AsY0FBYztBQUNoQjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0Usc0JBQXNCO0VBQ3RCLGFBQWE7QUFDZjtBQUNBO0VBQ0Usc0JBQXNCO0FBQ3hCIiwiZmlsZSI6InNyYy9hcHAvcmVmZXJlbmNlL3JlZmVyZW5jZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQuYmctcHJpbWFyeSwuY2FyZC5iZy1wcmltYXJ5IC50ZXh0LW11dGVkLC5jYXJkLmJnLXByaW1hcnkgYXtcclxuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcclxufVxyXG4uY2FyZC5iZy1wcmltYXJ5IC5jYXJkLXRpdGxle1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuLmNhcmQge1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG59XHJcbi5jYXJkIC5jYXJvdXNlbC1pdGVtIHtcclxuICBoZWlnaHQ6IDIwMHB4O1xyXG59XHJcbi5jYXJkIC5jYXJvdXNlbC1jYXB0aW9uIHtcclxuICBwYWRkaW5nOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgY29sb3I6ICMzZDNkM2Q7XHJcbn1cclxuLmNhcmQgLmNhcm91c2VsLWNhcHRpb24gaDMge1xyXG4gIGNvbG9yOiAjM2QzZDNkO1xyXG59XHJcbi5jYXJkIC5jYXJvdXNlbC1jYXB0aW9uIHAge1xyXG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xyXG59XHJcbi5jYXJkIC5jYXJvdXNlbC1jYXB0aW9uIC5jb2wtc20tMyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5jYXJkIC5jYXJvdXNlbC1jYXB0aW9uIC5jb2wtc20tOSB7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG4ubmF2aSBhIHtcclxuICB0ZXh0LWRlY29yYXRpb246bm9uZTtcclxufVxyXG5hID4gLmljbyB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG59XHJcbmE6aG92ZXIgPiAuaWNvIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjY2O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/reference/reference.component.html":
/*!****************************************************!*\
  !*** ./src/app/reference/reference.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"py-5\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12 language-set\">\n        <h4 data-aos=\"fade-right\"><i class=\"fa fa-star py-2\"></i> Testimonials</h4>\n        <div class=\"row\">\n          <div class=\"card col-md-6\">\n            <div id=\"carouselTestimonialsControls\" class=\"carousel slide\" data-ride=\"carousel\" data-interval=\"2000\">\n              <div class=\"w-100 carousel-inner\" role=\"listbox\">\n                <div class=\"carousel-item active\">\n                  <div class=\"carousel-caption\">\n                    <div class=\"row\">\n                      <div class=\"col-sm-12\">\n                        <h3><a target=\"_blank\" href=\"https://www.zbw.eu/forschung/science-2-0/anja-busch/\">Anja Busch</a></h3>\n                        <small>Ms. Anja Busch is the Project manager of project GeRDI(Generic Research Data Infrastructure) at ZBW-Leibniz-Informationszentrum Wirtschaft, Kiel. For 9 months, I had worked as a front-end developer under project management of Anja Busch in Project GeRDI.</small>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"carousel-item\">\n                  <div class=\"carousel-caption\">\n                    <div class=\"row\">\n                      <div class=\"col-sm-12\">\n                        <h3><a href=\"http://www.zbw.eu/de/forschung/zbw-labs/timo-borst/\" target=\"_blank\">Dr. Timo Borst</a></h3>\n                        <small>Dr. Timo Borst is the Head of Innovative Information Systems and Publication Technologies (IIPT) Department at ZBW-Leibniz-Informationszentrum Wirtschaft, Kiel. I had done my master thesis under the supervision of Dr. Timo Borst. </small>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"carousel-item\">\n                  <div class=\"carousel-caption\">\n                    <div class=\"row\">\n                      <div class=\"col-sm-12\">\n                        <h3><a href=\"https://www.concept.one/impressum.html\" target=\"_blank\">Oliver Gstir</a> </h3>\n                        <small>Mr. Oliver Gstir is the Executive Director of Concept one GmbH, Hamburg. For more then Two years, I had worked as software developer under the management of Mr. Gstir </small>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"float-right navi\">\n                <a class=\"\" href=\"#carouselTestimonialsControls\" role=\"button\" data-slide=\"prev\">\n                  <span class=\"carousel-control-prev-icon ico\" aria-hidden=\"true\"></span>\n                  <span class=\"sr-only\">Previous</span>\n                </a>\n                <a class=\"\" href=\"#carouselTestimonialsControls\" role=\"button\" data-slide=\"next\">\n                  <span class=\"carousel-control-next-icon ico\" aria-hidden=\"true\"></span>\n                  <span class=\"sr-only\">Next</span>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/reference/reference.component.ts":
/*!**************************************************!*\
  !*** ./src/app/reference/reference.component.ts ***!
  \**************************************************/
/*! exports provided: ReferenceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferenceComponent", function() { return ReferenceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! aos */ "./node_modules/aos/dist/aos.js");
/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_2__);



var ReferenceComponent = /** @class */ (function () {
    function ReferenceComponent() {
    }
    ReferenceComponent.prototype.ngOnInit = function () {
        aos__WEBPACK_IMPORTED_MODULE_2__["init"]({
            // Global settings:
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120,
            delay: 0,
            duration: 1000,
            easing: 'ease',
            once: false,
            mirror: false,
            anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation
        });
    };
    ReferenceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reference',
            template: __webpack_require__(/*! ./reference.component.html */ "./src/app/reference/reference.component.html"),
            styles: [__webpack_require__(/*! ./reference.component.css */ "./src/app/reference/reference.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ReferenceComponent);
    return ReferenceComponent;
}());



/***/ }),

/***/ "./src/app/skills/skills.component.css":
/*!*********************************************!*\
  !*** ./src/app/skills/skills.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".skill-set .badge{\r\n  margin: 5px;\r\n  padding: 15px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2tpbGxzL3NraWxscy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLGFBQWE7QUFDZiIsImZpbGUiOiJzcmMvYXBwL3NraWxscy9za2lsbHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5za2lsbC1zZXQgLmJhZGdle1xyXG4gIG1hcmdpbjogNXB4O1xyXG4gIHBhZGRpbmc6IDE1cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/skills/skills.component.html":
/*!**********************************************!*\
  !*** ./src/app/skills/skills.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"py-5 d-md-none d-lg-none d-xl-none\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-12\">\n        <h4  data-aos=\"fade-right\" id=\"skills-set\"><i class=\"fa fa-user-secret py-2\"></i> Skills</h4>\n        <h4 class=\"text-center skill-set\">\n          <span class=\"badge badge-primary\" data-aos=\"flip-up\" >PHP</span>\n          <span class=\"badge badge-primary\" data-aos=\"flip-up\" >JavaScript</span>\n          <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Wordpress</span>\n          <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Git</span>\n          <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Contao</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Typo3</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Symfony</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >eZ Publish </span>\n          <span class=\"badge badge-primary\" data-aos=\"flip-up\" >Web Services(REST/SOAP)</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Angular</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Vue.js</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Bower</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >NPM</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >SASS</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Lass</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Gulp</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >twitter-bootstrap</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >MySQL</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >OSCLASS</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Woocommerce</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Linux Administration</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Jira</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Kanban</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Agile development</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >DevOps</span>\n          <span data-aos=\"flip-up\"  class=\"badge badge-secondary\">SCRUM</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >MicroService</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >WASM</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >WebAssembly</span>\n          <span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Emscripten</span>\n          <!--<span class=\"badge badge-primary\" data-aos=\"flip-up\" >PHP</span><br>-->\n          <!--<span class=\"badge badge-primary\" data-aos=\"flip-down\" >JavaScript</span><span class=\"badge badge-primary\" data-aos=\"flip-down\" >Wordpress</span><br>-->\n          <!--<span class=\"badge badge-primary\" data-aos=\"flip-up\" >Git</span><span class=\"badge badge-primary\" data-aos=\"flip-up\" >Contao</span><span class=\"badge badge-primary\" data-aos=\"flip-up\" >Web Services(REST/SOAP)</span><br>-->\n          <!--<span class=\"badge badge-secondary\" data-aos=\"flip-down\" >AngularJS</span><span class=\"badge badge-secondary\" data-aos=\"flip-down\" >Vue.js</span><span class=\"badge badge-secondary\" data-aos=\"flip-down\" >OSCLASS</span><span class=\"badge badge-secondary\" data-aos=\"flip-down\" >Linux Administration</span><br>-->\n          <!--<span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Kanban</span><span class=\"badge badge-secondary\" data-aos=\"flip-up\" >Agile development</span><span class=\"badge badge-secondary\" data-aos=\"flip-up\" >DevOps</span><span data-aos=\"flip-up\"  class=\"badge badge-secondary\">SCRUM</span><span class=\"badge badge-secondary\" data-aos=\"flip-up\" >MicroService</span><br>-->\n        </h4>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/skills/skills.component.ts":
/*!********************************************!*\
  !*** ./src/app/skills/skills.component.ts ***!
  \********************************************/
/*! exports provided: SkillsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkillsComponent", function() { return SkillsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SkillsComponent = /** @class */ (function () {
    function SkillsComponent() {
    }
    SkillsComponent.prototype.ngOnInit = function () {
    };
    SkillsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-skills',
            template: __webpack_require__(/*! ./skills.component.html */ "./src/app/skills/skills.component.html"),
            styles: [__webpack_require__(/*! ./skills.component.css */ "./src/app/skills/skills.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SkillsComponent);
    return SkillsComponent;
}());



/***/ }),

/***/ "./src/assets/css/main.css":
/*!*********************************!*\
  !*** ./src/assets/css/main.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!../../../node_modules/postcss-loader/src??embedded!./main.css */ "./node_modules/@angular-devkit/build-angular/src/angular-cli-files/plugins/raw-css-loader.js!./node_modules/postcss-loader/src/index.js?!./src/assets/css/main.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\shahab\WebstormProjects\fun\angular\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map