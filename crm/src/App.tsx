import './App.css';
import { EmployeeCard } from './components/EmployeeCard';
import Link from 'antd/es/typography/Link';
import {  } from 'antd';

function App() {
  return <>
    <nav>
      <ul>
        <li>
          <Link>Заявки</Link>
        </li>
        <li>
          <Link>Сотрудники</Link>
        </li>
      </ul>
    </nav>
    
    <main>
      <EmployeeCard />
    </main>
  </>
}

export default App;
