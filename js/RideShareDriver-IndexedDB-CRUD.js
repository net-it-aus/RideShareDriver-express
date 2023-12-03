function idbAdd(p_database,p_store,p_objectString){
    console.log(p_database,p_store,p_objectString);
    // const valueToStore = `{${pfield} + ":" + p_value}`;
    var dbOpenRequest = indexedDB.open(p_database); // first step is opening the database
    dbOpenRequest.onsuccess = function(e) {
            var db =  e.target.result;
            var trans = db.transaction(p_store, 'readwrite'); //second step is opening the object store
            var store = trans.objectStore(p_store);

            // console.log(storeRecord);
            // console.log(JSON.parse(storeRecord));
            // const x = JSON.stringify(storeRecord);
            // console.log(x);
            // var request = store.add(v_value,v_key); // adding single object to object store
            var storeRequest = store.add(JSON.parse(p_objectString)); // adding single object to object store

            storeRequest.onsuccess = function(e) {
                // showDetails(e.target.result); // data retreived I DON'T THINK THIS WORKS
                if(v_clientOS=="Windows"){console.log(e.target.result);} // data retreived
                // idbGetOne(p_database,p_store,e.target.result)
                db.close();
                // idbGetAll(p_database,p_store)
            };

            storeRequest.onerror = function(e) {
                if(v_clientOS=="Windows"){console.log("Error Getting: ", e);}
            };
    };    
}
async function idbAdd_OLD(p_database,p_store,p_form){
    // add
    console.log("idbAdd()");

    var v_elements = document.getElementsByTagName("input");
    console.log(v_elements);
    // v_id = '1';
    // v_trxObjStr += `{id:"` + v_id + `",`;

    // var v_geolocation = await getLocation();
    // var v_trxObjStr = `{"geolocation":"` + v_geolocation + `",`;
    var v_trxObjStr = "";

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
    if(v_clientOS=="Windows"){console.log('v_trxObjStr original:-\n',v_trxObjStr);}
    // v_trxObjStr = JSON.parse(v_trxObjStr);
    if(v_clientOS=="Windows"){console.log('v_trxObjStr parsed:-\n',v_trxObjStr);}
    // auditTrail(v_trxObjStr);

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
