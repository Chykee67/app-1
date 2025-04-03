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
                            options{
                                timeout(time: 2, unit: "MINUTES")
                            }
                            steps{
                                echo "starting Ngrok ..."
                                sh "./ngrok_script.sh"
                            }
                        }

                        stage("getNgrokUrl"){
                            steps{
                                echo "getting Ngrok Url ..."
                                echo "\$(awk -F',' '/url/' ngrok.log | jq -r '.url')"
                            }
                        }
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