import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlApi2 } from "../dati/data";
import Table from "react-bootstrap/Table";
import { Container, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Userspage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${urlApi2}wp/v2/users?page=${page}`);
      setUsers((prevUsers) => [...prevUsers, ...response.data]);
      setIsLoading(false);
      if (response.data.length === 0 || response.data.length < 10) {
        setHasMore(false);
      }
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="mt-3">
      <InfiniteScroll
        dataLength={users.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />Loading...</>
        }
        endMessage={<p>No more users to show.</p>}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Avatar</th>
              <th>User</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>
                  <img src={user.avatar_urls[24]} alt="Avatar" />
                </td>
                <td>{user.name}</td>
                <td>{user.slug}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </InfiniteScroll>
    </Container>
  );
}
