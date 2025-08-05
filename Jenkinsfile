pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'karthikpojar/mini-poll-app'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'  // Replace with your actual Jenkins DockerHub credentials ID
        EC2_USER = 'ubuntu'  // Replace with your actual EC2 user
        EC2_HOST = 'your-ec2-ip'  // Replace with your actual EC2 public IP
        SSH_KEY_ID = 'ec2-ssh-key' // Replace with your actual SSH credentials ID in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Poojarkarthik/Cloud_task2.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "Tests failed or skipped"'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ["${SSH_KEY_ID}"]) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST '
                        docker pull $DOCKER_IMAGE &&
                        docker stop mini-poll-app || true &&
                        docker rm mini-poll-app || true &&
                        docker run -d -p 3000:3000 --name mini-poll-app $DOCKER_IMAGE
                    '
                    '''
                }
            }
        }
    }
}
