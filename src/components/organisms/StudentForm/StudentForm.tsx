import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment'
import './style.scss';
import Input from '../../atoms/Input/Input';
import Select from '../../atoms/Select/Select';


interface StudentFormProps {
    student: any
}

const StudentForm: React.FC<StudentFormProps> = (props) => {

    var [studentclassess, setStudentclassess] = useState([]);
    var [studentCampus, setStudentCampus] = useState([]);
    var [studentSection, setStudentSection] = useState([]);

    const { register, handleSubmit } = useForm();

    const onSubmit = (student: any) => {
        debugger
        axios.put(`https://mtml-api.hestawork.com/api/user/update-student`, student)
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }

    var student = props.student
    
    useEffect(()=>{
        var classId = props.student.student.class_name
        const getStudentClass =() => {
            axios
              .get("https://mtml-api.hestawork.com/api/userClass/class-details")
              .then((res) => {
                const studentclassdata = res.data.data.classes;
                const studentCampusData = res.data.data.campus;
                setStudentclassess(studentclassdata)
                setStudentCampus(studentCampusData)
                var studentSectionData = res.data.data.classes.find((cls:any) => cls.class_name === classId).section;
                setStudentSection(studentSectionData)
              });
          }
          getStudentClass()
    },[])

    const getSectionByClass = (event : any) =>{
        var classId = event.currentTarget.value
        var currentClass : any = studentclassess.find((cla : any) =>
            cla.class_name === classId
        )
        var currentSections = currentClass.section;
        setStudentSection(currentSections)
    }

    return (
        <div className="formBox">
            <form className="ui form" onSubmit={handleSubmit(onSubmit)}>

                <Input 
                label="First Name"
                defaultValue={student.first_name}
                {...register("first_name",  { required: true, maxLength: 100 })}
                />

                <Input
                label="Last Name"
                defaultValue={student.last_name}
                {...register("last_name", { required: true, maxLength: 100 })}
                />

                <Select 
                label="Campus"
                {...register("campus")}
                >
                    { studentCampus && studentCampus.map((campus:any)=>(
                        <option key={campus.id}
                         value={campus.campus_name}>
                        {campus.campus_name}
                        </option>
                    ))}
                </Select>

                <Input
                label="Student Id"
                readOnly={true}
                defaultValue={student.student.student_id}
                {...register("student_id",  { required: true, maxLength: 100 })}
                />

                <Input
                label="Date of Birth"
                defaultValue={moment(student.student.dob).format('DD-MMMM-YYYY')}
                {...register("dob",  {maxLength: 100 })}
                />

                <Input
                label="Gendel"
                defaultValue={student.student.gender}
                {...register("gender",  {maxLength: 10 })}
                />

                <Input
                label="Email"
                defaultValue={student.email}
                {...register("email", { required: true, maxLength: 100 })}
                />

                <Input
                label="Mobile"
                defaultValue={student.mobile_number}
                {...register("mobile_number", { required: true, maxLength: 100 })}
                />

                <Select 
                label="Class"
                {...register("class_name")}
                  onChange={(value:any)=> getSectionByClass(value)}>
                    {studentclassess && studentclassess.map((classes:any)=>{
                            if(student.student.class_name === classes.class_name){
                            return    <option 
                                key={classes.id}
                                 value={classes.class_name}
                                 >
                                    {classes.class_name}
                                    </option>
                            }else{
                               return <option 
                            key={classes.class_name}
                             value={classes.class_name}>
                                {classes.class_name}
                                </option>
                            }
                    }
                        
                    )}
                </Select>

                <Select 
                label="Section"
                {...register("section")} >
                {studentSection && studentSection.map((section:any)=>
                
                (
                    <option key={section.studentSection} value={section.section}>
                            {section.section}
                            </option>
                )
                    )}
                </Select>

                <input className="ui button blue" type="submit" />
                
            </form>
        </div>
    )
}

export default StudentForm;