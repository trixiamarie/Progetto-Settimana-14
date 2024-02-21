import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ModaleComponent(posts) {
    console.log(posts);
  return (
    <>
    <Modal.Header closeButton>
          <Modal.Title>{posts.posts.title.rendered}</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
        <span>{posts.posts._embedded['author']['0'].name}</span><img src={posts.posts._embedded['wp:featuredmedia']['0'].source_url} alt="featuredmedialt" style={{width:"100%", height:"auto"}}></img><span dangerouslySetInnerHTML={{ __html: posts.posts.content.rendered }} /></Modal.Body>
        </>
  )
}
