import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, getAllComments, getAssignmentById, updateAssignment } from "../api/AssignmentsService";
import { Button, Container, Paper, TextInput, Title, Textarea, Group, Text } from "@mantine/core";
import { JwtContext } from "../util/JwtContext";
import StatusBadge from "./StatusBadge";
import CommentContainer from "./CommentContainer";

const AssignmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jwt } = useContext(JwtContext);
  const [assignment, setAssignment] = useState();

  const fetchAssignment = async () => {
    try {
      const response = await getAssignmentById(id, jwt);
      setAssignment(response.data);
    } 
    catch (error) {console.log(error)}
  };
  useEffect(() => {fetchAssignment()}, []);

  const refreshAssignment = async () => {
    try {
      assignment.status = assignment.status.toUpperCase();
      if (assignment.status === "NEEDS UPDATE") assignment.status = "SUBMITTED";
      console.log(assignment);
      await updateAssignment(id, assignment, jwt);
      navigate("/dashboard");
    } 
    catch (err) {console.log(err)}
  };

  if (!assignment) return "Loading";
  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center"> {assignment.name} </Title>

        <Paper shadow="md" withBorder p={22} mt={30} radius="md">
          <StatusBadge status={assignment.status} />

          <TextInput
            label="GithubURL" required radius="md" placeholder="https://www.github.com/your-repo"
            disabled={assignment.status === 'In Review' || assignment.status === 'Completed'}
            onChange={(event) => {setAssignment({ ...assignment, githubURL: event.currentTarget.value })}}
            value={assignment.githubURL}/>

          <TextInput
            label="Branch" radius="md" placeholder="main" required
            disabled={assignment.status === 'In Review' || assignment.status === 'Completed'}
            onChange={(event) => {setAssignment({ ...assignment, branch: event.currentTarget.value })}}
            value={assignment.branch}/>

          <div className="flex flex-row gap-10">
            <Button onClick={() => refreshAssignment()} mt="xl" radius="md">
              Edit </Button>
            <Button onClick={() => navigate("/dashboard")} variant="default" mt="xl" radius="md">
              Back </Button>
          </div>
        </Paper>
      </Container>

      <CommentContainer />
    </>
  );
};

export default AssignmentDetails;
