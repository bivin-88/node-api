pipeline {
    agent any

    environment {
        MONGO_DB_URL = "mongodb://mongo:27017/node-api"
        SNYK_TOKEN = credentials('SNYK_TOKEN')  // pulls token from Jenkins credentials

    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "Some tests failed!"'
            }
        }

        stage('Security Scan - Snyk') {
    steps {
        echo 'Running Snyk security scan...'
        sh '''
            npm install -g snyk
            snyk auth $SNYK_TOKEN
            snyk test || echo "Snyk found vulnerabilities"
        '''
    }
}


        stage('Deploy Docker') {
            steps {
                echo 'Deploying Docker containers...'
                sh 'docker-compose down || true'
                sh 'docker-compose up --build -d'
            }
        }
    }
}

