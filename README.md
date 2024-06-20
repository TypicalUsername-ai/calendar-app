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
### SSL setup
3. Go to `ssl` folder in the project and run `generate_cert.sh` script
### Start docker
in the root project directory run `docker compose up -d` (-d to detach logs)
### Database setup
4. Go to  the `database` folder in your project and do
   ```bash
      cp .example.env .env
   ```
5. Run `npm i`
6. Run `npm run db-push`
7. Reset the API container with the new schema by running `docker compose restart rest`
### Starting frontend
8. Go to the `frontend` folder and run `npm run dev`
9. Application will be accessible on localhost port 5173
10. Mail catcher is accessible on localhost port 8025
