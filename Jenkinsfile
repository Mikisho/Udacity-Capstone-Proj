pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh "sudo chown -R $USER /usr/local/lib/node_modules"
                sh "npm install -g yarn"
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
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