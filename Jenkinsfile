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
        - name: AWS_WEB_IDENTITY_TOKEN_FILE
          value: "/var/run/secrets/eks.amazonaws.com/serviceaccount/token"
        - name: AWS_ROLE_ARN
          value: arn:aws:iam:::role/ddf-cion-tool
"""
    }
  }
}