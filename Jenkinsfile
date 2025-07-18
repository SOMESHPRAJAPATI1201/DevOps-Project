pipeline {
  agent {
    kubernetes {
      label 'Test-App'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: test-app
spec:
  serviceAccountName: jenkins
  restartPolicy: Never
  containers:
    - name: docker
      image: docker:20.10.15
      command: ['cat']
      tty: true
    - name: jfrogcli
      image: releases-docker.jfrog.io/jfrog/jfrog-cli-v2:2.15.1
      command: ['cat']
      tty: true
    - name: sonarcli
      image: sonarsource/sonar-scanner-cli
      command: ['cat']
      tty: true
    - name: awscli
      image: amazon/aws-cli:2.15.21
      command: ['cat']
      tty: true
"""
    }
  }

  environment {
    ENV_PROD = "origin/master"
    PROD_ENVIRONMENT = "prod"
    PROD_ACCOUNT = "084828603324"
  }

  stages {
    stage('Check Branch') {
      steps {
        script {
          echo "Deploying this branch"
          ENVIRONMENT = "${env.PROD_ENVIRONMENT}"
          ACCOUNT = "${env.PROD_ACCOUNT}"
          TAG = "prod"
          DOCKER_TAG = "test-app-prod"
          skipRemainingStages = false
        }
      }
    }

    stage('JFrog Push') {
      when {
        expression { !skipRemainingStages }
      }
      steps {
        container('jfrogcli') {
          withCredentials([usernamePassword(credentialsId: 'c760fc9e-928d-4328-b46a-ce3a07d1ec7e', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
            sh """
              jfrog config add artifactory \
                --url=https://trialiof91c.jfrog.io/artifactory \
                --user \$USER \
                --password \$PASS \
                --interactive=false \
                --basic-auth-only=true

              jfrog docker login
            """
          }
        }
      }
    }
  }
}
