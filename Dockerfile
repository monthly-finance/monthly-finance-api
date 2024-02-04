# Use an official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=monthly_finance
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password

# Expose the PostgreSQL port
EXPOSE 5432