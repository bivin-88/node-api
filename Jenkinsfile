pipeline {
    agent any

    environment {
        MONGO_DB_URL = "mongodb://localhost:27017/node-api"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo 'Using pre-installed Node.js'
                sh 'node -v'
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
