import { Text, Button, Textarea } from "@mantine/core";
import React, { useState, useEffect, useContext } from "react";
import { createComment, deleteComment, getAllComments } from "../api/AssignmentsService";
import { useParams } from "react-router-dom";
import { JwtContext } from "../util/JwtContext";
import { jwtDecode } from "jwt-decode";
import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs";
dayjs.extend(relativeTime);

const CommentContainer = () => 
  {
  const { id } = useParams();
  const { jwt } = useContext(JwtContext);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState({
    id: null,
    assignmentId: id,
    text: "",
  });
  const decoded = jwt? jwtDecode(jwt) : { authorities: [] };

  const fetchComments = async () => {
    try {
      const response = await getAllComments(id, jwt);
      setComments(response.data.content);
    } 
    catch (err) {console.log(err)}
  };
  useEffect(() => {fetchComments()}, []);

  const sendComment = async () => {
      try {        
        await createComment(comment, jwt);
        setComment({ ...comment, text: '' });
        fetchComments();
      }
      catch (err) {console.log(err)}
    };

    const handleDeleteComment = async (id) => {
      try {
        setComment({ ...comment, text: '' });
        await deleteComment(id, jwt);
        fetchComments();
      }
      catch(err) {console.log(err)}
    }

  return (
    <>
    <div className="flex justify-center items-center">
      <Textarea mb={50} className="w-100" radius="md" label="Comment" placeholder="Enter your comment"
        onChange={(event) => {setComment({ ...comment, text: event.currentTarget.value })}}
        value={comment.text} rightSectionWidth={100} rightSection={
        <Button disabled={!comment.text} onClick={() => sendComment()} radius="md"> Send </Button>}/>
      </div>

        <div className="flex flex-col items-center gap-3.5">
      {comments? (comments.map((com) => (
        <div className="w-100" key={com.id}>
        <div className="bg-gray-200 min-h-15 flex p-2 gap-4 rounded-xl justify-between">
              <Text fz="sm">{com.createdBy.username + ": " + com.text}</Text>

              {com.createdBy.username === decoded.sub?
              <div className="flex flex-col gap-2">
              <Button radius="md" onClick={()=>{setComment({...comment, id: com.id, text: com.text })}}> Edit </Button>
              <Button color="red" radius="md" onClick={()=>handleDeleteComment(com.id)}> Delete </Button>
              </div>
              : <></>}
              
        </div>
        <Text size="xs" c="dimmed">{dayjs(com.creationTime).fromNow()}</Text>
        </div>
      )))
    : <div>Loading...</div>}
    </div>
    </>
  );
};

export default CommentContainer;
