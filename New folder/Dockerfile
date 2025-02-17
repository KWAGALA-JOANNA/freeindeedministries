# Use the official Python image
FROM python:3.10-slim

# Set the working directory
WORKDIR /New folder

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Command to run the application
CMD ["python", "run.py"]
