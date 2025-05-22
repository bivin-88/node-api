pipeline {
    agent any

    tools {
        nodejs "NodeJS"  // This name must match Jenkins global tool name
    }

    environment {
        MONGO_DB_URL = "mongodb://localhost:27017/node-api"
    }

    stages {

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "Tests failed!"'
            }
            post {
                always {
                    junit 'test-results.xml' // optional if tests generate JUnit XML
                }
            }
        }
    }
}
