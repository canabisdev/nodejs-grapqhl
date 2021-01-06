import { Application } from "./App";
import dotenv from "dotenv"

dotenv.config()
new Application().setupDbAndServer()
