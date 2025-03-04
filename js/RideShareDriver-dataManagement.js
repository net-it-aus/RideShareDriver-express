/* <!-- collapse all     Ctrl + k + 0 --> */
/* <!-- expand all       Ctrl + k + j --> */
/* <!-- format           Alt + Shift + F (USE WITH CAUTION)--> */
/* <!-- word wrap toggle Alt + z --> */

const consoleOn = true;
let t;
let aDriverDayBook = [];
// Sunday is the first day of the week
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
// Sunday is the first day of the week
// nlr? let userPIN;

// wait for DOM to load START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    window.addEventListener("load", () => {

        // // hide js START
        //     // Disable Right-Click: You can disable the right-click context menu to prevent users from easily accessing the "View Source" option. This can be done using JavaScript:
        //     document.addEventListener("contextmenu", e => e.preventDefault(), false);
        //     // Disable Shortcut Keys: Prevent users from using keyboard shortcuts like Ctrl+U (View Source) or F12 (Developer Tools) by capturing and stopping these events:
        //     document.addEventListener("keydown", e => {
        //         if (e.ctrlKey || e.keyCode == 123) { // Ctrl or F12
        //             e.stopPropagation();
        //             e.preventDefault();
        //         }
        //     }, false);
        // // hide js END

        // Fully loaded!

        if ('serviceWorker' in navigator) {
            // window.addEventListener('load', function() {
                navigator.serviceWorker.register('service-worker.js').then(function(registration) {
                    // console.log('Service Worker registered with scope:', registration.scope);
                }, function(error) {
                    console.log('Service Worker registration failed:', error);
                });
            // });
        }

        // login2();

// document.getElementById("dateNavigationButtonsContainer").style.display = "flex";
// document.getElementById("driverRecordsContainer").style.display = "flex";
// document.getElementById("originalBody").style.display = "none";
// document.getElementById("driverRecordsAccessControl").style.display = "none";
// const currentIsoDateString = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString();
// document.getElementById("x_Date").value = currentIsoDateString.slice(0,10);
// dateChange();

        document.getElementById("x_Klms").addEventListener("blur",()=>{
            calcBusinessPrivateKlms();
        })
        document.getElementById("x_KlmsPrivate").addEventListener("blur",()=>{
            calcBusinessPrivateKlms();
        })
        function calcBusinessPrivateKlms(){
            document.getElementById("x_Klms").value = document.getElementById("x_Klms").value * 1 - document.getElementById("x_KlmsPrivate").value
        }

        var myBody = document.getElementsByTagName("BODY")[0];
        myBody.addEventListener("mousemove",(event)=>{
            logSiteVisit();
        },{once: true});
        myBody.addEventListener("touchstart",(event)=>{
            logSiteVisit();
        },{once: true});
        function logSiteVisit(){
            // if(consoleOn===true){console.log("mousemove detected")};
            // // GEOLOCATION start
            //     function getLocation() {
            //         if (navigator.geolocation) {
            //             navigator.geolocation.getCurrentPosition(showPosition);
            //         } else {
            //             // x.innerHTML = "Geolocation is not supported by this browser.";
            //             if(consoleOn===true){console.log("Geolocation is not supported by this browser.")};
            //         }
            //     }
            //     getLocation();
            //     function showPosition(position) {
            //         // x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
            //         if(consoleOn===true){console.log("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude)};
            //     }
            // // GEOLOCATION end
            // IPADDRESS start
                // // external source START
                //     fetch('https://api.ipify.org/?format=json')
                //     .then(res => res.json())
                //     .then(data => if(consoleOn===true){console.log(data.ip)})
                //     .catch(err => if(consoleOn===true){console.log(err)})
                // // external source END
                // mySERVER start
                    fetch('/myIPify');
                // mySERVER end
            // IPADDRESS end
            // triggerSiteVisit();
        }

        document.getElementById("dayBook_DateRightButton").addEventListener("click",()=>{
            let d0 = '';
            let d1 = '';
            // if(consoleOn===true){console.log( typeof document.getElementById("x_Date").value)};
            if( document.getElementById("x_Date").value.length === 0) {
                d0 = new Date(Date.now()).toISOString();
                document.getElementById("x_Date").value = d0.slice(0,10);
            } else {
                d0 = new Date(document.getElementById("x_Date").value).toISOString();
            }
            // if(consoleOn===true){console.log(d0)};
            d1 = new Date(d0);
            // if(consoleOn===true){console.log(new Date(d1 * 1 +  86400000))};
            d1 = new Date(d1 * 1 +  86400000);
            d1 = d1.toISOString()
            document.getElementById("x_Date").value = d1.slice(0,10);
            dateChange();
        });
        document.getElementById("dayBook_DateLeftButton").addEventListener("click",()=>{
            let d0 = '';
            let d1 = '';
            // if(consoleOn===true){console.log( typeof document.getElementById("x_Date").value)};
            if( document.getElementById("x_Date").value.length === 0) {
                d0 = new Date(Date.now()).toISOString();
                document.getElementById("x_Date").value = d0.slice(0,10);
            } else {
                d0 = new Date(document.getElementById("x_Date").value).toISOString();
            }
            // if(consoleOn===true){console.log(d0)};
            d1 = new Date(d0);
            // if(consoleOn===true){console.log(new Date(d1 * 1 -  86400000))};
            d1 = new Date(d1 * 1 -  86400000);
            d1 = d1.toISOString()
            document.getElementById("x_Date").value = d1.slice(0,10);
            dateChange();
        });

        document.getElementById("dayBook_WeekRightButton").addEventListener("click",()=>{
            let d0 = '';
            let d1 = '';
            // if(consoleOn===true){console.log( typeof document.getElementById("x_Date").value)};
            if( document.getElementById("x_Date").value.length === 0) {
                d0 = new Date(Date.now()).toISOString();
                document.getElementById("x_Date").value = d0.slice(0,10);
            } else {
                d0 = new Date(document.getElementById("x_Date").value).toISOString();
            }
            // if(consoleOn===true){console.log(d0)};
            d1 = new Date(d0);
            // if(consoleOn===true){console.log(new Date(d1 * 1 + (86400000 * 7)))};
            d1 = new Date(d1 * 1 +  (86400000 * 7));
            d1 = d1.toISOString()
            document.getElementById("x_Date").value = d1.slice(0,10);
            dateChange();
        });
        document.getElementById("dayBook_WeekLeftButton").addEventListener("click",()=>{
            let d0 = '';
            let d1 = '';
            // if(consoleOn===true){console.log( typeof document.getElementById("x_Date").value)};
            if( document.getElementById("x_Date").value.length === 0) {
                d0 = new Date(Date.now()).toISOString();
                document.getElementById("x_Date").value = d0.slice(0,10);
            } else {
                d0 = new Date(document.getElementById("x_Date").value).toISOString();
            }
            // if(consoleOn===true){console.log(d0)};
            d1 = new Date(d0);
            // if(consoleOn===true){console.log(new Date(d1 * 1 - (86400000 * 7)))};
            d1 = new Date(d1 * 1 -  (86400000 * 7));
            d1 = d1.toISOString()
            document.getElementById("x_Date").value = d1.slice(0,10);
            dateChange();
        });


        document.getElementById("x_KlmTravelledSinceLastFillup").addEventListener("blur",(event)=>{
            let klms = parseFloat(document.getElementById("x_KlmTravelledSinceLastFillup").value) | 0;
            let ltrs = parseFloat(document.getElementById("x_LitresPurchased").value) | 0;
            if(klms !== 0 & ltrs !== 0){
                document.getElementById("x_FuelEconomyCalculated").value = (ltrs*1/klms*1*100).toFixed(1);
            } else {
                document.getElementById("x_FuelEconomyCalculated").value = null;
            }
        });
        document.getElementById("x_LitresPurchased").addEventListener("blur",(event)=>{
            let klms = parseFloat(document.getElementById("x_KlmTravelledSinceLastFillup").value) | 0;
            let ltrs = parseFloat(document.getElementById("x_LitresPurchased").value) | 0;
            if(klms !== 0 & ltrs !== 0){
                document.getElementById("x_FuelEconomyCalculated").value = (ltrs*1/klms*1*100).toFixed(1);
            } else {
                document.getElementById("x_FuelEconomyCalculated").value = null;
            }
            calcPrcVar();
        });

        document.getElementById("x_PricePerLitre").addEventListener("blur",(event)=>{
            calcPrcVar();
        });
        document.getElementById("x_FuelPurchaseTotal").addEventListener("blur",(event)=>{
            calcPrcVar();
        });
        function calcPrcVar(){
            let ltrs = parseFloat(document.getElementById("x_LitresPurchased").value);
            let price = parseFloat(document.getElementById("x_PricePerLitre").value);
            let total = parseFloat(document.getElementById("x_FuelPurchaseTotal").value);
            // if(consoleOn===true){console.log(ltrs,price,total)};
            if(ltrs !== 0 & price !== 0 & total !== 0){
                document.getElementById("x_PriceVariance").value = ((ltrs*1) * (price*1) - (total*1)).toFixed(2);
            } else {
                document.getElementById("x_PriceVariance").value = null;
            }
        }

        document.getElementById("uEmail").value = window.localStorage.getItem("rsd_uEmail");
        document.getElementById("loginButton").addEventListener("click", (event) => {
            document.getElementById('login1').style.display='block';
            document.getElementById(`uEmail`).focus();
            document.getElementById(`uEmail`).select();
        });
        document.getElementById('loginButton').addEventListener('keydown', (event) => {
            // if(consoleOn===true){console.log(event.key)};
            if (event.key === 'Enter') {
                document.getElementById('login1').style.display='block';
                document.getElementById(`uEmail`).focus();
                document.getElementById(`uEmail`).select();
            }
        });
        document.getElementById('login').addEventListener('keydown', (event) => {
            if(consoleOn===true){console.log(event.key)};
            if (event.key === 'Enter') {
                login();
            }
        });
        document.getElementById('login2Button').addEventListener('keydown', (event) => {
            // if(consoleOn===true){console.log(event.key)};
            if (event.key === 'Enter') {
                login2();
            }
        });
    
        const datval_xDate = document.getElementById("x_Date");
        // console.trace();
        // if(consoleOn===true){console.log(datval_xDate)};
        const frm = document.getElementById("driver-day-book");
        // if(consoleOn===true){console.trace()};
        // if(consoleOn===true){console.log(frm)};

        // document.getElementById("x_Access").focus();
        // document.getElementById("x_Access").select();

        // document.getElementById("futureDate").value = getFutureDate();
        // document.getElementById("x_Hours").addEventListener("change",calcStats());
        // document.getElementById("x_Minutes").addEventListener("change",calcStats());
        // document.getElementById("x_Seconds").addEventListener("change",calcStats());
        // document.getElementById("x_Distance").addEventListener("change",calcStats());
        // document.getElementById("ttCourse").addEventListener("change",calcStats());
        // document.getElementById("x_Pace").addEventListener("mouseover",calcStats());
        // document.getElementById("x_Pace").addEventListener("touchstart",calcStats());
        // document.getElementById("ttName").addEventListener("change",document.getElementById("x_Hours").focus())
        // document.getElementById("ttName").select();

        // DATE CHANGE DETECT start
        datval_xDate.addEventListener("change", (event) => {
            dateChange();
        });
        // DATE CHANGE DETECT end

        // DATA VALIDATION START 
        const datval_uEmail = document.getElementById("uEmail");
        datval_uEmail.addEventListener("change", (event) => {
            if (datval_uEmail.validity.valid) {
            } else {
                // datval_xMinutesOnline.setCustomValidity("");
                ("invalid email address, please try again");
                document.getElementById("uEmail").focus();
                document.getElementById("uEmail").select();
            }
        });
        const datval_xMinutesOnline = document.getElementById("x_MinutesOnline");
        datval_xMinutesOnline.addEventListener("input", (event) => {
            if (datval_xMinutesOnline.validity.valid) {
            } else {
                // datval_xMinutesOnline.setCustomValidity("");
                alert("value out of range, please try again");
                document.getElementById("x_MinutesOnline").value = 0;
                document.getElementById("x_MinutesOnline").focus();
                document.getElementById("x_MinutesOnline").select();
            }
        });
        const datval_xTotalGross = document.getElementById("x_TotalGross");
        const datval_xKlms = document.getElementById("x_Klms");
        datval_xTotalGross.addEventListener("change", (event) => {
            if (datval_xTotalGross.validity.valid & datval_xKlms.validity.valid) {
                if (datval_xTotalGross.value.length>0 & datval_xKlms.value.length>0){
                    document.getElementById("x_TotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("x_DollarsPerKlm").value = (datval_xTotalGross.value/datval_xKlms.value).toFixed(2);
                } else {
                    document.getElementById("x_TotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("x_DollarsPerKlm").value = null;
                }
                if (datval_xTotalGross.value.length>0 & datval_xHoursOnline.value.length>0){
                    document.getElementById("x_TotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("x_DollarsPerHour").value = (datval_xTotalGross.value/(datval_xHoursOnline.value * 1 + datval_xMinutesOnline.value / 60)).toFixed(2);
                } else {
                    document.getElementById("x_TotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("x_DollarsPerHour").value = null;
                }
                if (datval_xTotalGross.value.length>0){
                    document.getElementById("x_TotalGrossXexclGST").value = (parseFloat(datval_xTotalGross.value) / 1.1).toFixed(2);
                }
                calcNetB4tax();
                calcNetB4taxWeek();
            }
            // if (datval_xTotalGross.validity.valid) {
            //     if(consoleOn===true){console.log("datval_xTotalGross.validity.valid - OK",datval_xTotalGross.value.length)}};
            // } else {
            //     if(consoleOn===true){console.log("datval_xTotalGross.validity.valid - ERROR",datval_xTotalGross.value.length)}};
            // //     // datval_xSeconds.setCustomValidity("");
            // //     alert("value out of range, please try again");
            // //     document.getElementById("x_TotalGrossX").value = 0;
            // //     document.getElementById("x_TotalGrossX").focus();
            // //     document.getElementById("x_TotalGrossX").select();
            // }
        });
        datval_xKlms.addEventListener("change", (event) => {
            if (datval_xTotalGross.validity.valid & datval_xKlms.validity.valid) {
                if (datval_xTotalGross.value.length>0 & datval_xKlms.value.length>0){
                    document.getElementById("x_TotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("x_DollarsPerKlm").value = (datval_xTotalGross.value/datval_xKlms.value).toFixed(2);
                } else {
                    document.getElementById("x_TotalGrossX").value = datval_xTotalGross.value;
                    document.getElementById("x_DollarsPerKlm").value = null;
                }
                calcNetB4tax();
                calcNetB4taxWeek();
            }
        });
        const datval_xHoursOnline = document.getElementById("x_HoursOnline");
        datval_xHoursOnline.addEventListener("change", (event) => {
            document.getElementById("x_DollarsPerHour").value = (datval_xTotalGross.value/(datval_xHoursOnline.value * 1 + datval_xMinutesOnline.value / 60)).toFixed(2);
        });
        // const datval_xMinutesOnline = document.getElementById("x_MinutesOnline");
        datval_xMinutesOnline.addEventListener("change", (event) => {
            document.getElementById("x_DollarsPerHour").value = (datval_xTotalGross.value/(datval_xHoursOnline.value * 1 + datval_xMinutesOnline.value / 60)).toFixed(2);
        });
        // DATA VALIDATION END 
    // window.addEventListener("load", () => {
    });
// wait for DOM to load END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function calcNetB4tax(){
    if (document.getElementById("x_Klms").value.length>0){
        document.getElementById("x_TotalGrossXexclGST").value = (document.getElementById("x_TotalGross").value / 1.1).toFixed(2);
        document.getElementById("x_ExpensesCentsPerKlmRate").value = (0.85).toFixed(2);
        document.getElementById("x_ExpensesCentsPerKlm").value = (document.getElementById("x_Klms").value * document.getElementById("x_ExpensesCentsPerKlmRate").value).toFixed(2);
        document.getElementById("x_NetEarningsB4tax").value = (document.getElementById("x_TotalGrossXexclGST").value - document.getElementById("x_ExpensesCentsPerKlm").value).toFixed(2);
    }
}
function calcNetB4taxWeek(){
    if (document.getElementById("vKlms").value.length>0){
        document.getElementById("x_TotalGrossXexclGSTWeek").value = (document.getElementById("vTotalGross").value / 1.1).toFixed(2);
        document.getElementById("x_ExpensesCentsPerKlmRateWeek").value = (0.85).toFixed(2);
        document.getElementById("x_ExpensesCentsPerKlmWeek").value = (document.getElementById("vKlms").value * document.getElementById("x_ExpensesCentsPerKlmRateWeek").value).toFixed(2);
        document.getElementById("x_NetEarningsB4taxWeek").value = (document.getElementById("x_TotalGrossXexclGSTWeek").value - document.getElementById("x_ExpensesCentsPerKlmWeek").value).toFixed(2);
    }
}

// UPDATE WEEK STATS start
    function updateWeekStats(myDate){

        const d0 = new Date(myDate);
        const d0Day = new Date(myDate).getDay();

        // if(consoleOn===true){console.log(d0)};
        // Sunday is the start of the week
            let standardWeekBeginDate = new Date(d0 - (86400000 * d0Day));
            const dStdDay = new Date(standardWeekBeginDate).getDay();
            if (dStdDay===0){
                standardWeekBeginDate = new Date(d0 - (86400000 * d0Day));
            } else {
                standardWeekBeginDate = new Date(d0 * 1 - (86400000 * 7));
            }
            // if(consoleOn===true){console.log("standard week start date = " + standardWeekBeginDate.toDateString())};
        // Sunday is the start of the week
        // Uber week starts on Monday
            let uberWeekBeginDate = 0;
            if (d0Day===0){
                uberWeekBeginDate = new Date(standardWeekBeginDate * 1 - (86400000 * 6));
            } else {
                uberWeekBeginDate = new Date(standardWeekBeginDate * 1 + (86400000 * 1));
            }
            // if(consoleOn===true){console.log("Uber week start date = " + uberWeekBeginDate.toDateString())};
        // Uber week starts on Monday
        // if(consoleOn===true){console.log("updateWeekStats for " + myDate + " Weekday " + d0Day + " week start date = " + uberWeekBeginDate.toDateString())};
        // if(consoleOn===true){console.log("\n")};

        let statDate;
        let vTotalGross = 0;
        let vKlms = 0;
        let vTrips = 0;
        let vIncentiveNOTIncludedInGross = 0;
        let vFuelPurchaseTotal = 0;
        let vHours = 0;
        let vMinutes = 0;
        for (d = 0; d < 7; d++){
            statDate = new Date(uberWeekBeginDate * 1 + (86400000 * d));
            // if(consoleOn===true){console.log(statDate.toISOString().slice(0,10))};
            for (var i=0; i < aDriverDayBook.length; i++){
                // if(consoleOn===true){console.log(aDriverDayBook[i].xDate)};
                if (aDriverDayBook[i].xDate===statDate.toISOString().slice(0,10)){
                    // if(consoleOn===true){console.log(aDriverDayBook[i].xDate,statDate.toISOString().slice(0,10),i)};
                    vTotalGross += aDriverDayBook[i].xTotalGross * 1;
                    vKlms += aDriverDayBook[i].xKlms * 1;
                    vTrips += aDriverDayBook[i].xTrips * 1
                    vHours += aDriverDayBook[i].xHoursOnline * 1
                    vMinutes += aDriverDayBook[i].xMinutesOnline * 1
                    vIncentiveNOTIncludedInGross += aDriverDayBook[i].xIncentiveNOTIncludedInGross * 1
                    vFuelPurchaseTotal += aDriverDayBook[i].xFuelPurchaseTotal * 1
                }
            }
        }
        // if(consoleOn===true){console.log(vTotalGross,vKlms,vTotalGross/vKlms)};
        document.getElementById("vTotalGross").value = (vTotalGross).toFixed(2);
        document.getElementById("vKlms").value = (vKlms).toFixed(1);
        document.getElementById("vGrossPerKlm").value = (vTotalGross / vKlms).toFixed(2);
        document.getElementById("vTrips").value = vTrips;
        document.getElementById("vGrossPerTrip").value = (vTotalGross / vTrips).toFixed(2);
        document.getElementById("vHours").value = (vHours + (vMinutes / 60)).toFixed(1);
        document.getElementById("vGrossPerHour").value = (vTotalGross / (vHours + (vMinutes / 60))).toFixed(2);
        document.getElementById("vIncentiveNOTIncludedInGross").value = vIncentiveNOTIncludedInGross;
        document.getElementById("vFuelPurchaseTotal").value = vFuelPurchaseTotal;

    }
// UPDATE WEEK STATS end

// UPDATE QTR STATS start
function updateQtrStats(myDate){

    // if(consoleOn===true){console.log(myDate)};
    // const selectedTaxYear = parseFloat(new Date(myDate).getFullYear());
    // const selectedMonth = parseFloat(new Date(myDate).getMonth() + 1,0);
    let selectedTaxYear = new Date(myDate).getFullYear();
    const selectedMonth = new Date(myDate).getMonth() + 1;
    if(selectedMonth>6){
        selectedTaxYear = `${selectedTaxYear}-${selectedTaxYear+1}`;
    } else {
        selectedTaxYear = `${selectedTaxYear-1}-${selectedTaxYear}`;
    }
    // if(consoleOn===true){console.log(selectedTaxYear,selectedMonth)};
    let selectedQuarter;
    switch(true) {
        case selectedMonth <= 3:
            // if(consoleOn===true){console.log("selected quarter = 3")};
            // selectedQuarter = 3
            selectedQuarter = selectedTaxYear + "_Q3"
            break;
        case selectedMonth <= 6:
            // if(consoleOn===true){console.log("selected quarter = 4")};
            // selectedQuarter = 4
            selectedQuarter = selectedTaxYear + "_Q4"
            break;
        case selectedMonth <= 9:
            // if(consoleOn===true){console.log("selected quarter = 1")};
            // selectedQuarter = 1
            selectedQuarter = selectedTaxYear + "_Q1"
            break;
        case selectedMonth <= 12:
            // if(consoleOn===true){console.log("selected quarter = 2")};
            // selectedQuarter = 2
            selectedQuarter = selectedTaxYear + "_Q2"
            break;
        default:
            // if(consoleOn===true){console.log("selected quarter = ?")};
            // selectedQuarter = 0
            selectedQuarter = selectedTaxYear + "_Q0"
    }

    let vTotalGrossQtr = 0;
    let vFuelPurchaseTotalQtr = 0;
    let vVehicleServiceScheduledQtr = 0;
    let vVehicleServiceNonScheduledQtr = 0;
    let vVehicleRepairsQtr = 0;
    let vVehicleTyresReplaceQtr = 0;
    let vVehicleTyresRepairQtr = 0;
    let vVehicleInsurancePremiumQtr = 0;
    let vVehicleInsuranceExcessQtr = 0;
    let vOtherCostDollars1Qtr = 0;

    let dayBookMonth;
    let dayBookQuarter;
    let dayBookTaxYear;
    for (var i=0; i < aDriverDayBook.length; i++){
        if(aDriverDayBook[i].xDate){
            // if(consoleOn===true){console.log(aDriverDayBook[i].xDate)};
            dayBookTaxYear = new Date(aDriverDayBook[i].xDate).getFullYear();
            dayBookMonth = new Date(aDriverDayBook[i].xDate).getMonth() + 1;
            if(dayBookMonth>6){
                dayBookTaxYear = `${dayBookTaxYear}-${dayBookTaxYear+1}`;
            } else {
                dayBookTaxYear = `${dayBookTaxYear-1}-${dayBookTaxYear}`;
            }
            // if(consoleOn===true){console.log(dayBookTaxYear,dayBookMonth)};
            switch(true) {
                case dayBookMonth <= 3:
                    // if(consoleOn===true){console.log("dayBook quarter = 3")};
                    // dayBookQuarter = 3
                    dayBookQuarter = dayBookTaxYear + "_Q3"
                    break;
                case dayBookMonth <= 6:
                    // if(consoleOn===true){console.log("dayBook quarter = 4")};
                    // dayBookQuarter = 4
                    dayBookQuarter = dayBookTaxYear + "_Q4"
                    break;
                case dayBookMonth <= 9:
                    // if(consoleOn===true){console.log("dayBook quarter = 1")};
                    // dayBookQuarter = 1
                    dayBookQuarter = dayBookTaxYear + "_Q1"
                    break;
                case dayBookMonth <= 12:
                    // if(consoleOn===true){console.log("dayBook quarter = 2")};
                    // dayBookQuarter = 2
                    dayBookQuarter = dayBookTaxYear + "_Q2"
                    break;
                default:
                    // if(consoleOn===true){console.log("dayBook quarter = ?")};
                    // dayBookQuarter = 0
                    dayBookQuarter = dayBookTaxYear + "_Q0"
            }
            // if(consoleOn===true){console.log('dayBookQuarter:- ',dayBookQuarter)};
            // if(consoleOn===true){console.log('date / quarter / selected quarter :- ', aDriverDayBook[i].xDate,dayBookQuarter,selectedQuarter)};
            if (dayBookQuarter===selectedQuarter){
                // if(consoleOn===true){console.log(aDriverDayBook[i].xDate,dayBookQuarter,selectedQuarter)};
                vTotalGrossQtr += aDriverDayBook[i].xTotalGross * 1;
                vFuelPurchaseTotalQtr += aDriverDayBook[i].xFuelPurchaseTotal * 1;
                vVehicleServiceScheduledQtr += aDriverDayBook[i].xVehicleServiceScheduled * 1;
                vVehicleServiceNonScheduledQtr += aDriverDayBook[i].xVehicleServiceNonScheduled * 1;
                vVehicleRepairsQtr  += aDriverDayBook[i].xVehicleRepairs * 1;
                vVehicleTyresReplaceQtr  += aDriverDayBook[i].xVehicleTyresReplace * 1;
                vVehicleTyresRepairQtr  += aDriverDayBook[i].xVehicleTyresRepair * 1;
                vVehicleInsurancePremiumQtr  += aDriverDayBook[i].xVehicleInsurancePremium * 1;
                vVehicleInsuranceExcessQtr  += aDriverDayBook[i].xVehicleInsuranceExcess * 1;
                vOtherCostDollars1Qtr  += aDriverDayBook[i].xOtherCostDollars1 * 1;
            }
            document.getElementById("vTotalGrossQtr").value = (vTotalGrossQtr).toFixed(2);
            document.getElementById("vFuelPurchaseTotalQtr").value = vFuelPurchaseTotalQtr.toFixed(2);
            document.getElementById("vVehicleServiceScheduledQtr").value = vVehicleServiceScheduledQtr.toFixed(2);
            document.getElementById("vVehicleServiceNonScheduledQtr").value = vVehicleServiceNonScheduledQtr.toFixed(2);
            document.getElementById("vVehicleRepairsQtr").value = vVehicleRepairsQtr.toFixed(2);
            document.getElementById("vVehicleTyresReplaceQtr").value = vVehicleTyresReplaceQtr.toFixed(2);
            document.getElementById("vVehicleTyresRepairQtr").value = vVehicleTyresRepairQtr.toFixed(2);
            document.getElementById("vVehicleInsurancePremiumQtr").value = vVehicleInsurancePremiumQtr.toFixed(2);
            document.getElementById("vVehicleInsuranceExcessQtr").value = vVehicleInsuranceExcessQtr.toFixed(2);
            document.getElementById("vOtherCostDollars1Qtr").value = vOtherCostDollars1Qtr.toFixed(2);
        
    
        
            // // if(consoleOn===true){console.log(aDriverDayBook[i].xDate)};
            // if (aDriverDayBook[i].xDate===statDate.toISOString().slice(0,10)){
            //     // if(consoleOn===true){console.log(aDriverDayBook[i].xDate,statDate.toISOString().slice(0,10),i)};
            //     vTotalGross += aDriverDayBook[i].xTotalGross * 1;
            //     vKlms += aDriverDayBook[i].xKlms * 1;
            //     vTrips += aDriverDayBook[i].xTrips * 1
            //     vHours += aDriverDayBook[i].xHoursOnline * 1
            //     vMinutes += aDriverDayBook[i].xMinutesOnline * 1
            //     vIncentiveNOTIncludedInGross += aDriverDayBook[i].xIncentiveNOTIncludedInGross * 1
            //     vFuelPurchaseTotal += aDriverDayBook[i].xFuelPurchaseTotal * 1
            // }
        }
    }

    // const basQtr1DateStart = new Date("01-07" + xDate.getFullYear());
    // const basQtr1DateEnd = new Date("30-09" + xDate.getFullYear());
    // const basQtr2DateStart = new Date("01-10" + xDate.getFullYear());
    // const basQtr2DateEnd = new Date("31-12" + xDate.getFullYear());
    // const basQtr3DateStart = new Date("01-01" + xDate.getFullYear());
    // const basQtr3DateEnd = new Date("31-03" + xDate.getFullYear());
    // const basQtr4DateStart = new Date("01-04" + xDate.getFullYear());
    // const basQtr4DateEnd = new Date("30-06" + xDate.getFullYear());


    const d0 = new Date(myDate);
    const d0Day = new Date(myDate).getDay();

    // if(consoleOn===true){console.log(d0)};
    // Sunday is the start of the week
        let standardWeekBeginDate = new Date(d0 - (86400000 * d0Day));
        const dStdDay = new Date(standardWeekBeginDate).getDay();
        if (dStdDay===0){
            standardWeekBeginDate = new Date(d0 - (86400000 * d0Day));
        } else {
            standardWeekBeginDate = new Date(d0 * 1 - (86400000 * 7));
        }
        // if(consoleOn===true){console.log("standard week start date = " + standardWeekBeginDate.toDateString())};
    // Sunday is the start of the week
    // Uber week starts on Monday
        let uberWeekBeginDate = 0;
        if (d0Day===0){
            uberWeekBeginDate = new Date(standardWeekBeginDate * 1 - (86400000 * 6));
        } else {
            uberWeekBeginDate = new Date(standardWeekBeginDate * 1 + (86400000 * 1));
        }
        // if(consoleOn===true){console.log("Uber week start date = " + uberWeekBeginDate.toDateString())};
    // Uber week starts on Monday
    // if(consoleOn===true){console.log("updateWeekStats for " + myDate + " Weekday " + d0Day + " week start date = " + uberWeekBeginDate.toDateString())};
    // if(consoleOn===true){console.log("\n")};

    let statDate;
    let vTotalGross = 0;
    let vKlms = 0;
    let vTrips = 0;
    let vIncentiveNOTIncludedInGross = 0;
    let vFuelPurchaseTotal = 0;
    let vHours = 0;
    let vMinutes = 0;
    for (d = 0; d < 7; d++){
        statDate = new Date(uberWeekBeginDate * 1 + (86400000 * d));
        // if(consoleOn===true){console.log(statDate.toISOString().slice(0,10))};
        for (var i=0; i < aDriverDayBook.length; i++){
            // if(consoleOn===true){console.log(aDriverDayBook[i].xDate)};
            if (aDriverDayBook[i].xDate===statDate.toISOString().slice(0,10)){
                // if(consoleOn===true){console.log(aDriverDayBook[i].xDate,statDate.toISOString().slice(0,10),i)};
                vTotalGross += aDriverDayBook[i].xTotalGross * 1;
                vKlms += aDriverDayBook[i].xKlms * 1;
                vTrips += aDriverDayBook[i].xTrips * 1
                vHours += aDriverDayBook[i].xHoursOnline * 1
                vMinutes += aDriverDayBook[i].xMinutesOnline * 1
                vIncentiveNOTIncludedInGross += aDriverDayBook[i].xIncentiveNOTIncludedInGross * 1
                vFuelPurchaseTotal += aDriverDayBook[i].xFuelPurchaseTotal * 1
            }
        }
    }
    // if(consoleOn===true){console.log(vTotalGross,vKlms,vTotalGross/vKlms)};
    document.getElementById("vTotalGross").value = (vTotalGross).toFixed(2);
    document.getElementById("vKlms").value = (vKlms).toFixed(1);
    document.getElementById("vGrossPerKlm").value = (vTotalGross / vKlms).toFixed(2);
    document.getElementById("vTrips").value = vTrips;
    document.getElementById("vGrossPerTrip").value = (vTotalGross / vTrips).toFixed(2);
    document.getElementById("vHours").value = (vHours + (vMinutes / 60)).toFixed(1);
    document.getElementById("vGrossPerHour").value = (vTotalGross / (vHours + (vMinutes / 60))).toFixed(2);
    document.getElementById("vIncentiveNOTIncludedInGross").value = vIncentiveNOTIncludedInGross;
    document.getElementById("vFuelPurchaseTotal").value = vFuelPurchaseTotal;
}
// UPDATE QTR STATS end

// dateChange() START
function dateChange(){

    const datval_xDate = document.getElementById("x_Date");
    let d = new Date(datval_xDate.value).getDay();
    document.getElementById("weekdayText").innerHTML = dayNames[d];
    // if(consoleOn===true){console.log(datval_xDate)};
    // if(consoleOn===true){console.log(datval_xDate.value)};

    // get xEndingOdometre from the previous date START
        if(datval_xDate.value){

        }
    // get xEndingOdometre from the previous date END

    const frm = document.getElementById("driver-day-book");
    // if(consoleOn===true){console.log(frm)};

    document.getElementById("dateFixedPos").innerHTML = datval_xDate.value;
    // document.getElementById("dateFixedPosDay").innerHTML = dayNames[d];
    document.getElementById("weekSummary1").innerHTML = `&nbspWeek Summary - ${dayNames[d]}`;
    document.getElementById("weekSummary2").innerHTML = `&nbspWeek Net Profit Estimate - ${dayNames[d]}`;

    // re-set HTML form to null values, except for the date field START ~~~~~~~~~~~~~~~~~~~~~~~~~
        Array.from(frm.elements).forEach((input) => {
            if (input.name==="x_Date"){
            } else {
                if (input.name.slice(0,1)==="x_"){
                    document.getElementById(input.name).value = "";
                }
            }
        });
    // re-set HTML form to null values, except for the date field END ~~~~~~~~~~~~~~~~~~~~~~~~~

    for (var i=0; i < aDriverDayBook.length; i++){
        // if(consoleOn===true){console.log(aDriverDayBook[i].xDate,datval_xDate.value)};
        if (aDriverDayBook[i].xDate===datval_xDate.value){
            // if(consoleOn===true){console.log(aDriverDayBook[i].xDate,datval_xDate.value,i)};
            for (const key in aDriverDayBook[i]){
                // if(consoleOn===true){console.log(key)};
                // if(consoleOn===true){console.log(`${key}:${aDriverDayBook[i][key]}`)};
                if (aDriverDayBook[i][key].length>0){
                    // if(consoleOn===true){console.log([key])};
                    // if(consoleOn===true){console.log([key][0].slice(0,1))};
                    if ([key][0].slice(0,1)==="x_"){
                        // if(consoleOn===true){console.log(aDriverDayBook[i][key])};
                        document.getElementById(key).value = aDriverDayBook[i][key];
                    }
                }
            }
            break;
        } else {
            for (const key in aDriverDayBook[i]){
                // if(consoleOn===true){console.log(key)};
                // // if(consoleOn===true){console.log(`${key}:${aDriverDayBook[i][key]}`)};
                if (aDriverDayBook[i][key].length>0){
                    // if(consoleOn===true){console.log(key)};
                    if(document.getElementById(key)){
                        // if(consoleOn===true){console.log(key)};
                        if(document.getElementById(key).classList){
                            if(document.getElementById(key).classList.contains("initToZero")){
                                // if(consoleOn===true){console.log(key)};
                                document.getElementById(key).value = "0";
                            } else {
                                // if(consoleOn===true){console.log(key)};
                                // DO NOTHING
                            }
                        }
                    }
                }
            }
        }
    }
    updateWeekStats(datval_xDate.value);
    updateQtrStats(datval_xDate.value);
    calcNetB4tax();
    calcNetB4taxWeek();
}
// dateChange() END

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
    // if(consoleOn===true){console.log("v_timeStampString:- ",v_timeStampStr)};
    return v_timeStampStr;
}

// CHECK OUT user file START
async function checkOutUserFiles(userPIN){
    if(consoleOn===true){console.log('checkOut')};
    const v_data = JSON.stringify(
        {
            v_userPIN: userPIN
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    if(consoleOn===true){console.log('/checkOut options:- ',v_options)};
    await fetch('/checkOut',v_options)
    .then(res => {
        if(consoleOn===true){console.log('checkOut:- res.body:- ',res.body)};
        if(consoleOn===true){console.log('checkOut:- res.json():- ',res.json())};
        return res.json();
        // return res.tex4t();
    })
    .then((res_data) => {
        if(consoleOn===true){console.log('checkOut:-\n jsonObject:- res_data\n',res_data)};
        if(consoleOn===true){console.log('checkOut:-\n jsonObject:- res_data[1].v_emailAddress\n',res_data[1].v_emailAddress)};
        aDriverDayBook = res_data;
        if(consoleOn===true){console.log('checkOut:- jsonObject:- ',JSON.stringify(res_data))};
        if(consoleOn===true){console.log('checkOut:- jsonObject:- ',JSON.parse(res_data))};
        // writeToLocalStorage('clickedTickerPrice',res_data.price);
        // writeToLocalStorage('clickedTickerDateTime',v_dateTime);
        // writeToLocalStorage(`lastPrice_CommSec_${p_ticker}`,res_data.price);
        // writeToLocalStorage(`lastDateTime_CommSec_${p_ticker}`,v_dateTime);
        // return res_data.price;
    })
    if (document.getElementById("driverRecordsContainer").style.display==="flex"){
        document.getElementById("dateNavigationButtonsContainer").style.display = "none";
        document.getElementById("driverRecordsContainer").style.display = "none";
        document.getElementById("originalBody").style.display = "body";
        document.getElementById("driverRecordsAccessControl").style.display = "body";
        // document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "none";
    } else {
        document.getElementById("dateNavigationButtonsContainer").style.display = "flex";
        document.getElementById("driverRecordsContainer").style.display = "flex";
        document.getElementById("originalBody").style.display = "none";
        document.getElementById("driverRecordsAccessControl").style.display = "none";
        // document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "body";
    }
    document.getElementById("x_EndingOdometre").focus();
    document.getElementById("x_EndingOdometre").select();

    if(consoleOn===true){console.log(aDriverDayBook)};
    // const containsText = (element) => element.includes("2024-01-15");
    if(consoleOn===true){console.log(aDriverDayBook.findIndex(containsText))};
    for (i=0;i<aDriverDayBook.length;i++){
        if(consoleOn===true){console.log(JSON.stringify(aDriverDayBook[i]))};
        txt = JSON.stringify(aDriverDayBook[i]);
        if(consoleOn===true){console.log(txt.search("2024-01-15"))};
        if (txt.search("2024-01-15")>=0){

        };
    }

    if(consoleOn===true){console.log(aDriverDayBook.v_emailAddress)};
    if(consoleOn===true){console.log(aDriverDayBook)};
    if(consoleOn===true){console.log(JSON.stringify(aDriverDayBook))};
    // aDriverDayBook.push(JSON.parse(`{"Date":20231226,"Odometre":64000}`));
    if(consoleOn===true){console.log(aDriverDayBook)};
    if(consoleOn===true){console.log(JSON.stringify(aDriverDayBook))};
} 
// CHECK OUT user file END

function driverRecordsAccess(e){
    // if(consoleOn===true){console.log(e.value)};
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
            // if(consoleOn===true){console.log(newUserEmailAddress)};
            create(newUserEmailAddress);
        }
    }
}

// create user file - start \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// async function create(newUserEmailAddress){
async function create(uEmail){
    // if(consoleOn===true){console.log('create')};
    // const userW = document.getElementById("pw").value;
    // const userW2 = document.getElementById("pw2").value;
    // const uEmail = document.getElementById("uEmail").value;
    // if(userW != userW2){
    //     alert("passwords do not match");
    //     return;
    // }
    const v_data = JSON.stringify(
        {
            v_userW: "",
            v_uEmail: uEmail
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(consoleOn===true){console.log('/create options:- ',v_options)};
    await fetch('/create',v_options)
    .then(res => {
        if(consoleOn===true){console.log('create:- res:- ',res)};
        return res.json();
        // return res.body;
    })
    .then((res_data) => {
        if(consoleOn===true){console.log('create:- res_data:- ',res_data)};
        // writeToLocalStorage('clickedTickerPrice',res_data.price);
        // writeToLocalStorage('clickedTickerDateTime',v_dateTime);
        // writeToLocalStorage(`lastPrice_CommSec_${p_ticker}`,res_data.price);
        // writeToLocalStorage(`lastDateTime_CommSec_${p_ticker}`,v_dateTime);
        // return res_data.price;
        alert(`Account for email address "${uEmail}" has been created.\n\nPlease click the login button again to log in.`);
    })
}
// create user file - end /////////////////////////////////////////////////////////////////////////////////////////////////

// login - start \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function login(){
    // if(consoleOn===true){console.log('login')};
    // const userW = document.getElementById("pw").value;
    const uEmail = document.getElementById("uEmail").value;
    // if(consoleOn===true){console.log(uEmail.length)};
    if (uEmail.length === 0){
        alert("Plese enter an email address and ry again.");
        return;
    }
    const v_data = JSON.stringify(
        {
            // v_userW: userW,
            v_uEmail: uEmail
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(consoleOn===true){console.log('/login options:- ' + v_options)};
    await fetch('/login1',v_options)
    .then(res => {
        // if(consoleOn===true){console.log('login:- res.body:- ' + res.body)};
        // if(consoleOn===true){console.log('login:- res.json():- ',res.json())};
        return res.json();
        // return res.tex4t();
    })
    .then((res_data) => {
        // if(consoleOn===true){console.log('login:-\n jsonObject:- res_data\n' + res_data)};
        // if(consoleOn===true){console.log('login:-\n jsonObject:- res_data[1].v_emailAddress\n',res_data[2].v_uEmail)};
        // aDriverDayBook = res_data;
        // if(consoleOn===true){console.log('login:- jsonObject:- ',JSON.stringify(res_data))};
        // if(consoleOn===true){console.log('login:- jsonObject:- ',JSON.parse(res_data))};
        if(res_data[0].response === "login1 ok"){
            // if(consoleOn===true){console.log(res_data[0].response)};
            document.getElementById("login1").style.display = "none";
            // document.getElementById("login2").style.display = "body";
            document.getElementById("login2").style.display = "block";
            document.getElementById("login2code").focus();
            document.getElementById("login2code").select();
            document.getElementById("login2code").addEventListener("blur",(event) =>{
                document.getElementById("login2Button").focus();
            });

       } else {
            // if(consoleOn===true){console.log(res_data[0].response)};
            // create account
            // create(uEmail);
            newUserSetup(uEmail);
        }
    });

} 
// login - end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// login2fa - start \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function login2(){
    const uEmail = document.getElementById("uEmail").value;
    // const uEmail = "donald.garton@outlook.com";
    const accessCode = document.getElementById("login2code").value;
    // const accessCode = "06";
    const v_data = JSON.stringify(
        {
            v_uEmail: uEmail,
            v_accessCode: accessCode
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(consoleOn===true){console.log('/login2 options:- ',v_options)};
    await fetch('/login2',v_options)
    .then(res => {
        // if(consoleOn===true){console.log('login2:- res.body:- ',res.body)};
        // if(consoleOn===true){console.log('login:- res.json():- ',res.json())};
        return res.json();
        // return res.tex4t();
    })
    .then((res_data) => {
        // if(consoleOn===true){console.log('login2:-\n jsonObject:- res_data\n',res_data)};
        // if(consoleOn===true){console.log('login:-\n jsonObject:- res_data[1].v_emailAddress\n',res_data[2].v_uEmail)};
        // if(consoleOn===true){console.log('login:- jsonObject:- ',JSON.stringify(res_data))};
        // if(consoleOn===true){console.log('login:- jsonObject:- ',JSON.parse(res_data))};
        if(res_data[2].v_uEmail === uEmail){

            aDriverDayBook = res_data;
            // if(consoleOn===true){console.log(res_data)};
            // document.getElementById("login1").style.display = "none";
            // document.getElementById("login2").style.display = "body";
            document.getElementById("login2").style.display = "none";
            if (document.getElementById("driverRecordsContainer").style.display==="flex"){
                document.getElementById("dateNavigationButtonsContainer").style.display = "none";
                document.getElementById("driverRecordsContainer").style.display = "none";
                document.getElementById("originalBody").style.display = "body";
                document.getElementById("driverRecordsAccessControl").style.display = "body";
                // document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "none";
            } else {
                document.getElementById("dateNavigationButtonsContainer").style.display = "flex";
                document.getElementById("driverRecordsContainer").style.display = "flex";
                document.getElementById("originalBody").style.display = "none";
                document.getElementById("driverRecordsAccessControl").style.display = "none";
                // document.getElementById("IndexedDB_rsd_rsdDayBook").style.display = "body";
                document.getElementById("login1").style.display = "none";
            }
            var v_today = new Date();
            // document.getElementById("x_Date").value = "2000-01-01";

            const currentIsoDateString = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString();
            // if(consoleOn===true){console.log(currentIsoDateString)};
            // document.getElementById("x_Date").value = v_today.toISOString().slice(0,10);
            document.getElementById("x_Date").value = currentIsoDateString.slice(0,10);

            dateChange();
            document.getElementById("x_EndingOdometre").focus();
            document.getElementById("x_EndingOdometre").select();
        
            window.localStorage.setItem("rsd_uEmail" ,document.getElementById("uEmail").value);
        
        } else {
            alert(res_data[0].response);
            return;
        }
    });
}
// login2fa - end \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// save to Local Storage START
function saveDriverDayBookRecord(){
    // save to Local Storage
    // if(consoleOn===true){console.log(aDriverDayBook)};
    const xTimeStamp = timeStampString();
    let txtHeaderRow = "";
    let txtDataRow = "";
    let txtDataRowValue = "";
    let txtDayBookEntry = "";
    txtDayBookEntry += "{";
    addCommaPrefix = false;
    const frm = document.getElementById("driver-day-book");
    Array.from(frm.elements).forEach((input) => {
        if (input.name.slice(0,1)==="x_"){
            txtHeaderRow += input.name + " , ";
            txtDataRowValue = input.value;
            if(txtDataRowValue.slice(0,1)==="0"){
                if(consoleOn===true){console.log("txtDataRowValue:- " + txtDataRowValue)};
                txtDataRowValue = removeLeadingZeros(txtDataRowValue);
                txtDataRow += txtDataRowValue + " , ";
            } else {
                if(consoleOn===true){console.log("txtDataRowValue:- " + txtDataRowValue)};
                txtDataRow += txtDataRowValue + " , ";
            }
            if(consoleOn===true){console.log(input.name + " | " + input.value)};
            if(!addCommaPrefix){
                addCommaPrefix = true;
                // txtDayBookEntry += `"${input.name}":"${input.value}"`;
                txtDayBookEntry += `"${input.name}":"${txtDataRowValue}"`;
            } else {
                // txtDayBookEntry += `,"${input.name}":"${input.value}"`;
                txtDayBookEntry += `,"${input.name}":"${txtDataRowValue}"`;
            }
        }
    });
    txtDayBookEntry += `,"x_TimeStamp":"${xTimeStamp}"}`;
    if(consoleOn===true){console.log("txtDayBookEntry:-/n",txtDayBookEntry)};
    window.localStorage.setItem("rsd!" + xDate.value + "[" + xTimeStamp + "_0]head" ,txtHeaderRow);
    window.localStorage.setItem("rsd!" + xDate.value + "[" + xTimeStamp + "_1]data" ,txtDataRow);
    if(consoleOn===true){console.log("localStorage done")};
    // saves to Local Storage

    // if(consoleOn===true){console.log(aDriverDayBook.findIndex(element === `{xDate: "${xDate.value}"}`))};
    // if(consoleOn===true){console.log(txtDayBookEntry)};
    // if(consoleOn===true){console.log(`{xDate: "${xDate.value}"}`);
    // const entryExists = (element) => element === `{xDate: "${xDate.value}"}`;
    const entryExists = (element) => element.xDate === `${xDate.value}`;
    const entryExistsAtIndex = aDriverDayBook.findIndex(entryExists);
    // if(consoleOn===true){console.log(entryExistsAtIndex)};
    if (entryExistsAtIndex > 0){
        // if(consoleOn===true){console.log(aDriverDayBook)};
        const removed = aDriverDayBook.splice(entryExistsAtIndex, 1);
        // if(consoleOn===true){console.log(removed)};
        // if(consoleOn===true){console.log(aDriverDayBook)};
    }
    aDriverDayBook.push(JSON.parse(txtDayBookEntry));
    // if(consoleOn===true){console.log(aDriverDayBook)};
    // if(consoleOn===true){console.log(JSON.stringify(aDriverDayBook))};
    storeFormDataInIndexedDB();
    updateaDriverDayBook(aDriverDayBook);
}
// save to Local Storage END

// save to IndexedDB START
function storeFormDataInIndexedDB(){
    // var v_elements = document.getElementsByTagName("input");
    var v_elements = document.getElementsByClassName("x_Data");
    // if(consoleOn===true){console.log(v_elements)};
    var v_objectString = `{`;
    for (var i = 0; i < v_elements.length; i++) {
        v_fieldName = v_elements[i].name;
        v_fieldValue = v_elements[i].value;
        if (v_fieldName.slice(0,1)==="x_"){
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
    if(consoleOn===true){console.log("indexedDB done")};
}
// save to IndexedDB END

// updateaDriverDayBook() START \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
async function updateaDriverDayBook(aDriverDayBook){
    // if(consoleOn===true){console.log('updateaDriverDayBook() triggered')};
    // if(consoleOn===true){console.log(aDriverDayBook)};
    const v_data = JSON.stringify(aDriverDayBook);
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(consoleOn===true){console.log('/update options:- ',v_options)};
    await fetch('/update',v_options)
    .then(res => {
        // if(consoleOn===true){console.log('update:- res:- ',res)};
        return res.json();
        // return res.body;
    })
    .then((res_data) => {
        // if(consoleOn===true){console.log('update:- ...:- ',res_data)};
        // if (res_data==JSON.parse(v_data)){
        if (JSON.stringify(res_data)===v_data){
            alert("updated ok");
        } else {
            alert("update error!");
            // if(consoleOn===true){console.log(res_data)};
            // if(consoleOn===true){console.log(JSON.parse(v_data))};
            // if(consoleOn===true){console.log(JSON.stringify(res_data))};
            // if(consoleOn===true){console.log(v_data)};
        };
    })
}
// updateaDriverDayBook() END ////////////////////////////////////////////////////////////

function emailMyDeviceDataTo_OLD1(){
        let aRSDdata = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).slice(0,4)==="rsd!"){
                // if(consoleOn===true){console.log(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ")};
                // if(consoleOn===true){console.log(localStorage.getItem(localStorage.key(i)) + localStorage.key(i) + " , ")};
                // aRSDdata.push(localStorage.getItem(localStorage.key(i)) + " , " + localStorage.key(i) + " , ");
                aRSDdata.push(localStorage.getItem(localStorage.key(i)) + localStorage.key(i) + " , ");
            }
        }
        aRSDdata.sort();
        aRSDdata.reverse();
        // if(consoleOn===true){console.log(aRSDdata)};
        let vTEXT = "";
        for (let i = 0; i < aRSDdata.length; i++) {
            vTEXT += aRSDdata[i] + `%0D%0A`;
        }
        // if(consoleOn===true){console.log(vTEXT)};
        var emailSubject = "Ride Share Driver Australia - driver's day records - comma separated for spreadsheet compatibility";
        window.location.href = "mailto:?subject=" + emailSubject + "&body=" + vTEXT;
}
function emailMyDeviceDataTo_OLD2(){
    let aRSDdata = [];
    let aRSDdataRow = [];
    let aRSDdataRowSplit = [];
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).slice(0,4)==="rsd!"){
            aRSDdataRowSplit = localStorage.getItem(localStorage.key(i)).split(",");
            aRSDdataRowSplit.push(localStorage.key(i));
            for (let a = 0; a < aRSDdataRowSplit.length; a++) {
                // if(consoleOn===true){console.log(i,a,aRSDdataRowSplit[a])};
            }
            aRSDdataRow = localStorage.getItem(localStorage.key(i)) + localStorage.key(i);
            aRSDdata.push(aRSDdataRow);
        }
    }
    // aRSDdata.sort();
    // aRSDdata.reverse();
    // if(consoleOn===true){console.log(aRSDdata)};
    // if(consoleOn===true){console.log(aRSDdata[0])};
    // if(consoleOn===true){console.log(aRSDdata[0].indexOf("_0]head"))};
    let vTEXT = ``;
    vTEXT += aRSDdata[0] + `%0D%0A`;
    for (let i = 0; i < aRSDdata.length; i++) {
        if (aRSDdata[i].indexOf("_0]head")<0){
            vTEXT += aRSDdata[i] + `%0D%0A`;
        }
    }
    // if(consoleOn===true){console.log(vTEXT)};
    var emailSubject = "Ride Share Driver Australia - driver's day records - comma separated for spreadsheet compatibility";
    window.location.href = "mailto:?subject=" + emailSubject + "&body=" + vTEXT;
}
function emailMyDeviceDataTo_OLD3(){
    let _text = ``;
    for (var i=0; i < aDriverDayBook.length; i++){
        for (const key in aDriverDayBook[i]){
            _text += `${key}: ${aDriverDayBook[i][key]}`+ `%0D%0A`;
        }
    }
    var emailSubject = "Ride Share Driver Australia - driver's day book records";
    window.location.href = "mailto:?subject=" + emailSubject + "&body=" + _text;
}
async function emailMyDeviceDataTo(){
    // const v_data = JSON.stringify(aDriverDayBook);
    const v_data = JSON.stringify(
        {
            v_uEmail: document.getElementById("uEmail").value
        }
    );
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    // if(consoleOn===true){console.log('/emailData options:- ',v_options)};
    await fetch('/emailData',v_options)
    .then(res => {
        // if(consoleOn===true){console.log('emailData:- res:- ',res)};
        return res.json();
        // return res.body;
    })
    .then((res_data) => {
        // if(consoleOn===true){console.log(res_data.response)};
        alert(res_data.response);
        // if (res_data==JSON.parse(v_data)){
        // if (JSON.stringify(res_data)===v_data){
        //     alert("updated ok");
        // } else {
        //     alert("update error!");
        //     // if(consoleOn===true){console.log(res_data)};
        //     // if(consoleOn===true){console.log(JSON.parse(v_data))};
        //     // if(consoleOn===true){console.log(JSON.stringify(res_data))};
        //     // if(consoleOn===true){console.log(v_data)};
        // };
    })
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
                // if(consoleOn===true){console.log(i,a,aRSDdataRowSplit[a])};
            }
            aRSDdataRow = localStorage.getItem(localStorage.key(i)) + localStorage.key(i);
            aRSDdata.push(aRSDdataRow);
        }
    }
    // aRSDdata.sort();
    // aRSDdata.reverse();
    // if(consoleOn===true){console.log(aRSDdata)};
    // if(consoleOn===true){console.log(aRSDdata[0])};
    // if(consoleOn===true){console.log(aRSDdata[0].indexOf("_0]head"))};
    let vHTML = ``;
    vHTML += aRSDdata[0] + `<br>`;
    for (let i = 0; i < aRSDdata.length; i++) {
        if (aRSDdata[i].indexOf("_0]head")<0){
            vHTML += aRSDdata[i] + `<br>`;
        }
    }
    // if(consoleOn===true){console.log(vHTML)};
    document.getElementById("displayLocalStorage").innerHTML = vHTML;
}
function sumTolls(){
    let tollsNumber = 0;
    tollsNumber = window.prompt('Enter a number to add to Tolls (negatives allowed, use -), then click OK.',tollsNumber);
    // if(consoleOn===true){console.log(tollsNumber)};
    if (!tollsNumber){
        // document.getElementById("x_Tolls").blur();
    } else {
        tollsNumber = tollsNumber * 1;
        // if(consoleOn===true){console.log(tollsNumber)};
        tollsNumber += document.getElementById("x_Tolls").value * 1;
        // if(consoleOn===true){console.log(tollsNumber)};
        document.getElementById("x_Tolls").value = tollsNumber;
    }
}