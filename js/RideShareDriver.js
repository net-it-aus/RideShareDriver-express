// wait for DOM to load
window.addEventListener("load", () => {
    // Fully loaded!
    var v_today = new Date();
    document.getElementById("xDate").value = v_today.toISOString().slice(0,10);

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
function driverRecordsAccess(){
    if (document.getElementById("driverRecordsContainer").style.display==="block"){
        document.getElementById("driverRecordsContainer").style.display = "none";
    } else {
        document.getElementById("driverRecordsContainer").style.display = "block";
    }
}
function saveDriverDayBookRecord(){
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
    window.localStorage.setItem("rsd!" + xDate.value + "headerRow!",txtHeaderRow);
    window.localStorage.setItem("rsd!" + xDate.value + "dataRow!",txtDataRow);
}
function emailMyPhoneDataTo(){
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
        var emailSubject = "Ride Share Driver Autralia - driver's day records - comma separated for spreadsheet compatibility";
        window.location.href = "mailto:?subject=" + emailSubject + "&body=" + vTEXT;
}
function viewDataStored(){
    let aRSDdata = [];
    let aRSDdataRow = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).slice(0,4)==="rsd!"){
            aRSDdataRow = localStorage.getItem(localStorage.key(i)).split(",");
            aRSDdata.push(aRSDdataRow);
        }
    }
    aRSDdata.sort();
    aRSDdata.reverse();
    console.log(aRSDdata);
    let vHTML = ``;
    for (let i = 0; i < aRSDdata.length; i++) {
        if (i !== 0){
            vHTML += aRSDdata[i] + `%0D%0A`;
        }
    }
    console.log(vHTML);
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