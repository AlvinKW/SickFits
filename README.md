# SickFits

A full stack online clothing store complete with real credit checkout.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software

```
node 10.x.x
npm 6.x.x
prisma
stripe
mailtrap
```

### Installing

A step by step series of examples that tell you how to get a development env running

1. Clone the repository
```
git clone https://github.com/kazijawad/SickFits.git
```

2. Enter the backend directory and install the necessary packages
```
cd SickFits/backend
npm install
```

3. Create a .env file
```
touch .env
```

4. Include the necessary environment variables with your preferred value
```
APP_SECRET=xxx
FRONTEND_URL=xxx
MAIL_HOST=xxx
MAIL_PORT=xxx
MAIL_USER=xxx
MAIL_PASS=xxx
PORT=5000
PRISMA_ENDPOINT=xxx
PRISMA_SECRET=xxx
STRIPE_SECRET=xxx
```

5. Run the npm script: npm run deploy
```
npm run deploy
```

6. Run the npm script: npm start
```
npm start
```

7. The server will start on this domain
```
https://localhost:5000
```

8. On a new terminal, enter the frontend directory and install the necessary packages
```
cd SickFits/frontend
npm install
```

9. Run the npm script: npm start
```
npm start
```

10. The server will start on this domain
```
https://localhost:3000
```

## Built With

### Frontend
* [React](https://reactjs.org/) - UI Library
* [Next.js](https://nextjs.org/) - React Framework
* [Apollo](https://www.apollographql.com/) - GraphQL Platform
* [GraphQL](https://graphql.org) - API Query Language
* [Styled-Components](https://styled-components.com) - CSS in JS
* [NProgress](http://ricostacruz.com/nprogress/) - Progress Bar

### Backend
* [GraphQL](https://graphql.org) - API Query Language
* [GraphQL-Yoga](https://github.com/prisma/graphql-yoga) - GraphQL Server
* [Prisma](http://prisma.io) - GraphQL Database Interface
* [Stripe](https://stripe.com/us) - Online Payment Platform
* [Mailtrap](https://mailtrap.io/) - E-Mail Testing Platform
* [Nodemailer](https://nodemailer.com/about/) - Node.js E-Mail Platform

## Author

Kazi Jawad

## Acknowledgments

* [Fullstack Advanced React & GraphQL](https://advancedreact.com/)
