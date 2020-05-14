pipeline {
    agent any
    environment { 
        CI = 'true'
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
                sh 'yarn test --watchAll'
            }
        }
        // stage('Deliver') {
        //     steps {
        //         sh './jenkins/scripts/deliver.sh'
        //         input message: 'Finished using the web site? (Click "Proceed" to continue)'
        //         sh './jenkins/scripts/kill.sh'
        //     }
        // }
    }
}