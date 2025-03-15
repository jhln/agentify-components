# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
with an expanded "Thoughts" section to capture development reflections and lessons learned.

## Changelog Categories
- **Added** - New features or capabilities
- **Changed** - Changes to existing functionality
- **Deprecated** - Features that will be removed in upcoming releases
- **Removed** - Features or capabilities that were removed
- **Fixed** - Bug fixes
- **Security** - Security-related changes or improvements
- **Performance** - Performance-related changes
- **Infrastructure** - Build process, dependencies, or deployment changes
- **Documentation** - Documentation updates

## [Unreleased]

## [0.0.2] - 2025-03-14

### Added
- Functional components could not be supported through decorators, so added HOC back i.e withAgentConfig

### Changed
- The examples

### Fixed
- MCP tools not being created correctly

### Infrastructure
- Moved around imports

### Thoughts
- Fixed a lot of stuff wrong with 0.0.1

## [0.0.1] - 2025-03-12

### Added
- Started off with HOC component pattern for agentifying components
- Realized its not the best fit as it is better used for runtime configuration, but we need it for build time configuration
- Changed to use decorators for the metadata

### Changed
- Nothing

### Fixed
- Nothing

### Infrastructure
- Nothing

### Thoughts
- Quite literally wondered why did I even think HOC was a good idea
- Starting off with MCP but need to accomodate for other protocols