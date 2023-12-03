// wait for DOM to load
    window.addEventListener("load", () => {
        // Fully loaded!
       
        var v_today = new Date();
        document.getElementById("xDate").value = v_today.toISOString().slice(0,10);

        document.getElementById("xAccess").focus();
        document.getElementById("xAccess").select();

        // document.getElementById("futureDate").value = getFutureDate();
        // document.getElementById("xHours").addEventListener("change",calcStats());
        // document.getElementById("xMinutes").addEventListener("change",calcStats());
        // document.getElementById("xSeconds").addEventListener("change",calcStats());
        // document.getElementById("xDistance").addEventListener("change",calcStats());
        // document.getElementById("ttCourse").addEventListener("change",calcStats());
        // document.getElementById("xPace").addEventListener("mouseover",calcStats());
        // document.getElementById("xPace").addEventListener("touchstart",calcStats());
        // document.getElementById("ttName").addEventListener("change",document.getElementById("xHours").focus())
        // document.getElementById("ttName").select();

        // DATA VALIDATION START 
        const datval_xMinutesOnline = document.getElementById("xMinutesOnline");
        datval_xMinutesOnline.addEventListener("input", (event) => {
            if (datval_xMinutesOnline.validity.valid) {
            } else {
                // datval_xMinutesOnline.setCustomValidity("");
                alert("value out of range, please try again");
                document.getElementById("xMinutesOnline").value = 0;
                document.getElementById("xMinutesOnline").focus();
                document.getElementById("xMinutesOnline").select();
            }
        });
        const datval_xTotalGross = document.getElementById("xTotalGross");
        datval_xTotalGross.addEventListener("change", (event) => {
            document.getElementById("xTotalGrossX").value = datval_xTotalGross.value;
            // if (datval_xTotalGrossX.validity.valid) {
            // } else {
            //     // datval_xSeconds.setCustomValidity("");
            //     alert("value out of range, please try again");
            //     document.getElementById("xTotalGrossX").value = 0;
            //     document.getElementById("xTotalGrossX").focus();
            //     document.getElementById("xTotalGrossX").select();
            // }
        });
        // DATA VALIDATION END 
    // window.addEventListener("load", () => {
});

function timeStampString(){
    const v_dateNow = new Date(); 
    var v_fullYear = v_dateNow.getFullYear();
    var v_month = v_dateNow.getMonth()+1;
    if (v_month<10)(v_month="0"+v_month);
    var v_day = v_dateNow.getDate();
    if (v_day<10)(v_day="0"+v_day);
    var v_hour = v_dateNow.getHours();
    if (v_hour<10)(v_hour="0"+v_hour);
    var v_minute = v_dateNow.getMinutes();
    if (v_minute<10)(v_minute="0"+v_minute);
    var v_second = v_dateNow.getSeconds();
    if (v_second<10)(v_second="0"+v_second);
    var v_millisecond = v_dateNow.getMilliseconds();
    if (v_millisecond<10)(v_millisecond="0"+v_millisecond);
    if (v_millisecond<100)(v_millisecond="0"+v_millisecond);
    const v_timeStampStr = "timeStamped" + v_fullYear + v_month + v_day + v_hour + v_minute + v_second + v_millisecond;
    // console.log("v_timeStampString:- ",v_timeStampStr);
    return v_timeStampStr;
}
function driverRecordsAccess(e){
    console.log(e.value);
    // const accessCode = prompt("Please enter access code (get the code from support@netit.com.au)");
    // if (accessCode!=="aus"){
    //     return;
    // }
    if (e.value!=="aus"){
        return;
    }
    if (document.getElementById("driverRecordsContainer").style.display==="block"){
        document.getElementById("driverRecordsContainer").style.display = "none";
        document.getElementById("originalBody").style.display = "body";
        document.getElementById("driverRecordsAccessControl").style.display = "body";
    } else {
        document.getElementById("driverRecordsContainer").style.display = "block";
        document.getElementById("originalBody").style.display = "none";
        document.getElementById("driverRecordsAccessControl").style.display = "none";
    }
    document.getElementById("xEndingOdometre").focus();
    document.getElementById("xEndingOdometre").select();
}
function saveDriverDayBookRecord(){
    const xTimeStamp = timeStampString();
    let txtHeaderRow = "";
    let txtDataRow = "";
    const frm = document.getElementById("driver-day-book");
    Array.from(frm.elements).forEach((input) => {
        if (input.name.slice(0,1)==="x"){
            txtHeaderRow += input.name + " , ";
            txtDataRow += input.value + " , ";
            // console.log(input.name + " | " + input.value);
        }
    });
    window.localStorage.setItem("rsd!" + xDate.value + "[" + xTimeStamp + "_0]head" ,txtHeaderRow);
    window.localStorage.setItem("rsd!" + xDate.value + "[" + xTimeStamp + "_1]data" ,txtDataRow);
    console.log("localStorage done");
    storeFormDataInIndexedDB();
}
function storeFormDataInIndexedDB(){
    // var v_elements = document.getElementsByTagName("input");
    var v_elements = document.getElementsByClassName("xData");
    console.log(v_elements);
    var v_objectString = `{`;
    for (var i = 0; i < v_elements.length; i++) {
        v_fieldName = v_elements[i].name;
        v_fieldValue = v_elements[i].value;
        if (v_fieldName.slice(0,1)==="x"){
            // idbAdd("rsd","rsdDayBook",v_fieldName,v_fieldValue);
            if (i+1==v_elements.length){
                v_objectString += `"` + v_fieldName + `":"` + v_fieldValue + `",`;
                var v_date = new Date();
                v_objectString += `"zLocalDateTime":"` + v_date.toLocaleString('en-AU').slice(0,25) + `",`;
                v_objectString += `"zLocalDate":"` + v_date.toLocaleDateString('en-AU').slice(0,15) + `",`;
                // v_objectString += `"trxLocalDate2":"` + ("0" + v_date.getDate()).slice(-2) + "-" + ("0"+(v_date.getMonth()+1)).slice(-2) + "-" + v_date.getFullYear() + `",`;
                if(v_date.getHours()<=12){var v_amORpm='am';}else{var v_amORpm='pm';}
                v_objectString += `"zSortDateTime":"` + v_date.getFullYear() +'-'+ ("0"+(v_date.getMonth()+1)).slice(-2) +'-'+ ("0" + v_date.getDate()).slice(-2) + ' ' + ("0" + v_date.getHours()).slice(-2) +':'+ ("0" + v_date.getMinutes()).slice(-2) + v_amORpm + `",`;
                v_objectString += `"zFullDateTime":"` + new Date() + `"}`;
            } else {
                v_objectString += `"` + v_fieldName + `":"` + v_fieldValue + `",`;
            }
        }
    }
    // v_objectString += `}`;
    idbAdd("rsd","rsdDayBook",v_objectString);
}
function emailMyDeviceDataTo_OLD(){
        let aRSDdata = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).slice(0,4)==="rsd!"){
                // console.log(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ");
                console.log(localStorage.getItem(localStorage.key(i)) + localStorage.key(i) + " , ");
                // aRSDdata.push(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ");
                aRSDdata.push(localStorage.getItem(localStorage.key(i)) + localStorage.key(i) + " , ");
            }
        }
        aRSDdata.sort();
        aRSDdata.reverse();
        console.log(aRSDdata);
        let vTEXT = "";
        for (let i = 0; i < aRSDdata.length; i++) {
            vTEXT += aRSDdata[i] + `%0D%0A`;
        }
        console.log(vTEXT);
        var emailSubject = "Ride Share Driver Australia - driver's day records - comma separated for spreadsheet compatibility";
        window.location.href = "mailto:?subject=" + emailSubject + "&body=" + vTEXT;
}
function emailMyDeviceDataTo(){
    let aRSDdata = [];
    let aRSDdataRow = [];
    let aRSDdataRowSplit = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).slice(0,4)==="rsd!"){
            aRSDdataRowSplit = localStorage.getItem(localStorage.key(i)).split(",");
            aRSDdataRowSplit.push(localStorage.key(i));
            for (let a = 0; a < aRSDdataRowSplit.length; a++) {
                console.log(i,a,aRSDdataRowSplit[a]);
            }
            aRSDdataRow = localStorage.getItem(localStorage.key(i)) + localStorage.key(i);
            aRSDdata.push(aRSDdataRow);
        }
    }
    // aRSDdata.sort();
    // aRSDdata.reverse();
    // console.log(aRSDdata);
    // console.log(aRSDdata[0]);
    // console.log(aRSDdata[0].indexOf("_0]head"));
    let vTEXT = ``;
    vTEXT += aRSDdata[0] + `%0D%0A`;
    for (let i = 0; i < aRSDdata.length; i++) {
        if (aRSDdata[i].indexOf("_0]head")<0){
            vTEXT += aRSDdata[i] + `%0D%0A`;
        }
    }
    console.log(vTEXT);
    var emailSubject = "Ride Share Driver Australia - driver's day records - comma separated for spreadsheet compatibility";
    window.location.href = "mailto:?subject=" + emailSubject + "&body=" + vTEXT;
}
function viewDataStored(){
    let aRSDdata = [];
    let aRSDdataRow = [];
    let aRSDdataRowSplit = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).slice(0,4)==="rsd!"){
            aRSDdataRowSplit = localStorage.getItem(localStorage.key(i)).split(",");
            aRSDdataRowSplit.push(localStorage.key(i));
            for (let a = 0; a < aRSDdataRowSplit.length; a++) {
                console.log(i,a,aRSDdataRowSplit[a]);
            }
            aRSDdataRow = localStorage.getItem(localStorage.key(i)) + localStorage.key(i);
            aRSDdata.push(aRSDdataRow);
        }
    }
    // aRSDdata.sort();
    // aRSDdata.reverse();
    // console.log(aRSDdata);
    // console.log(aRSDdata[0]);
    // console.log(aRSDdata[0].indexOf("_0]head"));
    let vHTML = ``;
    vHTML += aRSDdata[0] + `<br>`;
    for (let i = 0; i < aRSDdata.length; i++) {
        if (aRSDdata[i].indexOf("_0]head")<0){
            vHTML += aRSDdata[i] + `<br>`;
        }
    }
    console.log(vHTML);
    document.getElementById("displayLocalStorage").innerHTML = vHTML;
}
function sumTolls(){
    let tollsNumber = 0;
    tollsNumber = window.prompt('Enter a number to add to Tolls (negatives allowed, use -), then click OK.',tollsNumber);
    console.log(tollsNumber);
    if (!tollsNumber){
        // document.getElementById("xTolls").blur();
    } else {
        tollsNumber = tollsNumber * 1;
        console.log(tollsNumber);
        tollsNumber += document.getElementById("xTolls").value * 1;
        console.log(tollsNumber);
        document.getElementById("xTolls").value = tollsNumber;
    }
}