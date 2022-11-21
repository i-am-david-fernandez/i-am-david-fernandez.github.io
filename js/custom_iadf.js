function setCookie(cookieBits) {
  var cookie = cookieBits.join(";");
  console.log("Set cookie " + cookie);
  document.cookie = cookie;
}

function getCookies() {
  var cookies = {}; // The object we will return
  var all = document.cookie; // Get all cookies in one big string

  if (all === "") {
    // If the property is the empty string
    return cookies; // return an empty object
  }

  var list = all.split("; "); // Split into individual name=value pairs

  for (var i = 0; i < list.length; i++) {
    // For each cookie
    var cookie = list[i];
    var p = cookie.indexOf("="); // Find the first = sign
    var name = cookie.substring(0, p); // Get cookie name
    var value = cookie.substring(p + 1); // Get cookie value
    value = decodeURIComponent(value); // Decode the value
    cookies[name] = value; // Store name and value in object
  }
  return cookies;
}

// function setCookieIfUnset(cookieBits) {

//     var cookieId = cookieBits[0].split('=')[0];

//     var cookies = getCookies();
//     if(typeof(cookies[cookieId])==="undefined"){
//         console.log("No cookie set for id " + cookieId);
//     }
//     else {
//         console.log("Cookie set with id " + cookieId + ": " + cookies[cookieId]);
//     }
// }

function getTrackingId() {
  var cookieId = "trackingId";

  var cookies = getCookies();
  if (typeof cookies[cookieId] === "undefined") {
    // console.log("No cookie set for id " + cookieId);

    var trackingId = self.crypto.randomUUID();

    var expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 12);

    var cookieBits = [
      cookieId + "=" + trackingId,
      "expires=" + expiry,
      // "domain=/",
      "path=/",
      "SameSite=None",
      "Secure",
    ];
    setCookie(cookieBits);
    return trackingId;
  } else {
    // console.log("Cookie set with id " + cookieId + ": " + cookies[cookieId]);
    return cookies[cookieId];
  }
}

function trackPage(pageUrl) {
  //
  // 
  var formUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSczr-aJdlLIW0tORSUfMkYFoCJo6f0C3lMD7W_lrs9-EApdkA/formResponse";

  var trackingId = getTrackingId();

  var form = new FormData();
  form.append("entry.841374370", trackingId);
  form.append("entry.1141060592", pageUrl);

  // console.log(form);
  fetch(formUrl, {
    method: "POST",
    body: form,
  });
  // 
}
