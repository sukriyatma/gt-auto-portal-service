### **Project Description: GT Auto Portal Service**

**GT Auto Portal Service** is a real-time **tracking application** designed to monitor and manage **bot activity**. The service collects performance, operational, and activity data sent from clients' bots through **HTTP requests**. This data is processed, analyzed, and presented through a user-friendly interface that allows clients to track bot performance and ensure optimal operation. With integrated real-time notifications and detailed analytics, this platform helps clients stay informed of their bot's status and activity.

### **Key Features:**
1. **Bot Activity Tracking**:
   - The app is specifically designed to **track bot activities** in real-time. Clients use bots to interact with the system, sending data related to **bot performance, operational status**, and **activity logs** via HTTP requests.
   - Bots can provide insights into metrics like uptime, errors, task completion rates, response times, and other operational data, helping clients monitor bot health and performance.

2. **Real-Time Analytics and Reporting**:
   - Once the data is received from bots, the app processes it and generates **real-time analytics** on bot performance and operational metrics.
   - Clients can access detailed **activity reports**, monitor key performance indicators (KPIs), and identify potential issues with their bots' behavior or performance.

3. **Real-Time Notifications**:
   - Integrated with **Firebase Cloud Messaging (FCM)**, the app sends **instant notifications** to clients whenever important events or anomalies occur. These may include system errors, performance degradation, or other alerts that require immediate attention.
   - The notifications are actionable and direct, ensuring clients can quickly respond to any issues with their bots.

4. **Automated Monitoring**:
   - The app automatically monitors bot performance and logs all activity, ensuring continuous tracking of operational health.
   - **OpenTelemetry** is used to monitor system performance, track issues, and provide distributed tracing to ensure all components are working optimally.

5. **Scalable and Efficient**:
   - Built using **NestJS**, **Next.js**, and **PostgreSQL**, the app is designed to scale and handle large volumes of data as more bots interact with the system.
   - The application is optimized to handle bot-driven traffic and can process high-frequency data streams from multiple clients simultaneously.

6. **High Availability**:
   - The system is resilient, with the ability to recover from failures and maintain high availability even under high traffic conditions.
   - Using **PM2** for process management, the app is kept running smoothly, and automatic restarts ensure minimal downtime in case of failures.

7. **Performance Tested**:
   - The system has been **load tested** to handle a large number of concurrent users and bot interactions, ensuring it performs well under high traffic scenarios. The application passed **100% of the JMeter load tests**, demonstrating its robustness and scalability.

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