pipeline {
    agent any

    stages {
        stage("Build"){
            steps{
                echo "Building ..."
                sh 'python3 -m venv .venv'
                sh 'source .venv/bin/activate && pip install -r backend/backend_requirements.txt'
            }
        }

        stage("Test"){
            steps{
                echo "Testing ..."
            }
        }

        stage("Deploy"){
            steps{
                echo "Deploying ..."
                sh 'source .venv/bin/activate && uwsgi backend/djangoapp.ini'
            }
        }
    }
}