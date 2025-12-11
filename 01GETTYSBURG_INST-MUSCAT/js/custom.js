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
    api: "https://public-api.thirdiron.com/public/v1/libraries/XXX",
    apiKey: "APIKEY",
 
  journalCoverImagesEnabled: true,

  journalBrowZineWebLinkTextEnabled: true,
  journalBrowZineWebLinkText: "View Journal Contents",

  articleBrowZineWebLinkTextEnabled: true,
  articleBrowZineWebLinkText: "View Issue Contents",

  articlePDFDownloadLinkEnabled: true,
  articlePDFDownloadLinkText: "Download PDF",

  articleLinkEnabled: true,
  articleLinkText: "Read Article",

  printRecordsIntegrationEnabled: true,

  unpaywallEmailAddressKey: "EMAIL",

  articlePDFDownloadViaUnpaywallEnabled: true,
  articlePDFDownloadViaUnpaywallText: "Download PDF (via Unpaywall)",

  articleLinkViaUnpaywallEnabled: true,
  articleLinkViaUnpaywallText: "Read Article (via Unpaywall)",

  articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
  articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF (Accepted Manuscript via Unpaywall)",

  articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
  articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article (Accepted Manuscript via Unpaywall)",
};
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
 
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
      this.$onInit = function(){
        {
          window.browzine.primo.searchResult($scope);
        }
      };
  });
 
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
// ... End BrowZine - Primo Integration

// Report a Problem

app.controller('prmActionContainerAfterController', [function() {
    var vm = this;

    this.$onInit = function(){
      {
        vm.getPermalink = getPermalink;

        function getPermalink() {
            var permalink = encodeURIComponent(window.location.href);

            var formField = 'GOOGLE FORM URL';
            formField += permalink;
            return formField;
            //return vm.parentCtrl.hasSearchResults;
            //console.log('url: ' + window.location.href);  
        }
      }
    };
  }]);

  app.component('prmActionContainerAfter', {
      bindings: { parentCtrl: '<' },
      controller: 'prmActionContainerAfterController',
   template: `
   <div id="report-problem"
    layout="row"
    layout-align="center center"
    style="margin:12px 0; padding:8px; border:1px solid rgba(58,58,58,.3); box-shadow: 0 2px 7px 0 rgba(58,58,58,.12); background:#ffffff;
    aria-live="polite">
    <strong><a id="problemLink" target="_blank" href="{{$ctrl.getPermalink()}}" title="Report a problem"><img src="/images/warning.png">&nbsp;&nbsp;Report a broken link or incorrect information</a></strong></div>
   `
});

// end report a problem

// adds scope drop down to search bar by default

app.component('prmSearchBarAfter', {
  controller: function($scope) {
    this.$onInit = function() {
        $scope.$parent.$ctrl.showTabsAndScopes = true;
    }
  }
});

// end the scope drop down code

// Adds the chat button

 (function() {
    var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
    lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'CHATLINK';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
                })();

// End the chat button

// add alerts

  // Helper: are we inside the Rapido section (#rapidoOffer)?
  function isInsideRapidoOffer(el) {
    var node = el;
    while (node && node.nodeType === 1) {
      if (node.id === 'rapidoOffer') return true;
      node = node.parentElement;
    }
    return false;
  }

  app.component('prmServiceHeaderAfter', {
    bindings: { parentCtrl: '<' },
    controller: ['$element', function ($element) {
      var self = this;
      self.showChapterScanNote = false;
      self.showRapidoClosureNote = false;

      self.$onInit = function () {
        // Only show notes when this header is inside #rapidoOffer
        if (!isInsideRapidoOffer($element[0])) {
          return;
        }

        // At this point we KNOW we are in the "Get it from another library" Rapido section
        self.showChapterScanNote = true;
        self.showRapidoClosureNote = true;
      };
    }],
    template: [
      '<div ng-if="$ctrl.showChapterScanNote" class="chapter-scan-note">',
      '  Online graduate students may use this option to request a scan of a chapter of a book held by Musselman Library.',
      '</div>',
      '<div ng-if="$ctrl.showRapidoClosureNote" class="rapido-closure-note">',
      '  <span class="rapido-icon">⚠</span>',
      '  <span class="rapido-text">',
      '    Requests made between <strong>12/19</strong> and <strong>1/5</strong> may be delayed due to library closure.',
      '  </span>',
      '</div>'
    ].join('')
  });



// Inject the disclaimer via the AFTER hook, then move it BEFORE the form.

app.component('prmSendEmailAfter', {
  bindings: { parentCtrl: '<' },
  controller: function ($element, $timeout) {
    this.$postLink = () => {
      // Wait for the email dialog DOM to settle, then relocate the banner.
      $timeout(() => {
        try {
          // The disclaimer we render in our template:
          const banner = $element[0].querySelector('.ml-email-disclaimer');
          // The form lives inside the nearest <prm-send-email>
          const host = $element[0].closest('prm-send-email');
          const form = host && host.querySelector('form');

          if (banner && form && form.parentNode) {
            form.parentNode.insertBefore(banner, form); // move BEFORE the form
            // Optional: log once to verify
            // console.log('[Primo] Email disclaimer moved before form');
          }
        } catch (e) {
          // console.warn('[Primo] Could not move email disclaimer:', e);
        }
      }, 0);
    };
  },
  template: `
    <div class="ml-email-disclaimer"
         layout="row"
         layout-align="center center"
         style="margin:12px 0; padding:8px; border:1px solid rgba(58,58,58,.3); box-shadow: 0 2px 7px 0 rgba(58,58,58,.12); background:#ffffff;"
         aria-live="polite">
      <div style="line-height:1.35; text-align:center;">
        <strong><span>Use this form to share item information.</span></strong><br/><span>You will not receive a reply if you use this form to request items or report problems.</strong></span>
      </div>
    </div>
  `
});

// end warning injection for kids who can't read good

// cleans up labels
/*
function cleanShitUp() {
    var spans = document.querySelectorAll('span');
    Array.prototype.forEach.call(spans, function(span) {
      if (span.innerHTML === 'Circulates') {
        span.style.display = 'none';
      }
      if (span.innerHTML === 'Processing: Acquisition technical services') {
        span.innerHTML = 'In Processing';
      }
    });
    setTimeout(cleanShitUp, 500);
  }

cleanShitUp();

// end label cleanup
*/

  app.run(['$timeout', function ($timeout) {
    // Map exact text -> action
    var replacements = {
      'Processing: Acquisition technical services': 'In Processing',
      'Processing: Special Collections': 'In Processing (Special Collections)'
    };
    var hides = new Set(['Circulates']);

    // Optional: limit where we look to keep things fast.
    // Tweak this if your spans are elsewhere.
    var SCOPE_SELECTOR = [
      'prm-availability',
      'prm-search-result-availability-line',
      'prm-brief-result',
      'prm-full-view'
    ].join(',');

    // Process a single Element node (and its descendants) only once per mutation batch
    function processNode(node) {
      if (node.nodeType !== 1) return; // element only

      // If node itself is a <span>, include it; otherwise find spans underneath it.
      var spans = node.matches && node.matches('span')
        ? [node]
        : node.querySelectorAll ? node.querySelectorAll('span') : [];

      for (var i = 0; i < spans.length; i++) {
        var el = spans[i];
        // If we declared a scope, ensure span is inside it (skip if not)
        if (SCOPE_SELECTOR && !el.closest(SCOPE_SELECTOR)) continue;

        var txt = (el.textContent || '').trim();

        if (hides.has(txt)) {
          // Prefer Angular's hiding class to inline styles
          if (!el.classList.contains('ng-hide')) el.classList.add('ng-hide');
          continue;
        }

        if (replacements.hasOwnProperty(txt)) {
          if (el.textContent !== replacements[txt]) {
            el.textContent = replacements[txt];
          }
        }
      }
    }

    // Batch process to avoid thrashing on heavy DOM churn
    var queued = false;
    var toProcess = new Set();

    function queueNode(node) {
      if (!node || node.nodeType !== 1) return;
      toProcess.add(node);
      if (queued) return;
      queued = true;
      // Let Angular finish current digest/render, then patch once
      $timeout(function () {
        toProcess.forEach(function (n) { processNode(n); });
        toProcess.clear();
        queued = false;
      }, 0, false);
    }

    // Initial pass once the first view is painted
    $timeout(function () {
      var root = document.querySelector(SCOPE_SELECTOR) || document.body;
      queueNode(root);
    }, 0, false);

    // Observe only additions (Primo frequently re-renders lists/rows)
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];

        // If a text node inside an existing span changes, parentNode will be Element
        if (m.type === 'characterData' && m.target && m.target.parentNode) {
          queueNode(m.target.parentNode);
        }

        // For added elements, queue them directly
        for (var j = 0; j < m.addedNodes.length; j++) {
          var node = m.addedNodes[j];
          if (node.nodeType === 1) queueNode(node);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Optional: clean up if Primo ever tears down the app (usually not needed in VE)
    // angular.element(window).on('unload', function(){ observer.disconnect(); });

  }]);


})();
