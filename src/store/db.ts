import { Pool } from 'pg'
import {ServerResponse, ConsoleResponse} from "../utils/responses/index"
import {config} from '../configurations/index'
import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const {database} : any = config
export const pool =  new Pool(database)

const connection = 'xd'


