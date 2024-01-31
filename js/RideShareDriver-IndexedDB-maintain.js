// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->

// const idb = (function init(){
//     let db = null;
//     let objectStore = null;
//     let DBOpenReq = indexedDB.open('rsd',1); /* database name, version number */
// });
function init(){
    
    let db = null;
    let objectStore = null;
    let DBOpenReq = indexedDB.open('rsd',4); /* database name, version number */

    DBOpenReq.addEventListener('error',(err) => {

        // error opening DB
        console.warn('!!! open error:- ',err);
        alert('!!! open error:- ',err);
        if(v_clientOS=="iOS"){alert("Saving data on this device is not supported.");}

    });

    DBOpenReq.addEventListener('success',(ev) => {

        // DB opened -OR- DB opened after upgradeNeeded
        db = ev.target.result;
        // q('opened:- ',db.name, db.version);}
        // if(v_clientOS=="iOS"){alert('opened:- ',db.name, db.version);}
        db.close();

    });

    DBOpenReq.addEventListener('upgradeneeded',(ev) => {

        // first time opening this DB -OR- a new version was passed into open
        db = ev.target.result;
        let oldVersion = ev.oldVersion;
        let newVersion = ev.newVersion || db.version;
        // q('upgraded from :- ',oldVersion,' to:- ',newVersion);}
        // q('upgradeneeded:- ',db.name, db.version);}

        // CREATE object store "rsdCosts"
        if ( ! db.objectStoreNames.contains('rsdCosts')) {
            objectStore = db.createObjectStore('rsdCosts',{
                keyPath: 'id',
                autoIncrement: true
            });
        }else{
            // q('upgradeneeded:- NO');}
        }
        // CREATE object store "rsdTrips"
        if ( ! db.objectStoreNames.contains('rsdTrips')) {
            objectStore = db.createObjectStore('rsdTrips',{
                keyPath: 'id',
                autoIncrement: true
            });
        }else{
            // q('upgradeneeded:- NO');}
        }
        // CREATE object store "rsdDayBook"
        if ( ! db.objectStoreNames.contains('rsdDayBook')) {
            objectStore = db.createObjectStore('rsdDayBook',{
                keyPath: 'id', // date + fieldName
                autoIncrement: true
            });
        }else{
            // q('upgradeneeded:- NO');}
        }

        // DELETE object store "?"
        // db.createObjectStore('foobar');
        if ( db.objectStoreNames.contains('foobar')) {
            db.deleteObjectStore('foobar');
        }

    });

}
init();