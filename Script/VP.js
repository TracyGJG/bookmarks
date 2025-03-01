'use strict';

// TODO: Check const
var objLocalStore = (function (numMins) {
  var objSearchTerm = null;

  return {
    getTerm: function () {
      var strValue =
        window.sessionStorage && window.sessionStorage.getItem('searchTerm');
      if (strValue) {
        //      console.log('get: '+ strValue)
        objSearchTerm = strValue ? JSON.parse(strValue) : null;
        strValue = '';
        if (objSearchTerm) {
          var numNow = Number(new Date());
          var numTimeout = objSearchTerm.numSearchTerm - numNow;
          console.log('Timeout: ' + numNow + ' (' + numTimeout + ')');
          if (numTimeout > 0) {
            strValue = objSearchTerm.strSearchTerm;
          } else {
            objLocalStore.clrTerm();
          }
        }
      }
      return strValue;
    },
    setTerm: function (strValue) {
      console.log('set: ' + strValue);
      if (!objSearchTerm) {
        objSearchTerm = {
          strSearchTerm: null,
          numSearchTerm: null,
        };
      }
      objSearchTerm.strSearchTerm = strValue;
      objSearchTerm.numSearchTerm = Number(new Date()) + 1000 * 60 * numMins;
      console.log('Timeout: ' + objSearchTerm.numSearchTerm);
      if (window.sessionStorage) {
        window.sessionStorage.setItem(
          'searchTerm',
          JSON.stringify(objSearchTerm)
        );
      }
    },
    clrTerm: function () {
      console.log('clear');
      objSearchTerm = null;
      if (window.sessionStorage) {
        window.sessionStorage.removeItem('searchTerm');
      }
    },
  };
})(5);

document.addEventListener('DOMContentLoaded', function () {
  var arrSelectionLinks = document.querySelectorAll('*[data-selection]');
  var numSelectionLinksIndex = 0;
  var numSelectionLinksMax = arrSelectionLinks.length;
  var today = new Date();
  var theme = today.getDay() % 7;
  var numDay = theme;
  var numPriority = 5;
  var arrPriorities = [
    { priority: 1, width: 625 },
    { priority: 1, width: 767 },
    { priority: 2, width: 925 },
    { priority: 3, width: 1230 },
    { priority: 4, width: 1380 },
  ];
  var numPriorityIndex = 0;
  var numPriorityMax = arrPriorities.length;

  for (
    ;
    numSelectionLinksIndex < numSelectionLinksMax;
    numSelectionLinksIndex += 1
  ) {
    arrSelectionLinks[numSelectionLinksIndex].addEventListener(
      'click',
      function () {
        showPanel(this.getAttribute('data-selection'));
      }
    );
  }

  /* Determine Priority by presentation break-point */
  for (; numPriorityIndex < numPriorityMax; numPriorityIndex += 1) {
    if (
      window.matchMedia(
        '(max-width: ' + arrPriorities[numPriorityIndex].width + 'px)'
      ).matches
    ) {
      numPriority = arrPriorities[numPriorityIndex].priority;
    }
  }

  if (numPriority > 3) {
    //  Header is shown so calculate date stamp and link up controls
    var arrBanner = ['00:00', '-', 'xxx', '00', 'xxx', '0000'];
    var arrDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    var arrMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    arrBanner[0] =
      today.getHours() + ':' + ('00' + today.getMinutes()).match(/..$/)[0];
    arrBanner[2] = arrDays[today.getDay()];
    arrBanner[3] = String(today.getDate());
    arrBanner[4] = arrMonths[today.getMonth()];
    arrBanner[5] = String(today.getFullYear());
    /** @type HTMLElement */
    var spnHeader = document.querySelector('span.header');
    spnHeader.innerText = arrBanner.join(' ');
    spnHeader.addEventListener('dblclick', function () {
      var prevNumDay = numDay;
      numDay = parseInt(
        window.prompt('Alternative Day code (0-6)', String(numDay)),
        10
      );
      if (numDay >= 0 && numDay <= 6) {
        document.body.classList.remove('Day' + prevNumDay);
        document.body.classList.add('Day' + numDay);
      }
    });

    var objControls = {
      'General Links': function () {
        showLinks('general');
      },
      'Development Links': function () {
        showLinks('devLinks');
      },
      'Web Dev Tools 1': function () {
        showLinks('webDevTools1');
      },
      'Web Dev Tools 2': function () {
        showLinks('webDevTools2');
      },
      'Dev On-line Tools': function () {
        showLinks('devOnline');
      },
      'WebMail Links': function () {
        showLinks('webMail');
      },
      'Personal Links': function () {
        showLinks('personal');
      },
      'Link Search': localSearch,
      // 'Chill Radio': launchChillRadio,
      // 'Planet Rock': launchPlantRock,
      // NetFlix: launchNetFlix,
      Pocket: launchPocket,
      // 'Focus@Will': launchFocusAtWill,
      // Medium: launchMedium,
      DevTo: launchDevTo,
      'Multi-mail': openMultiMail,
      Flipboard: launchFlipboard,
      Spotify: launchSpotify,
    };

    var arrControls = document.querySelectorAll('span.controls div');
    var numControlsIndex = 0;
    var numControlsMax = arrControls.length;
    var objControl;
    var strControlTitle;

    for (; numControlsIndex < numControlsMax; numControlsIndex += 1) {
      objControl = arrControls[numControlsIndex];
      strControlTitle = objControl.getAttribute('title');
      if (objControls[strControlTitle]) {
        objControl.addEventListener('click', objControls[strControlTitle]);
      }
    }

    document.querySelector('.findLink').addEventListener('click', localSearch);
    document
      .querySelector('span.quickLinks')
      .addEventListener('click', function () {
        var objQLinks = {
          general: {
            q1: 'http://en.wikipedia.org/wiki/Main_Page',
            q2: 'http://www.imdb.com/',
            q3: 'https://www.google.com/maps',
            q4: 'https://www.google.co.uk/',
            q5: 'https://www.google.com/calendar',
            q6: 'https://www.bbc.co.uk/iplayer',
            q7: 'https://www.youtube.com/',
            q8: 'http://www.ebuyer.com/',
            q9: 'http://www.amazon.co.uk/',
          },
          devLinks: {
            q1: 'http://regexlib.com/',
            q2: 'https://www.debuggex.com/',
            q3: 'http://msdn.microsoft.com/en-us/library/aa902517.aspx',
            q4: 'https://developer.mozilla.org/en-US/',
            q5: 'http://msdn.microsoft.com/en-us/library/ms763742(VS.85).aspx',
            q6: 'http://www.w3resource.com/',
            q7: 'http://www.w3schools.com/',
            q8: 'https://nodejs.org/en/',
            q9: 'http://sass-lang.com/',
          },
          webDevTools1: {
            q1: 'https://jsonlint.com/',
            q2: 'http://sassmeister.com/',
            q3: 'http://dataurl.net/#dataurlmaker',
            q4: 'http://www.colorzilla.com/gradient-editor/',
            q5: 'http://paletton.com/',
            q6: 'http://snook.ca/technical/colour_contrast/colour.html',
            q7: 'http://www.freeformatter.com/',
            q8: 'https://jsonformatter.curiousconcept.com/',
            q9: 'http://jsbin.com/',
          },
          webDevTools2: {
            q1: 'http://kangax.github.io/compat-table/es5/',
            q2: 'https://www.smashingmagazine.com/',
            q3: 'https://css-tricks.com/',
            q4: 'https://24ways.org/',
            q5: 'http://tutsplus.com/',
            q6: 'http://www.cssplay.co.uk/',
            q7: 'http://alistapart.com/',
            q8: 'http://caniuse.com/',
            q9: 'http://www.csszengarden.com/',
          },
          devOnline: {
            q1: 'http://www.sketchup.com/',
            q2: 'http://www.dotpdn.com/downloads/pdn.html',
            q3: 'https://inkscape.org/en/',
            q4: 'http://www.gimp.org/',
            q5: 'https://wiki.gnome.org/action/show/Apps/Dia',
            q6: 'http://pencil.evolus.vn/',
            q7: 'http://www.aptana.com/',
            q8: 'http://koala-app.com/',
            q9: 'https://eclipse.org/ide/',
          },
          webMail: {
            q1: 'http://mail.google.com',
            q2: 'http://mail.yahoo.com/',
            q3: 'http://mail.live.com',
            q5: 'https://www.icloud.com',
            q6: 'https://onedrive.live.com/?cid=9bd4f5a7667f8feb',
            q8: 'https://drive.google.com/drive/my-drive',
            q4: 'https://www.dropbox.com/home',
            q7: 'https://www.idrive.com/',
            q9: 'https://web.telegram.org/#/im',
          },
          personal: {
            q1: 'https://trello.com/',
            q2: 'https://bitbucket.org/dashboard/overview',
            q3: 'https://codesandbox.io/dashboard/home?workspace=9d594bd8-1dac-4fd2-86fb-6cea6a21d56a',
            q4: 'https://www.dropbox.com/home',
            q5: 'https://moapwad.netlify.com/',
            q6: 'https://github.com/TracyGJG',
            q7: 'https://www.linkedin.com/nhome/',
            q8: 'https://codepen.io/your-work',
            q9: 'https://jsfiddle.net/user/dashboard/fiddles/',
          },
        };
        var strSelection = this.className.match(/ (.+)$/)[1];
        /** @type Element */
        if (window.event.target instanceof Element) {
          var strQuickLinkTaregt = window.event.target;
          var strQuickLink = strQuickLinkTaregt.className.match(/^(q.) /)[1];
          var strURL = objQLinks[strSelection][strQuickLink];
          if (strURL) {
            document.location = strURL;
          }
        }
      });
  }

  document.body.classList.add('Day' + theme);
  {
    var setRnd = Math.floor(1 + Math.random() * 9);
    var imgRnd = Math.floor(Math.random() * 7);
    document.body.style.setProperty(
      '--bg-image',
      'url("../Backdrops/set-' + setRnd + '/Backdrop_' + imgRnd + '.png")'
    );
  }
  var strTerm = objLocalStore.getTerm();
  if (strTerm) {
    // Returning to a Search screen.
    //  Call the event handler function with a param rather then an event object.
    localSearch();
  }
});

function showPanel(strSelection) {
  if (document.body.classList.contains('Search')) {
    //  Navigating from the Search panel so clear the search term.
    objLocalStore.clrTerm();
  }
  document.body.classList.toggle(strSelection);
}

function localSearch() {
  var strTerm = objLocalStore.getTerm();
  var ptnTerm;
  var arrResults = [];
  /** @type NodeListOf<Element> */
  var arrLIs;
  var strLI_HTML;
  var numLIs = 0;
  var maxLI;
  /** @type Element */
  var strLI_Node;
  // var objCollection
  // var objSet
  var blnTerm = !strTerm;

  if (arguments.length === 1) {
    strTerm = strTerm || '';
    strTerm = window.prompt('Search for:', strTerm);
  }

  // console.log('Search term:', strTerm)

  if (strTerm) {
    //  Valid search-term provided so prepare a RegExp pattern.
    ptnTerm = new RegExp(strTerm, 'i');
    //  Commence compilation of the results presentation.
    //  Extract a list of all the bookmark LIs.
    arrLIs = document.querySelectorAll(
      'main.selection div.bookmarkSet div.bookmarkList li'
    );
    maxLI = arrLIs.length;

    //  Traverse each LI
    for (; numLIs < maxLI; numLIs += 1) {
      if (arrLIs[numLIs] instanceof Element) {
        strLI_Node = arrLIs[numLIs];
        strLI_HTML = strLI_Node.outerHTML;
        //  Test the LI text against the search pattern.
        if (ptnTerm.test(strLI_HTML) && strLI_Node instanceof HTMLElement) {
          //  Match found.
          //  Prepare the result text from the matching link (LI).
          // objCollection = strLI_Node.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
          // objSet = strLI_Node.parentNode.parentNode.parentNode.children[0]

          //  Append the result text to the presentation.
          // console.log(strLI_Node.outerHTML)
          arrResults.push(
            strLI_Node.outerHTML
              .replace(/ title=[^>]*/, '')
              .replace(
                '>' + strLI_Node.textContent + '<',
                '>' +
                  strLI_Node.textContent +
                  ' - <i>' +
                  strLI_Node.title +
                  '</i><'
              )
          );
        }
      }
    }

    // console.log(arrResults)

    //  Results found so prepare them, else report none.
    if (arrResults.length) {
      // console.log('sorting results')
      arrResults.sort(function (a, b) {
        var strA = ('' + a.match(/[^>]*\<\/a\>/g)).toUpperCase();
        var strB = ('' + b.match(/[^>]*\<\/a\>/g)).toUpperCase();
        return strA > strB ? 1 : strA < strB ? -1 : 0;
      });
    } else {
      // console.log('No results')
      arrResults.push('<li>No Results found.</li>');
      blnTerm = false;
    }

    //  Display the Search term
    document.querySelector('main.Search h1 span').textContent =
      'Search Results [' + strTerm + ']';
    //  Present the results of the search.
    document.querySelector('.searchResults').innerHTML =
      '<ul>' + arrResults.join(' ') + '</ul>';
    //  Navigate to the Search container, thus displaying the Search results panel.
    showPanel('Search');
    if (blnTerm) {
      objLocalStore.setTerm(strTerm);
    }
  } else {
    objLocalStore.clrTerm();
  }

  //  Disable further propagation of this event.
  if (!e) {
    var e = window.event;
  }
  e.cancelBubble = true;
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  return false;
}

function launchChillRadio() {
  window.open(
    'http://ukrp.musicradio.com/chill/live',
    'ListenLive',
    'height=240, width=360, scrollbars=no'
  );
}

function launchPlantRock() {
  window.open(
    'http://radioplayer.planetrock.com/live/',
    'ListenLive',
    'height=400, width=380, scrollbars=no'
  );
}

function launchFocusAtWill() {
  window.open(
    'https://www.focusatwill.com/music/#player',
    'Listen On-line',
    'scrollbars=no'
  );
}

function launchNetFlix() {
  window.open('http://www.netflix.com/', 'WatchLive');
}
// function lauchFlixster () { window.open('http://www.flixster.com/', 'Watch On-line') }
function launchPocket() {
  window.open('https://getpocket.com', 'Off-line reader');
}

function launchMedium() {
  window.open('https://medium.com/', 'Medium');
}

function launchDevTo() {
  window.open('https://dev.to', 'Dev');
}

function launchFlipboard() {
  window.open('https://flipboard.com/', 'Flipboard');
}

function launchSpotify() {
  window.open('https://open.spotify.com/browse/featured', 'Spotify');
}

function openMultiMail() {
  window.setTimeout(function () {
    window.open('http://mail.google.com');
  }, 100);
  window.setTimeout(function () {
    window.open('http://mail.yahoo.com');
  }, 100);
  window.setTimeout(function () {
    window.open('http://mail.live.com');
  }, 100);

  if (!e) {
    var e = window.event;
  }
  e.cancelBubble = true;
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  return false;
}

function showLinks(strLinkSet) {
  document.querySelector('span.quickLinks').className =
    'quickLinks ' + strLinkSet;
}
