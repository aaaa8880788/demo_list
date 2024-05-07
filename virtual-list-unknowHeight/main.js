import "./static/index.scss"
import FsVirtuallist from './utils/virtual'
const fs = new FsVirtuallist(".fs-estimated-virtuallist-container", ".fs-estimated-virtuallist-list")
fs.init()