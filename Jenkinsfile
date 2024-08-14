pipeline {
    agent any
    parameters {
        string(name: 'Name', defaultValue: 'Sachin')
        choice(name: 'Browser', choices: ['chromium', 'firefox', 'webkit', 'MicrosoftEdge', 'GoogleChrome'])
        choice(name: 'Scripts', choices: ['ID-01', 'ID-02', 'ID-03', '@regression', '@sanity'])
        booleanParam(name: 'Headed', defaultValue: true)
        booleanParam(name: 'Debug', defaultValue: false)
    }
    stages {
        stage('build') {
            // when {
            //     expression {
            //         env.BRANCH_NAME == "master" || env.BRANCH_NAME == "main"
            //     }
            // }
            steps {
                echo env.BRANCH_NAME
                echo 'Building project'
                bat 'echo Name: %Name%'
                bat 'npm install'
            }
        }
        stage('tests') {
            steps {
                echo 'Running tests'
                script {
                    def headedFlag = params.Headed ? '--headed' : ''
                    def debugFlag = params.Debug ? '--debug' : ''
                    bat "npx playwright test --project=%Browser% ${headedFlag} --grep %Scripts% ${debugFlag}"
                }
            }
        }
    }
    post {
        success {
            echo 'Job Success'
        }
        failure {
            echo 'Job Failure'
        }
        always {
            echo 'Job Finished'
        }
    }

}