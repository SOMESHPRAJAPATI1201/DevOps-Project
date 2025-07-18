pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: test-app
spec:
  serviceAccountName: jenkins
  restartPolicy: Never
  volumes:
    - name: docker-graph-storage
      emptyDir: {}
  initContainers:
    - name: docker-daemon
      image: docker:20.10.24-dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
        - name: DOCKER_DRIVER
          value: overlay2
      volumeMounts:
        - name: docker-graph-storage
          mountPath: /var/lib/docker
  containers:
    - name: docker
      image: docker:20.10.24
      command: ['sleep']
      args: ['99d']
      env:
        - name: DOCKER_HOST
          value: tcp://localhost:2375
      volumeMounts:
        - name: docker-graph-storage
          mountPath: /var/lib/docker
    - name: awscli
      image: amazon/aws-cli:2.15.21
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
"""
  }
}

  environment {
    ENV_PROD = "origin/master"
    // ENV_DEV = "origin/develop"


    PROD_ENVIRONMENT  = "prod"
    // TEST_ENVIRONMENT = "test"

    PROD_ACCOUNT = "084828603324"
    // TEST_ACCOUNT  = "084828603324"
  }

  stages {
    
    stage('Init') {
      steps {
        container('docker') {
          sh 'docker info'
        }
      }
    }

    stage('Check Environment') {
      when {
        expression { !skipRemainingStages }
      }
      steps {
        script {
          if ("${env.GIT_BRANCH}" == "${env.ENV_PROD}") {
            echo "Deploying to production environment"
          } else {
            echo "Skipping deployment for this branch"
            skipRemainingStages = true
          }
        }
      }
    }
    
    stage('Build Docker Image') {
      when {
        expression { !skipRemainingStages }
      }
      steps {
        container('docker') {
          sh '''
            echo "Building Docker image"
            docker build -t ${DOCKER_TAG} .
            docker tag ${DOCKER_TAG} ${ACCOUNT}.dkr.ecr.us-east-1.amazonaws.com/${DOCKER_TAG}:latest
          '''
          echo "Docker image built and tagged as ${DOCKER_TAG}"
        }
      }
    }

    stage('JFrog Push') {
      when {
        expression { !skipRemainingStages }
      }
      steps {
        container('jfrogcli') {
          withCredentials([usernamePassword(
            credentialsId: 'c760fc9e-928d-4328-b46a-ce3a07d1ec7e',
            usernameVariable: 'USER',
            passwordVariable: 'PASS'
          )]) {
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
