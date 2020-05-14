pipeline {
    agent any
    environment { 
        CI = 'true'
        registry = 'mickey24/capestoneproj'
        registryCredential = 'dockerhub'
    }
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
                sh './run_docker.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
        stage('Add to Dockerhub') {
            steps {
                sh './upload_docker.sh'
            }
        } 
     
    }
}