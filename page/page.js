let button = document.getElementById("checker");
button.addEventListener("click", check);

function check() {
    button.innerHTML = "⟳"
    button.disabled = true;
    button.classList.remove("hover");
    chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
        let url = tabs[0].url;
        const domain = (new URL(url)).hostname.replace('www.','');
        const res = await fetch("https://supervssl.api.niwanet.net/sites/" + domain + "?check=true", {signal: AbortSignal.timeout(5000)});
        const resJson = await res.json();
        if (resJson.Belongs) {
            button.innerHTML = "Oui! ✔";
            button.classList.add("good");
        } else {
            button.innerHTML = "Non! ✗";
            button.classList.add("bad");
        }
    });
}