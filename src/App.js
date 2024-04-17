import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './component/Home';
import Agent from './component/Agent';
import ReceiverAgent from "./component/ReceiverAgent";
import DocumentPage from './component/AgentDashboard/DocumentPage';
import ContainerManagement from './component/AgentDashboard/ContainerManagement';
import ShipmentStatus from "./component/ReceiverDashboar/ShipmentStatus";



function App() {
  return (
    <Router >
      <Routes>
        <Route exact path='/' element ={<Home />} />
        <Route path='/Agent' element = {<Agent />} />
        <Route path='/ReceiverAgent' element={<ReceiverAgent />} />
        <Route path='/Agent/DocumentPage' element = {<DocumentPage />} />
        <Route path='/Agent/ContainerManagement' element= {<ContainerManagement />} />
        <Route path='/ReceiverAgent/ShipmentStatus' element={<ShipmentStatus />}/>
      </Routes>
    </Router>
  );
}

export default App;
