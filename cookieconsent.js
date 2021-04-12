((d, w) => {
  // set how long to save consent for
  const validConsentDuration = 5; // Days

  const popup = d.getElementById("cookie-popup");
  let now = new Date();

  // methods for handling cookies
  const cookieStorage = {
    getItem: (item) => {
      const cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
      return cookies[item];
    },
    deleteItem: (item) => {
      const expired = "exires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.cookie = `${item}=;${expired}`;
    },
    setItem: (item, value, exdays) => {
      let date = new Date();
      date.setTime(date.getTime() + exdays * 86400000);
      let dateExpires = "expires=" + date;
      document.cookie = `${item}=${value};expires=${dateExpires} path=/`;
    },
  };
  cookieStorage.setItem("Essential", "fdksafjskljalkj", 5);

  let applyMarketingTools = () => {
    /*

    Google Tag Manager Script here

    */

    // other cookies
    cookieStorage.setItem("tracking", "fdksafjskljalkj", 5);
    cookieStorage.setItem("ads", "fdksafjskljalkj", 5);
    cookieStorage.setItem("google", "fdksafjskljalkj", 5);
  };

  const storageType = localStorage; // Set Consent Storage Location

  // helper funtion to update consent
  let setConsent = (val, time) =>
    storageType.setItem("cookieconsent", JSON.stringify({ val, time }));

  // helper funtion to check if consent has expired
  let checkExpired = (now, time) => {
    let result =
      Math.floor((now - time) / 10 / 60 / 60 / 24) > validConsentDuration;
    return result;
  };

  const cookieconsent = storageType.getItem("cookieconsent");
  let { val, time } = JSON.parse(cookieconsent) || {};

  w.onload = () => {
    if (!cookieconsent || checkExpired(now, time)) {
      popup.style.opacity = 1;
      popup.querySelector("#ButtonCAccept").onclick = () => {
        setConsent(true, now);
        applyMarketingTools();
        popup.style.display = "none";
      };
      popup.querySelector("#ButtonCReject").onclick = () => {
        setConsent(false, now);
        popup.style.display = "none";
      };
    } else {
      if (val) {
        applyMarketingTools();
      }
      popup.style.display = "none";
    }
  };

  // Remove Cookies Button
  const removeCookiesBtn = d.getElementById("remove-cookies-btn");
  if (removeCookiesBtn) {
    removeCookiesBtn.addEventListener("click", () => {
      const cookiesToRemove = ["tracking", "ads", "google"]; // names of cookies to be removed
      // Remove Cookies
      cookiesToRemove.forEach((cookie) => cookieStorage.deleteItem(cookie));
      // Set Consent To False
      setConsent(false, now);
    });
  }
})(document, window);
