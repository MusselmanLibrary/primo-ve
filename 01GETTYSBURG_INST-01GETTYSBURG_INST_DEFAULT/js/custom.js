(function () {
    "use strict";
    'use strict';


    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/


})

app.component('searchWorldCat', {
    
});

app.component('prmSearchBarAfter', {

});

app.component('searchWorldCat', {
    template: `<span style="margin-left: 10%;"><a href="http://ezpro.cc.gettysburg.edu:2048/login?url=http://firstsearch.oclc.org/fsip?dbname=worldcat&done=referer">Search other libraries</a></span>`
});
   
app.component('prmSearchBarAfter', {
        bindings: {parentCtrl: `<`},
        template: `<search-world-cat></search-world-cat>`    
});
