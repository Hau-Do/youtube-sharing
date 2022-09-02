import React from 'react'
import styled from 'styled-components'

const Button = ({ children, ...props }) => {
    return (
        <ButtonStyled {...props}>{children}</ButtonStyled>
    )
}

const ButtonStyled = styled.button`
`

export default Button