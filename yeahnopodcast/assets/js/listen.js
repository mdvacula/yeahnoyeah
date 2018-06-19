//Get Podcasts from squarespace? libsyn for now
//
$(document).ready(function() {
  //rss feed to parse
  var feed = "https://24ffgia6ei.execute-api.us-east-1.amazonaws.com/latest/tempListen"

  var pCasts = [];    //array to hold podcast objects
  var podBatch = 5;   //how many podcasts to display at a time
  var podCount = 0;   //number of podcasts that have been displayed on page

// Hide the load more button and the podcast list div
  $("#pCastList").hide();
  $("#loadPod").hide();

  //get the feed
  $.getJSON(feed, function(data) {
    pCasts = data;
    console.log(pCasts);

      $("#loadAni").fadeOut("fast");
      for (var i = 0; i < podBatch; i++) {
        createPodElement(pCasts[i]);
        podCount++;
      }
      $('#pCastList').fadeIn("slow");
      $('#loadPod').fadeIn("slow");
    });

  //Add More Podcasts to the Page
  $("#loadPod").click(function() {


    if (podBatch < (pCasts.length - podCount)) {
      for (var x = 0; x < podBatch; x++) {
        createPodElement(pCasts[podCount]);
        podCount++;
      }
    } else {
      podBatch = pCasts.length - podCount;
      for (var x = 0; x < podBatch; x++) {
        createPodElement(pCasts[podCount]);
        podCount++;
      }
      $("#loadPod").hide();
    }
  })

});

//Creates a new list item containg podcast information and
//adds to dom
// Input: podcast object pod
function createPodElement(pod) {

  //create list item tags
  var podListItem = $("<li class='media my-4'>");
  var podImg = $("<img class='align-self-start mr-3' alt='Yeah, No, Yeah Logo' height='64' width='64'>");
  var podBody = $("<div class='media-body'>");
  var podTitle = $("<h5 class='mt-0 mb-1'>");
  var podDesc = $('<p>');
  var podAudio = $("<audio controls='controls' preload='none'/>", {controls: 'controls'});

  //set values for html objects
  podTitle.html(pod.title);
  podDesc.html(pod.desc);
  podAudio.attr('src', pod.media);
  podImg.attr('src', pod.image);

  //build out the list item
  podBody.append(podTitle);
  podBody.append(podDesc);
  podBody.append(podAudio);
  podListItem.append(podImg);
  podListItem.append(podBody);

  //add to dom
  $(podListItem).appendTo("#pCastList").hide().fadeIn("slow");
};
