import { useEffect, useState } from "react";
import { employeeDto } from "../../common/dto";
import { EmpoyeesApi } from "../../common/api";

import { EmployeeCreateForm, EmployeeCreateFormData } from "./components/EmployeeCreateForm";
import { EmployeeCard } from "./components/EmployeeCard";

export function EmployeesPage() {

    
    
    const [employees, setEmployees] = useState<employeeDto[]>([]);

    useEffect(() => {
      EmpoyeesApi.getAll().then(setEmployees);
    },[]);
  
    const removeEmployee = (employeeId: number) => {
      setEmployees(employees.filter(x => x.id !== employeeId));
      //9 1:44 про асинх и бекенд
    };
  
    const CreateEmloyee = (data: EmployeeCreateFormData) => {
      setEmployees(employees.concat({
        "firstName": data.firstName,
        "patronymic": data.patronymic,
        "surName": data.surName,
        "position": data.position,
        "photo": data.photo,
        "startWorkDate": data.startWorkDate,
        "id": employees.length + 1,
        "fullName": data.surName + data.firstName + data.patronymic
      }))
    }
  
    return <>
    
      <div className='EmployeeList' style={{display: 'flex'}}>
        
        <EmployeeCreateForm onCreate={CreateEmloyee}/>
        {employees.length === 0 && <p>Нет данных</p> }

        <div className='employee'>
          {employees.map(employee =>
          <EmployeeCard 
            onRemove={() => removeEmployee(employee.id)} 
            key={employee.id} 
            employee={employee}
          /> )}
        </div>
      </div>
  </>
}