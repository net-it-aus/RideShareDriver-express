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

// EXPORT TO CSV start ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
async function exportDayBookToCSV(){
    // console.log("exportDayBookToCSVbutton Clicked.");
    // console.log(aDriverDayBook);

    const exampleArray = ["one",2,"three"];
    // console.log("exampleArray\n",exampleArray);
    // console.log("exampleArray length\n",exampleArray.length);
    // console.log("-----------------------");
    const exampleEmptyArray = ["","",""];
    // console.log("exampleEmptyArray\n",exampleEmptyArray);
    // console.log("exampleEmptyArray length\n",exampleEmptyArray.length);
    // console.log("-----------------------");
    let myNumber = 2;
    const exampleJSObject = {
        data1:{
            field1:"one",
            field2:myNumber,
            field3:3
        },
        data2:{
            field1:"one",
            field2:myNumber,
            field3:3
        }
    };
    // console.log("exampleJSObject\n",exampleJSObject);
    // console.log("exampleJSObject length\n",exampleJSObject.length);
    // console.log("-----------------------");
    const exampleJSObjectArray = [{
        "field1":"one",
        "field2":2,
        "field3":"three"
    }];
    // console.log("exampleJSObjectArray\n",exampleJSObjectArray);
    // console.log("exampleJSObjectArray length\n",exampleJSObjectArray.length);
    // console.log("-----------------------");

    let indexStart = 0;
    for (i = 0; i < aDriverDayBook.length; i++){
        if (typeof aDriverDayBook[i].xDate !== "undefined"){
            indexStart = i;
            // console.log(indexStart);
            break;
        }
    }
    // console.log("aDriverDayBook ARRAY of JS objects:-\n",aDriverDayBook);
    // console.log("aDriverDayBook.length:-\n",aDriverDayBook.length);
    // console.log("aDriverDayBook indexStart:-\n",indexStart);
    // console.log("aDriverDayBook[indexStart]:-\n",aDriverDayBook[indexStart]);

    // extracting header row START
        // // method 1 for extracting header row START
        //     let aDriverDayBook_keys_1 = [];
        //     for (key in aDriverDayBook[indexStart]){
        //         // console.log(key);
        //         aDriverDayBook_keys_1.push(key);
        //     }
        //     console.log("aDriverDayBook_keys_1\n", aDriverDayBook_keys_1);
        //     console.log("aDriverDayBook_keys_1.length\n", aDriverDayBook_keys_1.length);
        // // method 1 for extracting header row END
        // method 2 for extracting header row START
            const aDriverDayBook_keys = Object.keys(aDriverDayBook[indexStart]);
            // console.log("aDriverDayBook_keys:-\n", aDriverDayBook_keys);
            // console.log("aDriverDayBook_keys.length:-\n", aDriverDayBook_keys.length);
        // method 2 for extracting header row END
    // extracting header row START

    let aDriverDayBook_UniqueKeys = Array.from(aDriverDayBook_keys);
    // console.log("aDriverDayBook_UniqueKeys:-\n", aDriverDayBook_UniqueKeys);

    // scan for additional keys to add to aDriverDayBook_UniqueKeys START
        let myKey = "";
        for (i = indexStart; i < aDriverDayBook.length; i++){
            for (ii = 0; ii < Object.keys(aDriverDayBook[i]).length; ii++){
                myKey = Object.keys(aDriverDayBook[i])[ii];
                if (aDriverDayBook_UniqueKeys.indexOf(myKey) === -1){
                    // console.log("insert into 'aDriverDayBook_UniqueKeys':- |" + myKey + "|");
                    aDriverDayBook_UniqueKeys.push(myKey);
                }
            }
        }
    // scan for additional keys to add to aDriverDayBook_UniqueKeys END

    // sort the unique list of headings START
        let aMyHeadings = new Array(0);
        aMyHeadings = aDriverDayBook_UniqueKeys.toSorted();
        // console.log("aMyHeadings:-\n", aMyHeadings);
        // console.log("aMyHeadings.length:-\n", aMyHeadings.length);
    // sort the unique list of headings END

    // insert the headings into aMyDataRows START
        let aMyDataRows = new Array(0);
        aMyDataRows.push(aMyHeadings);
        // console.log("aMyDataRows:-\n", aMyDataRows);
        // console.log("aMyDataRows.length:-\n", aMyDataRows.length);
    // insert the headings into aMyDataRows END

    // for each aDriverDayBook, populate aMyDataRowTemplate and push it to aMyDataRows START
        let csvColumn = 0;
        for (i = 0; i < aDriverDayBook.length; i++){
            csvColumn = 0;
            // re-set row template START
                let aMyDataRowTemplate = new Array(aMyHeadings.length);
                // console.log("aMyDataRowTemplate:-\n",aMyDataRowTemplate);
            // re-set row template END
            for (key in aDriverDayBook[i]){
                // console.log(key);
                csvColumn = aMyHeadings.indexOf(key);
                if (csvColumn === -1){
                } else {
                    // console.log(csvColumn + " > " + key + " " + aDriverDayBook[i][key]);
                    aMyDataRowTemplate.splice(csvColumn,1,aDriverDayBook[i][key]);
                }
            }
            // console.log("aMyDataRowTemplate:-\n",aMyDataRowTemplate);
            aMyDataRows.push(aMyDataRowTemplate);
        }
        // console.log("aMyDataRows:-\n",aMyDataRows);
    // for each aDriverDayBook, populate aMyDataRowTemplate and push it to aMyDataRows END

    // convert aMyDataRows to CSV START
        var v_csvString = "";
        for (i = 0; i < aMyDataRows.length; i++){
            for (ii = 0; ii < aMyDataRows[i].length; ii++){
                v_csvString += aMyDataRows[i][ii] + ",";
            }
            v_csvString += "\n";
        }
        // console.log(v_csvString);
    // convert aMyDataRows to CSV END

    downloadCSV(v_csvString, "RideshareDriverDaybook.csv");

}
// EXPORT TO CSV end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// DOWNLOAD start ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function downloadCSV(csv, filename) {

    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.innerHTML = "AAA"
    downloadLink.style.display = "none";
    downloadLink.style.color = "red";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();

    // remove download link
    document.body.removeChild(downloadLink);

}
// DOWNLOAD end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~