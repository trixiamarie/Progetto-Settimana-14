import React from 'react'
import Container from 'react-bootstrap/esm/Container'

export default function FooterComponent() {
  return (
    <Container fluid className='footer text-center'>
    <div>
        <p className='py-3'>Copyright <code>&copy;</code></p>
    </div>
    </Container>
  )
}
