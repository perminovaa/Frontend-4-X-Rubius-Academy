
import { Input, Typography} from "antd";
import { ButtonClick } from "../../../components/Button";
import { useInput } from "../../../common/hooks/useImput";
import { FormEvent } from "react";

const { Title } = Typography;


export interface EmployeeCreateFormData {
    firstName: string,
    patronymic: string,
    surName: string,
    position: string,
    photo: string,
    startWorkDate: string
  }

export function EmployeeCreateForm({onCreate} : { onCreate: (data: EmployeeCreateFormData) => void}) {

    const firstNameInput = useInput('');
    const surNameInput = useInput('');
    const patronymicInput = useInput('');
    const positionInput = useInput('');
    const startWorkDateInput = useInput('');
    const photoInput = useInput('');
  
    const handleForm = (event: FormEvent) => {
      event.preventDefault();
      onCreate( {
        firstName: firstNameInput.value, 
        surName: surNameInput.value, 
        patronymic: patronymicInput.value, 
        position: patronymicInput.value, 
        startWorkDate: startWorkDateInput.value, 
        photo: photoInput.value
      })
    }
  
    return ( 
    <form onSubmit={handleForm} style={{ width: '350px' }} ><Title level={3} style={{marginTop: "0"}}>Добавить сотрудника</Title>
      <Input size={"large"} className='imput' {...firstNameInput} name="firstName" placeholder='Имя'></Input>
      <Input size={"large"} className='imput' {...patronymicInput}name="patronymic" placeholder='Отчество'></Input>
      <Input size={"large"} className='imput' {...surNameInput}name="surName" placeholder='Фамилия'></Input>
      <Input size={"large"} className='imput' {...positionInput} name="position" placeholder='Должность'></Input>
      <Input size={"large"} className='imput' {...startWorkDateInput} type='date' name="startWorkDate" placeholder='Дата начала работы в компании'></Input>
      <Input size={"large"} className='imput' {...photoInput} name="photo"></Input>
      <ButtonClick>Добавить</ButtonClick>
    </form>)
  }
  