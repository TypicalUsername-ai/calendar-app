## Adding components

! We use [shadcn-ui](https://ui.shadcn.com/)
! If you want to create a new component - first look there if one exists and can be customized
! DO NOT hardcode colors in the ui - the colors are defined by css variables and work with shadcn and tailwind
! for auth we are using gotrue by netlify this time (no much difference) [Link](https://github.com/netlify/gotrue) 
! for frontend auth we have a auth library [LINK](https://github.com/netlify/gotrue)
! there are global instances of both the auth and axios object done via context
! Strongly advice for using react query [Docs](https://tanstack.com/query/latest/docs/framework/react/overview)

## The file structure

! components go to the [components](./src/components/) folder
! pages (the ones you put in the router config) got to the [pages](./src/pages/) folder
! check [package.json](./package.json) for [ALIASING](https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo) 
! components are self contained and location agnostic, please pay attention to it [example: Login form](./src/components/Authorization/LoginForm.tsx)

[vite boilerplate readme](./vite-config.md)
