/*! Built with http://stenciljs.com */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm, orgComponentOnReady) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // create a temporary array to store the resolves
    // before the core file has fully loaded
    App.$r = [];
    // add componentOnReady to HTMLElement.prototype
    orgComponentOnReady = HTMLElementPrototype.componentOnReady;
    HTMLElementPrototype.componentOnReady = function componentOnReady(cb) {
        const elm = this;
        // there may be more than one app on the window so
        // call original HTMLElement.prototype.componentOnReady
        // if one exists already
        orgComponentOnReady && orgComponentOnReady.call(elm);
        function executor(resolve) {
            if (App.$r) {
                // core file hasn't loaded yet
                // so let's throw it in this temporary queue
                // and when the core does load it'll handle these
                App.$r.push([elm, resolve]);
            }
            else {
                // core has finished loading because there's no temporary queue
                // call the core's logic to handle this
                App.componentOnReady(elm, resolve);
            }
        }
        if (cb) {
            // just a callback
            return executor(cb);
        }
        // callback wasn't provided, let's return a promise
        if (win.Promise) {
            // use native/polyfilled promise
            return new Promise(executor);
        }
        // promise may not have been polyfilled yet
        return { then: executor };
    };
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "DesignSystem","design-system",0,"design-system.core.js","es5-build-disabled.js","hydrated",[["yoo-accordion","yoo-accordion",1,[["_host",7],["allowMultipleSelection",1,0,"allow-multiple-selection",3],["items",5],["titles",1]],2],["yoo-action-sheet","yoo-action-sheet",1,[["buttons",1],["heading",1,0,1,2],["host",7]],2],["yoo-alert","yoo-action-sheet",1,[["animationName",1,0,"animation-name",2],["closeable",1,0,1,3],["closed",5],["heading",1,0,1,2],["host",7],["icon",1,0,1,2],["text",1,0,1,2]],2],["yoo-amap","yoo-amap",1,[["filterGroups",2],["host",7],["isLoading",5],["mapEntry",1]],2],["yoo-avatar","yoo-avatar",1,[["_host",7],["bottomLeftIcon",1,0,"bottom-left-icon",2],["bottomRightIcon",1,0,"bottom-right-icon",2],["imgSrc",1,0,"img-src",2],["topLeftIcon",1,0,"top-left-icon",2],["topRightIcon",1,0,"top-right-icon",2]],2],["yoo-badge","yoo-badge",1,[["_host",7],["value",1,0,1,4]],2],["yoo-breadcrumbs","yoo-breadcrumbs",1,[["_host",7],["items",1],["visibleItems",5]],2],["yoo-button","yoo-button",1,[["disabled",1,0,1,3],["host",7],["icon",1,0,1,2],["isLoading",1,0,"is-loading",3],["text",1,0,1,2]],2],["yoo-button-group","yoo-button-group",1,[["_host",7],["dropdownTitle",1,0,"dropdown-title",2],["isDropdown",1,0,"is-dropdown",3]],2],["yoo-card","yoo-avatar",1,[["actionButtonTitle",1,0,"action-button-title",2],["animationName",1,0,"animation-name",2],["avatarImgs",1],["avatarShape",1,0,"avatar-shape",2],["bottomLeftBadge",1,0,"bottom-left-badge",2],["bottomRightBadge",1,0,"bottom-right-badge",2],["date",1,0,1,2],["hasMenu",1,0,"has-menu",3],["heading",1,0,1,2],["horizontal",5],["host",7],["imageHeight",5],["imageWidth",5],["imgSrc",1,0,"img-src",2],["isActivable",1,0,"is-activable",3],["isActive",5],["isUserCard",1,0,"is-user-card",3],["subheadings",1],["tags",1],["topLeftBadge",1,0,"top-left-badge",2],["topRightBadge",1,0,"top-right-badge",2],["type",1,0,1,2]],2],["yoo-chart","yoo-chart",1,[["host",7],["options",1,0,1,1]],2],["yoo-chart-js","yoo-chart-js",1,[["data",1],["host",7],["options",1],["type",1,0,1,2]],2],["yoo-chat","yoo-chat",1,[["_host",7],["heading",1,0,1,2],["messages",1]],2],["yoo-checkbox","yoo-badge",1,[["_host",7],["disabled",1,0,1,3],["isIndeterminate",1,0,"is-indeterminate",3],["onCheckboxClick",6],["state",2,0,1,2],["text",1,0,1,2]],2],["yoo-color-picker","yoo-color-picker",1,[["_host",7],["color",1,0,1,2],["currentColor",5],["hideLabel",1,0,"hide-label",3]],2],["yoo-context-menu","yoo-context-menu",1,[["close",6],["context",1,0,1,1],["host",7],["items",1],["open",6],["opened",5]],2],["yoo-device","yoo-device",1,[["heading",1,0,1,2],["hideBar",1,0,"hide-bar",3],["host",7]],2],["yoo-empty-state","yoo-avatar",1,[["host",7],["type",1,0,1,2]],2],["yoo-entity","yoo-avatar",1,[["_host",7],["displayType",1,0,"display-type",2],["item",1,0,1,1],["mode",1,0,1,2]],2],["yoo-fab-button","yoo-fab-button",1,[["activated",1,0,1,3],["activatedState",5],["disabled",1,0,1,3],["fabEntry",1],["host",7],["icon",1,0,1,2],["inContainer",5],["inList",5],["label",1,0,1,2],["parentHasList",1,0,"parent-has-list",3],["text",1,0,1,2],["toggleActive",1]],2],["yoo-fab-container","yoo-fab-container",1,[["activated",5],["animated",1,0,1,3],["host",7]],2],["yoo-fab-list","yoo-fab-list",1,[["activated",1,0,1,3],["animated",1,0,1,3],["host",7],["mini",1,0,1,3],["side",1,0,1,2]],2],["yoo-form-autocomplete","yoo-form-autocomplete",1,[["_host",7]],2],["yoo-form-button-choice","yoo-form-button-choice",1,[["_host",7],["choices",1],["multiple",1,0,1,3],["selected",2]],2],["yoo-form-checklist","yoo-form-checklist",1,[["host",7],["previousTasks",1],["tasks",5]],2],["yoo-form-container","yoo-action-sheet",1,[["_host",7],["description",1,0,1,2],["hint",1,0,1,2],["label",1,0,1,2],["required",1,0,1,3]],2],["yoo-form-date-time","yoo-form-date-time",1,[["host",7],["placeholder",1,0,1,2],["placeholdertolabel",1,0,1,3],["required",1,0,1,3]]],["yoo-form-input","yoo-form-input",1,[["borderColorOnFocus",1,0,"border-color-on-focus",2],["host",7],["iconPrefix",1,0,"icon-prefix",2],["iconSuffix",1,0,"icon-suffix",2],["inputTypeState",5],["isLabelAboveVisible",5],["placeholder",1,0,1,2],["placeholdertolabel",1,0,1,3],["required",1,0,1,3],["showInputClear",1,0,"show-input-clear",3],["showPasswordToggle",1,0,"show-password-toggle",3],["tooltip",1,0,1,2],["type",1,0,1,2],["value",2,0,1,2]],2],["yoo-form-input-game","yoo-form-input-game",1,[["_host",7],["fieldId",1,0,"field-id",2],["isGameOver",5],["name",1,0,1,2],["phaser",1,0,1,1]],2],["yoo-form-input-validated","yoo-form-input-validated",1,[["_host",7],["asyncValidate",6],["asyncValidators",1],["validate",6],["validators",1],["value",2,0,1,2]],2],["yoo-form-progress-indicator","yoo-form-progress-indicator",1,[["contextStep",5],["currentStep",1,0,"current-step",4],["host",7],["isCompleted",1,0,"is-completed",3],["shownSteps",5],["steps",1]],2],["yoo-form-radio-group","yoo-form-radio-group",1,[["host",7],["items",5],["multipleSelection",1,0,"multiple-selection",3],["values",1]],2],["yoo-form-ranking","yoo-form-ranking",1,[["values",2]],2],["yoo-form-slider","yoo-form-slider",1,[["disabled",1,0,1,3],["doubleSlider",1,0,"double-slider",3],["hideLabel",1,0,"hide-label",3],["hideReferences",1,0,"hide-references",3],["host",7],["initialValue",1,0,"initial-value",4],["maximum",1,0,1,4],["minimum",1,0,1,4],["secondValue",5],["value",5]],2],["yoo-form-star-rating","yoo-form-star-rating",1,[["current",5],["host",7],["stars",1,0,1,4]],2],["yoo-form-timer","yoo-form-timer",1,[["calculatedTime",5],["host",7],["smallWindowSize",5],["timeChanged",6]],2],["yoo-form-toggle","yoo-form-toggle",1,[["host",7],["isToggled",5]],2],["yoo-grid","yoo-avatar",1,[["canToggleDisplay",1,0,"can-toggle-display",3],["columnDefs",1],["displayType",1,0,"display-type",2],["hideFooter",1,0,"hide-footer",3],["hideHeader",1,0,"hide-header",3],["host",7],["items",1],["onPullToRefresh",6],["pageSize",2,0,"page-size",4],["showCreate",1,0,"show-create",3],["showFilters",1,0,"show-filters",3],["showFiltersSimple",1,0,"show-filters-simple",3],["total",1,0,1,4],["type",2,0,1,2]],2],["yoo-language-selector","yoo-language-selector",1,[["hasSlimScroll",5],["host",7],["isMobile",1,0,"is-mobile",3],["languages",1]],2],["yoo-loader","yoo-loader",1,[["host",7]],2],["yoo-login","yoo-action-sheet",1,[["backgroundColor",1,0,"background-color",2],["backgroundSrc",1,0,"background-src",2],["buttonClass",1,0,"button-class",2],["currentLanguage",1,0,"current-language",2],["error",1,0,1,2],["forgotPasswordText",1,0,"forgot-password-text",2],["host",7],["isMobile",5],["language",5],["languages",1],["leftPanelFooterText",1,0,"left-panel-footer-text",2],["leftPanelHeaderIcon",1,0,"left-panel-header-icon",2],["loading",1,0,1,3],["pageWidthSize",5],["passwordInputChanged",5],["rememberMeText",1,0,"remember-me-text",2],["rightPanelFooterIcon",1,0,"right-panel-footer-icon",2],["rightPanelFooterText",1,0,"right-panel-footer-text",2],["rightPanelTitleIcon",1,0,"right-panel-title-icon",2],["rightPanelTitleText",1,0,"right-panel-title-text",2]],2,[["languageSelected","onLanguageSelected"]]],["yoo-map","yoo-amap",1,[["currentLanguage",1,0,"current-language",2],["disableZoom",1,0,"disable-zoom",3],["filterGroups",1],["fitToMarkers",1,0,"fit-to-markers",3],["groupBy",1,0,"group-by",2],["hideLegend",1,0,"hide-legend",3],["host",7],["icon",1,0,1,2],["isChinese",5],["legendColors",1],["mapEntry",1],["markers",1],["maxZoom",1,0,"max-zoom",4],["minZoom",1,0,"min-zoom",4],["position",1],["setProps",6],["showControls",1,0,"show-controls",3],["showDirections",1,0,"show-directions",3],["useCluster",1,0,"use-cluster",3],["zoom",1,0,1,4]],2,[["selected","onSelected"],["selectedMultiple","onSelectedMultiple"],["filterGroupsChanged","onFilterGroupsChanged"]]],["yoo-map-gl","yoo-amap",1,[["filterGroups",2],["host",7],["isLoading",5],["mapEntry",1]],2],["yoo-map-js","yoo-amap",1,[["filterGroups",2],["host",7],["isLoading",5],["mapEntry",1]],2],["yoo-modal","yoo-modal",1,[["animationName",1,0,"animation-name",2],["animationProp",1],["close",6],["content",1],["cssClass",1,0,"css-class",2],["footerText",1,0,"footer-text",2],["hasFooter",1,0,"has-footer",3],["hasHeader",1,0,"has-header",3],["heading",1,0,1,2],["headingIcon",1,0,"heading-icon",2],["host",7],["primaryButtonText",1,0,"primary-button-text",2],["primaryFn",1],["secondaryButtonText",1,0,"secondary-button-text",2],["withYooCtrl",1,0,"with-yoo-ctrl",3]],2],["yoo-modal-controller","yoo-action-sheet",1,[["closeActionSheet",6],["closeAlert",6],["closeModal",6],["confirm",6],["displayedAlert",5],["element",5],["generateActionSheet",6],["generateAlert",6],["generateModal",6],["host",7],["isGreyedOut",5],["populateModal",6],["show",6],["showAlert",6]],2,[["closed","childClosed"],["actionSheetClosed","childActionClosed"],["modalPrimaryButtonClicked","primaryClick"],["alertClosed","onAlertClosed"]]],["yoo-navbar","yoo-navbar",1,[["host",7],["numberOfVisibleTitles",5],["selectedTitle",2,0,"selected-title",2],["showDropdown",5],["titles",1]],2],["yoo-pagination","yoo-avatar",1,[["currentPage",1,0,"current-page",4],["host",7],["itemsPerPage",1,0,"items-per-page",4],["maxPagerSize",1,0,"max-pager-size",4],["pagerSize",5],["showTotal",1,0,"show-total",3],["totalItems",1,0,"total-items",4],["totalVisible",5]],2],["yoo-panel","yoo-panel",1,[["_host",7],["height",1,0,1,4],["width",1,0,1,4]],2],["yoo-progress-bar","yoo-form-slider",1,[["_host",7],["circle",1,0,1,3],["hideProgress",1,0,"hide-progress",3],["progress",1,0,1,4]],2],["yoo-radio","yoo-radio",1,[["_host",7],["disabled",1,0,1,3],["state",2,0,1,2],["text",1,0,1,2]],2],["yoo-scroll-spy","yoo-scroll-spy",1,[["enterEmitted",5],["host",7],["isInView",5],["outEmitted",5],["parentScroll",5],["repeat",1,0,1,3]],2,[["body:scroll","bodyScrollListener",0,1]]],["yoo-signature-pad","yoo-signature-pad",1,[["host",7]],2],["yoo-slim-scroll","yoo-slim-scroll",1,[["disable",6],["enable",6],["height",1,0,1,2],["horizontal",5],["host",7],["iScroll",5],["refresh",6],["scrollToBottom",6],["scrollToElement",6],["scrollToTop",6],["showScrollbar",1,0,"show-scrollbar",3],["width",1,0,1,2]],2],["yoo-sticky","yoo-sticky",1,[["bottom",1,0,1,2],["host",7],["top",1,0,1,2]],2],["yoo-tabs","yoo-tabs",1,[["host",7],["numberTabsDisplayed",1,0,"number-tabs-displayed",4],["selected",1,0,1,4],["selectedTab",5],["tabsDisplayed",5],["titles",1]],2],["yoo-tag","yoo-context-menu",1,[["_host",7],["closable",1,0,1,3],["closed",5],["icon",1,0,1,2],["text",1,0,1,2]],2],["yoo-text-editor","yoo-text-editor",1,[["host",7]],2],["yoo-toolbar","yoo-toolbar",1,[["_host",7],["actions",1],["activeAction",5],["showActive",1,0,"show-active",3]],2],["yoo-tooltip","yoo-form-input",1,[["host",7],["options",1,0,1,1],["placement",1,0,1,2],["text",1,0,1,2]],2],["yoo-transition","yoo-transition",1,[["heading",1,0,1,2],["host",7],["icon",1,0,1,2],["image",1,0,1,2],["subHeading",1,0,"sub-heading",2],["type",1,0,1,2]],2],["yoo-vertical-menu","yoo-vertical-menu",1,[["activeRow",5],["entry",2],["fixed",1,0,1,3],["heading",1,0,1,2],["host",7],["setItemActive",6]],2]],HTMLElement.prototype);