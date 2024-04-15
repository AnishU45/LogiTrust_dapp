import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './component/Home';
// import SenderPage from './component/SenderPage';
import Agent from './component/Agent';
import DocumentPage from './component/AgentDashboard/DocumentPage';
import ContainerManagement from './component/AgentDashboard/ContainerManagement';


function App() {
  return (
    <Router >
      <Routes>
        <Route exact path='/' element ={<Home />} />
        {/* <Route path='/SenderPage' element = {<SenderPage />} /> */}
        <Route path='/Agent' element = {<Agent />} />
        <Route path='/Agent/DocumentPage' element = {<DocumentPage />} />
        <Route path='/Agent/ContainerManagement' element= {<ContainerManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
