// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->

//  set the port number for the server
var v_portNumber = process.argv[2];
if (v_portNumber == undefined) {
    console.log('Port Number not provided.');
    v_portNumber = 2019;
    console.log('Port Number assigned is:- ', v_portNumber);
} else {
    console.log('Port Number argument/option:- ',v_portNumber);
}

//  express server framework
// const express = require('express');
    import express from 'express';
    const app = express();

// npm install node-fetch --save
// const fetch = require('node-fetch');
    import fetch from 'node-fetch';

// const fs = require('fs');
    import fs from 'fs';

// nodeoutlook
     import nodeoutlook from 'nodejs-nodemailer-outlook';

// // NODEOUTLOOK - START ================================================================================================
//     // nodemailer initialise - start
//         // var nodeoutlook = require('nodejs-nodemailer-outlook')
//            // import nodeoutlook from 'nodejs-nodemailer-outlook';
//         nodeoutlook.sendEmail({
//             auth: {
//                 user: "Net.IT.Australia@outlook.com",
//                 pass: "SonicBroom.000"
//             },
//             from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
//             to: 'd.garton@outlook.com',
//             subject: 'Hey you, awesome!',
//             html: '<b>This is bold text</b>',
//             // text: 'This is text version!',
//             replyTo: 'NoReply@outlook.com',
//             // attachments: [
//             //                     {
//             //                         filename: 'text1.txt',
//             //                         content: 'hello world!'
//             //                     },
//             //                     {   // file on disk as an attachment
//             //                         filename: 'text3.txt',
//             //                         path: '/path/to/file.txt' // stream this file
//             //                     },
//             //                     {   // filename and content type is derived from path
//             //                         path: '/path/to/file.txt'
//             //                     },
//             //                     {   // use URL as an attachment
//             //                         filename: 'license.txt',
//             //                         path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
//             //                     },
//             //                 ],
//             onError: (e) => console.log(e),
//             onSuccess: (i) => console.log(i)
//         });
//     // nodemailer initialise - end
// // NODEOUTLOOK - END  =================================================================================================

//  tell the express server to host static files in the 'public' folder
    app.use(express.static('public'));
    app.use(express.static('css'));
    // app.use(express.static('images'));
    app.use(express.static('js'));
    // app.use(express.static('media'));
// app.use(express.static('resources'));

//  tell the express server to recognise incoming data as JSON
    app.use(express.json({limit: '10mb'}));
//  tell the express server to recognise incoming data as JSON

// const os = require('os');
    import os from 'os';
// const os = require('os');
console.log('total memory:- ',os.totalmem()/1000000000);
console.log('free memory:- ',os.freemem()/1000000000);

console.log(Date().slice(0,25));
app.listen( process.env.PORT || v_portNumber, () => { 
    console.log('RideShareDriver.com.au server is listening at port ' + v_portNumber + '\n');
});

// sendNewUserEmail START //////////////////////////////////////////////////////
function sendNewUserEmail_OBSOLETE(req,res,userPIN){
    console.log("sendNewUserEmail !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body.v_uEmail);
    // emailUSERpin(req.body.v_emailAddress,userPIN);
    emailUSERpin(req.body.v_uEmail,userPIN);
    // const v_fileName = userPIN + "_emailAddress"
    // const v_fileName = userPIN + "_checkedIN";
    // fs.appendFile('../../SiteStatistics/turramurra-trotters-analytics.csv', v_csvText ,(err) => {
    // });
    // fs.appendFile('data/' + v_fileName + '.csv', req.body.v_emailAddress ,(err) => {
    // });
    // fs.writeFile('data/' + v_fileName + '.json', JSON.stringify(req.body) ,(err) => {
    // });
                        // fs.readFile('results.json', function (err, data) {
                        // var json = JSON.parse(data)
                        //     json.push('search result: ' + currentSearchResult)
                        
                        //     fs.writeFile("results.json", JSON.stringify(json))
                        // })
    const v_data = JSON.stringify(
        // {
        //     v_userPIN: userPIN
        // }
        {
            v_userPIN: "created"
        }
    );
    res.send(v_data);
    res.end();
}
// sendNewUserEmail END ////////////////////////////////////////////////////////

// createUserFile START //////////////////////////////////////////////////////
function createUserFile(req,res,userPIN){

    console.log("createUserFile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body.v_userW);
    console.log(req.body.v_uEmail);
    const v_fileName = req.body.v_uEmail + "_accountDetails";

    // fs.writeFile('data/' + v_fileName + '.json', JSON.stringify(req.body) ,(err) => {
    // });

    // fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json',JSON.stringify(req.body),(err) => {
    // });

    // fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json', `[{"v_userPIN":"${userPIN}"},` + JSON.stringify(req.body) + `]`,(err) => {
    // });

    fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json', `[{"v_userPIN":"${userPIN}"},{"v_userW":"${req.body.v_userW}"},{"v_uEmail":"${req.body.v_uEmail}"}]`,(err) => {
        if (err){
            const v_data = JSON.stringify(
                {
                    response: "create error"
                }
            );
            res.send(v_data);
            res.end();
        } else {
            const v_data = JSON.stringify(
                {
                    response: "created"
                }
            );
            res.send(v_data);
            res.end();
        }
    });



}
// createUserFile END //////////////////////////////////////////////////////

// login1 START //////////////////////////////////////////////////////
    function login1(req,res,userPIN_checkOut){
        let _otup;
        console.log("login1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(req.body.v_uEmail);
        const v_fileName = req.body.v_uEmail + "_accountDetails";
        // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function
            fs.readFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json','utf8',(errASync,v_dataASync) => {
                // if (errASync){
                //     console.log('v_dataASyncERR:- ',errASync);
                //     console.log('login:- error');
                // } else {
                //     console.log('v_dataASync:- ',v_dataASync);
                //     if (JSON.parse(v_dataASync)[1].v_userW === req.body.v_userW){
                //         console.log('login:- OK');
                //         console.log(JSON.parse(v_dataASync)[2].v_uEmail);
                //         sendAccessCode(JSON.parse(v_dataASync)[2].v_uEmail);
                //         // res.send(v_dataASync);
                //         res.send(`[{"response":"login1 ok"}]`);
                //         res.end();
                //     } else {
                //         console.log('login:- incorrect password',JSON.parse(v_dataASync)[1].v_userW,req.body.v_userW);
                //         res.send(`[{"response":"incorrect password"}]`);
                //         res.end();
                //     }
                // }
                if (errASync){
                    console.log('login1 v_dataASyncERR:- ',errASync);
                    console.log('login1:- error');
                    res.send(`[{"response":"login error for email address:- ${req.body.v_uEmail}"}]`);
                    res.end();
                } else {
                    console.log('login1 v_dataASync:- ',v_dataASync);
                    // sendAccessCode(req.body.v_uEmail);
                    _otup = createRSDuserPIN();
                    emailUSERpin(req.body.v_uEmail,_otup);
                    fs.writeFile(`../RideShareDriver.com.au-express-data/` + req.body.v_uEmail + `_otup.json`, `[{"_otup":"${_otup}"}]`,(err) => {
                    });                
                    res.send(`[{"response":"login1 ok"}]`);
                    res.end();
                }
            });
        // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function
    }
// login1 END //////////////////////////////////////////////////////

function sendAccessCode(emailAddress){
    console.log("login1 sendAccessCode(emailAddress) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",emailAddress);
    const _otup = createRSDuserPIN();
    emailUSERpin(emailAddress,_otup);
}

// login2 START //////////////////////////////////////////////////////
function login2(req,res){
    console.log("login2 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body.v_uEmail);
    const v_fileName = req.body.v_uEmail + "_otup";
    // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function
        fs.readFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json','utf8',(errASync,v_dataASync) => {
            if (errASync){
                console.log('login2 errASync v_dataASyncERR:- ',errASync);
                console.log('login2 errASync:- error');
            } else {
                console.log('login2 v_dataASync:- ',v_dataASync);
                if (JSON.parse(v_dataASync)[0]._otup === req.body.v_accessCode){
                    console.log('login2:- OK');
                    const v_fileName2 = req.body.v_uEmail + "_accountDetails";
                    fs.readFile('../RideShareDriver.com.au-express-data/' + v_fileName2 + '.json','utf8',(errASync2,v_dataASync2) => {
                        if (errASync2){
                            console.log('login2 errASync2 v_dataASync2ERR:- ',errASync);
                            console.log('login2 errASync2:- error');
                        } else {
                            // res.send(`[{"response":"login2 ok"}]`);
                            res.send(v_dataASync2);
                            res.end();
                        }
                    });
                } else {
                    console.log('login2:- incorrect OTUP');
                    res.send(`[{"response":"Incorrect OTUP, please try again."},{"":""},{"v_uEmail":""}]`);
                    res.end();
                }
            }
        });
    // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function
}
// login2 END //////////////////////////////////////////////////////

// updateUserFile START //////////////////////////////////////////////////////
function updateUserFile(req,res){

    console.log("updateUserFile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body);
    // console.log(req.body[0].v_userPIN);
    console.log(req.body[2].v_uEmail);
    // const v_fileName = req.body[0].v_userPIN + "_checkedIN";
    const v_fileName = req.body[2].v_uEmail + "_accountDetails";

    // fs.writeFile('data/' + v_fileName + '.json', JSON.stringify(req.body) ,(err) => {
    // });

    // fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json',JSON.stringify(req.body),(err) => {
    // });

    fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json',JSON.stringify(req.body),(err) => {
        if (err){
            console.log("updateUserFile err");
        } else {
            console.log("updateUserFile OK");
            res.send(req.body);
            res.end
        }
    });

}
// updateUserFile END //////////////////////////////////////////////////////

// checkOutUserFile START //////////////////////////////////////////////////////
function checkOutUserFile(req,res,userPIN_checkOut){
    console.log("checkOut !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log(req.body);
    const v_fileName = userPIN_checkOut + "_checkedIN";

    // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function
        fs.readFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json','utf8',(errASync,v_dataASync) => {
            if (errASync){
                // console.log('v_dataASyncERR:- ',errASync);
                console.log('checkOut:- error');
            } else {
                // console.log('v_dataASync:- ',v_dataASync);
                console.log('checkOut:- OK');
                res.send(v_dataASync);
                res.end();
            }
        });
    // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function

    // // fs.readFileSync - read the file synchronously i.e, code executions are blocked until this process is completed
    //     const v_dataSync = fs.readFileSync('../RideShareDriver.com.au-express-data/' + v_fileName + '.json','utf8',(errSync) => {
    //     });
    //     console.log('v_dataSync:- ',v_dataSync);
    //     res.send(v_dataSync);
    //     res.end();
    // // fs.readFileSync - read the file synchronously i.e, code executions are blocked until this process is completed
    
    // console.log('JSON.stringify(v_data):- ',JSON.stringify(v_data));
    // res.send(JSON.stringify(v_data));
    // const v_data = JSON.stringify(
    //     {
    //         v_userPIN: userPIN_checkOut
    //     }
    // );
}
// checkOutUserFile END //////////////////////////////////////////////////////

// emailData START //////////////////////////////////////////////////////
function emailData(req,res){
    // console.trace();
    console.log('emailData:- ',req.body.v_uEmail);
    emailData_send(req.body.v_uEmail);
}
function emailData_send(uEmail){
    nodeoutlook.sendEmail({
        auth: {
            user: "Net.IT.Australia@outlook.com",
            pass: "SonicBroom.000"
        },
        // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
        from: '"Net.IT.Australia@outlook.com',
        to: uEmail,
        subject: 'RideShareDriver.com.au data',
        // html: '<b>Do Not reply to this email.</b>',
        // html: `<p>${emailBody}</p>`,
        text: 'Raw JSON data is attached.',
        replyTo: 'NoReply@outlook.com',
        // attachments: {path: '/path/to/file.txt'},
        attachments: {path: '../RideShareDriver.com.au-express-data/' + uEmail + '_accountDetails.json'},
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}
// emailData END //////////////////////////////////////////////////////


function emailSiteVisit(emailBody){
    console.log('emailSiteVisit nodeoutlook.sendEmail() START .....................................');
    nodeoutlook.sendEmail({
        auth: {
            user: "Net.IT.Australia@outlook.com",
            pass: "SonicBroom.000"
        },
        // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
        from: '"Net.IT.Australia@outlook.com',
        to: 'd.garton@outlook.com',
        subject: 'RideShareDriver.com.au site visit details',
        // html: '<b>Do Not reply to this email.</b>',
        html: `<p>${emailBody}</p>`,
        text: 'This is text version!',
        replyTo: 'NoReply@outlook.com',
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}
function emailUSERpin(emailAddress,userPIN){
    // console.log(`emailUSERpin(${emailAddress},${userPIN})`);
    nodeoutlook.sendEmail({
        auth: {
            user: "Net.IT.Australia@outlook.com",
            pass: "SonicBroom.000"
        },
        // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
        from: '"Net.IT.Australia@outlook.com',
        to: emailAddress,
        subject: 'RideShareDriver.com.au user OTUP (one time user password)',
        // html: '<b>Do Not reply to this email.</b>',
        // html: `<p>${userPIN}</p><p>Use the PIN to access the Driver Records portal.</p><p><b>Anyoone can access your records by using this PIN.</b></p><p>Contact support:- support@NetIT.com.au</p>`,
        html: `<p>${userPIN}</p><p>Above is your RideShareDriver.com.au OTUP (one time user password).</p><p><b>...you can copy and paste it into your browser.</b></p><p>Contact support:- support@NetIT.com.au</p>`,
        text: 'This is text version!',
        replyTo: 'NoReply@outlook.com',
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}

// RECORD ANALYTICS start
// app.post('/logAnalytics_Beacon',(req) => {
async function logAnalytics_Beacon(req){
    // console.log(req.body);
    v_csvText = '' 
        + req.body.v_sessionId + ',' 
        + req.body.v_sessionStartDateTime + ',' 
        + req.body.v_sessionSecondsAlive + ',' 
        + req.body.v_sessionSecondsDuration + ',' 
        + req.body.v_wheelRolls + ',' 
        + req.body.v_navKeyPresses + ',' 
        + req.body.v_menuClicks + ',' 
        + req.body.v_sessionEventsHistory + ',' 
        + req.body.v_dateNow + ',' 
        + req.body.v_timeNow + ','  
        + req.body.v_timeNow + ','  
        + req.body.v_clientOS + ','  
        + req.body.v_browser + ',' 
        + timeStampString() + '\n';
    // console.log(v_csvText);
    // fs.appendFile('../../SiteStatistics/netit/' + req.body.v_sessionId + '.csv', v_csvText ,(err) => {
    // });
    // fs.appendFile('../../SiteStatistics/netit-com-au.csv', v_csvText ,(err) => {
    // });
    console.log('$$$ Server received analytics from client via sendBeacon. $$$\n',Date().slice(0,25));
}
// app.post('/logAnalytics',(req,res) => {
async function logAnalytics(req,res){
    console.log("YES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body);
    v_csvText = '' 
        + req.body.v_sessionId + ',' 
        + req.body.v_sessionStartDateTime + ',' 
        + req.body.v_sessionSecondsAlive + ',' 
        + req.body.v_sessionSecondsDuration + ',' 
        + req.body.v_wheelRolls + ',' 
        + req.body.v_navKeyPresses + ',' 
        + req.body.v_menuClicks + ',' 
        + req.body.v_sessionEventsHistory + ',' 
        + req.body.v_dateNow + ',' 
        + req.body.v_timeNow + ','  
        + req.body.v_timeNow + ','  
        + req.body.v_clientOS + ','  
        + req.body.v_browser + ',' 
        + timeStampString() + '\n';
    // console.log(v_csvText);
    // fs.appendFile('../../SiteStatistics/netIT/' + req.body.v_sessionId + '.csv', v_csvText ,(err) => {
    // });
    // fs.appendFile('../../SiteStatistics/turramurra-trotters-analytics.csv', v_csvText ,(err) => {
    // });
    const v_data = JSON.stringify(
        {
            v_csvData: v_csvText
        }
    );
    res.send(v_data);
    res.end();
}
app.post('/recordAnalytics',(req,res) => {
    // v_csvText = req.body.v_date + ',' + req.body.v_time + ','  + req.body.v_sessionId + ',' + req.body.v_analyticDescription + ',' + req.body.v_analyticValue + ',' + req.body.v_timeStampString + '\n';
    // // console.log(v_csvText);
    // fs.appendFile('../../SiteStatistics/turramurra-trotters-analytics.csv', v_csvText ,(err) => {
    // });
    // const v_data = JSON.stringify(
    //     {
    //         v_csvData: v_csvText
    //     }
    // );
    // res.send(v_data);
    // res.end();
});
// RECORD ANALYTICS end

// app.post('/txtFromClient',(req,res) => {
function txtFromClient(req,res){
    console.log('txtFromClient:- ' + req.body.v_txt + '\n' + Date().slice(0,25) + '\n');
    res.end();
}

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
    const v_timeStampStr = "now" + v_fullYear + v_month + v_day + v_hour + v_minute + v_second + v_millisecond;
    // console.log("v_timeStampString:- ",v_timeStampStr);
    return v_timeStampStr;
}
function createRSDuserPIN(){
    const v_dateNow = new Date(); 
    var v_fullYear = v_dateNow.getFullYear();
    var v_fullYear = v_fullYear + '';
    var v_fullYear = v_fullYear.slice(2,4);
    // console.log(v_fullYear);
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
    if (v_millisecond<1000)(v_millisecond="0"+v_millisecond);
    if (v_millisecond<10000)(v_millisecond="0"+v_millisecond);
    const v_rsdUserPIN = v_second + '' + v_day + '' +  v_hour + '' +  v_month + '' +  v_millisecond + '' + v_minute + '' + v_fullYear + '' +  (v_millisecond/19).toFixed(0);
    console.log("v_rsdUserPIN:- ",v_rsdUserPIN);
    console.log("v_rsdUserPIN:- ",v_rsdUserPIN.length);
    return v_rsdUserPIN;
}

async function getATOrss(req, res){
    console.log('line 279 /getATOrss req.body:- ' + JSON.stringify(req.body));
    // ATO - All new information
    // This news feed contains all new information from the Tax Office.
    await fetch('https://www.ato.gov.au/rss.aspx?category=145')    
    // Super
    // await fetch('https://www.ato.gov.au/rss.aspx?category=2040')
    .then(res => {
        // using await to ensure that the promise resolves
        // console.log('/getATOrss:- res.text:- ',res);
        // console.log('/getATOrss:- res.text:- ',res.text);
        return res.text();
    })
    .then(res_xml => {
        // console.log('/getATOrss:- res_xml:- ',res_xml);
        // res.send('{"getATOrssSuper":' + res_xml + '}');
        res.send(res_xml);
        res.end();
    });
}

function emailATOrss(req,res){
    // console.log('line 300 /emailATOrss req.body.emailBody:- ' + JSON.stringify(req.body.emailBody));
    nodeoutlook.sendEmail({
        auth: {
            user: "Net.IT.Australia@outlook.com",
            pass: "SonicBroom.000"
        },
        // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
        from: '"Net.IT.Australia@outlook.com',
        to: 'support@netit.com.au',
        bcc: 'd.garton@outlook.com.au;donald@bgfinancial.net.au',
        subject: 'update from Net IT Australia (310)',
        html: JSON.stringify(req.body.emailBody),
        // html: `<p>${emailBody}</p>`,
        text: 'This is text version!',
        replyTo: 'support@netit.com.au',
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
    // .then(res =>{
    //     return res.text();
    // })
    // .then(response =>{
    //     res.send("done",response);
    //     res.end();
    // });
}

async function getRBArss(req, res){
    console.log('line 320 /getRBArss req.body:- ' + JSON.stringify(req.body));
    // ATO - All new information
    // This news feed contains all new information from the Tax Office.
    await fetch('https://www.rba.gov.au/rss/rss-cb-bulletin.xml')    
    // Super
    // await fetch('https://www.ato.gov.au/rss.aspx?category=2040')
    .then(res => {
        // using await to ensure that the promise resolves
        // console.log('/getRBArss:- res.text:- ',res);
        // console.log('/getRBArss:- res.text:- ',res.text);
        return res.text();
    })
    .then(res_xml => {
        // console.log('/getRBArss:- res_xml:- ',res_xml);
        // res.send('{"getRBArssSuper":' + res_xml + '}');
        res.send(res_xml);
        res.end();
    })
}

// TEST COMMS begin /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
app.post('/commsPostCheck',(req,res) => {
    console.log("comms check - POST fetch:- server received client request OK")
    console.log(req.body);
    res.send({text: "server response - POST fetch:- text sent from server to client OK" });
    res.end();
});
app.post('/commsGetCheck',(req,res) => {
    console.log("comms check - GET fetch:- server received client request OK")
    console.log(req.body);
    res.send({text: "server response - GET fetch:- text sent from server to client OK" });
    res.end();
});
// TEST COMMS end /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// const intervalID = setInterval(retrieveATOrss, 1000 * 10);
// const intervalID1 = setInterval(retrieveATOrss, 1000 * 60 * 60 * 24);
// const intervalID = setInterval(retrieveATOrss, 86400000);
async function retrieveATOrss(){
    await fetch('https://www.ato.gov.au/rss.aspx?category=145')    
    .then(res => {
        // using await to ensure that the promise resolves
        // console.log('/getATOrss:- res.text:- ',res);
        // console.log('/getATOrss:- res.text:- ',res.text);
        return res.text();
    })
    .then(res_xml => {
        // console.log('retrieveATOrss:- res_xml:- \n',res_xml);
        // res.send(res_xml);
        // res.end();
        let i,j;
        let itemCount=0;
        let res_html = "";
        console.log('getATOrss:- res_xml:- ',res_xml);
        // console.log('\n');
        for (i=0; i<res_xml.length;i++){
            if (res_xml.slice(i,i+7)==="<title>"){
                for (j=i;j<res_xml.length;j++){
                    if (res_xml.slice(j,j+8)==="</title>"){
                        // console.log("ATO update");
                        // console.log("TITLE:- " + res_xml.slice(i+7,j));
                        res_html += "<br>ATO update<br>";
                        res_html += "TITLE:- " + res_xml.slice(i+7,j) + "<br>";
                        i=j;
                        break;
                    }
                }
            } else if (res_xml.slice(i,i+6)==="<link>"){
                for (j=i;j<res_xml.length;j++){
                    if (res_xml.slice(j,j+7)==="</link>"){
                        // console.log("LINK:- " + res_xml.slice(i+6,j));
                        res_html += `LINK:- <a href="${res_xml.slice(i+6,j)}" style="color:chartreuse;">` + res_xml.slice(i+6,j) + `</a><br>`;
                        i=j;
                        break;
                    }
                }
            } else if (res_xml.slice(i,i+13)==="<description>"){
                for (j=i;j<res_xml.length;j++){
                    if (res_xml.slice(j,j+14)==="</description>"){
                        // console.log("DESCRIPTION:- " + res_xml.slice(i+13,j));
                        res_html += "DESCRIPTION:- " + res_xml.slice(i+13,j) + "<br>";
                        i=j;
                        break;
                    }
                }
            } else if (res_xml.slice(i,i+9)==="<pubDate>"){
                for (j=i;j<res_xml.length;j++){
                    if (res_xml.slice(j,j+10)==="</pubDate>"){
                        // console.log("PUBLISHED:- " + res_xml.slice(i+9,j));
                        // console.log("");
                        if (itemCount===0){
                            res_html += "Created by NET IT Australia:- " + res_xml.slice(i+9,j) + "<br>";
                        } else {
                            res_html += "PUBLISHED:- " + res_xml.slice(i+9,j) + "<br>";
                        }
                        // res_html += "<br>";
                        i=j;
                        itemCount += 1;
                        break;
                    }
                }
            }
        }
        // console.log(res_html);
        nodeoutlook.sendEmail({
            auth: {
                user: "Net.IT.Australia@outlook.com",
                pass: "SonicBroom.000"
            },
            // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
            from: '"Net.IT.Australia@outlook.com',
            to: 'support@netit.com.au',
            // bcc: 'd.garton@outlook.com.au;donald@bgfinancial.net.au;stephen@bgfinancial.net.au;Railesh@bgfinancial.net.au;charlotte@bgfinancial.net.au;grace@bgfinancial.net.au;faye@bgfinancial.net.au;felicia@bgfinancial.net.au;peter@bgfinancial.net.au',
            subject: 'update from Net IT Australia (441)',
            // html: JSON.stringify(req.body.emailBody),
            html: res_html,
            text: 'This is text version!',
            replyTo: 'support@netit.com.au',
            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
        });
    
    });
}
// retrieveATOrss();
const date0 = new Date();
const date0Time = date0.getTime();
// const date0TimeAdjusted = date0Time.setHours();
const date1 = new Date("2023-07-10T00:05:00Z");
const date1Time = date1.getTime();
console.log("date",new Date());
console.log("date0",date0);
console.log("date1",date1);
console.log("date0Time",date0Time);
console.log("date1Time",date1Time);
const timeDelay = date1Time - date0Time;
console.log("time delay in minutes",(date1Time - date0Time) / 60 / 60 / 24);
// setTimeout(() =>{
//     retrieveATOrss();
//     const intervalID1 = setInterval(retrieveATOrss, 1000 * 60 * 60 * 24);
// },timeDelay)

// const intervalID2 = setInterval(isServerRunning, 1000 * 65 * 65);
// async function isServerRunning(){
//     var started = Date().slice(0, 25);
//     await nodeoutlook.sendEmail({
//         auth: {
//             user: "Net.IT.Australia@outlook.com",
//             pass: "SonicBroom.000"
//         },
//         // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
//         from: '"Net.IT.Australia@outlook.com',
//         to: 'support@netit.com.au',
//         // bcc: 'd.garton@outlook.com.au;donald@bgfinancial.net.au',
//         subject: 'message from Net IT Australia Server',
//         // html: JSON.stringify(req.body.emailBody),
//         html: `<p>Server is running. ${started}</p>`,
//         text: 'This is text version!',
//         replyTo: 'support@netit.com.au',
//         onError: (e) => console.log(e),
//         onSuccess: (i) => console.log(i)
//     });
// }

// SERVER REQUESTS LOG start
app.all('*', (req, res) => {
    console.log('app.all information START');
    const v_ipAddress = req.connection.remoteAddress;
    const v_ipAddressForwarded = req.headers['x-forwarded-for'];
    console.log('total memory:- ',os.totalmem()/1000000000);
    console.log('free memory:- ',os.freemem()/1000000000);
    console.log(`incoming IP address:-  ${v_ipAddress}`);
    console.log(`app.all req.connection.remoteAddressForwarded:- ${v_ipAddressForwarded}`);
    console.log('app.all req.url:- ', req.url);
    // console.log(`app.all req date:- ${Date().slice(0, 25)}\n`);
    console.log(`app.all req date:- ${Date().slice(0, 25)}`);
    console.log('app.all information END\n');

    if (v_ipAddress.length > 3){
        const emailBody = 'Incoming IP address:- ' + v_ipAddress + ' ' + Date().slice(0,25) + ' ' + 'incoming originalUrl:- "' + req.originalUrl + '"';
        // console.log('emailBody:- ' + v_ipAddress + ' ' + Date().slice(0,25));
        emailSiteVisit(emailBody);
    }
    switch (req.url) {
        case '/create':
            // console.log(req.body);
            const userPIN = createRSDuserPIN();
            // sendNewUserEmail(req,res,userPIN);
            createUserFile(req,res,userPIN);
            break;
        case '/login1':
            login1(req,res);
            break;
        case '/login2':
            login2(req,res);
            break;
        case '/checkOut':
            const userPIN_checkOut = req.body.v_userPIN;
            checkOutUserFile(req,res,userPIN_checkOut);
            break;
        case '/update':
            updateUserFile(req,res);
            break;
        case '/append':
            break;
        case '/emailData':
            emailData(req,res);
            break;
    // case '*':
    //     emailSiteVisit(emailBody);
    // case '/getATOrss':
    //     getATOrss(req,res);
    //     break;
    // case '/getRBArss':
    //     getRBArss(req,res);
    //     break;
    // case '/emailATOrss':
    //     emailATOrss(req,res);
    //     break;
    case '/saveTheData':
        saveTheData(req,res);
        break;
    // case '/getTickerData_ASX_MI':
    //     getTickerData_ASX_MI(req,res);
    //     break;
    // case '/getTickerData_xyz':
    //     getTickerData.getTickerData_xyz(req,res);
    //     break;
    // case '/getTickerData_ASX_G':
    //     getTickerData_ASX_G(req,res);
    //     break;
    // case '/getTickerData_google':
    //     getTickerData.getTickerData_google(req,res);
    //     break;
    // case '/getTickerData_ASX_YH':
    //     getTickerData_ASX_YH(req,res);
    //     break;
    // case '/getTickerData_yahoo':
    //     getTickerData.getTickerData_yahoo(req,res);
    //     break;
    // case '/getTickerData_ASX_AX':
    //     getTickerData_ASX_AX(req,res);
    //     break;
    // case '/getTickerData_afr':
    //     getTickerData.getTickerData_afr(req,res);
    //     break;
    // case '/getTickerData_financialtimes':
    //     getTickerData.getTickerData_financialtimes(req,res);
    //     break;
    // case '/getTickerData_ASX_MS':
    //     getTickerData_ASX_MS(req,res);
    //     break;
    // case '/getVanguardETFs':
    //     getVanguardETFs(req,res);
    //     break;
    // case '/getTickerData_CommSec':
    //     getTickerData_CommSec(req,res);
    //     break;
    // case '/getASXannouncements':
    //     getASXannouncements(req,res);
    //     break;
    case '/txtFromClient':
        txtFromClient(req,res);
        break;
    case '/logAnalytics':
        logAnalytics(req,res);
        break;
    }
});
// SERVER REQUESTS LOG end
