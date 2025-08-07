import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {getAssignmentById, updateAssignment} from '../api/AssignmentsService'
import { useForm } from '@mantine/form'
import {
  Button,
  Container,
  Paper,
  TextInput,
  Title, Badge
} from '@mantine/core';
import { JwtContext } from '../util/JwtContext'
import StatusBadge from './StatusBadge';
import CommentContainer from './CommentContainer';

const TeacherAssignmentDetails = () => 
  {
    const navigate = useNavigate();
    const {id} = useParams();
    const {jwt} = useContext(JwtContext);
    const [assignment, setAssignment] = useState();

    const fetchAssignment = async (id) => {
        try {
            const response = await getAssignmentById(id, jwt);
            setAssignment(response.data);
        }
        catch(error) {console.log(error)}
    }
    useEffect(() => {fetchAssignment(id)}, []);

    const refreshAssignment = async (status) => {
      try {
        assignment.status = status;
        //console.log(assignment);
        
        await updateAssignment(id, assignment, jwt);
        navigate('/dashboard')
      }
      catch(err) {console.log(err)}
    }

    if(!assignment) return 'Loading';
  return (
    <>
        <Container size={420} my={40}>
          <Title ta="center"> Assignment </Title>
    
          <Paper withBorder p={22} mt={30} radius="md">
            <StatusBadge status={assignment.status} />
    
            <p>Github Link: {assignment.githubURL}</p>
            <p>Branch: {assignment.branch}</p>

            <TextInput value={assignment.reviewVideoURL} //ASLO SHOW ERROR
            onChange={(event) => {setAssignment({ ...assignment, reviewVideoURL: event.currentTarget.value})}}
            label="Video Review URL" placeholder="https://www.obsproject.com/review" required radius="md"/>
    
            <div className='flex justify-between'>
            <Button disabled={!assignment.reviewVideoURL} onClick={() => refreshAssignment('COMPLETED')} mt="xl" radius="md">Accept</Button>
            <Button disabled={!assignment.reviewVideoURL} onClick={() => refreshAssignment('NEEDS_UPDATE')} color='red' mt="xl" radius="md">Reject</Button>
            <Button onClick={() => navigate('/dashboard')} variant='default' mt="xl" radius="md">Back</Button>
            </div>

          </Paper>
        </Container>

        <CommentContainer />
    </>
  );
}

export default TeacherAssignmentDetails