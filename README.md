# WebApp Tech project

## Frontend
- React
- Vite
- Typescript
- Prettier
- Shadcn/UI
- eslint / oxlint

[Frontend README](./frontend/README.md)

## Backend


## Setup Guide
1. Clone the project into desired location on your computer
2. Setup .env:
   ```bash
     cp .example.env .env
   ```
### Database setup
3. Go to  the `database` folder in your project and do
   ```bash
      cp .example.env .env
   ```
4. Run `npm i`
5. Run `npm run db-push`
### SSL setup
6. Go to `ssl` folder in the project and run `generate_cert.sh` script
### Starting backend
7. In the root folder of the project run ```docker compose up``` with Docker engine running
### Starting frontend
8. Go to the `frontend` folder and run `npm run dev`
9. Application will be accessible on localhost port 5173
10. Mail catcher is accessible on localhost port 8025
