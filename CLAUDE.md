# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm install` - Install dependencies
- `npm run build` - Build the project
- `npm start` - Start the MCP server
- `npm test` - Run all tests
- `npm test -- --testNamePattern="test name"` - Run a specific test
- `npm run lint` - Run linting

## Code Style Guidelines
- Follow MVC architecture pattern
- Use Dependency Injection
- 2 space indentation
- Lowercase hyphenated file names
- Descriptive variable and function names
- Follow language-specific style guides
- Comprehensive error handling
- Document code with meaningful comments
- Reference documentation file IDs in comments

## Project Structure
- `/src` - Source code
- `/docs` - Documentation (with ID naming convention)
- `/tests` - Test files
- `/.ai` - AI-related documentation

## Performance Targets
- Response time: 200ms
- Scalability: Medium (1000-10000 users)