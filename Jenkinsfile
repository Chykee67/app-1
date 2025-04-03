pipeline {
    agent any

    //triggers {
    //  pollSCM('H/15 * * * *')
    //}

    stages {

        stage("Ngrok & backend"){
            parallel{
                stage("Ngrok"){
                    stages{
                        stage("ngrok setup"){
                            steps{
                                echo "starting Ngrok ..."
                                sh "./ngrok_script.sh"
                            }
                        }

                    }
                }

                stage("Backend"){
                    stages{
                        stage("backend_setup"){
                            options{
                                timeout(time: 3, unit: "MINUTES")
                            }
                            steps{
                                echo "starting backend deployment ..."
                                echo "going to sleep for 30 seconds ..."
                                sh "sleep 30"
                                echo "now up from sleep ..."
                                sh "./backend/backend_script.sh"
                            }                       
                        }
                    }
                }
            }
        }

    }
}