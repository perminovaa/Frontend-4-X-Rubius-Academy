import { Button } from "antd";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => {};
  }


export function ButtonClick (props: ButtonProps) {
    const handleClick = () => {
      if (props.onClick) {
         props.onClick();
      }
    }
  
    return (
     <Button type="primary" htmlType="button" style={{ width: '300px' }} onClick={handleClick} >{props.children}</Button>
    )
  };