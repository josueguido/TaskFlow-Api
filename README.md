# TaskFlow Backend

![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-green)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D5.0.0-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/postgresql-%3E%3D12-blue)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Jest](https://img.shields.io/badge/tested%20with-jest-99424f?logo=jest)
![Made with Express](https://img.shields.io/badge/express.js-%3E%3D4.0.0-black?logo=express)

A robust and scalable backend API for TaskFlow application built with Node.js, TypeScript, Express, and PostgreSQL

## 📌 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup](#1-clone-the-repository)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🚀 Features

- **TypeScript**: Full type safety with modern ES2022 features
- **Express.js**: Fast and lightweight web framework
- **PostgreSQL**: Reliable relational database
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Validation**: Input validation using Zod schemas and express-validator
- **Security**: Comprehensive security with Helmet, CORS, and rate limiting
- **API Documentation**: Swagger/OpenAPI documentation
- **Logging**: Structured logging with Winston
- **Testing**: Jest testing framework with TypeScript support
- **Code Quality**: ESLint and Prettier for code formatting and linting
- **Development**: Hot reload with Nodemon and ts-node

## 📋 Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TaskFlow-
   Backend
   ```

2. **Install dependencies**

   ```bash
   npm tall
   ```

3. **Environment Configuration**

   Create a `.env` file in the root direry:

   ```env
   NODE_ENV=development
   PORT=3000

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=tflow
   DB_USER=your_username
   DB_PASSWORD=your_password

   # JWT Configuran
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d

   # Or configurations
   BCRYPT_ROUNDS=12
   ```

4. **Database Setup**
   Make sure PostgreSQL is running and create the database:
   ```sql
   CREATE DATABASE taskflow;
   ```

## 🚀 Getting Started

### Development Mode

Start the developme
nt server with hot reload:

```bash
npm run dev
```

Alternative development commands:

```bash
# Direct execution with ts-node
npm run dev:direct

# Watch mode
with Node.js --watch flag
npm run dev:watch
```

### Production Mode

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

Once the server is running, you
can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🔧 Development Tools

### Code Formatting and Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

## 📁 Project Structure

```
TaskFlow-Backend/
├── src/
│   ├── app.ts                 # Express application setup
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   ├── swagger.ts         # Swagger configuration
│   │   └── DB/
│   │       └── index.ts       # Database connection
│   ├── controllers/           # Route controllers
│   ├── errors/               # Custom error classes
│   ├── interfaces/           # TypeScript interfaces
│   ├── middlewares/          # Express middlewares
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── schemas/              # Zod validation schemas
│   ├── services/             # Business logic services
│   ├── tests/                # Test files
│   ├── utils/                # Utility functions
│   └── validators/           # Input validators
├── config/                   # Configuration files
├── logs/                     # Log files
├── dist/                     # Compiled JavaScript (after build)
├── jest.config.js            # Jest configuration
├── tsconfig.json             # TypeScript configuration
├── nodemon.json              # Nodemon configuration
└── package.json              # Dependencies and scripts
```

## 🛡️ Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Cross-Origin Resource Sharing configuration
- **Rate Limiting**: Prevents abuse with request rate limiting (100 requests per 15 minutes)
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Comprehensive input validation with Zod schemas

## 🔗 API Endpoints

### Authentication

- `POST /api/users/register` - User registration

### Users

- `GET /api/users` - Get all users (Admin only, requires authentication)

## 🗃️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User authentication and profile information

## 📝 Environment Variables

| Variable       | Description             | Required | Default        |
| -------------- | ----------------------- | --------- | ------------- |
| NODE \_ENV     | Application environment | No        | development   |
| PORT           | Server port             | No        | 3000          |
| DB_HOST        | Database host           | Yes       | -             |
| DB_PORT        | Database port           | Yes       | -             |
| DB_NAME        | Database name           | Yes       | -             |
| DB_USER        | Database username       | Yes       | -             |
| DB_PASSWORD    | Database password       | Yes       | -             |
| JWT_SECRET     | JWT signing secret      | Yes       | -             |
| JWT_EXPIRES_IN | JWT expiration time     | No        | 7d            |
| BCRYPT_ROUNDS  | bcrypt hashing rounds   | No        | 12            |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking

Make sure to run `npm run lint:fix` and `npm run format` before committing.

## 🐛 Error Handling

The application includes comprehensive error handling with custom error classes:

- `AppError` - Base application error
- `BadRequestError` - 400 Bad Request errors
- `UnauthorizedError` - 401 Unauthorized errors
- `NotFoundError` - 404 Not Found errors

## 📊 Logging

The application uses Winston for structured logging with different log levels:

- `error.log` - Error logs
- Console output in development mode

## 🚀 Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT secrets
4. Enable SSL/TLS
5. Configure reverse proxy (nginx/Apache)
6. Set up monitoring and logging

## 📄 License

This project is licensed under the ISC License.

## 🙋‍♂️ Support

If you have any questions or issues, please open an issue in the repository.

## Contact

For questions or support, feel free to contact:

- **Author**: Josue Guido
- **Email**: josuguido@example.com
- **GitHub**: [Josue Guido](https://github.com/josueguido)

```

```
