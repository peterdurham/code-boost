import React from "react"
import styled from "styled-components"

const SidebarTrack = styled.div`
  width: 300px;
  min-height: 100%;
  /* position: relative; */
`
const SidebarStyles = styled.div`
  position: sticky;
  position: -webkit-sticky;
  height: 600px;
  top: 14rem;
  background: orangered;
`

function Sidebar() {
  return (
    <SidebarTrack>
      <SidebarStyles>
        <h2>Sidebar</h2>
      </SidebarStyles>
    </SidebarTrack>
  )
}
export default Sidebar
