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
                                timeout(time: 2, unit: "MINUTES")
                            }
                            steps{
                                echo "starting backend deployment ..."
                                sh "./backend/backend_setup.sh"
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
            }
        }

    }
}