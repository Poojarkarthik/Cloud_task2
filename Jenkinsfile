pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'karthikpoojar/mini-poll-app:latest'    // 🔁 Replace with your DockerHub image name
        EC2_HOST = 'ubuntu@51.20.250.80'                 // 🔁 Replace with your EC2 public IP
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Poojarkarthik/Cloud_task2.git'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh '''
                    chmod +x ./node_modules/.bin/mocha
                    ./node_modules/.bin/mocha tests/*.test.js
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $DOCKER_IMAGE ."
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $EC2_HOST '
                            docker stop mini-poll-app || true &&
                            docker rm mini-poll-app || true &&
                            docker pull $DOCKER_IMAGE &&
                            docker run -d -p 80:3000 --name mini-poll-app $DOCKER_IMAGE
                        '
                    '''
                }
            }
        }
    }
}
