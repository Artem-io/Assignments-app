import React, { useContext, useEffect } from 'react'
import {createAssignment, deleteAssignment, getAllAssignmentNames, getAllAssignments} from '../api/AssignmentsService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, Button, TextInput, Text, Group, NativeSelect, Select } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useForm } from '@mantine/form';
import { JwtContext } from '../util/JwtContext';
import StatusBadge from './StatusBadge';

const Dashboard = () => 
  {
  const {jwt, setJwt} = useContext(JwtContext);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(null);
  const [assignmentNames, setAssignmentNames] = useState(null);
  const form = useForm({
    mode: 'uncontrolled',
      initialValues: {
        name: '',
        githubURL: '',
        branch: '',
      },
    });

  const fetchAssignments = async () => {
    try {
      const response = await getAllAssignments(jwt);
      setAssignments(response.data.content);
    }
    catch(err) {console.log(err)}
  }
  useEffect(() => {fetchAssignments()}, []);

  const fetchAssignmentNames = async () => {
    try {
      const response = await getAllAssignmentNames(jwt);
      setAssignmentNames(response.data);
    }
    catch(err) {console.log(err)}
  }
  useEffect(() => {fetchAssignmentNames()}, []);


  const handleNewAssignment = async (values) => {
    try {
      // console.log(values);
      
      await createAssignment(jwt, values);
      form.reset();
      modals.closeAll();
      fetchAssignments();
    }
    catch(err) {console.log(err)}
  }

  const openCreateAssignmentModal = () => {
  modals.open({
    title: 'Submit New Assignment',
    children: (
      <form onSubmit={form.onSubmit((values) => handleNewAssignment(values))}>
        
      <Select {...form.getInputProps('name')} radius="md" label="Assignment Name" required maxDropdownHeight={500}
      data={assignmentNames.map(item => item.name)} placeholder='Select your Assignment' />

        <TextInput required radius="md" label="GithubURL" placeholder="https://www.github.com/your-repo"
          {...form.getInputProps('githubURL')} />

        <TextInput required radius="md" label="Branch" placeholder="main"
          {...form.getInputProps('branch')} />

        <Group justify="center">
          <Button radius="md" type="submit"> Submit </Button>
          <Button radius="md" variant="default" onClick={() => {modals.closeAll(); form.reset();}}> Cancel </Button>
        </Group>
      </form>
    ),
  });
};

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id, jwt)
      modals.closeAll();
      fetchAssignments();
    }
    catch(err) {console.log(err)}
  }

    const openDeleteConfirmationModal = (id) => {
    modals.openConfirmModal({
      title: 'Confirm Deletion',
      children: (
        <Text size="sm">
          Are you sure you want to delete this assignment? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red', radius: 'md' },
      cancelProps: { radius: 'md', variant: 'default' },
      onConfirm: () => handleDelete(id),
      onCancel: () => modals.closeAll(),
    });
  };

  return (
    <>

    <div className='flex flex-row justify-between pt-6 px-10'>
    <Button onClick={()=>openCreateAssignmentModal()} radius='md'>Submit Assignment</Button>
    <Button onClick={() => {setJwt(''); navigate('/login')}} radius='md'>Logout</Button>
    </div>

      <div className='p-10 mt-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5'>
    {assignments? assignments.map(assignment => (

      <Card className='w-[260px] flex flex-col gap-1 justify-between' shadow='sm' padding="md" radius="lg" withBorder key={assignment.id}>

      <div className='flex items-center justify-between'>
        <h2 className='font-semibold'>{assignment.name}</h2>
        <StatusBadge status={assignment.status} />
      </div>

      <p className='font-semibold'>GithubURL: <span className='font-normal'>{assignment.githubURL}</span> </p>
      <p className='font-semibold'>Branch: <span className='font-normal'>{assignment.branch}</span> </p>
      
      {assignment.status==='Submitted'? 

      <div className='mt-[15px] flex items-center justify-evenly'>
      <Button onClick={() => navigate(`/assignments/${assignment.id}`)}
      disabled={assignment.status==='In Review' || assignment.status==='Completed'}
      color="blue" radius="md"> Edit </Button>
      <Button onClick={()=>openDeleteConfirmationModal(assignment.id)} radius="md" color='red'> Delete </Button>
      </div>

      : <Button onClick={() => navigate(`/assignments/${assignment.id}`)}
      color="blue" mt='15px' radius="md"> View </Button>}

    </Card>

    )) : <div>Loading...</div>}
    </div>    
    </>
  )
}

export default Dashboard