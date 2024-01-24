import React from "react"
import {theme} from "./Theme"
import {ThemeProvider} from "@mui/material/styles"
import {Box, CssBaseline} from "@mui/material"
import {SideBar} from "./components/SideBar"
import {ContentContainer} from "./components/ContentContainer"
import {Navigate, Route, Routes} from "react-router-dom"
import {Main} from "./pages/Main/Main"
import {TodoList} from "./pages/Todo/TodoList"

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: "flex"}}>
				<CssBaseline />

				<SideBar />

				<ContentContainer>
					<Routes>
						<Route exact path={"/"} element={<Navigate to={"/main"} />} />

						<Route path={"/main"} element={<Main />} />

						<Route path={"/todo"} element={<TodoList />} />
					</Routes>
				</ContentContainer>
			</Box>
		</ThemeProvider>
	)
}
