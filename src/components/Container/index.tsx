import React from 'react'
import { Content } from './styles'

export function Container({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>
}
