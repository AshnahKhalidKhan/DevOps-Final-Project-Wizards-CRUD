pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "moatas19m/mongo-crud-backend:latest"
        FRONTEND_IMAGE = "moatas19m/mongo-crud-frontend:latest"
        // KUBECONFIG = '/home/moatasim/.kube/config' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhubcred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }

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

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f backend-deployment.yaml'
                    sh 'kubectl apply -f frontend-deployment.yaml'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Run tests here'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleanup tasks if necessary'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down'
        }
        success {
            echo 'Build and deployment were successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
