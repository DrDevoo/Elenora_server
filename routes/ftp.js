const express = require('express');
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const fs = require('fs');
const path = require('path')
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
    
const ftp = require("basic-ftp") 

async function Upload(localFile, remotePath) {
    const client = new ftp.Client()
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.FTP_PASS,
            secure: false
        })
        await client.uploadFrom(localFile, remotePath)
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}



module.exports = { Upload }