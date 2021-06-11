# property_manager
A property (or any type of object) manager implemented with React frontend, Java (Play framework &amp; HashMap) backend, Python (gunicorn &amp; bottle) microservice, and containerized with Docker &amp; Docker compose

## Attributions:
- The JAVA backend was made by closely following this guide: https://www.baeldung.com/rest-api-with-play

## To run the application on a local server:
- Make sure you have Git and Docker installed: https://docs.docker.com/engine/install/
- Clone the repo to your desired location with: `git clone git@github.com:minhhn2016/property_manager.git`
- `cd property_manager`
- `docker-compose build` will build necessary containers (this will take a while).
- Once build step are done, run: `docker-compose up` (the Java backend server will take a while to completely ready)
- When the console print as below, the application will be accessible via http://localhost:3000
```
...
backend     | [info] p.c.s.AkkaHttpServer - Listening for HTTP on /0.0.0.0:9000
backend     | 
backend     | (Server started, use Enter to stop and go back to the console...)
```

## Limitations:
- No global state management (I underestimated the amounts of stateful items, and didn't think either Context API or Redux was necessary)
- Limitied test coverage (I'm still learning and getting used to `@testing-library` that was packaged with create-react-app)
- No automated tests on frontend side yet.
- No persistent DB (I have to familiarize myself (again) with Java and Play framework)
