import { createContext } from "react";
import axios from 'axios'

export default createContext(axios.create({}))


