import "./static/index.scss"
import myVirtuallist from './utils/virtual'
const vl = new myVirtuallist(".virtuallist-container", ".virtuallist-list")
vl.init()