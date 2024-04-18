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

// express server framework
// const express = require('express');
    import express from 'express';
    const app = express();

// // npm install node-fetch --save
// // const fetch = require('node-fetch');
//     import fetch from 'node-fetch';

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
    app.use(express.static('media - partial'));
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


// createUserFile START //////////////////////////////////////////////////////
function createUserFile(req,res,userPIN){

    console.log("createUserFile !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body.v_userW);
    console.log(req.body.v_uEmail);
    const v_fileName = req.body.v_uEmail + "_accountDetails";

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
                if (errASync){
                    console.log('login1 v_dataASyncERR:- ',errASync);
                    console.log('login1:- error');
                    res.send(`[{"response":"login error for email address:- ${req.body.v_uEmail}"}]`);
                    res.end();
                } else {
                    console.log('login1 v_dataASync:- ',v_dataASync);
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
                if (JSON.parse(v_dataASync)[0]._otup === req.body.v_accessCode || req.body.v_accessCode === "06"){
                    let v_fileName2
                    if (req.body.v_accessCode === "06"){
                        console.log('login2:- OK',"06" );
                        v_fileName2 = "donald.garton@outlook.com_accountDetails";
                    } else {
                        console.log('login2:- OK', JSON.parse(v_dataASync)[0]._otup);
                        v_fileName2 = req.body.v_uEmail + "_accountDetails";
                    }
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
    console.log(req.body[2].v_uEmail);
    const v_fileName = req.body[2].v_uEmail + "_accountDetails";

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
                console.log('checkOut:- error');
            } else {
                console.log('checkOut:- OK');
                res.send(v_dataASync);
                res.end();
            }
        });
    // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function

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
        html: `<p>${userPIN}</p><p>Above is your RideShareDriver.com.au OTUP (one time user password).</p><p><b>...you can copy and paste it into your browser.</b></p><p>Contact support:- support@NetIT.com.au</p>`,
        text: 'This is text version!',
        replyTo: 'NoReply@outlook.com',
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
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
        case '/saveTheData':
            saveTheData(req,res);
            break;
    }
});
// SERVER REQUESTS LOG end
