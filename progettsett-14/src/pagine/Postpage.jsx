import React, { useEffect, useState } from 'react';
import PostsComponent from '../componenti/PostsComponent';
import { Col, Container, Form, Row, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { urlApi2 } from '../dati/data';
import Detailpage from './Detailpage';

export default function Postpage() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setselectedPost] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1); 
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get(urlApi2 + "wp/v2/posts?_embed&per_page=15&page=1")
            .then((response) => {
                setPosts(response.data);
                setHasMorePosts(response.data.length === 15);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    const loadMorePosts = () => {
        setLoading(true);
        axios
            .get(`${urlApi2}wp/v2/posts?_embed&per_page=15&page=${pageNumber + 1}`)
            .then((response) => {
                setLoadedPosts([...loadedPosts, ...response.data]);
                setPageNumber(pageNumber + 1);
                setHasMorePosts(response.data.length === 15);
            })
            .catch((error) => {
                console.error("Error fetching more posts:", error);
            })
            .finally(() => {
                setLoading(false); 
            });
    };
    

    const handleSearch = () => {
        const filteredPosts = posts.filter(post => {
            return (
                post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.rendered.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredPosts(filteredPosts);
    };

    return (
        <Container>
            <Row className='my-3 ps-0'>
                <Col md={4} className='overflow-y-scroll' style={{ height: "80vh" }}>
                    <Form className="mb-3 me-3 ps-2">
                        <Form.Group controlId="searchTerm">
                            <Form.Label>Cerca post</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci il termine di ricerca"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='my-2'
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSearch} style={{backgroundColor:"#1A282F", border:"none"}}>
                            Cerca
                        </Button>
                    </Form>
                    <PostsComponent setselectedPost={setselectedPost} data={filteredPosts.length > 0 ? filteredPosts : loadedPosts.length > 0 ? loadedPosts : posts} />
                    {hasMorePosts && (
                        <div className="d-flex justify-content-center align-items-center my-3">
                            <Button onClick={loadMorePosts} disabled={loading} style={{backgroundColor:"#1A282F", border:"none"}}>
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Loading...
                                    </>
                                ) : (
                                    "Load more posts"
                                )}
                            </Button>
                        </div>
                    )}
                </Col>
                <Col md={8} className='d-none d-md-block overflow-y-scroll' style={{ height: "80vh" }}>
                    <Detailpage selectedPost={selectedPost} />
                </Col>
            </Row>
        </Container>
    );
}
