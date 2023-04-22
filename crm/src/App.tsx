import React from 'react';

import './App.css';
import { EmployeeCard } from './components/EmployeeCard';

function App() {
  return <>
    <nav>
      <ul>
        <li><Link to ="/">Заявки</Link></li>
        <li><Link to ="/">Сотрудники</Link></li>
      </ul>
    </nav>
    
    <main>
      <EmployeeCard />
    </main>
  </>
}

export default App;
