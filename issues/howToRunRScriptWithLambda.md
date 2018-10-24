#어떻게 하면 Lambda Function으로 R script를 돌릴 수 있을까?

##동기
현재 프로젝트는 lambda function에 올라가 있는 node.js(express) 서버와 S3를 통해 배포한 Vue.js 클라이언트 코드로 이루어져 있다. DB는 RDS mysql을 이용하고 있으며, Aurora DB로 업그레이드 할 예정이다.

문제는 프로젝트의 시각화 모듈이 R 코드로 이루어져 있다는 것이다. 현재(2018.09.24) 기준으로 aws lambda는 R 언어를 지원하지 않는다. 따라서 현재 시스텝 구성을 크게 바꾸지 않으면서 R script를 실행하고, 결과 그림을 받아 와서 클라이언트로 전송해줄 수 있는 방법이 필요해지게 되었다.

##대안
현재 알아보고 있는 대안들은 다음과 같다. 여러가지 후보를 공부하고 추리는 과정이므로 전혀 쌩뚱맞은 대안일 수도 있다.

1. EC2 instance로 통합
2. VPC? 사용 - VPC에 대한 공부가 필요하다.
3. Container 사용 - 역시 공부가 필요하다.
4. python과 R을 EC2에 설치하고 연결 - 2 또는 3과 겹치는 솔루션일 가능성이 크다.

###대안을 고를 때 고려해야 하는 사항들
- 기존 시스템과의 호환
    - lambda(with express)를 유지할 수 있으면 좋다.
- 시스템의 복잡성
    - 시스템이 복잡해지면 유지, 보수에 어려움이 생긴다. 인수인계도 고려해야 함
- 속도
- 보안

##대안 1.EC2 인스턴스에서 R script만 돌리기
- Running Arbitrary Executables in AWS Lambda (https://aws.amazon.com/ko/blogs/compute/running-executables-in-aws-lambda/)
- Scripting Languages for AWS Lambda: Running PHP, Ruby, and Go (https://aws.amazon.com/ko/blogs/compute/scripting-languages-for-aws-lambda-running-php-ruby-and-go/)
외부 프로세스를 실행하기 위해서는 0~700ms의 overhead가 발생한다.
