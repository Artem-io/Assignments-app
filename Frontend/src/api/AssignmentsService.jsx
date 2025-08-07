import axios from "axios";

const AUTH_URL = "http://localhost:8080/auth"
const ASSIGNMENTS_URL = "http://localhost:8080/assignments"
const COMMENTS_URL = "http://localhost:8080/comments"

export async function login(credentials) {
  return await axios.post(`${AUTH_URL}/login`, credentials);
}

export async function createAssignment(jwt, assignment) {
  return await axios.post(
        ASSIGNMENTS_URL,
        {
          "name": assignment.name,
          "status": "SUBMITTED",
          "githubURL": assignment.githubURL,
          "branch": assignment.branch,
          "reviewVideoURL": ""
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
        }
      );
}

export async function updateAssignment(id, assignment, jwt) {
  return await axios.put(`${ASSIGNMENTS_URL}/${id}`, 
    {
          "id": id,
          "status": assignment.status,
          "githubURL": assignment.githubURL,
          "branch": assignment.branch,
          "reviewVideoURL": assignment.reviewVideoURL,
          "user": assignment.user,
          "teacher": assignment.teacher
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
        }
  );
}

export async function deleteAssignment(id, jwt) {
  return await axios.delete(`${ASSIGNMENTS_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
  );
}

export async function getAssignmentById(id, jwt) {
  return await axios.get(`${ASSIGNMENTS_URL}/${id}`,
        { //In the backend it goes to filterChain and extracts this token
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
  );
}

export async function getAllAssignments(jwt) {
  return await axios.get(ASSIGNMENTS_URL,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
  );
}

export async function getAllAssignmentNames(jwt) {
  return await axios.get('http://localhost:8080/assignmentNames',
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
  );
}

export async function validateToken(jwt) {
  return await axios.get(`${AUTH_URL}/validate?token=${jwt}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

export async function createComment(comment, jwt) { 
  return await axios.post(COMMENTS_URL, comment, 
    {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
}

export async function getAllComments(id, jwt) {  
  return await axios.get(`${COMMENTS_URL}?assignmentId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
  );
}

export async function deleteComment(id, jwt) {
  return await axios.delete(`${COMMENTS_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
  );
}