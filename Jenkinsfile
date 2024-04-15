pipeline {
    agent any

    environment {
        // Define Docker images
        BACKEND_IMAGE = "moatas19m/mongo-crud-backend:latest"
        FRONTEND_IMAGE = "moatas19m/mongo-crud-frontend:latest"
        // Path to the Kubernetes configuration
        KUBECONFIG = '/home/moatasim/.kube/config'
        // These credential IDs should be configured in your Jenkins credentials store
        // DOCKERHUB_CREDENTIALS = credentials('dockerhubcred')
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
                    // Apply Kubernetes manifests
                    sh 'kubectl apply -f backend-deployment.yaml'
                    sh 'kubectl apply -f backend-service.yaml'
                    sh 'kubectl apply -f frontend-deployment.yaml'
                    sh 'kubectl apply -f frontend-service.yaml'
                    // Forward ports
                    sh 'kubectl port-forward service/frontend 30000:80 &'
                    sh 'kubectl port-forward service/backend 30001:5000 &'
                }
            }
        }

        stage('Test') {
            steps {
                // Add your testing steps here
                echo 'Run tests here'
            }
        }

        stage('Cleanup') {
            steps {
                // Cleanup or other final steps
                echo 'Pipeline completed'
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
