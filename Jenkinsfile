pipeline {
    agent any

    //triggers {
    //  pollSCM('H/15 * * * *')
    //}

    stages {

        stage("Ngrok & backend"){
            parallel{
                stage("Ngrok"){
                    steps{
                        echo "starting Ngrok ..."
                        sh "ngrok config add-authtoken 2vAXTkqkYyVedn0obKZFFvVueBP_Msu3t3D6yY4yeS9C7u7c"
                        sh "ngrok http 80"
                    }
                }

                stage("Backend"){
                    options{
                        timeout(time: 2, unit: 'MINUTES')
                    }
                    steps{
                        echo "starting backend ..."
                        sh "./backend/backend_script.sh"
                    }
                }
            }
        }

    }
}