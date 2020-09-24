import React from "react"
import styled from "@emotion/styled"

const Root = styled.footer`
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
  color: #ccc;
  background-color: #171717;
`

const Footer = () => (
  <Root>
    <p>© {new Date().getFullYear()}, Built with by Valeria Lovato</p>
  </Root>
)

export default Footer
