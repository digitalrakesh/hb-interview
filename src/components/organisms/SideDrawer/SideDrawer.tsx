import React from 'react';
import {Drawer} from '@material-ui/core';
import StudentForm from '../StudentForm/StudentForm';

interface SideDrawerProps{
    open: boolean;
    anchor: any;
    onClose: any;
    student?: any;
}

const SideDrawer: React.FC<SideDrawerProps> = ({open, anchor, onClose, student}) =>{
    return(
        <>
            <Drawer
            open={open}
            anchor={anchor}
            onClose={()=>onClose()}
          >
              <StudentForm 
              student = {student}
              />
           
          </Drawer>
        </>
    )
}

export default SideDrawer;