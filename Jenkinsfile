pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "moatas19m/mongo-crud-backend:latest"
        FRONTEND_IMAGE = "moatas19m/mongo-crud-frontend:latest"
        // These credential IDs should be configured in your Jenkins credentials store
        // DOCKERHUB_CREDENTIALS = credentials('dockerhubcred')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        // stage('Login to DockerHub') {
        //     steps {
        //         script {
        //             withCredentials([usernamePassword(credentialsId: 'dockerhubcred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
        //                 sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
        //             }
        //         }
        //     }
        // }
    
        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        sh "docker build -t ${env.BACKEND_IMAGE} ."
                        sh "docker push ${env.BACKEND_IMAGE}"
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        sh "docker build -t ${env.FRONTEND_IMAGE} ."
                        sh "docker push ${env.FRONTEND_IMAGE}"
                    }
                }
            }
        }

        stage('Docker Compose') {
            steps {
                script {
                    // Run docker-compose to start services
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Test') {
            steps {
                // Add your testing steps here
                echo 'Run tests here'
            }
        }

        stage('Deploy') {
            steps {
                // Add your deployment steps here
                echo 'Deploy to production'
            }
        }
    }

}
