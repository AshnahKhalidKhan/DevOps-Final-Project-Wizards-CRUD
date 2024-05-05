pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "moatas19m/mongo-crud-backend:latest"
        FRONTEND_IMAGE = "moatas19m/mongo-crud-frontend:latest"
        KUBECONFIG = '/var/lib/jenkins/.kube/config' // Ensure this points to your Kubernetes config file, possibly from GKE
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Checking out source code.'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        sh 'docker build -t ${env.BACKEND_IMAGE} .'
                        sh 'docker push ${env.BACKEND_IMAGE}'
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        sh 'docker build -t ${env.FRONTEND_IMAGE} .'
                        sh 'docker push ${env.FRONTEND_IMAGE}'
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                dir('kubernetes') {
                    script {
                        sh 'kubectl apply -f backend/backend-deployment.yaml'
                        sh 'kubectl apply -f backend/backend-service.yaml'
                        sh 'kubectl apply -f frontend/frontend-deployment.yaml'
                        sh 'kubectl apply -f frontend/frontend-service.yaml'
                        sh 'kubectl apply -f mongo-crud-ingress.yaml'
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'npm install' // Ensure dependencies are installed for the tests
                            sh 'npm test'    // Run backend tests
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm install' // Ensure dependencies are installed for the tests
                            sh 'npm test'    // Run frontend tests
                        }
                    }
                }
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
            echo 'Build or deployment failed. Check logs for details.'
        }
    }
}
