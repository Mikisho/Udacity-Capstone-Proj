pipeline {
    environment {
        CI = 'true'
        registry = 'mickey24/capestoneproj'
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    agent any

    stages {
        stage('Build') {
            steps {
                sh "sudo chown -R $USER /usr/local"
                sh "sudo npm install -g yarn"
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm install --save-dev cross-env'
                sh 'yarn test'
            }
        }
        stage('Building Docker image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
        }
        stage('Deploy to Dockerhub') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }

        }
        stage('Remove Unused docker image') {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }

    }
}