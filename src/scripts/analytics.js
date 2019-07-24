const requestBody = {
  length: null,
  country: null,
  page: null
};

document.addEventListener("DOMContentLoaded", async function Load() {
  TimeMe.initialize({
    currentPageName: location.pathname,
    idleTimeoutInSeconds: 30
  });

  requestBody.page = location.pathname;

  try {
    const response = await fetch("https://extreme-ip-lookup.com/json/");
    if (response.ok) {
      const data = await response.json();
      requestBody.country = data.countryCode;
    } else {
      requestBody.country = "NONE";
    }
  } catch (error) {
    requestBody.country = "NONE";
  }
});

window.addEventListener("beforeunload", async function Unload() {
  requestBody.length = TimeMe.getTimeOnCurrentPageInSeconds();
  fetch("https://api.brianemilius.com/analytics", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "Application/JSON",
      Authorization: "45kjhwer9834o7fa874ot4i3huqlthlg9ap0Q203"
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});
