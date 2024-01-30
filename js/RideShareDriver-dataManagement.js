// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- word wrap toggle Alt + z -->

let aDriverDayBook = [];
const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
// nlr? let userPIN;

// wait for DOM to load START
    window.addEventListener("load", () => {
        // Fully loaded!

        const datval_xDate = document.getElementById("xDate");
        console.log(datval_xDate);
        const frm = document.getElementById("driver-day-book");
        console.log(frm);

        // document.getElementById("xAccess").focus();
        // document.getElementById("xAccess").select();

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

        // DATE CHANGE DETECT start
        datval_xDate.addEventListener("change", (event) => {
            dateChange();
            // if(getClientOS()=="Windows"){console.log('datval_xDate.addEventListener("change", (event) =>')};
            // if(getClientOS()=="Windows"){console.log(aDriverDayBook)};
            // const frm = document.getElementById("driver-day-book");
            // for (var i=0; i < aDriverDayBook.length; i++){``
            //     // console.log(aDriverDayBook[i].xDate,datval_xDate.value);
            //     if (aDriverDayBook[i].xDate===datval_xDate.value){
            //         // console.log(aDriverDayBook[i].xDate,datval_xDate.value,i);
            //         for (const key in aDriverDayBook[i]){
            //             // console.log(key);
            //             // console.log(`${key}:${aDriverDayBook[i][key]}`);
            //             if (aDriverDayBook[i][key].length>0){
            //                 // console.log([key]);
            //                 // console.log([key][0].slice(0,1));
            //                 if ([key][0].slice(0,1)==="x"){
            //                     console.log(aDriverDayBook[i][key]);
            //                     document.getElementById(key).value = aDriverDayBook[i][key];
            //                 }
            //             }
            //         }
            //         return;
            //     } else {
            //         for (const key in aDriverDayBook[i]){
            //             // console.log(key);
            //             // console.log(`${key}:${aDriverDayBook[i][key]}`);
            //             if (aDriverDayBook[i][key].length>0){
            //                 // console.log([key]);
            //                 // console.log([key][0].slice(0,1));
            //                 if ([key][0].slice(0,1)==="x"){
            //                    if (key!=="xDate"){
            //                         console.log(key);
            //                         document.getElementById(key).value = "";
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
        });
        // DATE CHANGE DETECT end

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
        const datval_xKlms = document.getElementById("xKlms");
        datval_xTotalGross.addEventListener("change", (event) => {
            if (datval_xTotalGross.validity.valid & datval_xKlms.validity.valid) {
                if (datval_xTotalGross.value.length>0 & datval_xKlms.value.length>0){
                    document.getElementById("xTotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("xDollarsPerKlm").value = datval_xTotalGross.value/datval_xKlms.value;
                } else {
                    document.getElementById("xTotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("xDollarsPerKlm").value = null;
                }
            }
            // if (datval_xTotalGross.validity.valid) {
            //     if(getClientOS()=="Windows"){console.log("datval_xTotalGross.validity.valid - OK",datval_xTotalGross.value.length)};
            // } else {
            //     if(getClientOS()=="Windows"){console.log("datval_xTotalGross.validity.valid - ERROR",datval_xTotalGross.value.length)};
            // //     // datval_xSeconds.setCustomValidity("");
            // //     alert("value out of range, please try again");
            // //     document.getElementById("xTotalGrossX").value = 0;
            // //     document.getElementById("xTotalGrossX").focus();
            // //     document.getElementById("xTotalGrossX").select();
            // }
        });
        datval_xKlms.addEventListener("change", (event) => {
            if (datval_xTotalGross.validity.valid & datval_xKlms.validity.valid) {
                if (datval_xTotalGross.value.length>0 & datval_xKlms.value.length>0){
                    document.getElementById("xTotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("xDollarsPerKlm").value = datval_xTotalGross.value/datval_xKlms.value;
                } else {
                    document.getElementById("xTotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("xDollarsPerKlm").value = null;
                }
            }
            // document.getElementById("xTotalGrossX").value = datval_xTotalGross.value;
            // document.getElementById("xDollarsPerKlm").value = datval_xTotalGross.value/datval_xKlms.value;
            // // if (datval_xTotalGrossX.validity.valid) {
            // // } else {
            // //     // datval_xSeconds.setCustomValidity("");
            // //     alert("value out of range, please try again");
            // //     document.getElementById("xTotalGrossX").value = 0;
            // //     document.getElementById("xTotalGrossX").focus();
            // //     document.getElementById("xTotalGrossX").select();
            // // }
        });
        // DATA VALIDATION END 
    // window.addEventListener("load", () => {
    });
// wait for DOM to load END

function dateChange(){
    const datval_xDate = document.getElementById("xDate");
    console.log(datval_xDate);
    const frm = document.getElementById("driver-day-book");
    console.log(frm);
    for (var i=0; i < aDriverDayBook.length; i++){``
        console.log(aDriverDayBook[i].xDate,datval_xDate.value);
        if (aDriverDayBook[i].xDate===datval_xDate.value){
            // console.log(aDriverDayBook[i].xDate,datval_xDate.value,i);
            for (const key in aDriverDayBook[i]){
                // console.log(key);
                // console.log(`${key}:${aDriverDayBook[i][key]}`);
                if (aDriverDayBook[i][key].length>0){
                    // console.log([key]);
                    // console.log([key][0].slice(0,1));
                    if ([key][0].slice(0,1)==="x"){
                        console.log(aDriverDayBook[i][key]);
                        document.getElementById(key).value = aDriverDayBook[i][key];
                    }
                }
            }
            return;
        } else {
            for (const key in aDriverDayBook[i]){
                // console.log(key);
                // console.log(`${key}:${aDriverDayBook[i][key]}`);
                if (aDriverDayBook[i][key].length>0){
                    // console.log([key]);
                    // console.log([key][0].slice(0,1));
                    if ([key][0].slice(0,1)==="x"){
                       if (key!=="xDate"){
                            console.log(key);
                            document.getElementById(key).value = "";
                        }
                    }
                }
            }
        }
    }
}

function timeStampString(){
    const v_dateNow = new Date(); 
    var v_fullYear = v_dateNow.getFullYear();
    var v_month = v_dateNow.getMonth()+1;
    if (v_month<10)(v_month="0"+v_month);
    var v_day = v_dateNow.getDate();
    if (v_day<10)(v_day="0"+v_day);
    var v_dayName = dayNames[v_dateNow.getDay()];
    var v_hour = v_dateNow.getHours();
    if (v_hour<10)(v_hour="0"+v_hour);
    var v_minute = v_dateNow.getMinutes();
    if (v_minute<10)(v_minute="0"+v_minute);
    var v_second = v_dateNow.getSeconds();
    if (v_second<10)(v_second="0"+v_second);
    var v_millisecond = v_dateNow.getMilliseconds();
    if (v_millisecond<10)(v_millisecond="0"+v_millisecond);
    if (v_millisecond<100)(v_millisecond="0"+v_millisecond);
    // const v_timeStampStr = "timeStamped_" + v_fullYear + "-" + v_month + "-" + v_day + "_" + v_dayName + "_" + v_hour + ":" + v_minute + "_" + v_second + v_millisecond;
    const v_timeStampStr = v_fullYear + "-" + v_month + "-" + v_day + "_" + v_dayName + "_" + v_hour + ":" + v_minute + "_" + v_second + v_millisecond;
    // if(getClientOS()=="Windows"){console.log("v_timeStampString:- ",v_timeStampStr)};
    return v_timeStampStr;
}

// CHECK OUT user file START
async function checkOutUserFiles(userPIN){
    // if(getClientOS()=="Windows"){console.log('checkOut')};
    const v_data = JSON.stringify(
        {
            v_userPIN: userPIN
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(getClientOS()=="Windows"){console.log('/checkOut options:- ',v_options)};
    await fetch('/checkOut',v_options)
    .then(res => {
        // if(getClientOS()=="Windows"){console.log('checkOut:- res.body:- ',res.body)};
        // if(getClientOS()=="Windows"){console.log('checkOut:- res.json():- ',res.json())};
        return res.json();
        // return res.tex4t();
    })
    .then((res_data) => {
        // if(getClientOS()=="Windows"){console.log('checkOut:-\n jsonObject:- res_data\n',res_data)};
        // if(getClientOS()=="Windows"){console.log('checkOut:-\n jsonObject:- res_data[1].v_emailAddress\n',res_data[1].v_emailAddress)};
        aDriverDayBook = res_data;
        // if(getClientOS()=="Windows"){console.log('checkOut:- jsonObject:- ',JSON.stringify(res_data))};
        // if(getClientOS()=="Windows"){console.log('checkOut:- jsonObject:- ',JSON.parse(res_data))};
        // writeToLocalStorage('clickedTickerPrice',res_data.price);
        // writeToLocalStorage('clickedTickerDateTime',v_dateTime);
        // writeToLocalStorage(`lastPrice_CommSec_${p_ticker}`,res_data.price);
        // writeToLocalStorage(`lastDateTime_CommSec_${p_ticker}`,v_dateTime);
        // return res_data.price;
    })
    if (document.getElementById("driverRecordsContainer").style.display==="block"){
            document.getElementById("driverRecordsContainer").style.display = "none";
            document.getElementById("originalBody").style.display = "body";
            document.getElementById("driverRecordsAccessControl").style.display = "body";
            document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "none";
    } else {
            document.getElementById("driverRecordsContainer").style.display = "block";
            document.getElementById("originalBody").style.display = "none";
            document.getElementById("driverRecordsAccessControl").style.display = "none";
            document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "body";
    }
    document.getElementById("xEndingOdometre").focus();
    document.getElementById("xEndingOdometre").select();

    // if(getClientOS()=="Windows"){console.log(aDriverDayBook)};
    // const containsText = (element) => element.includes("2024-01-15");
    // if(getClientOS()=="Windows"){console.log(aDriverDayBook.findIndex(containsText))};
    for (i=0;i<aDriverDayBook.length;i++){
        // if(getClientOS()=="Windows"){console.log(JSON.stringify(aDriverDayBook[i]))};
        txt = JSON.stringify(aDriverDayBook[i]);
        // if(getClientOS()=="Windows"){console.log(txt.search("2024-01-15"))};
        if (txt.search("2024-01-15")>=0){

        };
    }

    // if(getClientOS()=="Windows"){console.log(aDriverDayBook.v_emailAddress)};
    // if(getClientOS()=="Windows"){console.log(aDriverDayBook)};
    // if(getClientOS()=="Windows"){console.log(JSON.stringify(aDriverDayBook))};
    // aDriverDayBook.push(JSON.parse(`{"Date":20231226,"Odometre":64000}`));
    // if(getClientOS()=="Windows"){console.log(aDriverDayBook)};
    // if(getClientOS()=="Windows"){console.log(JSON.stringify(aDriverDayBook))};
} 
// CHECK OUT user file END

function driverRecordsAccess(e){
    // if(getClientOS()=="Windows"){console.log(e.value)};
    // const accessCode = prompt("Please enter access code (get the code from support@netit.com.au)");
    // if (accessCode!=="aus"){
    //     return;
    // }
    if (e.value!=="aus"){
        checkOutUserFiles(e.value);
    } else {
        // let newUserEmailAddress = '';
        let newUserEmailAddress = '"d.garton@outlook.com"';
        // newUserEmailAddress = prompt("Please enter email address at which you wish to receive a User Access Code.","d.garton@outlook.com");
        newUserEmailAddress = prompt("Please enter email address at which you wish to receive a User Access Code.");
        if (!newUserEmailAddress){
            location.reload();
            // return;
        } else {
            // if(getClientOS()=="Windows"){console.log(newUserEmailAddress)};
            create(newUserEmailAddress);
        }
    }
}

// create user file - start \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// async function create(newUserEmailAddress){
async function create(){
    // if(getClientOS()=="Windows"){console.log('create')};
    const userW = document.getElementById("pw").value;
    const userW2 = document.getElementById("pw2").value;
    const uEmail = document.getElementById("uEmail").value;
    if(userW != userW2){
        alert("passwords do not match");
        return;
    }
    const v_data = JSON.stringify(
        {
            v_userW: userW,
            // v_emailAddress: newUserEmailAddress
            v_uEmail: uEmail
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(getClientOS()=="Windows"){console.log('/create options:- ',v_options)};
    await fetch('/create',v_options)
    .then(res => {
        // if(getClientOS()=="Windows"){console.log('create:- res:- ',res)};
        return res.json();
        // return res.body;
    })
    .then((res_data) => {
        // if(getClientOS()=="Windows"){console.log('create:- userPIN:- ',res_data)};
        // writeToLocalStorage('clickedTickerPrice',res_data.price);
        // writeToLocalStorage('clickedTickerDateTime',v_dateTime);
        // writeToLocalStorage(`lastPrice_CommSec_${p_ticker}`,res_data.price);
        // writeToLocalStorage(`lastDateTime_CommSec_${p_ticker}`,v_dateTime);
        // return res_data.price;
    })
}
// create user file - end /////////////////////////////////////////////////////////////////////////////////////////////////

// login - start \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function login(){
    // if(getClientOS()=="Windows"){console.log('login')};
    const userW = document.getElementById("pw").value;
    const uEmail = document.getElementById("uEmail").value;
    const v_data = JSON.stringify(
        {
            v_userW: userW,
            v_uEmail: uEmail
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    if(getClientOS()=="Windows"){console.log('/login options:- ',v_options)};
    await fetch('/login1',v_options)
    .then(res => {
        if(getClientOS()=="Windows"){console.log('login:- res.body:- ',res.body)};
        // if(getClientOS()=="Windows"){console.log('login:- res.json():- ',res.json())};
        return res.json();
        // return res.tex4t();
    })
    .then((res_data) => {
        if(getClientOS()=="Windows"){console.log('login:-\n jsonObject:- res_data\n',res_data)};
        // if(getClientOS()=="Windows"){console.log('login:-\n jsonObject:- res_data[1].v_emailAddress\n',res_data[2].v_uEmail)};
        aDriverDayBook = res_data;
        // if(getClientOS()=="Windows"){console.log('login:- jsonObject:- ',JSON.stringify(res_data))};
        // if(getClientOS()=="Windows"){console.log('login:- jsonObject:- ',JSON.parse(res_data))};
        if(res_data[0].response === "login1 ok"){
            if(getClientOS()=="Windows"){console.log(res_data)};
            document.getElementById("login1").style.display = "none";
            // document.getElementById("login2").style.display = "body";
            document.getElementById("login2").style.display = "block";
        }
    });

} 
// login - end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// login2fa - start \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function login2(){
    const uEmail = document.getElementById("uEmail").value;
    const accessCode = document.getElementById("login2code").value;
    const v_data = JSON.stringify(
        {
            v_uEmail: uEmail,
            v_accessCode: accessCode
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    if(getClientOS()=="Windows"){console.log('/login2 options:- ',v_options)};
    await fetch('/login2',v_options)
    .then(res => {
        if(getClientOS()=="Windows"){console.log('login2:- res.body:- ',res.body)};
        // if(getClientOS()=="Windows"){console.log('login:- res.json():- ',res.json())};
        return res.json();
        // return res.tex4t();
    })
    .then((res_data) => {
        if(getClientOS()=="Windows"){console.log('login2:-\n jsonObject:- res_data\n',res_data)};
        // if(getClientOS()=="Windows"){console.log('login:-\n jsonObject:- res_data[1].v_emailAddress\n',res_data[2].v_uEmail)};
        aDriverDayBook = res_data;
        // if(getClientOS()=="Windows"){console.log('login:- jsonObject:- ',JSON.stringify(res_data))};
        // if(getClientOS()=="Windows"){console.log('login:- jsonObject:- ',JSON.parse(res_data))};
        if(res_data[2].v_uEmail === uEmail){
            if(getClientOS()=="Windows"){console.log(res_data)};
            // document.getElementById("login1").style.display = "none";
            // document.getElementById("login2").style.display = "body";
            document.getElementById("login2").style.display = "none";
        }
    });


    if (document.getElementById("driverRecordsContainer").style.display==="block"){
        document.getElementById("driverRecordsContainer").style.display = "none";
        document.getElementById("originalBody").style.display = "body";
        document.getElementById("driverRecordsAccessControl").style.display = "body";
        document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "none";
    } else {
        document.getElementById("driverRecordsContainer").style.display = "block";
        document.getElementById("originalBody").style.display = "none";
        document.getElementById("driverRecordsAccessControl").style.display = "none";
        document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "body";
        document.getElementById("login1").style.display = "none";
    }
    var v_today = new Date();
    // document.getElementById("xDate").value = "2000-01-01";
    document.getElementById("xDate").value = v_today.toISOString().slice(0,10);
    dateChange();
    document.getElementById("xEndingOdometre").focus();
    document.getElementById("xEndingOdometre").select();
}
// login2fa - end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


// save to Local Storage START
function saveDriverDayBookRecord(){
    // save to Local Storage
    // if(getClientOS()=="Windows"){console.log(aDriverDayBook)};
    const xTimeStamp = timeStampString();
    let txtHeaderRow = "";
    let txtDataRow = "";
    let txtDayBookEntry = "";
    txtDayBookEntry += "{";
    addCommaPrefix = false;
    const frm = document.getElementById("driver-day-book");
    Array.from(frm.elements).forEach((input) => {
        if (input.name.slice(0,1)==="x"){
            txtHeaderRow += input.name + " , ";
            txtDataRow += input.value + " , ";
            if(getClientOS()=="Windows"){console.log(input.name + " | " + input.value)};
            if(!addCommaPrefix){
                addCommaPrefix = true;
                txtDayBookEntry += `"${input.name}":"${input.value}"`;
            } else {
                txtDayBookEntry += `,"${input.name}":"${input.value}"`;
            }
        }
    });
    txtDayBookEntry += `,"xTimeStamp":"${xTimeStamp}"}`;
    window.localStorage.setItem("rsd!" + xDate.value + "[" + xTimeStamp + "_0]head" ,txtHeaderRow);
    window.localStorage.setItem("rsd!" + xDate.value + "[" + xTimeStamp + "_1]data" ,txtDataRow);
    // if(getClientOS()=="Windows"){console.log("localStorage done")};
    // saves to Local Storage

    // if(getClientOS()=="Windows"){console.log(aDriverDayBook.findIndex(element === `{xDate: "${xDate.value}"}`))};
    // if(getClientOS()=="Windows"){console.log(txtDayBookEntry)};
    console.log(`{xDate: "${xDate.value}"}`);
    // const entryExists = (element) => element === `{xDate: "${xDate.value}"}`;
    const entryExists = (element) => element.xDate === `${xDate.value}`;
    const entryExistsAtIndex = aDriverDayBook.findIndex(entryExists);
    console.log(entryExistsAtIndex);
    console.log(aDriverDayBook);
    const removed = aDriverDayBook.splice(entryExistsAtIndex, 1);
    console.log(removed);
    console.log(aDriverDayBook);

    aDriverDayBook.push(JSON.parse(txtDayBookEntry));
    // if(getClientOS()=="Windows"){console.log(aDriverDayBook)};
    // if(getClientOS()=="Windows"){console.log(JSON.stringify(aDriverDayBook))};
    storeFormDataInIndexedDB();
    updateaDriverDayBook(aDriverDayBook);
}
// save to Local Storage END

// save to IndexedDB START
function storeFormDataInIndexedDB(){
    // var v_elements = document.getElementsByTagName("input");
    var v_elements = document.getElementsByClassName("xData");
    // if(getClientOS()=="Windows"){console.log(v_elements)};
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
// save to IndexedDB END

// updateaDriverDayBook() START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function updateaDriverDayBook(aDriverDayBook){
    // if(getClientOS()=="Windows"){console.log('updateaDriverDayBook() triggered')};
    // if(getClientOS()=="Windows"){console.log(aDriverDayBook)};
    const v_data = JSON.stringify(aDriverDayBook);
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(getClientOS()=="Windows"){console.log('/update options:- ',v_options)};
    await fetch('/update',v_options)
    .then(res => {
        // if(getClientOS()=="Windows"){console.log('update:- res:- ',res)};
        return res.json();
        // return res.body;
    })
    .then((res_data) => {
        // if(getClientOS()=="Windows"){console.log('update:- ...:- ',res_data)};
        // if (res_data==JSON.parse(v_data)){
        if (JSON.stringify(res_data)===v_data){
            alert("updated ok");
        } else {
            alert("update error!");
            // if(getClientOS()=="Windows"){console.log(res_data)};
            // if(getClientOS()=="Windows"){console.log(JSON.parse(v_data))};
            // if(getClientOS()=="Windows"){console.log(JSON.stringify(res_data))};
            // if(getClientOS()=="Windows"){console.log(v_data)};
        };
    })
}
// updateaDriverDayBook() END ////////////////////////////////////////////////////////////

function emailMyDeviceDataTo_OLD(){
        let aRSDdata = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).slice(0,4)==="rsd!"){
                // if(getClientOS()=="Windows"){console.log(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ")};
                // if(getClientOS()=="Windows"){console.log(localStorage.getItem(localStorage.key(i)) + localStorage.key(i) + " , ")};
                // aRSDdata.push(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ");
                aRSDdata.push(localStorage.getItem(localStorage.key(i)) + localStorage.key(i) + " , ");
            }
        }
        aRSDdata.sort();
        aRSDdata.reverse();
        // if(getClientOS()=="Windows"){console.log(aRSDdata)};
        let vTEXT = "";
        for (let i = 0; i < aRSDdata.length; i++) {
            vTEXT += aRSDdata[i] + `%0D%0A`;
        }
        // if(getClientOS()=="Windows"){console.log(vTEXT)};
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
                // if(getClientOS()=="Windows"){console.log(i,a,aRSDdataRowSplit[a])};
            }
            aRSDdataRow = localStorage.getItem(localStorage.key(i)) + localStorage.key(i);
            aRSDdata.push(aRSDdataRow);
        }
    }
    // aRSDdata.sort();
    // aRSDdata.reverse();
    // if(getClientOS()=="Windows"){console.log(aRSDdata)};
    // if(getClientOS()=="Windows"){console.log(aRSDdata[0])};
    // if(getClientOS()=="Windows"){console.log(aRSDdata[0].indexOf("_0]head"))};
    let vTEXT = ``;
    vTEXT += aRSDdata[0] + `%0D%0A`;
    for (let i = 0; i < aRSDdata.length; i++) {
        if (aRSDdata[i].indexOf("_0]head")<0){
            vTEXT += aRSDdata[i] + `%0D%0A`;
        }
    }
    // if(getClientOS()=="Windows"){console.log(vTEXT)};
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
                // if(getClientOS()=="Windows"){console.log(i,a,aRSDdataRowSplit[a])};
            }
            aRSDdataRow = localStorage.getItem(localStorage.key(i)) + localStorage.key(i);
            aRSDdata.push(aRSDdataRow);
        }
    }
    // aRSDdata.sort();
    // aRSDdata.reverse();
    // if(getClientOS()=="Windows"){console.log(aRSDdata)};
    // if(getClientOS()=="Windows"){console.log(aRSDdata[0])};
    // if(getClientOS()=="Windows"){console.log(aRSDdata[0].indexOf("_0]head"))};
    let vHTML = ``;
    vHTML += aRSDdata[0] + `<br>`;
    for (let i = 0; i < aRSDdata.length; i++) {
        if (aRSDdata[i].indexOf("_0]head")<0){
            vHTML += aRSDdata[i] + `<br>`;
        }
    }
    // if(getClientOS()=="Windows"){console.log(vHTML)};
    document.getElementById("displayLocalStorage").innerHTML = vHTML;
}
function sumTolls(){
    let tollsNumber = 0;
    tollsNumber = window.prompt('Enter a number to add to Tolls (negatives allowed, use -), then click OK.',tollsNumber);
    // if(getClientOS()=="Windows"){console.log(tollsNumber)};
    if (!tollsNumber){
        // document.getElementById("xTolls").blur();
    } else {
        tollsNumber = tollsNumber * 1;
        // if(getClientOS()=="Windows"){console.log(tollsNumber)};
        tollsNumber += document.getElementById("xTolls").value * 1;
        // if(getClientOS()=="Windows"){console.log(tollsNumber)};
        document.getElementById("xTolls").value = tollsNumber;
    }
}