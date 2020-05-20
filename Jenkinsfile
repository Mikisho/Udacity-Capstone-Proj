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
                    def dockerImage = docker.build registry + ":$BUILD_NUMBER"
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

        stage('Set current kubectl context') {
			steps {
				withAWS(region:'us-east-1', credentials:'aws-credentials') {
					sh '''
						kubectl config use-context arn:aws:eks:us-east-1:546586657828:cluster/UdacityCapestoneProjEKS
					'''
				}
			}
		}

        stage('Deploy blue image') {
			steps {
				withAWS(region:'us-east-1', credentials:'aws-credentials') {
					sh '''
						kubectl apply -f ./blue-controller.json
					'''
				}
			}
		}

        stage('Deploy green image') {
			steps {
				withAWS(region:'us-east-1', credentials:'aws-credentials') {
					sh '''
						kubectl apply -f ./green-controller.json
					'''
				}
			}
		}

        stage('Create the service in the cluster, redirect to blue') {
			steps {
				withAWS(region:'us-east-1', credentials:'aws-credentials') {
					sh '''
						kubectl apply -f ./blue-service.json
					'''
				}
			}
		}

        stage('User approval') {
            steps {
                input "Ready to redirect traffic to green?"
            }
        }

        stage('Create the service in the cluster, redirect to green') {
			steps {
				withAWS(region:'us-east-1', credentials:'aws-credentials') {
					sh '''
						kubectl apply -f ./green-service.json
					'''
				}
			}
		}

    }
}