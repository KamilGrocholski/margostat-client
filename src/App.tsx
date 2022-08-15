import { Routes, Route } from 'react-router-dom'
import './App.css'

//Layouts
import MainLayout from './layout/MainLayout/index'

//Pages
import LandingPage from './pages/LandingPage/index'
import StatisticsPage from './pages/Statistics/index'
import Page404 from './pages/Page404'
import WorldStatistics from './pages/Statistics/components/WorldStatistics'
import StatisticsLangindPage from './pages/Statistics/components/StatisticsLandingPage'
import GlobalStatistics from './pages/Statistics/components/GlobalStatistics'

function App() {
  return (
    <Routes>
      <Route element={ <MainLayout /> }>
        <Route index element={ <GlobalStatistics /> } />
        <Route path='/statystyki' element={ <StatisticsPage /> }>
          <Route index element={ <GlobalStatistics /> } />
          <Route path='swiaty'>
            <Route index element={ <GlobalStatistics /> } />
            <Route path=':world' element={ <WorldStatistics /> } />
          </Route>
        </Route>
        <Route path='/ln' element={ <LandingPage /> } />
        <Route path='/*' element={ <Page404 /> } />
      </Route>
    </Routes>
  )
}

export default App
