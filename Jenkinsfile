pipeline {
    agent any

    //


    environment {
        BACKEND_IMAGE = "moatas19m/mongo-crud-backend:latest"
        FRONTEND_IMAGE = "moatas19m/mongo-crud-frontend:latest"
        KUBECONFIG = '/var/lib/jenkins/.kube/config' // Ensure this points to your Kubernetes config file, possibly from GKE
    }

    stages {

        // Ashnah adding stuff here
        stage('Initialize Terraform') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Apply Terraform') {
            steps {
                dir('terraform') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }
        ///

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
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down'
            dir('terraform') {
                sh 'terraform destroy -auto-approve'
            }
        }
        success {
            echo 'Build and deployment were successful!'
        }
        failure {
            echo 'Build or deployment failed. Check logs for details.'
        }
    }
}
