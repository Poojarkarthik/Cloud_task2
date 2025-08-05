pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Poojarkarthik/Cloud_task2'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t mini-poll-app .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy stage placeholder'
                // Add deployment logic here (e.g., to AWS EC2)
            }
        }
    }
}
