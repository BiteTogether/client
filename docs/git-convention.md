BiteTogether v1 Microservice Git Conventions
Git Flow
Flow Branch Structure
Branch
Purpose
Deployable
Has CI/CD
develop
Collects completed features and passed CI/CD
❌ No
❌ No
dev
Integration and initial testing of new features
✅ Yes
✅ Yes
main
Production environment
✅ Yes
✅ Yes

TBD: Develop branches for every sprint. E.g. develop/sprint-1
Flow Branching
- Branching:
  - `feature/**` branches should be created from branch develop (Or from parent ticket's branch)
  - `bugfix/**` branched from the branch that bug happens

- Daily basis development flow:
  - Developer merge `feature/**` branches to `dev`, if CI/CD passed & testing well, then merge back to `develop`
Branching convention
Branch name format: <prefix>/<short-description>
Prefix:
feature: for development, ticket
bugfix: for fixing bug
hotfix: for prod hotfix
Examples:
feature/init_springboot
Branch creation rule:
  Purpose: Minimizes unrelated code diffs during code review, ensuring only relevant changes are shown.

Commit message
• Commits should not be rebased or squashed when merging
• Commit message should follow this style: <context> <Verb> <message>
Context can be:
A short keyword (e.g., [login], [payment]) instead of repeating branch name
Verb examples: Add, Update, Fix, Refactor, Remove
Examples:
[login] Add OAuth2 authentication
[payment] Fix timeout issue
Pull request (PR)
PR name format: <branch> <description>
Example: feature/login Update authentication
Code review checklist
[ ] Code meets requirements
[ ] Code is readable, maintainable
[ ] Good naming (variables, methods, classes)
[ ] No unnecessary complexity or duplication
[ ] Proper error handling and validation
[ ] Pass quality gates
[ ] No secrets, debug code, or commented-out blocks
[ ] Follows project structure and conventions (clean architecture)
[ ] Commit messages follow standard
