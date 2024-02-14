
import { bindEvent } from "./lib/events";
import { DomInit } from "./lib/init";
import { fileParse } from "./lib/parse";
import "./style.css"

const app = () => {
  DomInit()
  bindEvent()
  fileParse()

};
export default app;
