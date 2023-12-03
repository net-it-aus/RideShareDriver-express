async function auditTrail(p_trxObjStr) {
    const v_data = JSON.stringify(p_trxObjStr);
    // const v_data = JSON.stringify(
        // {
        //     f_nameID_INtimes: document.getElementById("dataEntryNameID").value,
        //     f_courseID_INtimes: v_coursesID,
        //     f_clubName_INtimes: document.getElementById("dataEntryClubName").value,
        //     f_clubID_INtimes: document.getElementById("dataEntryClubID").value * 1,
        //     f_date: document.getElementById("timesDate").value,
        //     f_actualDistanceInMetres: document.getElementById("timesActualDistance").value * 1,
        //     f_hours: document.getElementById("timesHours").value * 1,
        //     f_minutes: document.getElementById("timesMinutes").value * 1,
        //     f_seconds: document.getElementById("timesSeconds").value * 1,
        //     f_elevationGain: document.getElementById("timesElevationGain").value * 1,
        //     f_mode: document.getElementById("timesActivity").value,
        //     f_totalMinutes: round(calcTotalMinutes(),4),
        //     f_speed: round(calcKlmPerHour(),4),
        //     f_minutesPerKlm: round(calcMinPerKlm(),4),
        //     f_minutesPerKlm_mmss: calcMinPerKlm_mmss()
        // });
    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body: v_data};
    if(v_clientOS=="Windows"){console.log('/auditTrail options:- ',v_options);}
    await fetch('/auditTrail',v_options).then(res => {
        return res.json();
    }).then((res_data) => {
    if (res_data.affectedRows > 1){
        // if(clientOS=="Windows"){console.log('Error - inserted more than 1 row! - ',res_data.affectedRows)};
        // alert('error occurred!');
    } else {
        // if(clientOS=="Windows"){console.log('/insertTimeRecordSQL - POST fetch request sent to server',v_options);}
        // if(clientOS=="Windows"){console.log('/insertTimeRecordSQL - ID added:-',res_data.insertId);}
        // alert('time recorded, OK');
    }
    })
}

// GEOLOCATION start
async function showPosition(position) {
    if(v_clientOS=="Windows"){console.log("position:- " + position);}
    var v_geolocation  = "Lat: " + position.coords.latitude + "Long: " + position.coords.longitude;
    if(v_clientOS=="Windows"){console.log("v_geolocation 1 :- " + v_geolocation);}
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
        if(v_clientOS=="Windows"){console.log("v_geolocation 2 :- " + v_geolocation);}
    }
    return v_geolocation
}
// GEOLOCATION end


async function idbAdd(p_database,p_store,p_form){

    // add
    var v_elements = document.getElementsByTagName("input");
    // v_id = '1';
    // v_trxObjStr += `{id:"` + v_id + `",`;
    var v_geolocation = await getLocation();
    var v_trxObjStr = `{"geolocation":"` + v_geolocation + `",`;
    for (var i = 0; i < v_elements.length; i++) {
        v_key = v_elements[i].name;
        v_value = v_elements[i].value;
        if (i+1==v_elements.length){
            v_trxObjStr += `"` + v_key + `":"` + v_value + `",`;
            var v_date = new Date();
            v_trxObjStr += `"trxLocalDateTime":"` + v_date.toLocaleString('en-AU').slice(0,25) + `",`;
            v_trxObjStr += `"trxLocalDate":"` + v_date.toLocaleDateString('en-AU').slice(0,15) + `",`;
            // v_trxObjStr += `"trxLocalDate2":"` + ("0" + v_date.getDate()).slice(-2) + "-" + ("0"+(v_date.getMonth()+1)).slice(-2) + "-" + v_date.getFullYear() + `",`;
            if(v_date.getHours()<=12){var v_amORpm='am';}else{var v_amORpm='pm';}
            v_trxObjStr += `"trxSortDateTime":"` + v_date.getFullYear() +'-'+ ("0"+(v_date.getMonth()+1)).slice(-2) +'-'+ ("0" + v_date.getDate()).slice(-2) + ' ' + ("0" + v_date.getHours()).slice(-2) +':'+ ("0" + v_date.getMinutes()).slice(-2) + v_amORpm + `",`;
            v_trxObjStr += `"trxFullDateTime":"` + new Date() + `"}`;
        }else{
            v_trxObjStr += `"` + v_key + `":"` + v_value + `",`;
        }
    }
    // if(v_clientOS=="Windows"){console.log('v_trxObjStr original:-\n',v_trxObjStr);}
    v_trxObjStr = JSON.parse(v_trxObjStr);
    if(v_clientOS=="Windows"){console.log('v_trxObjStr parsed:-\n',v_trxObjStr);}
    auditTrail(v_trxObjStr);

    if(v_clientOS=="Windows"){console.log('p_database:- ',p_database);}
    if(v_clientOS=="Windows"){console.log('p_store:- ',p_store);}
    if(v_clientOS=="Windows"){console.log('p_keyPath:- ',p_form);}

    var request = indexedDB.open(p_database); // first step is opening the database
    request.onsuccess = function(e) {
            var db =  e.target.result;
            var trans = db.transaction(p_store, 'readwrite'); //second step is opening the object store
            var store = trans.objectStore(p_store);
            
            var request = store.add(v_trxObjStr); // adding single object to object store
            
            request.onsuccess = function(e) {
                // showDetails(e.target.result); // data retreived I DON'T THINK THIS WORKS
                // if(v_clientOS=="Windows"){console.log(e.target.result);} // data retreived
                idbGetOne(p_database,p_store,e.target.result)
                db.close();
                idbGetAll(p_database,p_store)
            };
            
            request.onerror = function(e) {
                if(v_clientOS=="Windows"){console.log("Error Getting: ", e);}
            };
    };

}

function idbGetOne(p_database,p_store,p_keyPath){

    // get

    p_keyPath = p_keyPath * 1;

    if(v_clientOS=="Windows"){console.log('p_database:- ',p_database);}
    if(v_clientOS=="Windows"){console.log('p_store:- ',p_store);}
    if(v_clientOS=="Windows"){console.log('p_keyPath:- ',p_keyPath);}

    var request = indexedDB.open(p_database); // first step is opening the database
    request.onsuccess = function(e) {
            var db =  e.target.result;
            var trans = db.transaction(p_store, 'readwrite'); //second step is opening the object store
            var store = trans.objectStore(p_store);
            
            var request = store.get(p_keyPath); //getting single object by id from object store
            
            request.onsuccess = function(e) {
                if(v_clientOS=="Windows"){console.log(e.target.result);} // data retreived
                var myArrayOfKeys = Object.keys(e.target.result); // convert javascript object to an array
                var myArrayOfValues = Object.values(e.target.result); // convert javascript object to an array
                var myArray = Object.entries(e.target.result).map(([key, value]) => ({key,value})); // convert javascript object to an array
                // if(v_clientOS=="Windows"){console.log(myArray);} // data retreived
                var v_elements = document.getElementsByTagName("input");
                var v_element;
                for (var i = 0; i < myArray.length; i++) {
                    try {
                        if (myArray[i].key === "id"){
                            document.getElementById('e_dataSetKeyPath').innerHTML = myArray[i].value;
                        } else {
                            // if(v_clientOS=="Windows"){console.log(myArray[i].key + ': ' + myArray[i].value);}
                            document.getElementById(myArray[i].key).value = myArray[i].value;
                        }
                    }
                    catch(err) {
                        // errors will occur if an element does not exist on the form but an item exists in the store
                        // console.warn(err);
                    }
                }
                db.close();
                if (p_store==='rsdTrips'){
                    calcTrip();
                }
                if (p_store==='rsdCosts'){
                    calcCosts();
                }
            };
            
            request.onerror = function(e) {
                if(v_clientOS=="Windows"){console.log("Error Getting: ", e);}
            };
    };

}

function idbGetAll(p_database,p_store){

    // getAll

    var request = indexedDB.open(p_database); // first step is opening the database
    request.onsuccess = function(e) {
            var db =  e.target.result;
            var trans = db.transaction(p_store, 'readwrite'); //second step is opening the object store
            var store = trans.objectStore(p_store);
            
            var request = store.getAll(); //getting all objects from object store
            
            request.onsuccess = function(e) {
                // showDetails(e.target.result); // data retreived I DON'T THINK THIS WORKS
                // if(v_clientOS=="Windows"){console.log(e.target.result);} // data retreived
                dataSets.innerHTML = request.result
                .map(rsdStore =>{
                    switch(p_store) {
                        case 'rsdCosts':
                            return `<li keyPath="${rsdStore.id}" onclick="idbGetOne('rsd','rsdCosts','${rsdStore.id}')">[id${rsdStore.id}] [last update ${rsdStore.trxSortDateTime}] [named: ${rsdStore.f_dataSetName}]</li>`;
                            break;
                        case 'rsdTrips':
                            return `<li keyPath="${rsdStore.id}" onclick="idbGetOne('rsd','rsdTrips','${rsdStore.id}')">[id${rsdStore.id}] [last update ${rsdStore.trxSortDateTime}] [named: ${rsdStore.f_dataSetName}]</li>`;
                            break;
                        default:
                            // code block
                    }
                })
                .join(`\n`);
                db.close();
            };
            
            request.onerror = function(e) {
                if(v_clientOS=="Windows"){console.log("Error Getting: ", e);}
            };
    };

}

function idbUpdateOne(p_database,p_store,p_keyPath){

    if (p_store==='rsdTrips'){
        calcTrip();
    }
    if (p_store==='rsdCosts'){
        calcCosts();
    }

    // put

    p_keyPath = p_keyPath * 1;
    if (p_keyPath===0){
        alert('unable to update - no document selected');
        return;
    }

    if(v_clientOS=="Windows"){console.log('p_database:- ',p_database);}
    if(v_clientOS=="Windows"){console.log('p_store:- ',p_store);}
    if(v_clientOS=="Windows"){console.log('p_keyPath:- ',p_keyPath);}

    var v_elements = document.getElementsByTagName("input");
    // v_id = '1';
    var v_trxObjStr = `{`;
    v_trxObjStr += `"id":` + p_keyPath + `,`;
    for (var i = 0; i < v_elements.length; i++) {
        v_key = v_elements[i].name;
        v_value = v_elements[i].value;
        if (i+1==v_elements.length){
            v_trxObjStr += `"` + v_key + `":"` + v_value + `",`;
            var v_date = new Date();
            v_trxObjStr += `"trxLocalDateTime":"` + v_date.toLocaleString('en-AU').slice(0,25) + `",`;
            v_trxObjStr += `"trxLocalDate":"` + v_date.toLocaleDateString('en-AU').slice(0,15) + `",`;
            // v_trxObjStr += `"trxLocalDate2":"` + ("0" + v_date.getDate()).slice(-2) + "-" + ("0"+(v_date.getMonth()+1)).slice(-2) + "-" + v_date.getFullYear() + `",`;
            if(v_date.getHours()<=12){var v_amORpm='am';}else{var v_amORpm='pm';}
            v_trxObjStr += `"trxSortDateTime":"` + v_date.getFullYear() +'-'+ ("0"+(v_date.getMonth()+1)).slice(-2) +'-'+ ("0" + v_date.getDate()).slice(-2) + ' ' + ("0" + v_date.getHours()).slice(-2) +':'+ ("0" + v_date.getMinutes()).slice(-2) + v_amORpm + `",`;
            v_trxObjStr += `"trxFullDateTime":"` + new Date() + `"}`;
        }else{
            v_trxObjStr += `"` + v_key + `":"` + v_value + `",`;
        }
    }
    // if(v_clientOS=="Windows"){console.log('v_trxObjStr original:-\n',v_trxObjStr);}
    v_trxObjStr = JSON.parse(v_trxObjStr);
    auditTrail(v_trxObjStr);
    // if(v_clientOS=="Windows"){console.log('v_trxObjStr parsed:-\n',v_trxObjStr);}

    var request = indexedDB.open(p_database); // first step is opening the database
    request.onsuccess = function(e) {
            var db =  e.target.result;
            var trans = db.transaction(p_store, 'readwrite'); //second step is opening the object store
            var store = trans.objectStore(p_store);
            
            var request = store.put(v_trxObjStr); // put single object to object store
            
            request.onsuccess = function(e) {
                // showDetails(e.target.result); // data retreived I DON'T THINK THIS WORKS
                // if(v_clientOS=="Windows"){console.log(e.target.result);} // data retreived
                idbGetAll(p_database,p_store)
                db.close();
            };
            
            request.onerror = function(e) {
                if(v_clientOS=="Windows"){console.log("Error Getting: ", e);}
            };
    };

}

function idbDeleteOne(p_database,p_store,p_keyPath){

    // delete

    p_keyPath = p_keyPath * 1;
    if (p_keyPath===0){
        alert('unable to delete - no document selected');
        return;
    }

    if(v_clientOS=="Windows"){console.log('p_database:- ',p_database);}
    if(v_clientOS=="Windows"){console.log('p_store:- ',p_store);}
    if(v_clientOS=="Windows"){console.log('p_keyPath:- ',p_keyPath);}

    var request = indexedDB.open(p_database); // first step is opening the database
    request.onsuccess = function(e) {
            var db =  e.target.result;
            var trans = db.transaction(p_store, 'readwrite'); //second step is opening the object store
            var store = trans.objectStore(p_store);
            
            var request = store.delete(p_keyPath); //deleting single object by id from object store
            
            request.onsuccess = function(e) {
                // showDetails(e.target.result); // data retreived I DON'T THINK THIS WORKS
                // if(v_clientOS=="Windows"){console.log(e.target.result);} // data retreived
                idbGetAll(p_database,p_store)
                switch(p_store) {
                  case 'rsdCosts':
                    clearForm('rsdForm01');
                    break;
                case 'rsdTrips':
                    clearForm('rsdForm02');
                    break;
                }
                db.close();
            };
            
            request.onerror = function(e) {
                if(v_clientOS=="Windows"){console.log("Error deleting: ", e);}
            };
    };

}

function initTrx(p_storeName,p_mode){

    // let trx = db.transaction('rsdCosts','readwrite');
    let v_trx = db.transaction(p_storeName,p_mode);
    v_trx.onerror = (err) => {
        console.warn('trx.onerror err:- ',err);
    }
    return v_trx;

}
