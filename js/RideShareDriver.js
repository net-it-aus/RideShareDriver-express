/* <!-- collapse all     Ctrl + k + 0 --> */
/* <!-- expand all       Ctrl + k + j --> */
/* <!-- format           Alt + Shift + F (USE WITH CAUTION)--> */
/* <!-- word wrap toggle Alt + z --> */

function getClientOS() {
    // returns i)@ | Windows | Android
    const isIOS = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
        ].indexOf(navigator.platform) !== -1;
    const isWindows = [
        'Win32'
        ].indexOf(navigator.platform) !== -1;
    const isAndroid = [
        'Linux armv8l'
        ].indexOf(navigator.platform) !== -1;
    // alert('navigator.platform:- '+navigator.platform); 
    // /* DETECTS "iPhone" on an iPhone using: Edge; Safari; Chrome */
    // /* DETECTS "Macintel" on an iPad using: Safari;  */
    // /* DETECTS "iPad" on an iPad using: Chrome;  */
    // /* DETECTS "Win32" on Windows10Pro using: Edge; Chrome; Mozilla */
    // /* DETECTS "Linux armv8l" on Android11 Nokia3.4 using: Chrome; */
    // /* DETECTS "Linux aarch64"  on Android11 Nokia3.4 using: Edge; */
    // alert('navigator.userAgent:- '+navigator.userAgent);
    // /* DETECTS "iPhone" on an iPhone using: Edge; Safari; Chrome */
    // /* DETECTS "Macintosh" on an iPad using: Safari;  */
    // /* DETECTS "iPad" on an iPad using: Chrome;  */
    // /* DETECTS "Windows NT 10" on Windows10Pro using: Edge; Chrome; Mozilla */
    // /* DETECTS "Linux; Android 10" on Android11 Nokia3.4 using: Edge; Chrome; */
    // alert('navigator.vendor:- '+navigator.vendor); 
    // /* DETECTS "Apple Computer, Inc." on an iPhone using: Edge; Safari; Chrome */
    // /* DETECTS "Apple Computer, Inc." on an iPad using: Safari; Chrome; */
    // /* DETECTS "Google Inc." on Windows10Pro using: Edge; Chrome */
    // /* DETECTS "Google Inc." on Android11 Nokia3.4 using: Edge; Chrome; */
        if (isIOS==true) {return 'iOS';}
        if (isWindows==true) {return 'Windows';}
        if (isAndroid==true) { return 'Android';}
}
const v_clientOS = getClientOS();

// GEOLOCATION start
    async function showPosition(position) {
        q("position:- " + position);
        var v_geolocation  = "Lat: " + position.coords.latitude + "Long: " + position.coords.longitude;
        q("v_geolocation 1 :- " + v_geolocation);
        return v_geolocation;
    }
    async function getLocation() {
        if (navigator.geolocation) {
            // await navigator.geolocation.getCurrentPosition(showPosition);
                // indexedDB-crud.js:46 [Deprecation] getCurrentPosition() and watchPosition() no longer work on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.
                // getLocation @ indexedDB-crud.js:46
                // idbAdd @ indexedDB-crud.js:62
                // onclick @ cost-analysis.html:189
        } else {
            var v_geolocation = "not supported by browser";
            q("v_geolocation 2 :- " + v_geolocation);
        }
        return v_geolocation
    }
// GEOLOCATION end

// login FORM start
    // // Get the modal
    // var modal = document.getElementById('login1');
    // // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        // alert("screen clicked");
        // alert(event.target.id);
        // q(event.target.id);
        // if (event.target == modal) {
        if (event.target.id === "login1") {
            document.getElementById('login1').style.display="none";
            // modal.style.display = "none";
        }
        if (event.target.id === "login2") {
            document.getElementById('login2').style.display="none";
            // modal.style.display = "none";
        }
    }
// login FORM end

// console.LOG start
function _q_(logThis){
    if(getClientOS()=="Windows"){
        console.log(logThis);
    };
}// console.LOG end
