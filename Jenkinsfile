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
  serviceAccountName: jenkins-role
  restartPolicy: Never
  containers:
    - name: docker
      image: docker:20.10.15
      command:
        - sleep
      args:
        - 99d
      env:
        - name: DOCKER_HOST
          value: tcp://localhost:2374
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
  initContainers:
    - name: docker-daemon
      image: docker:19.03.1-dind
      resources:
        memory: "4Gi"
        cpu: "2"
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
        - name: DOCKER_DRIVER
          value: overlay2
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

    // stage('Push to Fargate ECS') {
                    // jfrog rt docker-push view-repo-docker/\${DOCKER_TAG}/latest --quiet

                // jfrog rt cp view-repo-docker/\${DOCKER_TAG}/old_version_1 view-repo-docker/\${DOCKER_TAG}/latest

    //   when {
    //     expression { !skipRemainingStages }
    //   }
    //   steps {
    //     container('awscli') {
    //       sh '''
    //         echo "Assuming AWS role"
    //         role_arn=arn:aws:iam::${ACCOUNT}:role/delegatedadmin/adodeveloper/service-role/cet-${TAG}-us-east-1-jenkins
    //         aws sts assume-role --role-arn $role_arn --role-session-name new-deployment > /tmp/role-creds.txt
    //         cat /tmp/role-creds.txt

    //         export AWS_ACCESS_KEY_ID=$(jq -r .Credentials.AccessKeyId /tmp/role-creds.txt)
    //         export AWS_SECRET_ACCESS_KEY=$(jq -r .Credentials.SecretAccessKey /tmp/role-creds.txt)
    //         export AWS_SESSION_TOKEN=$(jq -r .Credentials.SessionToken /tmp/role-creds.txt)

    //         mkdir -p ~/.aws
    //         echo "[default]" > ~/.aws/credentials
    //         echo "aws_access_key_id=$AWS_ACCESS_KEY_ID" >> ~/.aws/credentials
    //         echo "aws_secret_access_key=$AWS_SECRET_ACCESS_KEY" >> ~/.aws/credentials
    //         echo "aws_session_token=$AWS_SESSION_TOKEN" >> ~/.aws/credentials

    //         aws ecs update-service --cluster cetapp-${TAG} --service reactnodeapp-${TAG} --force-new-deployment
    //         aws ecs update-service --cluster cetapp-${TAG} --service reactnodeapp-db-${TAG} --force-new-deployment
    //       '''
    //     }
    //   }
    // }
//   }
// }
