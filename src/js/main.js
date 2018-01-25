$(document).ready(function(){
  $menuBtn = $('.menuBtn');
  $transition = $('#transition');
  $infoPage = $('#infoPage');
  $loader = $('#loader');
  $loaderTransition = $('#loaderTransition');
  $loadingText = $('.loadingText');
  $gridLeftItem = $('.grid-leftItem')

  if (window.innerWidth > 800) {
    startup($loader, $loaderTransition, $loadingText, $gridLeftItem);
  } else {
    mobileStartup($gridLeftItem)
  }

  $menuBtn.on('click', function() {
    menuBtnToggle($menuBtn);
    openInfoPg($transition, $infoPage);
  });
});

function mobileStartup($gridLeftItem) {
  $gridLeftItem.toggleClass('finished');
}

function startup($loader, $loaderTransition, $loadingText, $gridLeftItem) {
  var loadInto = 'Vishal Shah';
  var loadArray = loadInto.split("");
  var loadLength = loadArray.length
  var intervalTime = 100
  // console.log(loadArray);
  // console.log(loadLength);

  // TODO Idea is to type text and then fade into real screen
  var i = 1;
  var interval = setInterval(function() {
    // console.log(i + " hello")
    // console.log(loadArray[i])
    $loadingText.append(String(loadArray[i]));
    i++
    if (i === loadLength) clearInterval(interval);
  }, intervalTime)

  setTimeout(function() {

    $loader.toggleClass('finished');
    $gridLeftItem.toggleClass('finished');
    // setTimeout(function(){
    //   $loaderTransition.toggleClass('finished');;
    // }, 75)



  }, loadLength * intervalTime)
}

// Toggle menu btn
function menuBtnToggle($menuBtn) {
  $menuBtn.toggleClass('menuSelected');
}

// Animate to new screen
function openInfoPg($transition, $infoPage) {
  $transition.toggleClass('transitioning');
  setTimeout(function(){
    $infoPage.toggleClass('openedInfo');
  }, 50)
}
