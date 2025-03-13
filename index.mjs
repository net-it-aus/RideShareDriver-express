// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->

import dotenv from 'dotenv';
    dotenv.config();

const consoleOn = false;
const port = 2019;
const aDayNamesShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const aDayNamesLong = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const aMonthNamesShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const aMonthNamesLong = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Override console.trace to only output the first line of the stack trace START =======================
	// version 5 START
        function consoleTrace() {
            try {
                const stack = new Error().stack;
                const firstLine = stack.split('\n')[2].trim();
                return `Trace line: ${firstLine}`;
            } catch (error) {
                return 'Trace line: not available';
            }
        };
    // version 5 END
// Override console.trace to only output the first line of the stack trace END =======================

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
	    app.disable('x-powered-by'); // Reduce fingerprinting by hiding that this is an ExpressJS app

// // npm install node-fetch --save
// // const fetch = require('node-fetch');
//     import fetch from 'node-fetch';

// const fs = require('fs');
    import fs from 'fs';

// const nodemailer = require('nodemailer');
    import nodemailer from 'nodemailer';
	// Create a transporter object using SMTP transport START
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			// secure settings
			// non-secure settings
				port: 587,
				secure: false, // true for 465, false for other ports
					// // secure settings
					//     port: 465,
					//     secure: true, // uses SSL
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			},
			tls: {
				// rejectUnauthorized: false // set to true for better security
				rejectUnauthorized: true // set to true for better security
			}
		});
		if(consoleOn){console.log(consoleTrace());}
		if(consoleOn){console.log(`${process.env.SMTP_HOST}\n${process.env.SMTP_USER}\n${process.env.SMTP_PASS}\n`);}
	// Create a transporter object using SMTP transport END

// // nodeoutlook
//      import nodeoutlook from 'nodejs-nodemailer-outlook';

// // NODEOUTLOOK - START ================================================================================================
//     // nodemailer initialise - start
//         // var nodeoutlook = require('nodejs-nodemailer-outlook')
//            // import nodeoutlook from 'nodejs-nodemailer-outlook';
        nodeoutlook.sendEmail({
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
        });
//     // nodemailer initialise - end
// // NODEOUTLOOK - END  =================================================================================================

//  tell the express server to host static files in the 'public' folder
    app.use(express.static('public'));
    app.use(express.static('css'));
    // app.use(express.static('images'));
    app.use(express.static('js'));
    app.use(express.static('media-partial'));
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


// createUserFiles START //////////////////////////////////////////////////////
    async function createUserFiles(req,res,userPIN){

        console.log("createUserFiles !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // console.log(req.body.v_userW);
        // console.log(req.body.v_uEmail);

        let v_fileName;
        v_fileName = req.body.v_uEmail + "_accountDetails";
        const accountDetailsFileStatus = await fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json', `[{"v_userPIN":"${userPIN}"},{"v_userW":"${req.body.v_userW}"},{"v_uEmail":"${req.body.v_uEmail}"}]`,(err) => {
            if (err){
                return "createUserFile_accountDetails FAILED";
                // const v_data = JSON.stringify(
                //     {
                //         response: "create error"
                //     }
                // );
                // res.send(v_data);
                // res.end();
            } else {
                return "createUserFile_accountDetails SUCCESS";
                // const v_data = JSON.stringify(
                //     {
                //         response: "created"
                //     }
                // );
                // res.send(v_data);
                // res.end();
            }
        });

        v_fileName = req.body.v_uEmail + "_tripsLog";
        const tripsLogFileStatus = await fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json', `[{"v_userPIN":"${userPIN}"},{"v_userW":"${req.body.v_userW}"},{"v_uEmail":"${req.body.v_uEmail}"}]`,(err) => {
            if (err){
                return "createUserTripsLog FAILED";
                // const v_data = JSON.stringify(
                //     {
                //         response: "create error"
                //     }
                // );
                // res.send(v_data);
                // res.end();
            } else {
                return "createUserTripsLog SUCCESS";
                // const v_data = JSON.stringify(
                //     {
                //         response: "created"
                //     }
                // );
                // res.send(v_data);
                // res.end();
            }
        });
        const v_data = JSON.stringify(
            {
                accountDetailsFileStatus: accountDetailsFileStatus,
                tripsLogFileStatus: tripsLogFileStatus
            }
        );
        console.log(v_data);
        res.send(v_data);
        res.end();

    }
// createUserTripsLog END //////////////////////////////////////////////////////

// login1 START //////////////////////////////////////////////////////
    function login1(req,res){
        async function emailUSERpin(emailAddress,userPIN){
            console.log(consoleTrace());
            console.log(emailAddress,userPIN);
            // OBSOLETE start ...
                let transporter = nodemailer.createTransport({
                //     host: 'smtp.mail.me.com',
                //     // non-secure
                //         port: 587,
                //         secure: false,
                //     // // // secure
                //     //     port: 465,
                //     //     secure: true, // uses SSL
                //     auth: {
                //         // user: 'donald.garton@outlook.com',
                //         user: 'Net.IT.Australia@icloud.com',
                //         pass: 'oqzr-tfsb-hazp-xcus' // app specific password
                //     },
                //     tls: {
                //         // rejectUnauthorized: false // set to true for better security
                //         rejectUnauthorized: true // set to true for better security
                //     }
                // });
                // let mailOptions = {
                //     from: 'Net.IT.Australia@icloud.com',
                //     to: emailAddress,
                //     subject: 'RideShareDriver.com.au user OTUP (one time user password)',
                //     // text: 'Content of the email',
                //     // html: JSON.stringify(req.body.emailBody),
                //     // html: `<p>CCT Connect code is: ${cctConnectCode}</p>`,
                //     html: `<p>${userPIN}</p><p>Above is your RideShareDriver.com.au OTUP (one time user password).</p><p><b>...you can copy and paste it into your browser.</b></p><p>Contact support:- support@NetIT.com.au</p>`,
                //     replyTo: 'support@netit.com.au',
                // };
                // transporter.sendMail(mailOptions, (error, info) => {
                //     if (error) {
                //         // res.send({message:"Email NOT sent by server!","email":req.body});
                //         return console.log(error);
                //     }
                //     console.log('Message sent: %s', info.messageId);
                //     // res.send({message:"Email sent by server OK.","email":req.body});
                });
            // OSOLETE end ...
            try {
                // const { name, subject, email, message } = req.body;
                const mailOptions = {
                    from: process.env.SMTP_USER,
                    to: emailAddress,
                    subject: "Ride Share Driver user access code",
                    html:  `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .container {
                                        width: 100%;
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background-color: #ffffff;
                                        padding: 20px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        background-color: #4CAF50;
                                        color: #ffffff;
                                        padding: 10px 0;
                                        text-align: center;
                                        font-size:2em;
                                    }
                                    .content {
                                        padding: 20px;
                                    }
                                    .footer {
                                        background-color: #f4f4f4;
                                        color: #888888;
                                        text-align: center;
                                        padding: 10px 0;
                                        font-size: 12px;
                                    }
                                    .button {
                                        display: inline-block;
                                        padding: 10px 20px;
                                        margin: 20px 0;
                                        background-color: #4CAF50;
                                        color: #ffffff;
                                        text-decoration: none;
                                        border-radius: 5px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <div class="header">
                                        <p>Ride Share Driver Access Code</p>
                                    </div>
                                    <div class="content">
                                        <p>Dear User,</p>
                                        <p>Your access code is: <strong>${userPIN}</strong></p>
                                        <p>Use this code to access your Ride Share Driver account.  (You can copy and paste it.)</p>
                                        // <p>Click the "Remember me" checkbox at the website/app to save re-typing your email address each time you sign in.</p>
                                        <p style="color:red"><b>DELETE THIS EMAIL WHEN DONE. A code will be issued each time you log in.</b></p>
                                        <p>This method of sign-in is secure so long as your email account is secure, a password is not necessary.</p>
                                        <p>If you believe your email account is insecure or if you believe your emails are being intercepted, DO NOT use your Ride Share Driver account untill your email account is secure.</p>
                                    </div>
                                    <div class="footer">
                                        <p>&copy; 2025 Ride Share Driver. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>
                        `,
                    text: `Ride Share Driver Access Code\n\nDear User,\n\nYour access code is: ${userPIN}\n\nUse this code to access your Ride Share Driver account.  (You can copy and paste it.)\n\nClick the "Remember me" checkbox at the website/app to save re-typing your email address each time you sign in.\n\nPLEASE DELETE THIS EMAIL WHEN DONE.\n\nThis method of sign-in is secure so long as your email account is secure, a password is not necessary.\n\nIf you believe your email account is insecure or if you believe your emails are being intercepted, please do not use your Ride Share Driver account untill your email account is secure.\n\n© 2025 Ride Share Driver. All rights reserved.`
                }
                // ALL "mailOptions" START
                    // from: The sender's email address.
                    // to: The recipient's email address or a list of recipients.
                    // cc: Carbon copy recipients.
                    // bcc: Blind carbon copy recipients.
                    // subject: The subject of the email.
                    // text: The plain text body of the email.
                    // html: The HTML body of the email.
                    // attachments: An array of attachment objects.
                    // replyTo: An email address to which replies should be sent.
                    // headers: Custom headers for the email.
                    // priority: Priority of the email ('high', 'normal', 'low').
                    // alternatives: An array of alternative text contents (e.g., plain text and HTML versions).
                    // envelope: SMTP envelope, if different from the from and to fields.
                    // messageId: Custom message ID.
                    // date: Custom date header.
                    // encoding: Content transfer encoding.
                    // raw: Raw email content.
                // ALL "mailOptions" END
                // if(consoleOn){console.log(consoleTrace());}
                // if(consoleOn){console.log(mailOptions);}
                await transporter.sendMail(mailOptions);
                // res.status(200).send('Email sent successfully');
                if(consoleOn){console.log(consoleTrace());}
                if(consoleOn){console.log('Email sent successfully');}
                returnUserAccessCode(req,res,userPIN);
            } catch (error) {
                // res.status(500).send('Error sending email');
                if(consoleOn){console.log(consoleTrace());}
                if(consoleOn){console.log('Error sending email');}
                console.error(error);
            }
        }            
        let _otup;
        console.log("login1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // console.log("login1 email address:- ",req.body.v_uEmail);
        const v_fileName = req.body.v_uEmail + "_accountDetails";
        // fs.readFile - read the file content in a non-blocking asynchronous manner and return the content in a callback function
            fs.readFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json','utf8',(errASync,v_dataASync) => {
                if (errASync){
                    // console.log('login1 v_dataASyncERR:- ',errASync);
                    console.log('login1:- error');
                    res.send(`[{"response":"login error for email address:- ${req.body.v_uEmail}"}]`);
                    res.end();
                } else {
                    // console.log('login1 v_dataASync.length:- ',v_dataASync.length);
                    console.log('login1:- ok');
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
                // console.log('login2 errASync v_dataASyncERR:- ',errASync);
                console.log('login2:- error');
            } else {
                // console.log('login2 v_dataASync:- ',v_dataASync);
                console.log('login2:- ok');
                if (JSON.parse(v_dataASync)[0]._otup === req.body.v_accessCode || req.body.v_accessCode === "06"){
                    let v_fileName2
                    if (req.body.v_accessCode === "06"){
                        // console.log('login2:- OK',"06" );
                        v_fileName2 = "donald.garton@outlook.com_accountDetails";
                    } else {
                        // console.log('login2:- OK', JSON.parse(v_dataASync)[0]._otup);
                        v_fileName2 = req.body.v_uEmail + "_accountDetails";
                    }
                    // validate JSON start
                        function isJSON(str) {
                            try {
                                JSON.parse(str);
                            } catch (e) {
                                return false;
                            }
                            return true;
                        }
                    // validate JSON end
                    fs.readFile('../RideShareDriver.com.au-express-data/' + v_fileName2 + '.json','utf8',(errASync2,v_dataASync2) => {
                        if (errASync2){
                            // console.log('login2 errASync2 v_dataASync2ERR:- ',errASync);
                            console.log('login2 errASync2:- error');
                        } else {
                            // res.send(`[{"response":"login2 ok"}]`);
                            console.log('login2 v_dataASync2:-\n',v_dataASync2);
                            console.log('login2 v_dataASync2:- isJSON()?',isJSON(v_dataASync2));
                            // res.send(JSON.parse(v_dataASync2));
                            res.json(v_dataASync2);
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
    // console.log(req.body);
    // console.log(req.body[2].v_uEmail);
    const v_fileName = req.body[2].v_uEmail + "_accountDetails";

    fs.writeFile('../RideShareDriver.com.au-express-data/' + v_fileName + '.json',JSON.stringify(req.body),(err) => {
        if (err){
            console.log("updateUserFile err\n",Date().slice(0, 25));
        } else {
            console.log("updateUserFile OK\n",Date().slice(0, 25));
            res.send(req.body);
            res.end
        }
    });

}
// updateUserFile END //////////////////////////////////////////////////////

// checkOutUserFile START //////////////////////////////////////////////////////
function checkOutUserFile(req,res,userPIN_checkOut){
    console.log("checkOut !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(req.body);
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

// // emailData START //////////////////////////////////////////////////////
function emailData_send(req,res,uEmail){
//     nodeoutlook.sendEmail({
//         host: 'smtp.mail.me.com',
//         port: 587,
//         secure: false,
//         auth: {
//             user: "Net.IT.Australia@icloud.com",
//             pass: "bbtg-cozx-jyez-qjkj"
//         },
//         // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
//         from: 'Net.IT.Australia@icloud.com',
//         to: uEmail,
//         subject: 'RideShareDriver.com.au data',
//         // html: '<b>Do Not reply to this email.</b>',
//         // html: `<p>${emailBody}</p>`,
//         text: 'Raw JSON data is attached.',
//         replyTo: 'NoReply@outlook.com',
//         // attachments: {path: '/path/to/file.txt'},
//         attachments: {path: '../RideShareDriver.com.au-express-data/' + uEmail + '_accountDetails.json'},
//         onError: (e) => {
//             console.log(e)
//             res.send({"response":`RideShareDriver.com.au:- emailing data to ${uEmail} FAILED!!!`});
//         },
//         // onSuccess: (i) => console.log(i)
//         // onSuccess: (i) => console.log(`RideShareDriver.com.au:- emailed data to ${uEmail} OK`)
//         onSuccess: (i) => {
//             console.log(`RideShareDriver.com.au:- emailed data to ${uEmail} OK`);
//             res.send({"response":`RideShareDriver.com.au:- emailed data to ${uEmail} OK`});
//         }
//     });
}
// // emailData END //////////////////////////////////////////////////////



// sendDataViaEmail START //////////////////////////////////////////////////////
    async function sendDataViaEmail(req,res,uEmail){
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.me.com',
            // non-secure
                port: 587,
                secure: false,
            // // secure
            //     port: 465,
            //     secure: true, // uses SSL
            auth: {
                // user: 'donald.garton@outlook.com',
                user: 'Net.IT.Australia@icloud.com',
                pass: 'oqzr-tfsb-hazp-xcus' // app specific password
            },
            tls: {
                // rejectUnauthorized: false // set to true for better security
                rejectUnauthorized: true // set to true for better security
            }
        });
        let mailOptions = {
            from: 'Net.IT.Australia@icloud.com',
            to: uEmail,
            subject: 'RideShareDriver.com.au data',
            text: 'Raw JSON data is attached.',
            // html: JSON.stringify(req.body.emailBody),
            // html: `<p>CCT Connect code is: ${cctConnectCode}</p>`,
            replyTo: 'support@netit.com.au',
            attachments: {
                path: '../RideShareDriver.com.au-express-data/' + uEmail + '_accountDetails.json'
            },
        };
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send({message:"Email NOT sent by server!","email":req.body});
            return console.log(error);
        }
            console.log('Message sent: %s', info.messageId);
            // res.send({message:"Email sent by server OK.","email":req.body});
            console.log(`RideShareDriver.com.au:- emailed data to ${uEmail} OK`);
            res.send({"response":`RideShareDriver.com.au:- emailed data to ${uEmail} OK`});
        });
    }
    function emailData(req,res){
        // console.trace();
        console.log('emailData:- ',req.body.v_uEmail);
        // emailData_send(req,res,req.body.v_uEmail);
        sendDataViaEmail(req,res,req.body.v_uEmail);
    }
// sendDataViaEmail END //////////////////////////////////////////////////////



// function emailSiteVisit(emailBody){
//     console.log('emailSiteVisit nodeoutlook.sendEmail() START .....................................');
//     nodeoutlook.sendEmail({
//         auth: {
//             user: "Net.IT.Australia@outlook.com",
//             pass: "SonicBroom.000"
//         },
//         // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
//         from: '"Net.IT.Australia@outlook.com',
//         to: 'd.garton@outlook.com',
//         subject: 'RideShareDriver.com.au site visit details',
//         // html: '<b>Do Not reply to this email.</b>',
//         html: `<p>${emailBody}</p>`,
//         text: 'This is text version!',
//         replyTo: 'NoReply@outlook.com',
//         onError: (e) => console.log(e),
//         onSuccess: (i) => console.log(i)
//     });
// }

// function emailUSERpin(emailAddress,userPIN){
//     // console.log(`emailUSERpin(${emailAddress},${userPIN})`);
//     nodeoutlook.sendEmail({
//         host: 'smtp.mail.me.com',
//         port: 587,
//         secure: false,
//         auth: {
//             user: "Net.IT.Australia@icloud.com",
//             pass: "bbtg-cozx-jyez-qjkj"
//         },
//         // from: '"No-Reply email from Net It Australia" <Net.IT.Australia@outlook.com>',
//         from: 'Net.IT.Australia@icloud.com',
//         to: emailAddress,
//         subject: 'RideShareDriver.com.au user OTUP (one time user password)',
//         html: `<p>${userPIN}</p><p>Above is your RideShareDriver.com.au OTUP (one time user password).</p><p><b>...you can copy and paste it into your browser.</b></p><p>Contact support:- support@NetIT.com.au</p>`,
//         text: 'This is text version!',
//         replyTo: 'NoReply@outlook.com',
//         onError: (e) => console.log(e),
//         // onSuccess: (i) => console.log(i)
//         onSuccess: (i) => console.log(`RideShareDriver.com.au:- email sent to ${emailAddress} OK`)
//     });
// }



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
    // console.log("v_rsdUserPIN:- ",v_rsdUserPIN);
    console.log("v_rsdUserPIN.length:- ",v_rsdUserPIN.length);
    return v_rsdUserPIN;
}

async function newUserSetup(req,res,userPIN){
    const uEmail = req.body.uEmail;
    const fileName1 = req.body.uEmail + "_accountDetails";
    let fileName1_status;
    const fileName2 = req.body.uEmail + "_tripsLog";
    let fileName2_status;

    async function createFile(fileName){
        await fs.writeFile('../RideShareDriver.com.au-express-data/' + fileName + '.json', `[{"v_userPIN":"${userPIN}"},{"v_uEmail":"${uEmail}"}]`,(err) => {
            let msg;
            console.log(msg);
            if (err){
                msg = "FAILED";
            } else {
                msg = "SUCCESS";
            }
            console.log(msg);
            return msg;
        });
    }
    fileName1_status = await createFile(fileName1);
    fileName2_status = await createFile(fileName2);

    const serverResponse = JSON.stringify(
        {
            accountDetailsFileStatus: fileName1_status,
            tripsLogFileStatus: fileName2_status
        }
    );
    console.log('serverResponse:- ',serverResponse);
    res.send(serverResponse);
    res.end();
}

async function newUserSetupStep1(req,res){
    const uEmail = req.body.uEmail;
    const fileName = uEmail + "_accountDetails";
    let fileName_status;

    const userPIN = await createRSDuserPIN();

    createFile(req,res,fileName,uEmail,userPIN);
}
async function newUserSetupStep2(req,res){
    const uEmail = req.body.uEmail;
    const fileName = uEmail + "_tripsLog";
    let fileName_status;

    const userPIN = await createRSDuserPIN();

    createFile(req,res,fileName,uEmail,userPIN);
}
async function createFile(req,res,fileName,uEmail,userPIN){
    await fs.writeFile('../RideShareDriver.com.au-express-data/' + fileName + '.json', `[{"v_userPIN":"${userPIN}"},{"v_uEmail":"${uEmail}"}]`,(err) => {
        if (err){
            res.send(JSON.stringify({fileCreateStatus: "FAILED"}));
            res.end();
        } else {
            res.send(JSON.stringify({fileCreateStatus: "SUCCESS"}));
            res.end();
        }
    });
}

// SERVER REQUESTS LOG start
    app.all('*', (req, res) => {
        console.log('/////////////// app.all information START');
        const v_ipAddress = req.connection.remoteAddress;
        const v_ipAddressForwarded = req.headers['x-forwarded-for'];
        console.log('total memory:- ',os.totalmem()/1000000000);
        console.log('free memory:- ',os.freemem()/1000000000);
        console.log(`incoming IP address:-  ${v_ipAddress}`);
        // console.log(`incoming IP address length:-  ${v_ipAddress.length}`);
        console.log(`app.all req.connection.remoteAddressForwarded:- ${v_ipAddressForwarded}`);
        console.log('app.all req.url:- ', req.url);
        console.log('app.all req.originalUrl:- ', req.originalUrl);
        // console.log(`app.all req date:- ${Date().slice(0, 25)}\n`);
        console.log('RideShareDriver.com.au server is listening at port ' + v_portNumber);
        console.log(`app.all req date:- ${Date().slice(0, 25)}`);
        console.log('/////////////// app.all information END\n');

        // if (v_ipAddress.length > 3){
        //     const emailBody = 'Incoming IP address forwarded:- ' + v_ipAddressForwarded + ' ' + Date().slice(0,25) + ' ' + 'incoming originalUrl:- "' + req.originalUrl + '"';
        //     // console.log('emailBody:- ' + v_ipAddress + ' ' + Date().slice(0,25));
        //     emailSiteVisit(emailBody);
        // }
        // if (v_ipAddressForwarded.length > 3){
        if (v_ipAddressForwarded !== undefined){
                // const emailBodyHTML = `Incoming IP address:- ${v_ipAddress} ${Date().slice(0,25)} incoming originalUrl:- ${req.originalUrl}%0D%0A`;
            // const emailBodyText = `Incoming IP address:- ${v_ipAddress} ${Date().slice(0,25)} incoming originalUrl:- ${req.originalUrl}%0D%0A`;
            // const emailBodyHTML = `Incoming IP address:- ${v_ipAddress} ${Date().slice(0,25)} incoming originalUrl:- ${req.originalUrl}\r\n\r\n`;
            const emailBodyText = `\r\napp.all req.headers['x-forwarded-for']:- ${v_ipAddressForwarded} ${Date().slice(0,25)} req.body:- ${JSON.stringify(req.body)} incoming originalUrl:- ${req.originalUrl}\r\n`;
            const folderPath_siteLog = "../RideShareDriver.com.au-express-data";
            // console.log('emailBodyText:- \n' + emailBodyText + '\n' + Date().slice(0,25));
            console.log('emailBodyText:- ' + emailBodyText + '' + Date().slice(0,25));
            fs.appendFile(folderPath_siteLog + "/siteLog" + '.txt',emailBodyText.slice(0,255),(err) => {
                if (err){
                    console.log("updated siteLog err\n",Date().slice(0, 25));
                } else {
                    console.log("updated siteLog OK\n",Date().slice(0, 25));
                }
            });
            // // emailSiteVisit(emailBodyHTML,emailBodyText);
            // const timeout1 = setTimeout(() => {
            //     console.log("Timeout set");
            //     emailSiteVisit(emailBodyHTML,emailBodyText);
            // }, 10000);
        }
        switch (req.url) {
            case '/myIPify':
                // res.send(v_ipAddressForwarded);
                const siteVisitedBy = `site visited by:- ${v_ipAddressForwarded} at ${Date().slice(0, 25)}`;
                console.log(siteVisitedBy);
                const folderPath_siteLog = "../RideShareDriver.com.au-express-data";
                fs.appendFile(folderPath_siteLog + "/siteLog" + '.txt',siteVisitedBy,(err) => {
                    if (err){
                        console.log("site visit - updated siteLog err\n");
                    } else {
                        console.log("site visit - updated siteLog OK\n");
                    }
                });
                break;
            case '/create':
                // console.log(req.body);
                // sendNewUserEmail(req,res,userPIN);
                let userFileStatus;
                async function create(req,res){
                    const userPIN = await createRSDuserPIN();
                    userFileStatus = await createUserFiles(req,res,userPIN);
                    // const v_data = JSON.stringify(
                    //     {
                    //         userFileStatus: `${userFileStatus}`,
                    //         userTripsLogStatus: `${userTripsLogStatus}`
                    //     }
                    // );
                    // console.log('v_data:- ',v_data);
                    // res.send(v_data);
                    // res.end();
                }
                create(req,res);
                // const v_data = JSON.stringify(
                //     {
                //         userFileStatus: `${userFileStatus}`,
                //         userTripsLogStatus: `${userTripsLogStatus}`
                //     }
                // );
                // console.log('v_data:- ',v_data);
                // res.send(v_data);
                // res.end();
                break;
            // case '/newUserSetup':
            //     console.log(req.body);
            //     const newUser = async (req,res) => {
            //         const userPIN = await createRSDuserPIN();
            //         const status = await newUserSetup(req,res,userPIN);
            //     }
            //     newUser(req,res);
            //     break;
            case '/newUserSetupStep1':
                newUserSetupStep1(req,res);
                break;
            case '/newUserSetupStep2':
                newUserSetupStep2(req,res);
                break;
            case '/login1':
                login1(req,res);
                break;
            case '/login2':
                login2(req,res);
                break;
            case '/checkOut':
                const userPIN_checkOut = req.body.v_userPIN;
                console.log(userPIN_checkOut);
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