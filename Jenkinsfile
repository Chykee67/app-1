pipeline {
    agent {label 'gce-djangoappserver'}

    //triggers {
      //pollSCM('H/15 * * * *')
    //}

    stages{
        stage('build backend'){
            steps{
                sh './docker_script.sh'
            }
        }
    }

    }