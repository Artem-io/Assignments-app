import React, { useContext, useEffect } from 'react'
import {getAllAssignments, updateAssignment} from '../api/AssignmentsService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, Text, Badge, Button, Group, Title, } from '@mantine/core';
import { JwtContext } from '../util/JwtContext';
import StatusBadge from './StatusBadge';

const TeacherDashboard = () => {
  const {jwt, setJwt} = useContext(JwtContext);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(null);

  const fetchAssignments = async () => {
    try {
      const response = await getAllAssignments(jwt);
      setAssignments(response.data.content);
      console.log(response.data.content);
      
    }
    catch(err) {console.log(err)}
  }
  useEffect(() => {fetchAssignments()}, []);

  const claimAssignment = async (assignment) => {
    try {
      assignment.status = 'IN_REVIEW';
      await updateAssignment(assignment.id, assignment, jwt);
      fetchAssignments();
      //console.log(assignment);
      
    }
    catch(err) {console.log(err)}
  }
 
  return (
    <>
    <Button onClick={() => {setJwt(''); navigate('/login')}} radius='md'>Logout</Button>

    <Title>Awaiting Review</Title>
    <div className='border-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
    {assignments? assignments.filter(assignment => assignment.status === 'Submitted').map(assignment => (

      <Card className='w-70' padding="lg" radius="md" withBorder key={assignment.id}>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Assignment Name</Text>
        <StatusBadge status={assignment.status} />
      </Group>

      <p>GithubURL: {assignment.githubURL}</p>
      <p>Branch: {assignment.branch}</p>

      <Button onClick={() => claimAssignment(assignment)}
       color="blue" fullWidth mt="md" radius="md"> Claim </Button>
    </Card>

    )) : <div>Loading...</div>}
    </div>



    <Title>In Review</Title>
    <div className='border-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
    {assignments? assignments.filter(assignment => assignment.status === 'In Review').map(assignment => (

      <Card className='w-70' padding="lg" radius="md" withBorder key={assignment.id}>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Assignment Name</Text>
        <StatusBadge status={assignment.status} />
      </Group>

      <p>GithubURL: {assignment.githubURL}</p>
      <p>Branch: {assignment.branch}</p>

      <Button onClick={() => navigate(`/assignments/${assignment.id}`)}
       color="blue" fullWidth mt="md" radius="md">Edit</Button>
    </Card>

    )) : <div>Loading...</div>}
    </div>
    </>
  )
}

export default TeacherDashboard