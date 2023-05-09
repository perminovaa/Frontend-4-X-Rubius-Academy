
import { employeeDto } from "../../../common/dto";
import { Button, Image, Typography} from "antd";




const { Text } = Typography;


interface EmployeeCardProps {
    employee: employeeDto;
    onRemove: () => void;
}

export function EmployeeCard({employee, onRemove}: EmployeeCardProps) {
    return (
        <div className="img" >
            {employee.photo ? <div style={{width:"200px", height:"250px", overflow:'hidden', marginBottom: "10px"}}>
                <Image src={employee.photo}  background-size ></Image>
            </div> : 
            <div style={{width:"200px", height:"250px", overflow: "hidden", marginBottom: "10px"}}> 
                <Image background-size src="https://avatars.mds.yandex.net/i?id=141ca3914e2f78d4de00322d2dec9512d647aaf8-3464614-images-thumbs&n=13"></Image>
            </div>}

            <div><Text>{employee.surName} {employee.firstName} </Text></div>
            <div><Text type="secondary">{employee.position}</Text></div>
            <Button onClick={onRemove} style={{marginTop: "15px"}}>Удалить</Button>
        </div>
    )
}