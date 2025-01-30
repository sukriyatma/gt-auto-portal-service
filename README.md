### Project Description: GT Auto Portal Service

The **GT Auto Portal Service** is a web application designed for **monitoring and resource management**. Built using **NestJS**, **Next.js**, **PostgreSQL**, **PM2**, **Firebase Cloud Messaging**, **Sequelize**, and **OpenTelemetry**, the project aims to provide a seamless experience in managing vehicle data for clients. The system receives data from clients via HTTP requests, processes it, performs analytics, and offers insights into the data. It also provides real-time notifications through Firebase and performance monitoring via OpenTelemetry.

Key Features:
1. **Data Reception**: The application exposes HTTP endpoints through which clients can send their vehicle-related data. This data is processed and stored in the PostgreSQL database.
2. **Analytics & Reporting**: The system provides analytics to users based on the data received. It aggregates the information and generates reports.
3. **Real-time Notifications**: Leveraging **Firebase Cloud Messaging (FCM)**, the application pushes notifications to users in real-time based on specific triggers or events.
4. **Performance Monitoring**: Integrated with **OpenTelemetry**, the app tracks performance metrics and issues in real-time, helping developers monitor resource usage and resolve issues promptly.
5. **Load Testing**: Achieved **100% success in a JMeter load test** with 1,000 users over 5 minutes, demonstrating that the system is robust and scalable.

The project is optimized for performance and reliability. It runs using **PM2** for process management and employs **Docker** to handle the PostgreSQL database setup.

### Technologies Used:
- **NestJS**: Backend framework for building efficient, scalable applications.
- **Next.js**: Frontend framework for building the user interface.
- **PostgreSQL**: Database used for storing application data.
- **PM2**: Process management tool used to keep the application running smoothly.
- **Firebase Cloud Messaging (FCM)**: For sending real-time push notifications to users.
- **Sequelize**: ORM used to interact with PostgreSQL from the Node.js backend.
- **OpenTelemetry**: For distributed tracing and performance monitoring.
- **Docker**: To containerize the PostgreSQL database, ensuring that it runs seamlessly across different environments.

### Project Structure:
- **Backend (NestJS)**: Handles the core logic, API endpoints, and interacts with the PostgreSQL database using Sequelize.
- [**Frontend (Next.js)**](https://github.com/sukriyatma/gt-auto-portal): Provides the user interface and integrates with the backend to display real-time data, analytics, and notifications.
- **Database (PostgreSQL)**: Stores all application data, including user information, vehicle data, and performance metrics.

---

### Local Setup Guide

Follow these steps to run the **GT Auto Portal Service** locally on your machine.

#### Prerequisites:
- **Node.js** installed (v16 or above recommended)
- **Docker** installed
- **PostgreSQL** Docker container for local development
- **PM2** installed globally (for managing the application processes)
- **Firebase Project** and credentials
- **Discord Developer App credentials** for OAuth integration (if using Discord login)

#### Steps to Run Locally:

1. **Clone the Repository**:
   - Start by cloning the GT Auto Portal Service repository from GitHub.
   ```bash
   git clone https://github.com/sukriyatma/gt-auto-portal-service.git
   cd gt-auto-portal-service
   ```

2. **Set Up the Environment**:
   - Create a `.env` file in the root of your project if it does not already exist.
   - Copy and paste the provided `env file` content into the `.env.development.local` file and replace placeholders with your actual values (e.g., database credentials, Firebase, and Discord OAuth details).

3. **Start the PostgreSQL Database with Docker**:
   - The PostgreSQL database is containerized using Docker. You can start it by running:
   ```bash
   docker-compose up -d
   ```
   - This will start the PostgreSQL container and set up the database automatically.

4. **Install Dependencies**:
   - Install the necessary backend dependencies (NestJS and Sequelize).
   ```bash
   npm install
   ```

5. **Build the Application**:

   - Before running the application with PM2, build your NestJS app. If your app uses TypeScript (as NestJS usually does), you will need to compile it first:
   ```bash
   npm run build
   ```

5. **Set Up Firebase and Other Services**:
   - Ensure your Firebase project is configured and that you have the necessary credentials (private key, client email, etc.).
   - If you have any other services like Discord OAuth, set them up in the `.env.development.local` file.

6. **Run Database Migrations**:
   - Run the migrations to set up the database schema using Sequelize.
   ```bash
   npx sequelize-cli db:migrate
   ```

7. **Start the Application Using PM2**:
   - Install PM2 globally if you haven’t done so:
   ```bash
   npm install -g pm2
   ```
   - Start the backend server using PM2:
   ```bash
   pm2 start ecosystem.config.js --env development
   ```
   - This will keep your application running in the background, and PM2 will manage it.

---

### Docker Setup for PostgreSQL
The project includes a `docker-compose.yml` file for setting up PostgreSQL with Docker.
Run the following command to start the database:
```bash
docker-compose up -d
```

This will run PostgreSQL in a Docker container with the specified configurations, ensuring the database is available for local development.

---

### Conclusion
By following these steps, you can set up the **GT Auto Portal Service** locally for development and testing. The application is designed to be scalable, secure, and robust, with features such as real-time notifications, performance monitoring, and detailed data analytics.