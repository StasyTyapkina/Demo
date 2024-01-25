import React, {useState} from "react"
import {styled} from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import {Toolbar, IconButton} from "@mui/material"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import MenuIcon from "@mui/icons-material/Menu"
import {NavList} from "./NavList"

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: 336,
		background: "#004D98",
		boxShadow: "inset -1px 0px 0px #004385",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(10),
			},
		}),

		overflowX: "hidden",
	},
}))

const StyledToolbar = styled(Toolbar)(() => ({
	display: "flex",
	justifyContent: "flex-start",
	marginTop: "auto",
	boxShadow: "inset 0px 1px 0px #004385",
}))

export const SideBar = () => {
	const [open, setOpen] = useState(true)

	/**changing the state of the sidebar (open-closed) */
	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<Drawer variant="permanent" open={open}>
			<NavList />

			<StyledToolbar>
				<IconButton onClick={toggleDrawer}>
					{open ? <MenuOpenIcon sx={{color: "#89A8C6"}} /> : <MenuIcon sx={{color: "#89A8C6"}} />}
				</IconButton>
			</StyledToolbar>
		</Drawer>
	)
}
