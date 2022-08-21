import { Routes, Route } from 'react-router-dom'
import './App.css'

//Layouts
import MainLayout from './layout/MainLayout'

//Pages
import StatisticsPage from './pages/Statistics'
import Page404 from './pages/Page404'
import WorldStatistics from './pages/Statistics/components/WorldStatistics'
import GlobalStatistics from './pages/Statistics/components/GlobalStatistics'
import TeamBuilder from './pages/TeamBuilder'

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

        <Route path='/kreator-druzyny' element={ <TeamBuilder /> } />

        <Route path='/*' element={ <Page404 /> } />
      </Route>
    </Routes>
  )
}

export default App
