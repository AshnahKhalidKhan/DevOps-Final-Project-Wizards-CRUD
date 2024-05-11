pipeline {
    agent any
    environment {
        BACKEND_IMAGE = "ashnahkhalidkhan00210/mongo-crud-backend:latest"
        FRONTEND_IMAGE = "ashnahkhalidkhan00210/mongo-crud-frontend:latest"
        KUBECONFIG = 'C:\\Users\\namra\\.kube\\config'
        CLOUDSDK_CORE_PROJECT='devops-project-wizard-crud'
        CLIENT_EMAIL='service-account-ka-naam@devops-project-wizard-crud.iam.gserviceaccount.com'
        GCLOUD_CREDS=credentials('googlecloudplatform_id')
        PROJECT_ID = 'devops-project-wizard-crud'
        CLUSTER_NAME = 'devops-project-wizard-crud-cluster'
        LOCATION = 'asia-southeast2-a'
    }

    stages {
        stage('Webhook Test') {
            steps {
                echo 'NOTE-TO-SELF: Run Powershell as administrator and run this command before running this stage:'
                echo 'ngrok http --domain=light-kit-positively.ngrok-free.app 8080'
                echo 'Checking webhook...'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                echo 'Checking out source code.'
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_id', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'docker login -u="${DOCKER_USERNAME}" -p="${DOCKER_PASSWORD}"'
                    }
                }
            }
        }

        stage('Build & Push Images') {
            steps {
                script {
                    sh 'docker-compose up -d --build'
                    sh "docker push ${env.BACKEND_IMAGE}"
                    sh "docker push ${env.FRONTEND_IMAGE}"
                }
            }
        }

        stage('Setup GKE Cluster') {
            steps {
                script {
                    sh 'gcloud config set project $PROJECT_ID'
                    sh 'gcloud components install gke-gcloud-auth-plugin'
                    def clusterExists = sh(script: "gcloud container clusters describe $CLUSTER_NAME --region $LOCATION --project $PROJECT_ID", returnStatus: true) == 0
                    if (!clusterExists) {
                        echo 'Cluster does not exist. Creating...'
                        dir('terraform') {
                            sh 'terraform init'
                            sh 'terraform apply'
                        }
                    }
                    else {
                        echo 'Cluster already exists. Skipping creation...'
                    }
                    sh '''
                        gcloud container clusters get-credentials $CLUSTER_NAME \
                        --region=$LOCATION \
                        --project=$PROJECT_ID
                    '''
                }
            }
        }

        stage('Apply Kubernetes manifests') {
            steps {
                script {
                    sh 'kubectl apply -f kubernetes/backend/'
                    sh 'kubectl apply -f kubernetes/frontend/'
                    sh 'kubectl apply -f kubernetes/'
                }
            }
        }

        // stage('Test') {
        //     steps {
        //         // Implement actual testing commands
        //         sh 'echo "Run tests for backend and frontend"'
        //         // For example, running unit tests for Node.js
        //         dir('backend') {
        //             sh 'npm test'
        //         }
        //         // dir('frontend') {
        //         //     sh 'npm test'
        //         // }
        //     }
        // }
    }

    post {
        always {
            echo 'Cleaning up...'
            // sh 'gcloud auth revoke $CLIENT_EMAIL'
            sh 'docker-compose down'
            // dir('terraform') {
            //     sh 'terraform destroy -auto-approve'
            // }
        }
        success {
            echo 'Build and deployment were successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}

//SUMMARY REPORT:
//I worked on setting up a Jenkins pipeline for continuous integration and deployment of a project involving a backend and a frontend service, utilizing Docker and Kubernetes. The initial focus was on creating a Jenkinsfile to automate the process, including stages for building Docker images and deploying to Kubernetes.

//We encountered several issues during the setup, particularly with kubectl configuration. The kubectl commands were initially failing because they attempted to connect to an incorrect localhost port. This was due to an improper kubeconfig file configuration. After correctly setting the kubeconfig path in Jenkins and ensuring Jenkins could access this file, we resolved the connectivity issues.

//Another challenge was ensuring the Jenkins service had the necessary permissions to access the Kubernetes configuration. We managed this by copying the required kubeconfig and certificate files to the Jenkins user's directory and adjusting the permissions accordingly.

//I also configured the DNS for local testing by modifying the /etc/hosts file to point to the Minikube IP, allowing us to simulate DNS resolution for our service domains.

//Finally, we adjusted the Jenkins pipeline to include explicit kubectl commands for deploying Kubernetes resources, such as services and ingress, ensuring the web application's components were accessible via configured domain names.

//Throughout this process, we debugged issues related to Jenkins' integration with Docker and Kubernetes, refined the CI/CD pipeline steps, and ensured secure handling of credentials and configurations. This setup will facilitate automated building, testing, and deployment of the application components, streamlining development workflows and improving deployment reliability.