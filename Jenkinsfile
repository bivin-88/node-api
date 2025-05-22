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
       stage('Code Quality') {
  steps {
    echo 'Running ESLint...'
    sh 'npm run lint || true'
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
stage('Release') {
  steps {
    echo 'Creating a Git release tag...'
    withCredentials([usernamePassword(credentialsId: 'github-push-token', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
      sh '''
        git config user.name "$GIT_USERNAME"
        git config user.email "$GIT_USERNAME@users.noreply.github.com"
        git tag -a "v1.0.$BUILD_NUMBER" -m "Release v1.0.$BUILD_NUMBER"
        git push https://$GIT_USERNAME:$GIT_PASSWORD@github.com/bivin-88/node-api.git --tags
      '''
    }
  }
}

 
    }
}

