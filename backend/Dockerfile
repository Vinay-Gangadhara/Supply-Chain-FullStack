# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.9-slim

# Set the working directory in the container.
WORKDIR /app

# Copy the requirements file into the container.
COPY requirements.txt requirements.txt

# Install the Python dependencies.
RUN pip install -r requirements.txt

# Copy the rest of the working directory contents into the container.
COPY app /app/app
COPY companies.csv /app/companies.csv
COPY locations.csv /app/locations.csv

# Command to run the application.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
