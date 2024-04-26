let button = document.getElementById("checker");
button.addEventListener("click", check);

function check() {
    button.innerHTML = "⟳"
    button.disabled = true;
    button.classList.remove("hover");
    browser.tabs.query({currentWindow: true, active: true}).then(async (tabs) => {
        let url = tabs[0].url;
        const domain = (new URL(url)).hostname.replace('www.','');
        const res = await fetch("https://supervssl.api.niwanet.net/sites/" + domain + "/check");
        if (res.status == 204) {
            button.innerHTML = "Oui! ✔";
            button.classList.add("good");
        } else {
            button.innerHTML = "Non! ✗";
            button.classList.add("bad");
        }
    });
}