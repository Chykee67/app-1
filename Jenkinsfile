pipeline {
    agent any

    //triggers {
    //  pollSCM('H/15 * * * *')
    //}

    stages {

        stage("Deploy"){
            options {
                timeout(time: 5, unit: 'MINUTES')
            }
            steps{
                echo "Deploying ..."
                sh "./backend/backend_script.sh"
            }
        }

        stage("Start Ngrok"){
            steps{
                echo "starting ngrok ..."
                sh "ngrok http 80"
            }
        }
    }
}