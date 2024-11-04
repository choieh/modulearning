let excludeCookies = ['PHPSESSID', 'popname82'];

let cookies = document.cookie.split(";");

for(var i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let pos = cookie.indexOf("=");
    let name = pos > -1 ? cookie.substr(0, pos) : cookie;

    if (excludeCookies.indexOf(name.trim()) === -1) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
}