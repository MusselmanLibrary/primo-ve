(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

/***************************************************************/

// Begin BrowZine - Primo Integration...
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/ID",
    apiKey: "API",
 
    journalCoverImagesEnabled: true,
 
    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",
 
    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",
 
    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",
 
    printRecordsIntegrationEnabled: true,
  };
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
 
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });
 
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
// ... End BrowZine - Primo Integration

// Report a Problem Link injected into Full Results, adapted from Williams College Library

app.controller('prmActionContainerAfterController', [function () {
    var vm = this;

    vm.getPermalink = getPermalink;

    function getPermalink() {
        var permalink = encodeURIComponent(window.location.href);
        // insert link to Google Form and edit the entry param to the Google Form input element field used for the permalink. See https://ols57.commons.gc.cuny.edu/2015/03/19/how-to-user-triggered-error-reporting-in-ezproxy/ for more information about this
        var formField = 'https://docs.google.com/forms/.../viewform?usp=pp_url&entry.XXXXXXXXXXX=';
        formField += permalink;
        return formField;
        //return vm.parentCtrl.hasSearchResults;
        //console.log('url: ' + window.location.href);  
    }
}]);

app.component('prmActionContainerAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmActionContainerAfterController',
    template: '<div id="report-problem" layout="row" layout-align="center center"><a id="problemLink" target="_blank" href="{{$ctrl.getPermalink()}}" title="Report a problem"><img src="https://musselmanlibrary.org/primo/images/warning.png">&nbsp;&nbsp;Report a problem with this item</a></div>'
});

// WorldCat search link - taken from Williams College
app.controller('SearchBarAfterController', [function () {
    var vm = this;

    vm.getResults = getResults;

    function getResults() {
        return vm.parentCtrl.hasSearchResults;
    }

    vm.getLink = getLink;

    function getLink() {
        var query = vm.parentCtrl.mainSearchField;
        return 'your.ezproxy.edu/login?url=http://firstsearch.oclc.org/fsip?dbname=worldcat&done=referer&query=' + query;
    }
}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchBarAfterController',
    template: '<div id="worldcatSearchBar-gtxs" layout-row div="" layout="row"><div flex="0" flex-xs="5" flex-sm="0" flex-md="0" flex-lg="15" flex-xl="20"></div><div flex-lg="17" flex-xl="17"><a style="font-color: white;" id="worldcatLink" href="{{$ctrl.getLink()}}" title="Search WorldCat">&nbsp;SEARCH&nbsp;&nbsp;<img ng-src="path/to/WorldCat.png" width="22" height="22" alt="WorldCat logo" id="worldcatLogo">&nbsp;&nbsp;OTHER LIBRARIES</a></div></div>'
});

// Adds the chat button
 (function() {
    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=HASH';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
                })();
// End the chat button

})();
