#FROM openjdk:11-jdk AS build
#
#WORKDIR /app
#COPY . /app/
#RUN chmod +x gradlew
#RUN ./gradlew clean build
#
#FROM openjdk:11-jre-slim
#
#WORKDIR /app
#COPY --from=build /app/build/libs/app.jar ./app.jar
#
#EXPOSE 8000
#
#ENV SPRING_PROFILES_ACTIVE=dev
#
#CMD ["java", "-jar", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "app.jar"]

FROM openjdk:11-jdk

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar", "/app.jar"]
