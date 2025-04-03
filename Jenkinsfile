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
                        sh "ngrok http 80"
                    }
                }

                stage("Backend"){
                    steps{
                        echo "starting backend ..."
                        sh "./backend/backend_script.sh"
                    }
                }
            }
        }

    }
}