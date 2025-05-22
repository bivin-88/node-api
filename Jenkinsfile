pipeline {
    agent any

    environment {
        MONGO_DB_URL = "mongodb://localhost:27017/node-api"
    }

    stages {

        stage('Install Node and Dependencies') {
            steps {
                echo 'Installing Node.js manually if needed (assumes Node is preinstalled)'
                sh 'node -v || curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "Tests failed!"'
            }
        }
    }
}
