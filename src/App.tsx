import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage';
import MainLayout from './pages/MainLayout';
import JobPage from './pages/JobPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />} >
  <Route index element ={<Homepage />} />
  <Route path='/jobs' element={<JobPage />} />
  <Route path='/*' element={<NotFoundPage />} />
  </Route>
)
);

const App = () => {
 

  return <RouterProvider router={router}/>
    
  
};

export default App