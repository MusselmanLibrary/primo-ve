(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

/***************************************************************/

// Report a Problem

app.controller('prmActionContainerAfterController', [function () {
    var vm = this;

    vm.getPermalink = getPermalink;

    function getPermalink() {
        var permalink = encodeURIComponent(window.location.href);

        var formField = 'https://docs.google.com/forms/d/e/1FAIpQLSf-RoeHogXcnLugk8oi_k8YKykv0Q0Ur5ZWO3y95_hptmCALQ/viewform?usp=pp_url&entry.1336545636=';
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

// WorldCat search link
app.controller('SearchBarAfterController', [function () {
    var vm = this;

    vm.getResults = getResults;

    function getResults() {
        return vm.parentCtrl.hasSearchResults;
    }

    vm.getLink = getLink;

    function getLink() {
        //if (vm.parentCtrl.hasSearchResults !=='false') {
        var query = vm.parentCtrl.mainSearchField;
        return 'http://ezpro.cc.gettysburg.edu:2048/login?url=http://firstsearch.oclc.org/fsip?dbname=worldcat&done=referer&query=' + query;
        //} else {
        // return 'http://ezpro.cc.gettysburg.edu:2048/login?url=http://firstsearch.oclc.org/fsip?dbname=worldcat&done=referer';
        //}
    }
}]);

app.component('prmSearchBarAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'SearchBarAfterController',
    template: '<div id="worldcatSearchBar-gtxs" layout-row div="" layout="row"><div flex="0" flex-xs="5" flex-sm="0" flex-md="0" flex-lg="15" flex-xl="20"></div><div flex-lg="17" flex-xl="17"><a style="font-color: white;" id="worldcatLink" href="{{$ctrl.getLink()}}" title="Search WorldCat">&nbsp;SEARCH&nbsp;&nbsp;<img ng-src="https://musselmanlibrary.org/primo/images/WorldCat.png" width="22" height="22" alt="WorldCat logo" id="worldcatLogo">&nbsp;&nbsp;OTHER LIBRARIES</a></div></div>'
});

// Adds the chat button
 (function() {
    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=bc6e55d2e4d6269040cbfba54b62eb67';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
                })();
// End the chat button

})();