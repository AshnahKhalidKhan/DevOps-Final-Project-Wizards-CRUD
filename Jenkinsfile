pipeline {
    agent any

    // NOTE-TO-SELF: Turn Docker Desktop on before building Jenkinsfole cause error ayay ga

    environment {
        // BACKEND_IMAGE = "moatas19m/mongo-crud-backend:latest"
        // FRONTEND_IMAGE = "moatas19m/mongo-crud-frontend:latest"
        BACKEND_IMAGE = "ashnahkhalidkhan00210/mongo-crud-backend:latest"
        FRONTEND_IMAGE = "ashnahkhalidkhan00210/mongo-crud-frontend:latest"
        // KUBECONFIG = '/var/lib/jenkins/.kube/config'
        // KUBECONFIG = 'C:\\Users\\namra\\.minikube\\config'
        KUBECONFIG = 'C:\\Users\\namra\\.kube\\config'
        CLOUDSDK_CORE_PROJECT='devops-project-wizard-crud'
        CLIENT_EMAIL='service-account-ka-naam@devops-project-wizard-crud.iam.gserviceaccount.com'
        GCLOUD_CREDS=credentials('googlecloudplatform_id')
        PROJECT_ID = 'devops-project-wizard-crud'
        CLUSTER_NAME = 'devops-project-cluster'
        LOCATION = 'asia-southeast2'
        // CREDENTIALS_ID = 'multi-k8s'
    }

    stages {

        // Ashnah adding stuff here
        // stage('Initialize Terraform') {
        //     steps {
        //         dir('terraform') {
        //             sh 'terraform init'
        //         }
        //     }
        // }

        // stage('Apply Terraform') {
        //     steps {
        //         dir('terraform') {
        //             sh 'terraform apply -auto-approve'
        //         }
        //     }
        // }
        ///

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

        stage('Testing Google Cloud Platform') {
            steps {
                sh 'gcloud --version'
                sh 'gcloud auth activate-service-account --key-file="$GCLOUD_CREDS"'
                sh 'gcloud compute zones list'
            }
        }

        stage ('Deploy to GKE cluster') {
            steps {
                sh 'gcloud config set project $PROJECT_ID'
                sh 'gcloud compute project-info add-metadata \ --metadata google-compute-default-region=asia-southeast2,google-compute-default-zone=asia-southeast2-a'
                // Create an Autopilot cluster
                sh '''
                    gcloud container clusters create-auto $CLUSTER_NAME \
                    --location=$LOCATION \
                    --project=$PROJECT_ID
                '''
                // Connect to the cluster
                sh '''
                    gcloud container clusters get-credentials devops-project-cluster \
                    --location=asia-southeast2-a \
                    --project=devops-project-wizard-crud
                '''
                // Verify the cluster mode is "autopilot: enabled: true"
                sh '''
                    gcloud container clusters describe devops-project-cluster \
                    --location=asia-southeast2
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'minikube start'
                    // sh 'kubectl config get-contexts'
                    // sh 'kubectl config use-context minikube'
                    // sh 'kubectl apply -f kubernetes/backend/backend-deployment.yaml --validate=false'
                    // sh 'kubectl apply -f kubernetes/backend/backend-service.yaml --validate=false'
                    // sh 'kubectl apply -f kubernetes/frontend/frontend-deployment.yaml --validate=false'
                    // sh 'kubectl apply -f kubernetes/frontend/frontend-service.yaml --validate=false'
                    // sh 'kubectl apply -f kubernetes/mongo-crud-ingress.yaml --validate=false'
                    // sh 'kubectl apply -f kubernetes/mongo-crud-load-balancer.yaml --validate=false'
                }
            }
        }

    //     // stage('Test') {
    //     //     steps {
    //     //         echo 'Run tests here'
    //     //     }
    //     // }


    //     //Ash adding own test stage here
    //     stage('Test') {
    //         steps {
    //             // Implement actual testing commands
    //             sh 'echo "Run tests for backend and frontend"'
    //             // For example, running unit tests for Node.js
    //             dir('backend') {
    //                 sh 'npm test'
    //             }
    //             dir('frontend') {
    //                 sh 'npm test'
    //             }
    //         }
    //     }

    //     stage('Cleanup') {
    //         steps {
    //             echo 'Cleanup tasks if necessary'
    //         }
    //     }
    }

    post {
        always {
            sh 'gcloud auth revoke $CLIENT_EMAIL'
            // echo 'Cleaning up...'
            // sh 'docker-compose down'
            // dir('terraform') {
            //     sh 'terraform destroy -auto-approve'
            // }
        }
        // success {
        //     echo 'Build and deployment were successful!'
        // }
        // failure {
        //     echo 'Build or deployment failed.'
        // }
    }
}

//SUMMARY REPORT:
//I worked on setting up a Jenkins pipeline for continuous integration and deployment of a project involving a backend and a frontend service, utilizing Docker and Kubernetes. The initial focus was on creating a Jenkinsfile to automate the process, including stages for building Docker images and deploying to Kubernetes.

//We encountered several issues during the setup, particularly with kubectl configuration. The kubectl commands were initially failing because they attempted to connect to an incorrect localhost port. This was due to an improper kubeconfig file configuration. After correctly setting the kubeconfig path in Jenkins and ensuring Jenkins could access this file, we resolved the connectivity issues.

//Another challenge was ensuring the Jenkins service had the necessary permissions to access the Kubernetes configuration. We managed this by copying the required kubeconfig and certificate files to the Jenkins user's directory and adjusting the permissions accordingly.

//I also configured the DNS for local testing by modifying the /etc/hosts file to point to the Minikube IP, allowing us to simulate DNS resolution for our service domains.

//Finally, we adjusted the Jenkins pipeline to include explicit kubectl commands for deploying Kubernetes resources, such as services and ingress, ensuring the web application's components were accessible via configured domain names.

//Throughout this process, we debugged issues related to Jenkins' integration with Docker and Kubernetes, refined the CI/CD pipeline steps, and ensured secure handling of credentials and configurations. This setup will facilitate automated building, testing, and deployment of the application components, streamlining development workflows and improving deployment reliability.