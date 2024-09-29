"use client";
import SexyNavbar from '@/components/built/navbar'
import { ThemeProvider } from '@/components/context/themecontext'
import React from 'react'

export default function page() {
  return (
	<ThemeProvider>
	<SexyNavbar />
	</ThemeProvider>
  )
}
