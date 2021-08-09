import express,{Application}from 'express';
const bodyParser = require('body-parser');
const cors = require('cors')
import errors from '../utils/responses/errors'
let {config} = require('../configurations/index')
const app: Application = express();
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));


import user from './components/users/network'
import admin from './components/admin/network'
import auth from './components/auth/network'
app.use('/api/user', user)
app.use('/api/admin', admin)
app.use('/api/auth', auth)
app.use(errors)

app.listen(3000, () =>{
    console.log(`Api Runing into ${config.api.host}:${config.api.port}`);
})