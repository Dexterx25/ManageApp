import {config} from "../../../configurations/index"
import * as store  from "../../../store/postgres"
import controller from "./controller";
export default controller(store)
