pipeline {
    agent any

    //triggers {
    //  pollSCM('H/15 * * * *')
    //}

    stages{
        stage("Ngrok and Backend"){
                parallel{
                    stage("Ngrok setup"){
                        steps{
                            echo "starting up Ngrok ..."
                            sh "./ngrok_script.sh"
                        }
                    }

                    stage("getUrlAndBuildBackend"){
                        stages{
                            stage("getNgrokUrl"){
                                steps{
                                    echo "going to sleep for 20 seconds to allow ngrok setup"
                                    sh "sleep 20"
                                    echo "getting ngrok url ..."
                                    sh "grep 'url' ngrok.log | jq -r '.url"
                                }
                            }

                            stage("Build Backend"){
                                steps{
                                    echo "Building backend from script"
                                    sh "./backend/backend_script.sh"
                                }
                            }
                        }
                    }
                }
        }
    }
}