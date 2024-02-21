import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ModaleComponent from './ModaleComponent';

export default function SinglePostComponent({ setselectedPost, index, post }) {
  const dateString = post.date;
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-EN', options);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (index === 0) {
      setselectedPost(post);
    }
  }, [index]);

  // console.log(post);

  function setnewselectedpost(){
    setselectedPost(post);
  }

  // console.log(formattedDate);

  return (
    <>
      <Card className="my-1" onClick={setnewselectedpost}>
        <Card.Header style={{ backgroundImage: `url(${post._embedded['wp:featuredmedia']['0'].source_url})`, backgroundSize: 'cover', backgroundPosition: 'center', height: "10rem" }}></Card.Header>
        <Card.Body>
          <p>{formattedDate}</p>
          <div>
            <Card.Title> <span dangerouslySetInnerHTML={{ __html:post.title.rendered}}/></Card.Title>
            <Card.Text className='d-flex flex-column'>
              <span>Written by: {post._embedded['author']['0'].name}</span>
              <Button className="d-md-none" onClick={handleShow} style={{backgroundColor:"#1A282F", border:"none"}}>Read More...</Button>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <ModaleComponent posts={post} />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
