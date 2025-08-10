"use client"

import styled from "styled-components"
import Link from "next/link"

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>🎬 MovieApp</Logo>
        <Nav>
          <NavLink href="/">Home</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  )
}
