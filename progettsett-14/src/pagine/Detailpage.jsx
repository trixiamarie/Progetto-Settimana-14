import React from 'react';
import { Card, Container } from 'react-bootstrap';

export default function Detailpage({ selectedPost }) {
  if (!selectedPost) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Card>
        <Card.Header className='fs-3 fw-bold'>
        <span dangerouslySetInnerHTML={{ __html:selectedPost.title.rendered}}/>
        </Card.Header>
        <Card.Body>
          <img src={selectedPost._embedded['wp:featuredmedia']['0'].source_url} style={{ width: "100%", height: "auto" }} alt="Featured media" />
          <span className='m-1 fw-bold fs-5'>Written by: {selectedPost._embedded['author']['0'].name}</span>
          <span dangerouslySetInnerHTML={{ __html: selectedPost.content.rendered }}></span>
        </Card.Body>
      </Card>
    </Container>
  );
}
