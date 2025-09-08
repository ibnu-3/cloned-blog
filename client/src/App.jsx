import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Admin/Dashboard'
import PrivateRoute from './routes/PrivateRoute'
import ManageTasks from './pages/Admin/ManageTasks'
import CreateTask from './pages/Admin/CreateTask'
import ManageUsers from './pages/Admin/ManageUsers'
import MyTasks from './pages/User/MyTasks'
import UserDashboard from './pages/User/UserDashboard'
import ViewTaskDetails from './pages/User/ViewTaskDetails'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      {/* admin route */}
      <Route element={<PrivateRoute allowedRoles={['admin']}/>}>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/tasks' element={<ManageTasks/>}/>
        <Route path='/admin/create-task' element={<CreateTask/>}/>
        <Route path='/admin/users' element={<ManageUsers/>}/>
      </Route>
      {/*user route */}
      <Route element={<PrivateRoute allowedRoles={['member']}/>}>
        <Route path='/user/dashboard' element={<UserDashboard/>}/>
        <Route path='/user/tasks' element={<MyTasks/>}/>
        <Route path='/user/task-details/:id' element={<ViewTaskDetails/>}/>
      
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App