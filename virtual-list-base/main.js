import "./static/index.scss"
import FsVirtuallist from './utils/virtual'
const fs = new FsVirtuallist(".fs-virtuallist-container", ".fs-virtuallist-list")
fs.init()