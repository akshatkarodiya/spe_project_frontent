FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy our node module specification
COPY package*.json ./

RUN npm install

COPY . .

# Expose port 3000 on the host machine to the container for listening to external connections
EXPOSE 3000

# Start the React applications
CMD ["npm", "start"]