import React from "react";
import Container from "react-bootstrap/esm/Container";
import SinglePostComponent from "./SinglePostComponent";

export default function PostsComponent({ setselectedPost, data, filteredPosts }) {
    return (
        <Container>
            <div>
                {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                        <SinglePostComponent key={post.id} setselectedPost={setselectedPost} index={index} post={post} />
                    ))
                ) : (
                    Array.isArray(data) &&
                    data.map((post, index) => (
                        <SinglePostComponent key={post.id} setselectedPost={setselectedPost} index={index} post={post} />
                    ))
                )}
            </div>
        </Container>
    );
}
